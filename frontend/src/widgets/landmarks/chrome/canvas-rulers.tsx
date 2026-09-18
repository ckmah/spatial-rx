import { useEffect, useMemo, useState } from "react";
import { Rise } from "cube-motion/react";

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
 * Edge rulers inset clear of Soft Float chrome + faint cross grid at ticks.
 * No snap-to-tick.
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

  useEffect(() => {
    if (!show || !engine) return;
    const sync = () => {
      setBounds(engine.getViewportWorldBounds());
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
    if (!bounds) {
      return {
        x: [] as { label: string; pct: number }[],
        y: [] as { label: string; pct: number }[],
      };
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
      yTicks.push({
        label: formatParam(y, String(y)),
        pct: ((y1 - y) / (y1 - y0)) * 100,
      });
    }
    return { x: xTicks, y: yTicks };
  }, [bounds]);

  if (!show) return null;

  const crosses = [];
  for (const xt of ticks.x) {
    for (const yt of ticks.y) {
      crosses.push({ x: xt.pct, y: yt.pct, key: `${xt.pct}-${yt.pct}` });
    }
  }

  return (
    <Rise
      className="landmarks-rulers pointer-events-none absolute inset-0 z-[5]"
      data-testid="canvas-rulers"
      aria-hidden
    >
      {/* Cross marks at tick intersections (not full gridlines). */}
                    <div className="landmarks-ruler-crosses">
        {crosses.map((c) => (
          <span
            key={c.key}
            className="landmarks-ruler-cross"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          />
        ))}
      </div>
      <div className="landmarks-ruler landmarks-ruler--x">
        {ticks.x.map((t) => (
          <span
            key={`x-${t.label}-${t.pct}`}
            className="landmarks-ruler-tick"
            style={{ left: `${t.pct}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div className="landmarks-ruler landmarks-ruler--y">
        {ticks.y.map((t) => (
          <span
            key={`y-${t.label}-${t.pct}`}
            className="landmarks-ruler-tick"
            style={{ top: `${t.pct}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </Rise>
  );
}
