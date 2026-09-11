import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronDownIcon } from "lucide-react";

import type { LandmarksModel } from "../use-landmarks-model";

const OBSERVATION_OPTIONS = [
  { value: "genes", label: "Genes" },
  { value: "embedding", label: "Embedding" },
  { value: "composition", label: "Composition" },
] as const;

const MAGENTA_LEGEND =
  "linear-gradient(to right, #f3e6d4 0%, #ff0099 100%)";
const GRAY_LEGEND = "linear-gradient(to right, #000 0%, #fff 100%)";
const RGB_LEGEND =
  "linear-gradient(to right, #ff0099 0%, #b8ff00 50%, #00b7ff 100%)";

function observationLabel(basis: string): string {
  return (
    OBSERVATION_OPTIONS.find((o) => o.value === basis)?.label ?? "Genes"
  );
}

export function RasterSection({ lm }: { lm: LandmarksModel }) {
  const isRaster = lm.render_mode === "raster";
  const status = lm.raster_status || "";
  const pinned = lm.raster_query_bin >= 0;
  const querying = pinned;
  const basis = lm.raster_basis || "genes";
  const featureLabels = lm.raster_feature_labels || [];
  const selectedDims = lm.raster_embedding_dims || [];
  const categories = lm.category_columns || [];

  const embeddingDimItems = useMemo(() => {
    if (basis !== "embedding") return [];
    return featureLabels.map((label, i) => {
      const m = /_(\d+)$/.exec(label);
      const index = m ? Number(m[1]) : selectedDims[i] ?? i;
      return { index, label };
    });
  }, [basis, featureLabels, selectedDims]);

  const allEmbeddingSelected =
    !selectedDims.length ||
    (embeddingDimItems.length > 0 &&
      selectedDims.length === embeddingDimItems.length &&
      embeddingDimItems.every((d) => selectedDims.includes(d.index)));

  const legendGradient = querying
    ? GRAY_LEGEND
    : basis === "embedding"
      ? RGB_LEGEND
      : MAGENTA_LEGEND;

  const legendTitle = querying
    ? `Similarity · ${observationLabel(basis)}`
    : basis === "embedding"
      ? "Observation · Embedding (RGB)"
      : `Observation · ${observationLabel(basis)}`;

  const toggleEmbeddingDim = (index: number, on: boolean) => {
    const full = embeddingDimItems.map((d) => d.index);
    const current = selectedDims.length ? [...selectedDims] : [...full];
    let next: number[];
    if (on) {
      next = current.includes(index)
        ? current
        : [...current, index].sort((a, b) => a - b);
    } else {
      next = current.filter((d) => d !== index);
    }
    if (!next.length) next = [index];
    if (
      full.length &&
      next.length === full.length &&
      full.every((d) => next.includes(d))
    ) {
      lm.setRasterEmbeddingDims([]);
      return;
    }
    lm.setRasterEmbeddingDims(next);
  };

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
            <FieldLabel>Observation</FieldLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs font-normal"
                  aria-label="Observation"
                >
                  {observationLabel(basis)}
                  <ChevronDownIcon className="size-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup
                  value={basis}
                  onValueChange={(v) => {
                    if (v) lm.setRasterBasis(v);
                  }}
                >
                  {OBSERVATION_OPTIONS.map((o) => (
                    <DropdownMenuRadioItem
                      key={o.value}
                      value={o.value}
                      className="text-xs"
                    >
                      {o.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {basis === "genes" ? (
              <FieldDescription>
                Mean of active genes (select under Genes). Cream → magenta.
              </FieldDescription>
            ) : null}

            {basis === "embedding" ? (
              <div className="flex flex-col gap-1.5">
                <Input
                  value={lm.raster_embedding_key || ""}
                  onChange={(e) => lm.setRasterEmbeddingKey(e.target.value)}
                  placeholder="X_pca"
                  aria-label="Embedding key"
                  className="h-8 text-xs"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-between text-xs font-normal"
                      aria-label="Embedding dimensions"
                    >
                      {allEmbeddingSelected
                        ? `All dims (${embeddingDimItems.length || "…"})`
                        : `${selectedDims.length} of ${embeddingDimItems.length || "…"} dims`}
                      <ChevronDownIcon className="size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="max-h-64 w-56 overflow-y-auto"
                  >
                    <DropdownMenuLabel className="text-xs">
                      Dimensions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      className="text-xs"
                      onSelect={(e) => {
                        e.preventDefault();
                        lm.setRasterEmbeddingDims([]);
                      }}
                    >
                      Select all
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {embeddingDimItems.map(({ index, label }) => {
                      const checked =
                        allEmbeddingSelected || selectedDims.includes(index);
                      return (
                        <DropdownMenuCheckboxItem
                          key={`${index}-${label}`}
                          checked={checked}
                          className="text-xs"
                          onCheckedChange={(on) =>
                            toggleEmbeddingDim(index, !!on)
                          }
                          onSelect={(e) => e.preventDefault()}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FieldDescription>
                  First three selected dims drive magenta / lime / azure.
                  Prefer PCA/scVI over UMAP.
                </FieldDescription>
              </div>
            ) : null}

            {basis === "composition" ? (
              <div className="flex flex-col gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-between text-xs font-normal"
                      aria-label="Composition category"
                    >
                      {lm.active_category || "Select category"}
                      <ChevronDownIcon className="size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel className="text-xs">
                      Category grouping
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((col) => (
                      <DropdownMenuItem
                        key={col.name}
                        className="text-xs"
                        onSelect={() => {
                          lm.setActiveCategory(col);
                          lm.select("", -1);
                        }}
                      >
                        {col.name}
                        {col.name === lm.active_category ? " ✓" : ""}
                      </DropdownMenuItem>
                    ))}
                    {!categories.length ? (
                      <DropdownMenuItem disabled className="text-xs">
                        No categories
                      </DropdownMenuItem>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FieldDescription>
                  Category fractions; cream → magenta by bin purity. Syncs the
                  Categories panel.
                </FieldDescription>
              </div>
            ) : null}
          </Field>

          <Field data-testid="raster-legend">
            <FieldLabel>{legendTitle}</FieldLabel>
            <div className="flex flex-col gap-1">
              <div
                className="h-2.5 w-full rounded-sm border border-border"
                style={{ background: legendGradient }}
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
