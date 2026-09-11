import { useMemo } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import type { LandmarksModel } from "../use-landmarks-model";
import { useWidgetPortalContainer } from "./use-widget-portal";

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

const COMBO_INPUT =
  "min-h-8 w-full rounded-[var(--radius)] bg-card/60 text-xs shadow-none";

function observationLabel(basis: string): string {
  return (
    OBSERVATION_OPTIONS.find((o) => o.value === basis)?.label ?? "Genes"
  );
}

function SingleCombobox({
  items,
  value,
  onValueChange,
  placeholder,
  empty,
  "aria-label": ariaLabel,
}: {
  items: string[];
  value: string;
  onValueChange: (next: string) => void;
  placeholder: string;
  empty: string;
  "aria-label": string;
}) {
  const [wrapRef, portalEl] = useWidgetPortalContainer();

  return (
    <div ref={wrapRef}>
      <Combobox
        items={items}
        value={value || null}
        onValueChange={(next) => {
          if (typeof next === "string" && next) onValueChange(next);
        }}
      >
        <ComboboxInput
          placeholder={placeholder}
          className={COMBO_INPUT}
          aria-label={ariaLabel}
        />
        <ComboboxContent container={portalEl} className="text-xs">
          <ComboboxEmpty className="text-xs">{empty}</ComboboxEmpty>
          <ComboboxList>
            {(item) => {
              const name = String(item);
              return (
                <ComboboxItem key={name} value={name} className="py-1 text-xs">
                  {name}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
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
  const embeddingKeys = lm.raster_embedding_keys || [];
  const categories = lm.category_columns || [];
  const categoryNames = categories.map((c) => c.name);

  const embeddingDimItems = useMemo(() => {
    if (basis !== "embedding") return [];
    return featureLabels.map((label, i) => {
      const m = /_(\d+)$/.exec(label);
      const index = m ? Number(m[1]) : selectedDims[i] ?? i;
      return { index, label };
    });
  }, [basis, featureLabels, selectedDims]);

  const dimLabels = embeddingDimItems.map((d) => d.label);
  const selectedDimLabels = useMemo(() => {
    if (!embeddingDimItems.length) return [] as string[];
    if (!selectedDims.length) return dimLabels;
    const byIndex = new Map(embeddingDimItems.map((d) => [d.index, d.label]));
    return selectedDims
      .map((i) => byIndex.get(i))
      .filter((x): x is string => !!x);
  }, [embeddingDimItems, selectedDims, dimLabels]);

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

  const setEmbeddingDimsFromLabels = (labels: string[]) => {
    const byLabel = new Map(embeddingDimItems.map((d) => [d.label, d.index]));
    const next = labels
      .map((l) => byLabel.get(l))
      .filter((x): x is number => typeof x === "number")
      .sort((a, b) => a - b);
    const full = embeddingDimItems.map((d) => d.index);
    if (
      !next.length ||
      (full.length &&
        next.length === full.length &&
        full.every((d) => next.includes(d)))
    ) {
      lm.setRasterEmbeddingDims([]);
      return;
    }
    lm.setRasterEmbeddingDims(next);
  };

  const [dimsWrapRef, dimsPortal] = useWidgetPortalContainer();
  const dimsAnchor = useComboboxAnchor();

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
            <SingleCombobox
              items={OBSERVATION_OPTIONS.map((o) => o.label)}
              value={observationLabel(basis)}
              onValueChange={(label) => {
                const opt = OBSERVATION_OPTIONS.find((o) => o.label === label);
                if (opt) lm.setRasterBasis(opt.value);
              }}
              placeholder="Select observation"
              empty="No options"
              aria-label="Observation"
            />

            {basis === "genes" ? (
              <FieldDescription>
                Mean of active genes (select under Genes). Cream → magenta.
              </FieldDescription>
            ) : null}

            {basis === "embedding" ? (
              <div className="flex flex-col gap-1.5">
                <SingleCombobox
                  items={embeddingKeys}
                  value={lm.raster_embedding_key || embeddingKeys[0] || ""}
                  onValueChange={(v) => lm.setRasterEmbeddingKey(v)}
                  placeholder="Select embedding"
                  empty="No embeddings in obsm"
                  aria-label="Embedding key"
                />
                <div ref={dimsWrapRef}>
                  <Combobox
                    items={dimLabels}
                    multiple
                    value={
                      allEmbeddingSelected ? dimLabels : selectedDimLabels
                    }
                    onValueChange={(next) => {
                      const arr = Array.isArray(next) ? next.map(String) : [];
                      setEmbeddingDimsFromLabels(arr);
                    }}
                  >
                    <div className="relative">
                      <ComboboxChips
                        ref={dimsAnchor}
                        className={cn(
                          COMBO_INPUT,
                          "px-2 py-1",
                          (allEmbeddingSelected || selectedDimLabels.length) &&
                            "pr-8",
                        )}
                      >
                        <ComboboxValue>
                          {allEmbeddingSelected ? (
                            <span className="text-[0.7rem] text-muted-foreground">
                              All dims ({dimLabels.length || "…"})
                            </span>
                          ) : (
                            selectedDimLabels.map((label) => (
                              <ComboboxChip
                                key={label}
                                className="gap-1 text-[0.7rem]"
                              >
                                {label}
                              </ComboboxChip>
                            ))
                          )}
                        </ComboboxValue>
                        <ComboboxChipsInput
                          placeholder={
                            allEmbeddingSelected || selectedDimLabels.length
                              ? ""
                              : "Select dims"
                          }
                          className="min-w-16 text-xs"
                          aria-label="Embedding dimensions"
                        />
                      </ComboboxChips>
                      {allEmbeddingSelected || selectedDimLabels.length ? (
                        <ComboboxClear className="absolute top-1 right-1" />
                      ) : null}
                    </div>
                    <ComboboxContent
                      container={dimsPortal}
                      anchor={dimsAnchor}
                      className="text-xs"
                    >
                      <ComboboxEmpty className="text-xs">
                        No dimensions
                      </ComboboxEmpty>
                      <ComboboxList>
                        {(item) => {
                          const name = String(item);
                          return (
                            <ComboboxItem
                              key={name}
                              value={name}
                              className="py-1 text-xs"
                            >
                              {name}
                            </ComboboxItem>
                          );
                        }}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
                <FieldDescription>
                  First three selected dims drive magenta / lime / azure.
                  Prefer PCA/scVI over UMAP.
                </FieldDescription>
              </div>
            ) : null}

            {basis === "composition" ? (
              <div className="flex flex-col gap-1.5">
                <SingleCombobox
                  items={categoryNames}
                  value={lm.active_category || ""}
                  onValueChange={(name) => {
                    const col = categories.find((c) => c.name === name);
                    if (!col) return;
                    lm.setActiveCategory(col);
                    lm.select("", -1);
                  }}
                  placeholder="Select category"
                  empty="No categories"
                  aria-label="Composition category"
                />
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
