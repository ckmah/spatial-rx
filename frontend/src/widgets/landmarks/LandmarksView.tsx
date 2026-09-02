import { useCallback, useEffect, useRef, useState } from "react";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { cn } from "@/lib/utils";

import { LayersPanel, ToolsPanel, Topbar, ZoomControls } from "./chrome";
import { mountEngine, type EngineHandle } from "./engine";
import type { AnyModel } from "./helpers";
import { useLandmarksModel } from "./use-landmarks-model";
import { useWidgetFullscreen } from "./use-widget-fullscreen";

const SHELL_HEIGHT = 700;
const MIN_WIDTH = 640;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1400;

export function LandmarksView({
  model,
  hostEl,
}: {
  hostEl: HTMLElement;
  model: AnyModel;
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const lm = useLandmarksModel(model);
  const plotHostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineHandle | null>(null);
  const [pinnedWidth, setPinnedWidth] = useState<number | null>(null);
  const [shellHeight, setShellHeight] = useState(SHELL_HEIGHT);

  const syncEngineLayout = useCallback(() => {
    engineRef.current?.resize();
  }, []);

  const { isFullscreen, overlay, toggle } = useWidgetFullscreen(
    rootRef,
    syncEngineLayout,
  );

  useEffect(() => {
    hostEl.style.width = "100%";
    hostEl.style.maxWidth = "100%";
    hostEl.style.minWidth = "0";
    hostEl.style.display = "block";
  }, [hostEl]);

  useEffect(() => {
    const host = plotHostRef.current;
    if (!host) return;
    const engine = mountEngine({ model, host });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // Remount when Vite HMR replaces mountEngine (landmarks.js changes).
  }, [model, mountEngine]);

  const onResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const parent = hostEl.parentElement?.getBoundingClientRect();
      const maxW = parent && parent.width > 0 ? parent.width : rect.width;
      const maxH = Math.min(window.innerHeight * 0.9, MAX_HEIGHT);
      const start = {
        x: event.clientX,
        y: event.clientY,
        w: rect.width,
        h: rect.height,
        maxW,
        maxH,
      };
      const move = (ev: PointerEvent) => {
        setPinnedWidth(
          Math.round(
            Math.min(start.maxW, Math.max(MIN_WIDTH, start.w + (ev.clientX - start.x))),
          ),
        );
        setShellHeight(
          Math.round(
            Math.min(start.maxH, Math.max(MIN_HEIGHT, start.h + (ev.clientY - start.y))),
          ),
        );
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        syncEngineLayout();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [hostEl, syncEngineLayout],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        dark && "dark landmarks--dark",
        !dark && "landmarks--light",
        overlay && "landmarks--overlay-fs",
      )}
      style={
        isFullscreen || pinnedWidth == null
          ? undefined
          : { width: pinnedWidth }
      }
    >
      <div
        className="landmarks__body"
        style={isFullscreen ? undefined : { height: shellHeight }}
      >
        <div className="landmarks__figure">
          <Topbar
            modes={lm.modes}
            mode={lm.mode}
            onMode={(mode) => lm.setMode(mode)}
            fullscreen={isFullscreen}
            onToggleFullscreen={() => {
              void toggle();
            }}
          />
          <div className="landmarks__main landmarks__main--plot">
            <div
              ref={plotHostRef}
              className="landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
            />
            <ZoomControls
              onZoomIn={() => engineRef.current?.zoomBy(1)}
              onZoomOut={() => engineRef.current?.zoomBy(-1)}
              onReset={() => engineRef.current?.resetZoom()}
            />
            {isFullscreen ? null : (
              <button
                type="button"
                className="landmarks__resize"
                aria-label="Resize widget"
                title="Resize"
                onPointerDown={onResizePointerDown}
              />
            )}
          </div>
        </div>
      </div>
      <div className="landmarks__chrome">
        <div
          className="absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <LayersPanel lm={lm} />
        </div>
        <div
          className="absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <ToolsPanel lm={lm} />
        </div>
      </div>
    </div>
  );
}
