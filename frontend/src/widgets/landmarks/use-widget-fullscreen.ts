import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type FsMode = "off" | "native" | "overlay";

function domInNativeFs(node: HTMLElement): boolean {
  if (document.fullscreenElement === node) return true;
  try {
    return node.matches(":fullscreen") || node.matches(":-webkit-full-screen");
  } catch {
    return false;
  }
}

/** Fullscreen with native API first; fixed overlay when the host blocks it. */
export function useWidgetFullscreen(
  rootRef: RefObject<HTMLElement | null>,
  onLayout: () => void,
) {
  const modeRef = useRef<FsMode>("off");
  const [mode, setMode] = useState<FsMode>("off");

  const syncLayout = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onLayout();
      });
    });
  }, [onLayout]);

  const setModeBoth = useCallback((next: FsMode) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  const finishExit = useCallback(() => {
    if (modeRef.current === "off") return;
    const node = rootRef.current;
    setModeBoth("off");
    document.body.style.overflow = "";
    syncLayout();
    node?.scrollIntoView({ block: "nearest" });
  }, [rootRef, setModeBoth, syncLayout]);

  const syncFromDom = useCallback(() => {
    const node = rootRef.current;
    if (!node) return;
    if (domInNativeFs(node)) {
      if (modeRef.current !== "native") {
        setModeBoth("native");
        document.body.style.overflow = "hidden";
        syncLayout();
      }
      return;
    }
    if (modeRef.current === "native") {
      finishExit();
    }
  }, [rootRef, finishExit, setModeBoth, syncLayout]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", syncFromDom);
    syncFromDom();
    return () => document.removeEventListener("fullscreenchange", syncFromDom);
  }, [syncFromDom]);

  useEffect(() => {
    if (mode !== "overlay") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, finishExit]);

  const isActive = useCallback(() => {
    const node = rootRef.current;
    if (modeRef.current !== "off") return true;
    return !!node && domInNativeFs(node);
  }, [rootRef]);

  const leave = useCallback(() => {
    const node = rootRef.current;
    if (!node) return;

    if (modeRef.current === "overlay") {
      finishExit();
      return;
    }

    if (domInNativeFs(node) || document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    if (modeRef.current !== "off") {
      finishExit();
    }
  }, [rootRef, finishExit]);

  const toggle = useCallback(async () => {
    const node = rootRef.current;
    if (!node) return;

    if (isActive()) {
      leave();
      return;
    }

    try {
      await node.requestFullscreen();
      syncFromDom();
    } catch {
      setModeBoth("overlay");
      document.body.style.overflow = "hidden";
      syncLayout();
    }
  }, [rootRef, isActive, leave, setModeBoth, syncLayout, syncFromDom]);

  return {
    isFullscreen: mode !== "off",
    overlay: mode === "overlay",
    toggle,
    leave,
  };
}
