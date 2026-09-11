import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { LandmarksModel } from "../use-landmarks-model";

/** Black → white; matches engine `sampleRasterGray`. */
const RASTER_LEGEND_GRADIENT = "linear-gradient(to right, #000 0%, #fff 100%)";

export function RasterSection({ lm }: { lm: LandmarksModel }) {
  const isRaster = lm.render_mode === "raster";
  const status = lm.raster_status || "";
  const pinned = lm.raster_query_bin >= 0;
  const querying = pinned;
  const basis = lm.raster_basis || "genes";

  return (
    <div className="flex flex-col gap-3" data-testid="raster-section">
      <Field>
        <FieldLabel>Render</FieldLabel>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={lm.render_mode || "points"}
          onValueChange={(v) => {
            if (v) lm.setRenderMode(v);
          }}
          className="w-full"
          aria-label="Render mode"
        >
          <ToggleGroupItem value="points" className="flex-1 text-xs">
            Points
          </ToggleGroupItem>
          <ToggleGroupItem value="raster" className="flex-1 text-xs">
            Raster
          </ToggleGroupItem>
        </ToggleGroup>
      </Field>

      {isRaster ? (
        <>
          <Field>
            <FieldLabel>Aggregate basis</FieldLabel>
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              value={basis}
              onValueChange={(v) => {
                if (v) lm.setRasterBasis(v);
              }}
              className="flex w-full flex-wrap"
              aria-label="Raster aggregate basis"
            >
              <ToggleGroupItem value="genes" className="flex-1 text-xs">
                Genes
              </ToggleGroupItem>
              <ToggleGroupItem value="embedding" className="flex-1 text-xs">
                Embedding
              </ToggleGroupItem>
              <ToggleGroupItem value="composition" className="flex-1 text-xs">
                Composition
              </ToggleGroupItem>
            </ToggleGroup>
            {basis === "genes" ? (
              <FieldDescription>
                Mean of active genes (select under Genes).
              </FieldDescription>
            ) : null}
            {basis === "embedding" ? (
              <div className="flex flex-col gap-1.5">
                <Input
                  value={lm.raster_embedding_key || ""}
                  onChange={(e) => lm.setRasterEmbeddingKey(e.target.value)}
                  placeholder="X_umap"
                  aria-label="Embedding key"
                  className="h-8 text-xs"
                />
                <FieldDescription>
                  Mean of obsm vectors (prefer PCA/scVI over UMAP).
                </FieldDescription>
              </div>
            ) : null}
            {basis === "composition" ? (
              <FieldDescription>
                Category fractions for the active category column.
              </FieldDescription>
            ) : null}
          </Field>

          <Field data-testid="raster-legend">
            <FieldLabel>
              {querying ? `Similarity · ${basis}` : `Density · ${basis}`}
            </FieldLabel>
            <div className="flex flex-col gap-1">
              <div
                className="h-2.5 w-full rounded-sm border border-border"
                style={{ background: RASTER_LEGEND_GRADIENT }}
                aria-hidden
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{querying ? "0" : "low"}</span>
                <span>{querying ? "1" : "high"}</span>
              </div>
            </div>
          </Field>

          <FieldDescription className="m-0" data-testid="raster-status">
            {status === "computing"
              ? "Computing bins…"
              : status.startsWith("error:")
                ? status
                : pinned
                  ? `Pinned bin ${lm.raster_query_bin} · Esc to clear`
                  : lm.raster_n_bins
                    ? `${lm.raster_n_bins} bins · hover to scrub · Esc to clear`
                    : "Ready"}
          </FieldDescription>
        </>
      ) : null}
    </div>
  );
}
