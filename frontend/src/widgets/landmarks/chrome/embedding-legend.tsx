import { useId, useMemo } from "react";

import { GENE_COLORS } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { ColorSwatch } from "./primitives";
import {
  buildTernaryFillUrl,
  TERNARY_DOT_LEFT,
  TERNARY_DOT_RIGHT,
  TERNARY_DOT_TOP,
  TERNARY_PATH,
  TERNARY_SIZE,
  TERNARY_VERTEX_R,
} from "./genes-ternary";

/** Show bare channel indices (0, 1, 2) — drop embedding-key prefixes. */
function channelLabel(raw: string, index: number) {
  const s = String(raw || "");
  const m = s.match(/(\d+)\s*$/);
  return m ? m[1] : String(index);
}

/** RGB triangle for embedding channels (same additive primaries as genes). */
export function EmbeddingRgbLegend({ lm }: { lm: LandmarksModel }) {
  const clipId = useId();
  const fillUrl = useMemo(() => buildTernaryFillUrl(), []);
  const labels = lm.embedding_channel_labels || [];
  if (lm.color_by !== "embedding" && lm.raster_basis !== "embedding") {
    return null;
  }
  if (!labels.length) {
    return (
      <p className="m-0 text-[10px] text-foreground/65">
        Select an embedding to map the first three dimensions to magenta, lime,
        and azure.
      </p>
    );
  }

  if (labels.length === 1) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex min-w-0 items-center gap-1 text-[10px] text-foreground">
          <ColorSwatch color={GENE_COLORS[0]} />
          <span className="truncate">{channelLabel(labels[0], 0)}</span>
        </div>
        <div
          className="h-2.5 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, var(--background), ${GENE_COLORS[0]})`,
          }}
        />
      </div>
    );
  }

  if (labels.length === 2) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex min-w-0 items-center justify-between gap-1 text-[10px]">
          {labels.map((label, i) => (
            <span
              key={label}
              className="inline-flex min-w-0 items-center gap-1 truncate text-foreground"
            >
              <ColorSwatch color={GENE_COLORS[i]} />
              <span className="truncate">{channelLabel(label, i)}</span>
            </span>
          ))}
        </div>
        <div
          className="h-2.5 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${GENE_COLORS[0]}, ${GENE_COLORS[1]})`,
          }}
        />
      </div>
    );
  }

  const vertexLabels = [
    { label: labels[0], dot: TERNARY_DOT_LEFT, color: GENE_COLORS[0] },
    { label: labels[1], dot: TERNARY_DOT_TOP, color: GENE_COLORS[1] },
    { label: labels[2], dot: TERNARY_DOT_RIGHT, color: GENE_COLORS[2] },
  ];

  const display = vertexLabels.map((v, i) => ({
    ...v,
    text: channelLabel(v.label, i),
  }));

  return (
    <div
      className="flex flex-col items-center gap-1"
      data-testid="embedding-rgb-legend"
    >
      <svg
        viewBox={`0 0 ${TERNARY_SIZE} ${TERNARY_SIZE}`}
        className="size-16"
        role="img"
        aria-label={`Embedding RGB: ${display.map((d) => d.text).join(", ")}`}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={TERNARY_PATH} />
          </clipPath>
        </defs>
        {fillUrl ? (
          <image
            href={fillUrl}
            width={TERNARY_SIZE}
            height={TERNARY_SIZE}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="none"
          />
        ) : null}
        <path
          d={TERNARY_PATH}
          fill="none"
          className="stroke-border"
          strokeWidth={1}
        />
        {display.map((v) => (
          <g key={v.label}>
            <circle
              cx={v.dot.x}
              cy={v.dot.y}
              r={TERNARY_VERTEX_R}
              fill={v.color}
            />
            <text
              x={v.dot.x}
              y={v.dot.y + (v.dot === TERNARY_DOT_TOP ? -6 : 10)}
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 9, fontWeight: 600 }}
            >
              {v.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
