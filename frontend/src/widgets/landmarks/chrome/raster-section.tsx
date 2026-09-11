import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { LandmarksModel } from "../use-landmarks-model";

function formatBinSize(v: number): string {
  if (!Number.isFinite(v)) return "—";
  if (v >= 100) return v.toFixed(0);
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

export function RasterSection({ lm }: { lm: LandmarksModel }) {
  const isRaster = lm.render_mode === "raster";
  const [binDraft, setBinDraft] = useState(lm.raster_bin_size);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    setBinDraft(lm.raster_bin_size);
  }, [lm.raster_bin_size]);

  useEffect(() => {
    return () => {
      if (debounceRef.current != null) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const commitBinSize = (v: number) => {
    setBinDraft(v);
    if (debounceRef.current != null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      lm.setRasterBinSize(v);
    }, 120);
  };

  const status = lm.raster_status || "";
  const pinned = lm.raster_query_bin >= 0;

  const span = Math.max(
    (lm.x_bounds?.[1] ?? 1) - (lm.x_bounds?.[0] ?? 0),
    (lm.y_bounds?.[1] ?? 1) - (lm.y_bounds?.[0] ?? 0),
    1e-3,
  );
  const binMin = Math.max(span / 200, 1e-4);
  const binMax = Math.max(span / 2, binDraft, binMin * 2);

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
            <FieldLabel>Bin size</FieldLabel>
            <div className="landmarks-slider-control">
              <span className="landmarks-slider-value" aria-hidden>
                {formatBinSize(binDraft)}
              </span>
              <Slider
                min={binMin}
                max={binMax}
                step={(binMax - binMin) / 100}
                value={[Math.min(Math.max(binDraft, binMin), binMax)]}
                onValueChange={(v) => commitBinSize(v[0] ?? binDraft)}
                aria-label="Raster bin size"
              />
            </div>
            <FieldDescription>
              Square bins in world units (µm when spatial is µm).
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Aggregate basis</FieldLabel>
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              value={lm.raster_basis || "genes"}
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
            {lm.raster_basis === "genes" ? (
              <FieldDescription>
                Mean of active genes (select under Genes).
              </FieldDescription>
            ) : null}
            {lm.raster_basis === "embedding" ? (
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
            {lm.raster_basis === "composition" ? (
              <FieldDescription>
                Category fractions for the active category column.
              </FieldDescription>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>Similarity threshold</FieldLabel>
            <div className="landmarks-slider-control">
              <span className="landmarks-slider-value" aria-hidden>
                {lm.raster_threshold.toFixed(2)}
              </span>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[lm.raster_threshold]}
                onValueChange={(v) => lm.setRasterThreshold(v[0] ?? 0)}
                aria-label="Similarity threshold"
              />
            </div>
            <FieldDescription>
              Dim bins below this cosine score.
            </FieldDescription>
          </Field>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!pinned}
              onClick={() => lm.clearRasterQuery()}
            >
              Clear pin
            </Button>
            <FieldDescription className="m-0">
              {status === "computing"
                ? "Computing bins…"
                : status.startsWith("error:")
                  ? status
                  : pinned
                    ? `Pinned bin ${lm.raster_query_bin}`
                    : lm.raster_n_bins
                      ? `${lm.raster_n_bins} bins · hover to scrub`
                      : "Ready"}
            </FieldDescription>
          </div>
        </>
      ) : null}
    </div>
  );
}
