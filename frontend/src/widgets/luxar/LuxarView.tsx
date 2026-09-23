import { useCallback, useEffect, useRef, useState } from "react";
import { LuxarApp, type LayerSummary } from "@luxar/viewer";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

import {
  applyLuxarHostBounds,
  applyLuxarRootBounds,
  forceLuxarShellLayout,
  LUXAR_EMBED_HEIGHT_PX,
  LUXAR_EMBED_MAX_HEIGHT_PX,
  LUXAR_EMBED_MIN_HEIGHT_PX,
  luxarEmbedViewport,
} from "./luxar-embed-bounds";
import { LuxarChrome, readLuxarLayers } from "./LuxarChrome";

type LuxarModel = {
  src: string;
  worker_path: string;
  wasm_path: string;
};

function luxarSrcUrl(url: string): string {
  if (!url) return url;
  const absolute = url.startsWith("http")
    ? url
    : new URL(url, window.location.href).href;
  return absolute.replace(/\/+$/, "");
}

function assetUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

export function LuxarView({
  model,
  hostEl,
  defaultHeight = LUXAR_EMBED_HEIGHT_PX,
}: {
  hostEl: HTMLElement;
  model: {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    save_changes(): void;
    on(event: string, callback: () => void): void;
    off?(event: string, callback: () => void): void;
  };
  /** Dev harness can pass a taller initial shell; notebooks keep 720px default. */
  defaultHeight?: number;
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const { src, worker_path, wasm_path } = useModel<LuxarModel>(model, [
    "src",
    "worker_path",
    "wasm_path",
  ]);
  const rootRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<LuxarApp | null>(null);
  const [error, setError] = useState("");
  const [initializing, setInitializing] = useState(false);
  const [layers, setLayers] = useState<LayerSummary[]>([]);
  const [shellHeight, setShellHeight] = useState(defaultHeight);

  const syncLuxarLayout = useCallback(
    (heightPx = shellHeight) => {
      const shell = shellRef.current;
      const canvas = canvasRef.current;
      const root = rootRef.current;
      if (!shell || !canvas) return;

      applyLuxarHostBounds(hostEl, heightPx);
      if (root) applyLuxarRootBounds(root, heightPx);
      const { width, height } = luxarEmbedViewport(shell, canvas, heightPx);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.maxHeight = `${heightPx}px`;
      appRef.current?.resize();
    },
    [hostEl, shellHeight],
  );

  useEffect(() => {
    syncLuxarLayout();
  }, [shellHeight, syncLuxarLayout]);

  useEffect(() => {
    hostEl.style.width = "100%";
    hostEl.style.maxWidth = "100%";
    hostEl.style.minWidth = "0";
    hostEl.style.display = "block";
  }, [hostEl]);

  const shellHeightRef = useRef(shellHeight);
  shellHeightRef.current = shellHeight;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = shellRef.current;
    const root = rootRef.current;
    if (!canvas || !container || !root || !src) {
      return;
    }

    const heightPx = shellHeightRef.current;
    applyLuxarHostBounds(hostEl, heightPx);
    applyLuxarRootBounds(root, heightPx);
    forceLuxarShellLayout(container);

    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const app = new LuxarApp();
    appRef.current = app;
    setError("");
    setInitializing(true);
    setLayers([]);

    const syncEmbedViewport = () => {
      const maxHeightPx = shellHeightRef.current;
      applyLuxarHostBounds(hostEl, maxHeightPx);
      applyLuxarRootBounds(root, maxHeightPx);
      const { width, height } = luxarEmbedViewport(container, canvas, maxHeightPx);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.maxHeight = `${maxHeightPx}px`;
    };

    (async () => {
      try {
        await app.init({
          canvas,
          container,
          src: luxarSrcUrl(src),
          workerPath: worker_path ? assetUrl(worker_path) : undefined,
          wasmPath: wasm_path ? assetUrl(wasm_path) : undefined,
          updateBrowserUrl: false,
        });
        if (cancelled) {
          app.dispose();
          return;
        }

        app.setInputEnabled(false);

        const refreshLayers = () => {
          if (!cancelled) setLayers(readLuxarLayers(app));
        };

        const onReady = () => {
          syncEmbedViewport();
          app.recenterCamera();
          app.resize();
          syncEmbedViewport();
          refreshLayers();
        };

        cleanups.push(
          app.on("dataset-loaded", onReady),
          app.on("dataset-error", ({ error: loadError }) => {
            if (!cancelled) {
              setError(loadError instanceof Error ? loadError.message : String(loadError));
            }
          }),
        );

        onReady();
        const fault = app.getDatasetFault();
        if (fault && !cancelled) {
          setError(fault.message ?? String(fault));
        }
        if (!cancelled) setInitializing(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setInitializing(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((off) => off());
      app.dispose();
      appRef.current = null;
      setLayers([]);
    };
  }, [src, worker_path, wasm_path, hostEl]);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas || !appRef.current) return;

    const obs = new ResizeObserver(() => {
      syncLuxarLayout();
    });
    obs.observe(shell);
    return () => obs.disconnect();
  }, [src, initializing, syncLuxarLayout]);

  const onResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const maxH = Math.min(window.innerHeight * 0.9, LUXAR_EMBED_MAX_HEIGHT_PX);
      const start = {
        y: event.clientY,
        h: shellHeight,
        maxH,
      };
      const move = (ev: PointerEvent) => {
        const next = Math.round(
          Math.min(
            start.maxH,
            Math.max(LUXAR_EMBED_MIN_HEIGHT_PX, start.h + (ev.clientY - start.y)),
          ),
        );
        shellHeightRef.current = next;
        syncLuxarLayout(next);
        setShellHeight(next);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        syncLuxarLayout();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [shellHeight, syncLuxarLayout],
  );

  const onToggleLayer = useCallback((path: string, visible: boolean) => {
    const app = appRef.current;
    if (!app?.initialized) return;
    app.setLayer(path, { visible });
    setLayers(readLuxarLayers(app));
  }, []);

  const onOpacity = useCallback((path: string, opacity: number) => {
    const app = appRef.current;
    if (!app?.initialized) return;
    app.setLayer(path, { opacity });
    setLayers(readLuxarLayers(app));
  }, []);

  const onResetView = useCallback(() => {
    appRef.current?.recenterCamera();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("spatial-rx-widget luxar-viewer relative min-w-0 w-full", dark && "dark")}
      style={{
        height: shellHeight,
        minHeight: shellHeight,
        maxHeight: "none",
        ["--luxar-embed-height" as string]: `${shellHeight}px`,
      }}
    >
      <div
        ref={shellRef}
        className="luxar-viewer-shell relative h-full w-full rounded-md bg-neutral-950"
      >
        <div className="luxar-embed-canvas-frame pointer-events-none absolute inset-0 overflow-hidden">
          <canvas
            ref={canvasRef}
            tabIndex={0}
            className="luxar-embed-canvas pointer-events-auto block h-full w-full"
          />
        </div>
        {!src ? (
          <p className="pointer-events-none absolute inset-0 z-[5000] flex items-center justify-center p-4 text-sm text-neutral-400">
            Waiting for Luxar scene URL…
          </p>
        ) : null}
        {initializing && src && !error ? (
          <p className="pointer-events-none absolute inset-0 z-[5000] flex items-center justify-center p-4 text-sm text-neutral-400">
            Initializing Luxar…
          </p>
        ) : null}
        {error ? (
          <p className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5000] bg-red-950/80 p-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="luxar__resize"
          aria-label="Resize height"
          title="Resize height"
          onPointerDown={onResizePointerDown}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        onMouseDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        <LuxarChrome
          layers={layers}
          onToggle={onToggleLayer}
          onOpacity={onOpacity}
          onReset={onResetView}
        />
      </div>
    </div>
  );
}
