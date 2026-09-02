import { useEffect, useRef } from "react";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { cn } from "@/lib/utils";

import { LayersPanel, ToolsPanel, Topbar, ZoomControls } from "./chrome";
import { mountEngine, type EngineHandle } from "./engine";
import type { AnyModel } from "./helpers";
import { useLandmarksModel } from "./use-landmarks-model";

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
  const engineRef = useRef<EngineHandle | null>(null);

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

  return (
    <div
      className={cn(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        dark && "dark landmarks--dark",
        !dark && "landmarks--light",
      )}
    >
      <div className="landmarks__body">
        <div className="landmarks__figure">
          <Topbar
            modes={lm.modes}
            mode={lm.mode}
            onMode={(mode) => lm.setMode(mode)}
          />
          <div className="landmarks__main landmarks__main--plot">
            <div ref={plotHostRef} className="landmarks__plot-host relative min-h-0 flex-1 w-full h-full" />
            <ZoomControls
              onZoomIn={() => engineRef.current?.zoomBy(1)}
              onZoomOut={() => engineRef.current?.zoomBy(-1)}
              onReset={() => engineRef.current?.resetZoom()}
            />
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
