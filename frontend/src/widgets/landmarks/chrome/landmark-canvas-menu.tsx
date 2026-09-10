import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CopyPlusIcon,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { EngineHandle } from "../engine";
import type { LandmarksModel } from "../use-landmarks-model";
import { chromeMenuClass } from "./primitives";

type MenuState = {
  index: number;
  x: number;
  y: number;
} | null;

function widgetRoot(): HTMLElement | null {
  return document.querySelector(
    ".spatial-rx-widget.landmarks, .landmarks",
  ) as HTMLElement | null;
}

function MenuItem({
  children,
  shortcut,
  destructive,
  onClick,
}: {
  children: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-hidden select-none",
        destructive
          ? "text-destructive hover:bg-destructive/10"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={onClick}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
      {shortcut ? (
        <span className="shrink-0 font-normal text-muted-foreground tabular-nums">
          {shortcut}
        </span>
      ) : null}
    </button>
  );
}

/** Right-click context menu for landmarks on the canvas. */
export function LandmarkCanvasMenu({
  lm,
  engine,
}: {
  lm: LandmarksModel;
  engine: EngineHandle | null;
}) {
  const [menu, setMenu] = useState<MenuState>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(widgetRoot());
  }, []);

  useEffect(() => {
    if (!engine?.subscribeLandmarkMenu) return;
    return engine.subscribeLandmarkMenu((evt) => {
      const root = widgetRoot();
      if (!root) {
        setMenu({ index: evt.index, x: evt.clientX, y: evt.clientY });
        return;
      }
      const rect = root.getBoundingClientRect();
      setContainer(root);
      // Position relative to the widget so theme tokens apply and transforms
      // on ancestors do not offset fixed client coordinates.
      setMenu({
        index: evt.index,
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      });
    });
  }, [engine]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    let removeDown: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      const onDown = (e: PointerEvent) => {
        const el = document.getElementById("landmarks-canvas-menu");
        if (el && e.target instanceof Node && el.contains(e.target)) return;
        setMenu(null);
      };
      document.addEventListener("pointerdown", onDown, true);
      removeDown = () =>
        document.removeEventListener("pointerdown", onDown, true);
    }, 0);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      removeDown?.();
    };
  }, [menu]);

  const item = menu ? lm.landmarks[menu.index] : null;
  if (!menu || !item || !container) return null;

  const close = () => setMenu(null);
  const run = (fn: () => void) => {
    fn();
    close();
  };

  return createPortal(
    <div
      id="landmarks-canvas-menu"
      role="menu"
      className={cn(chromeMenuClass, "absolute z-[80]")}
      style={{ left: menu.x, top: menu.y }}
    >
      <MenuItem
        onClick={() => run(() => lm.toggleLandmarkHidden(menu.index))}
      >
        {item.hidden ? (
          <EyeIcon className="size-3.5" />
        ) : (
          <EyeOffIcon className="size-3.5" />
        )}
        {item.hidden ? "Show" : "Hide"}
      </MenuItem>
      <MenuItem
        onClick={() =>
          run(() => {
            const next = window.prompt("Rename landmark", item.id);
            if (next != null) lm.renameLandmark(menu.index, next);
          })
        }
      >
        <PencilIcon className="size-3.5" />
        Rename
      </MenuItem>
      <MenuItem
        onClick={() => run(() => lm.duplicateLandmark(menu.index))}
      >
        <CopyPlusIcon className="size-3.5" />
        Duplicate
      </MenuItem>
      <MenuItem
        destructive
        shortcut="⌫"
        onClick={() => run(() => lm.deleteLandmark(menu.index))}
      >
        <Trash2Icon className="size-3.5" />
        Delete
      </MenuItem>
    </div>,
    container,
  );
}
