import { cn } from "@/lib/utils";

import { GENE_COLORS } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { ColorSwatch } from "./primitives";
import { cubeCornerLabel } from "./rgb-cube";
import { CHANNEL_BAR, CHANNEL_LABEL, LEGEND_MUTED } from "./sections";

/** 1–2 channel bars under the embed combobox. 3-channel cube is on the info plot. */
export function EmbeddingRgbLegend({ lm }: { lm: LandmarksModel }) {
  const labels = lm.embedding_channel_labels || [];
  if (lm.color_by !== "embedding" && lm.raster_basis !== "embedding") {
    return null;
  }
  if (!labels.length) {
    return (
      <p className={cn("m-0", LEGEND_MUTED)}>
        Select an embedding to map the first three dimensions to magenta, lime,
        and azure.
      </p>
    );
  }

  if (labels.length >= 3) return null;

  if (labels.length === 1) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex min-w-0 items-center gap-1 text-[10px]">
          <span className={CHANNEL_LABEL}>
            <ColorSwatch color={GENE_COLORS[0]} />
            <span className="truncate">{cubeCornerLabel(labels[0], 0)}</span>
          </span>
        </div>
        <div
          className={CHANNEL_BAR}
          style={{
            background: `linear-gradient(to right, var(--background), ${GENE_COLORS[0]})`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className={cn("flex min-w-0 items-center justify-between gap-1", LEGEND_MUTED)}>
        {labels.map((label, i) => (
          <span key={label} className={CHANNEL_LABEL}>
            <ColorSwatch color={GENE_COLORS[i]} />
            <span className="truncate">{cubeCornerLabel(label, i)}</span>
          </span>
        ))}
      </div>
      <div
        className={CHANNEL_BAR}
        style={{
          background: `linear-gradient(to right, ${GENE_COLORS[0]}, ${GENE_COLORS[1]})`,
        }}
      />
    </div>
  );
}
