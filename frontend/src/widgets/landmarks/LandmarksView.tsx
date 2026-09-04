import { useCallback, useEffect, useRef, useState } from "react";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { cn } from "@/lib/utils";

import {
  ControlPanel,
  LayersPanel,
  MobileSectionChrome,
  Topbar,
  type PanelSectionId,
} from "./chrome";
import { mountEngine, type EngineHandle } from "./engine";
import type { AnyModel } from "./helpers";
import { useLandmarksModel } from "./use-landmarks-model";
import { useWidgetFullscreen } from "./use-widget-fullscreen";

const SHELL_HEIGHT = 700;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1400;
const NARROW_BREAKPOINT = 640;

export function LandmarksView({
  model,
  hostEl,
  defaultHeight = SHELL_HEIGHT,
}: {
  hostEl: HTMLElement;
  model: AnyModel;
  /** Dev harness can pass a taller initial shell height; notebooks keep 700px default. */
  defaultHeight?: number;
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const lm = useLandmarksModel(model);
  const plotHostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineHandle | null>(null);
  const [shellHeight, setShellHeight] = useState(defaultHeight);
  const [narrow, setNarrow] = useState(false);
  const [openSection, setOpenSection] = useState<PanelSectionId | null>(null);
  const savedHeightRef = useRef<number | null>(null);
  const wasFullscreenRef = useRef(false);

  const syncEngineLayout = useCallback(() => {
    engineRef.current?.resize();
  }, []);

  const { isFullscreen, overlay, toggle } = useWidgetFullscreen(
    rootRef,
    syncEngineLayout,
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      setNarrow(width < NARROW_BREAKPOINT);
    });
    ro.observe(el);
    setNarrow(el.clientWidth < NARROW_BREAKPOINT);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!narrow) setOpenSection(null);
  }, [narrow]);

  useEffect(() => {
    if (isFullscreen && !wasFullscreenRef.current) {
      savedHeightRef.current = shellHeight;
    }
    if (!isFullscreen && wasFullscreenRef.current && savedHeightRef.current != null) {
      setShellHeight(savedHeightRef.current);
      savedHeightRef.current = null;
      syncEngineLayout();
    }
    wasFullscreenRef.current = isFullscreen;
  }, [isFullscreen, shellHeight, syncEngineLayout]);

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
      const maxH = Math.min(window.innerHeight * 0.9, MAX_HEIGHT);
      const start = {
        y: event.clientY,
        h: shellHeight,
        maxH,
      };
      const move = (ev: PointerEvent) => {
        setShellHeight(
          Math.round(
            Math.min(start.maxH, Math.max(MIN_HEIGHT, start.h + (ev.clientY - start.y))),
          ),
        );
        syncEngineLayout();
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        syncEngineLayout();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [shellHeight, syncEngineLayout],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        dark && "dark landmarks--dark",
        !dark && "landmarks--light",
        narrow && "landmarks--narrow",
        isFullscreen && "landmarks--fs",
        overlay && "landmarks--overlay-fs",
      )}
    >
      <div
        className="landmarks__body"
        style={isFullscreen ? undefined : { height: shellHeight }}
      >
        <div className="landmarks__figure">
          <div className="landmarks__main landmarks__main--plot">
            <div
              ref={plotHostRef}
              className="landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
            />
          </div>
        </div>
        {isFullscreen ? null : (
          <button
            type="button"
            className="landmarks__resize"
            aria-label="Resize height"
            title="Resize height"
            onPointerDown={onResizePointerDown}
          />
        )}
      </div>
      <div className="landmarks__chrome">
        <div
          className="landmarks__chrome-tools"
          onMouseDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <Topbar
            modes={lm.modes}
            mode={lm.mode}
            onMode={(mode) => lm.setMode(mode)}
            fullscreen={isFullscreen}
            onToggleFullscreen={() => {
              toggle();
            }}
            onZoomIn={() => engineRef.current?.zoomBy(1)}
            onZoomOut={() => engineRef.current?.zoomBy(-1)}
            onReset={() => engineRef.current?.resetZoom()}
          />
        </div>

        {narrow ? (
          <MobileSectionChrome
            lm={lm}
            open={openSection}
            onOpenChange={setOpenSection}
          />
        ) : (
          <>
            <div
              className="landmarks__chrome-dock landmarks__chrome-dock--left"
              onMouseDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <LayersPanel lm={lm} />
            </div>
            <div
              className="landmarks__chrome-dock landmarks__chrome-dock--right"
              onMouseDown={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <ControlPanel lm={lm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
