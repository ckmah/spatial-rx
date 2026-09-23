import { useEffect, useRef, useState } from "react";
import { LuxarApp } from "@luxar/viewer";

import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

type LuxarModel = {
  src: string;
};

function absoluteUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

export function LuxarView({
  model,
  hostEl,
}: {
  hostEl: HTMLElement;
  model: {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    save_changes(): void;
    on(event: string, callback: () => void): void;
    off?(event: string, callback: () => void): void;
  };
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const { src } = useModel<LuxarModel>(model, ["src"]);
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<LuxarApp | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = shellRef.current;
    if (!canvas || !container || !src) {
      return;
    }

    let cancelled = false;
    const app = new LuxarApp();
    appRef.current = app;
    setError("");

    (async () => {
      try {
        await app.init({
          canvas,
          container,
          src: absoluteUrl(src),
          updateBrowserUrl: false,
        });
        if (cancelled) {
          app.dispose();
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
      app.dispose();
      appRef.current = null;
    };
  }, [src]);

  return (
    <div className={cn("spatial-rx-widget luxar-viewer relative min-w-0 w-full", dark && "dark")}>
      <div ref={shellRef} className="relative h-[520px] w-full overflow-hidden rounded-md bg-neutral-950">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {!src ? (
          <p className="absolute inset-0 flex items-center justify-center p-4 text-sm text-neutral-400">
            Waiting for Luxar scene URL…
          </p>
        ) : null}
        {error ? (
          <p className="absolute bottom-0 left-0 right-0 bg-red-950/80 p-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
