import { useEffect, useState } from "react";

import { FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { EngineHandle } from "../engine";
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
import {
  CategoriesControls,
  EmbeddingCombobox,
} from "./explore-panel";
import { GenesCombobox } from "./genes-legend";
import { InfoPanel } from "./info-panel";
import { RasterSection } from "./raster-section";
import { EMBEDDED_PANEL, PANEL_INSET, PILL_TABS_TRIGGER, STACK_GAP_SM } from "./sections";
import { SoftFloatSlidingTabsList } from "./sliding-tabs";

/**
 * Soft Float right dock: color pills → info plot → similarity legend →
 * color controls. One Tabs root keeps the switcher wired to the controls.
 */
export function RightChromeStack({
  lm,
  engine = null,
}: {
  lm: LandmarksModel;
  engine?: EngineHandle | null;
}) {
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
    <div
      className={cn(
        EMBEDDED_PANEL,
        "landmarks__explore-panel flex min-h-0 flex-1 flex-col",
      )}
      data-testid="info-explore-stack"
    >
      <div
        className={cn(
          "landmarks__chrome-stack landmarks-float-clip flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain",
          PANEL_INSET,
        )}
      >
        <Tabs
          value={colorBy}
          onValueChange={onColorBy}
          className="flex min-h-0 flex-col gap-2.5 pb-1.5"
          data-testid="explore-color-by"
        >
          <SoftFloatSlidingTabsList value={colorBy} aria-label="Color">
            {(lm.category_columns?.length ?? 0) > 0 ? (
              <TabsTrigger value="categories" className={PILL_TABS_TRIGGER}>
                category
              </TabsTrigger>
            ) : null}
            <TabsTrigger value="genes" className={PILL_TABS_TRIGGER}>
              genes
            </TabsTrigger>
            <TabsTrigger value="embedding" className={PILL_TABS_TRIGGER}>
              embed
            </TabsTrigger>
          </SoftFloatSlidingTabsList>
          <span className="sr-only" data-testid="explore-coloring-by">
            {detail}
          </span>

          <InfoPanel lm={lm} engine={engine} embedded bare />

          <RasterSection lm={lm} />

          <div data-testid="explore-panel">
            <div className="pt-0.5" data-testid="explore-color-controls">
              <TabsContent value="categories" className="m-0">
                <CategoriesControls lm={lm} signal={colorBy} />
              </TabsContent>
              <TabsContent value="genes" className="m-0">
                {lm.gene_columns.length ? (
                  <GenesCombobox lm={lm} />
                ) : (
                  <FieldDescription>
                    No genes loaded. Pass genes=… to LandmarksWidget (default:
                    all var names) or call set_expression.
                  </FieldDescription>
                )}
              </TabsContent>
              <TabsContent value="embedding" className="m-0">
                <div className={STACK_GAP_SM}>
                  <EmbeddingCombobox lm={lm} />
                  <EmbeddingRgbLegend lm={lm} />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
