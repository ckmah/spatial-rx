import { useEffect, useMemo, useState } from "react";

import type { EngineHandle } from "../engine";
import type { LandmarksModel } from "../use-landmarks-model";
import { formatParam } from "../helpers";

/** Nice tick step for a world-space span. */
function niceStep(span: number) {
  if (!(span > 0) || !Number.isFinite(span)) return 1;
  const raw = span / 6;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  const f = n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10;
  return f * pow;
}

/**
 * Edge rulers in data/tissue units. Toggle via `show_rulers`.
 * No snap-to-tick — readout only.
 */
export function CanvasRulers({
  lm,
  engine,
}: {
  lm: LandmarksModel;
  engine: EngineHandle | null;
}) {
  const show = !!lm.show_rulers;
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(
    null,
  );
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!show || !engine) return;
    const sync = () => {
      const b = engine.getViewportWorldBounds();
      setBounds(b);
      const host = document.querySelector(
        ".landmarks__plot-host",
      ) as HTMLElement | null;
      if (host) {
        setSize({ w: host.clientWidth, h: host.clientHeight });
      }
    };
    sync();
    const unsub = engine.subscribeViewState(() => sync());
    window.addEventListener("resize", sync);
    return () => {
      unsub();
      window.removeEventListener("resize", sync);
    };
  }, [show, engine]);

  const ticks = useMemo(() => {
    if (!bounds || size.w < 8 || size.h < 8) {
      return { x: [] as { label: string; pct: number }[], y: [] as { label: string; pct: number }[] };
    }
    const [x0, y0, x1, y1] = bounds;
    const sx = niceStep(x1 - x0);
    const sy = niceStep(y1 - y0);
    const xTicks: { label: string; pct: number }[] = [];
    const startX = Math.ceil(x0 / sx) * sx;
    for (let x = startX; x <= x1; x += sx) {
      xTicks.push({
        label: formatParam(x, String(x)),
        pct: ((x - x0) / (x1 - x0)) * 100,
      });
    }
    const yTicks: { label: string; pct: number }[] = [];
    const startY = Math.ceil(y0 / sy) * sy;
    for (let y = startY; y <= y1; y += sy) {
      // Screen y grows downward; world y may grow up — map via bounds.
      yTicks.push({
        label: formatParam(y, String(y)),
        pct: ((y1 - y) / (y1 - y0)) * 100,
      });
    }
    return { x: xTicks, y: yTicks };
  }, [bounds, size.w, size.h]);

  if (!show) return null;

  return (
    <div
      className="landmarks-rulers pointer-events-none absolute inset-0 z-[40]"
      data-testid="canvas-rulers"
      aria-hidden
    >
      <div className="landmarks-ruler landmarks-ruler--x absolute inset-x-0 top-0 h-5 bg-background/55 text-[9px] text-muted-foreground backdrop-blur-[2px]">
        {ticks.x.map((t) => (
          <span
            key={`x-${t.label}-${t.pct}`}
            className="absolute top-0 -translate-x-1/2 border-l border-border/70 pl-0.5 pt-0.5 leading-none"
            style={{ left: `${t.pct}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div className="landmarks-ruler landmarks-ruler--y absolute inset-y-0 left-0 w-8 bg-background/55 text-[9px] text-muted-foreground backdrop-blur-[2px]">
        {ticks.y.map((t) => (
          <span
            key={`y-${t.label}-${t.pct}`}
            className="absolute left-0 -translate-y-1/2 border-t border-border/70 pl-0.5 leading-none"
            style={{ top: `${t.pct}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
