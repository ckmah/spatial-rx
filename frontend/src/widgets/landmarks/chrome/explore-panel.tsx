import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { FieldDescription } from "@/components/ui/field";
import { ItemGroup } from "@/components/ui/item";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

import type { CategoryColumn } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import {
  activateCategories,
  activateEmbedding,
  activateGenes,
  colorSignal,
  colorSignalDetail,
  type ColorSignal,
} from "./coloring";
import { EmbeddingRgbLegend } from "./embedding-legend";
import { GenesCombobox } from "./genes-legend";
import { LayerRow } from "./primitives";
import { RasterSection } from "./raster-section";
import {
  FIELD_CAPTION,
  FLOAT_PANEL,
  META_LINE,
  PANEL_INSET,
  PILL_TABS_LIST,
  PILL_TABS_TRIGGER,
} from "./sections";
import { useWidgetPortalContainer } from "./use-widget-portal";

const COMBO_INPUT =
  "min-h-8 w-full rounded-[var(--radius)] bg-card/60 text-xs shadow-none";

function EmbeddingCombobox({ lm }: { lm: LandmarksModel }) {
  const keys = lm.raster_embedding_keys || [];
  const value = lm.raster_embedding_key || keys[0] || "";
  const [wrapRef, portalEl] = useWidgetPortalContainer();

  if (!keys.length) {
    return (
      <FieldDescription>
        No embeddings in <code className="text-[0.7rem]">obsm</code>. Compute
        PCA (or another embedding) in the notebook.
      </FieldDescription>
    );
  }

  return (
    <div ref={wrapRef} className="flex flex-col gap-1.5">
      <Combobox
        items={keys}
        value={value || null}
        onValueChange={(next) => {
          if (typeof next === "string" && next) {
            lm.setRasterEmbeddingKey(next);
          }
        }}
      >
        <ComboboxInput
          placeholder="Select embedding"
          className={COMBO_INPUT}
          aria-label="Embedding key"
        />
        <ComboboxContent container={portalEl} className="text-xs">
          <ComboboxEmpty className="text-xs">No embeddings</ComboboxEmpty>
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

function CategoriesControls({
  lm,
  signal,
}: {
  lm: LandmarksModel;
  signal: ColorSignal;
}) {
  const {
    category_columns,
    active_category,
    selected_kind,
    selected_index,
  } = lm;

  if (!category_columns.length) {
    return (
      <FieldDescription>
        No category columns loaded on this AnnData.
      </FieldDescription>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-0.5">
        {category_columns.map((col: CategoryColumn) => {
          const isShown =
            signal === "categories" && col.name === active_category;
          return (
            <Collapsible key={col.name} className="group/cat">
              <CollapsibleTrigger
                className={cn(
                  "landmarks-cat-trigger cursor-pointer text-left text-xs font-medium text-foreground/70 outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isShown &&
                    "landmarks-cat-trigger--active text-foreground",
                )}
                onClick={() => {
                  lm.setActiveCategory(col);
                  lm.select("", -1);
                }}
              >
                <ChevronRightIcon className="landmarks-layer-icon shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" />
                <span className="min-w-0 flex-1 truncate">{col.name}</span>
                <span className="landmarks-trail" aria-hidden>
                  <span className="landmarks-trail-cell" />
                  <span className="landmarks-trail-cell" />
                </span>
              </CollapsibleTrigger>
              {lm.render_mode === "raster" ? null : (
                <CollapsibleContent className="pl-4">
                  <ItemGroup className="gap-0.5">
                    {(col.labels || []).map((label, i) => (
                      <LayerRow
                        key={`${col.name}-${label}`}
                        active={
                          selected_kind === "type" &&
                          col.name === active_category &&
                          selected_index === i
                        }
                        color={
                          (col.palette || [])[
                            i % Math.max((col.palette || []).length, 1)
                          ]
                        }
                        label={label}
                        onSelect={() => lm.selectType(col, i)}
                      />
                    ))}
                  </ItemGroup>
                </CollapsibleContent>
              )}
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Right-dock explore chrome: geometry, explicit Color-by control, then the
 * active signal's options. Info is a sibling card above this panel.
 */
export function ExplorePanel({ lm }: { lm: LandmarksModel }) {
  const modelSignal = colorSignal(lm);
  const [colorBy, setColorBy] = useState<ColorSignal>(modelSignal);

  useEffect(() => {
    setColorBy(modelSignal);
  }, [modelSignal]);

  const onColorBy = (next: string) => {
    if (next !== "categories" && next !== "genes" && next !== "embedding") {
      return;
    }
    setColorBy(next);
    if (next === "categories") activateCategories(lm);
    else if (next === "genes") activateGenes(lm);
    else activateEmbedding(lm);
  };

  const detail = colorSignalDetail(lm, colorBy);

  return (
    <div className="landmarks__explore-panel">
      <Card className={FLOAT_PANEL} data-testid="explore-panel">
        <CardContent
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain",
            PANEL_INSET,
          )}
        >
          <div className="flex flex-col gap-2.5 pb-2.5">
            <RasterSection lm={lm} />

            <Tabs
              value={colorBy}
              onValueChange={onColorBy}
              className="flex flex-col gap-1"
              data-testid="explore-color-by"
            >
              <p className={FIELD_CAPTION}>Color by</p>
              <TabsList className={PILL_TABS_LIST} aria-label="Color by">
                {(lm.category_columns?.length ?? 0) > 0 ? (
                  <TabsTrigger
                    value="categories"
                    className={PILL_TABS_TRIGGER}
                  >
                    Category
                  </TabsTrigger>
                ) : null}
                <TabsTrigger value="genes" className={PILL_TABS_TRIGGER}>
                  Genes
                </TabsTrigger>
                <TabsTrigger value="embedding" className={PILL_TABS_TRIGGER}>
                  Embedding
                </TabsTrigger>
              </TabsList>
              {colorBy !== "categories" ? (
                <p
                  className={META_LINE}
                  data-testid="explore-coloring-by"
                  title={detail}
                >
                  {detail}
                </p>
              ) : (
                <span className="sr-only" data-testid="explore-coloring-by">
                  {detail}
                </span>
              )}

              <div className="pt-0.5" data-testid="explore-color-controls">
                <TabsContent value="categories" className="m-0">
                  <CategoriesControls lm={lm} signal={colorBy} />
                </TabsContent>
                <TabsContent value="genes" className="m-0">
                  {lm.gene_columns.length ? (
                    <GenesCombobox lm={lm} />
                  ) : (
                    <FieldDescription>
                      No genes loaded. Pass genes=… to LandmarksWidget
                      (default: all var names) or call set_expression.
                    </FieldDescription>
                  )}
                </TabsContent>
                <TabsContent value="embedding" className="m-0">
                  <div className="flex flex-col gap-1.5">
                    <EmbeddingCombobox lm={lm} />
                    <EmbeddingRgbLegend lm={lm} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
