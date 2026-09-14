import { GENE_COLORS } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { ColorSwatch } from "./primitives";
import { cubeCornerLabel } from "./rgb-cube";

/** 1–2 channel bars under the embed combobox. 3-channel cube is on the info plot. */
export function EmbeddingRgbLegend({ lm }: { lm: LandmarksModel }) {
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

  if (labels.length >= 3) return null;

  if (labels.length === 1) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex min-w-0 items-center gap-1 text-[10px] text-foreground">
          <ColorSwatch color={GENE_COLORS[0]} />
          <span className="truncate">{cubeCornerLabel(labels[0], 0)}</span>
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

  return (
    <div className="flex flex-col gap-1">
      <div className="flex min-w-0 items-center justify-between gap-1 text-[10px]">
        {labels.map((label, i) => (
          <span
            key={label}
            className="inline-flex min-w-0 items-center gap-1 truncate text-foreground"
          >
            <ColorSwatch color={GENE_COLORS[i]} />
            <span className="truncate">{cubeCornerLabel(label, i)}</span>
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
