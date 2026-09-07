import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FieldDescription } from "@/components/ui/field";
import { ItemGroup } from "@/components/ui/item";
import { cn } from "@/lib/utils";

import {
  LANDMARK_COLORS,
  SELECTION_COLORS,
} from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { LayerRow } from "./primitives";
import { GenesCombobox } from "./genes-legend";
import {
  PANEL_INSET,
  SECTION_TRIGGER,
  FLOAT_PANEL,
  type PanelSectionId,
} from "./sections";
import { ChevronRightIcon } from "lucide-react";

export function LayersPanel({
  lm,
  forceSection,
  embedded = false,
}: {
  lm: LandmarksModel;
  forceSection?: PanelSectionId;
  embedded?: boolean;
}) {
  const {
    selections,
    landmarks,
    selected_kind,
    selected_index,
    category_columns,
    active_category,
    gene_columns,
    active_genes,
    color_by,
    landmark_opacity,
  } = lm;
  const genesActive = color_by === "continuous" && (active_genes?.length || 0) > 0;

  const accordion = (
    <Accordion
      className={cn(forceSection && "landmarks-section-solo")}
      {...(forceSection
        ? { type: "single" as const, value: forceSection, collapsible: true }
        : {
            type: "multiple" as const,
            defaultValue: ["selections", "categories", "genes", "landmarks"],
          })}
    >
      <AccordionItem value="selections" className="border-b">
        <AccordionTrigger className={SECTION_TRIGGER}>Selections</AccordionTrigger>
        <AccordionContent className="px-0 pb-2">
          {selections.length ? (
            <ItemGroup className="max-h-40 gap-0.5 overflow-y-auto">
              {selections.map((sel, i) => (
                <LayerRow
                  key={`${sel.id}-${i}`}
                  active={selected_kind === "selection" && selected_index === i}
                  color={SELECTION_COLORS[i % SELECTION_COLORS.length]}
                  swatchVariant="selection"
                  label={sel.id}
                  onSelect={() => lm.select("selection", i)}
                  onRename={(next) => lm.renameSelection(i, next)}
                  onDelete={() => lm.deleteSelection(i)}
                />
              ))}
            </ItemGroup>
          ) : (
            <FieldDescription>No selections yet.</FieldDescription>
          )}
        </AccordionContent>
      </AccordionItem>

      {category_columns.length ? (
        <AccordionItem value="categories" className="border-b">
          <AccordionTrigger className={SECTION_TRIGGER}>Categories</AccordionTrigger>
          <AccordionContent className="px-0 pb-2">
            <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto">
              {category_columns.map((col) => {
                const isShown = !genesActive && col.name === active_category;
                return (
                  <Collapsible key={col.name} className="group/cat">
                    <CollapsibleTrigger
                      className={cn(
                        "landmarks-cat-trigger cursor-pointer text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isShown && "landmarks-cat-trigger--active text-foreground",
                      )}
                      onClick={() => {
                        if (col.name === active_category && !genesActive) {
                          return;
                        }
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
                  </Collapsible>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : null}

      {gene_columns.length ? (
        <AccordionItem value="genes" className="border-b">
          <AccordionTrigger className={SECTION_TRIGGER}>Genes</AccordionTrigger>
          <AccordionContent className="px-0 pb-2">
            <GenesCombobox lm={lm} />
          </AccordionContent>
        </AccordionItem>
      ) : null}

      <AccordionItem value="landmarks" className="border-b-0">
        <AccordionTrigger className={SECTION_TRIGGER}>Landmarks</AccordionTrigger>
        <AccordionContent className="px-0 pb-2">
          {landmarks.length ? (
            <ItemGroup className="max-h-40 gap-0.5 overflow-y-auto">
              {landmarks.map((lmItem, i) => (
                <LayerRow
                  key={`${lmItem.id}-${i}`}
                  active={selected_kind === "landmark" && selected_index === i}
                  color={LANDMARK_COLORS[i % LANDMARK_COLORS.length]}
                  swatchVariant="landmark"
                  swatchFillOpacity={landmark_opacity}
                  label={lmItem.id}
                  hidden={!!lmItem.hidden}
                  onSelect={() => lm.select("landmark", i)}
                  onRename={(next) => lm.renameLandmark(i, next)}
                  onToggleHidden={() => lm.toggleLandmarkHidden(i)}
                  onDelete={() => lm.deleteLandmark(i)}
                />
              ))}
            </ItemGroup>
          ) : (
            <FieldDescription>No landmarks yet.</FieldDescription>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  if (embedded) {
    return (
      <div className={cn("min-h-0 overflow-y-auto py-0", PANEL_INSET)}>
        {accordion}
      </div>
    );
  }

  return (
    <Card className={FLOAT_PANEL}>
      <CardContent className={cn("min-h-0 overflow-y-auto py-0", PANEL_INSET)}>
        {accordion}
      </CardContent>
    </Card>
  );
}
