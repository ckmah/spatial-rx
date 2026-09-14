import { useMemo } from "react";

import { cn } from "@/lib/utils";

import {
  buildIsoCubeFillUrl,
  cubeCorners,
  LEGEND_CUBE,
} from "./rgb-cube";

function shortLabel(s: string) {
  const t = String(s || "").trim();
  if (t.length <= 6) return t;
  return t.slice(0, 6);
}

/**
 * Small isometric channel cube (magenta / lime / azure axes). Faces use the
 * same additive mix as the canvas; corners labeled by gene / dim.
 */
export function RgbCubeLegend({
  labels,
  className,
}: {
  labels: string[];
  className?: string;
}) {
  const o = LEGEND_CUBE;
  const fillUrl = useMemo(() => buildIsoCubeFillUrl(o), []);
  const c = cubeCorners(o);
  const text = [
    shortLabel(labels[0] ?? "0"),
    shortLabel(labels[1] ?? "1"),
    shortLabel(labels[2] ?? "2"),
  ];

  return (
    <svg
      viewBox={`0 0 ${o.vbW} ${o.vbH}`}
      className={cn("h-14 w-[5.25rem]", className)}
      role="img"
      aria-label={`RGB cube: ${text.join(", ")}`}
      data-testid="rgb-cube-legend"
    >
      {fillUrl ? (
        <image
          href={fillUrl}
          width={o.vbW}
          height={o.vbH}
          preserveAspectRatio="none"
        />
      ) : null}
      {/* Channel0 down-left, channel1 down-right, channel2 up. */}
      <text
        x={c.c0.x - 5}
        y={c.c0.y + 4}
        textAnchor="end"
        className="fill-foreground"
        style={{ fontSize: 8, fontWeight: 600 }}
      >
        {text[0]}
      </text>
      <text
        x={c.c1.x + 5}
        y={c.c1.y + 4}
        className="fill-foreground"
        style={{ fontSize: 8, fontWeight: 600 }}
      >
        {text[1]}
      </text>
      <text
        x={c.c2.x}
        y={c.c2.y - 5}
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 8, fontWeight: 600 }}
      >
        {text[2]}
      </text>
    </svg>
  );
}
