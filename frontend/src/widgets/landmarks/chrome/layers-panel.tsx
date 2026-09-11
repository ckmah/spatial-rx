import { useEffect, useRef, useState } from "react";
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
import { RasterSection } from "./raster-section";
import {
  PANEL_INSET,
  SECTION_TRIGGER,
  SECTION_CONTENT,
  FLOAT_PANEL,
} from "./sections";
import { ChevronRightIcon } from "lucide-react";

export function LayersPanel({
  lm,
}: {
  lm: LandmarksModel;
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
  } = lm;
  const genesActive = color_by === "continuous" && (active_genes?.length || 0) > 0;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMenuContainer(
      (rootRef.current?.closest(
        ".spatial-rx-widget, .landmarks",
      ) as HTMLElement | null) ?? null,
    );
  }, []);

  const accordion = (
    <Accordion
      type="multiple"
      defaultValue={["raster", "categories", "genes", "selections", "landmarks"]}
    >
      <AccordionItem value="raster" className="border-b">
        <AccordionTrigger className={SECTION_TRIGGER}>Raster</AccordionTrigger>
        <AccordionContent className={SECTION_CONTENT}>
          <RasterSection lm={lm} />
        </AccordionContent>
      </AccordionItem>

      {category_columns.length ? (
        <AccordionItem value="categories" className="border-b">
          <AccordionTrigger className={SECTION_TRIGGER}>Categories</AccordionTrigger>
          <AccordionContent className={SECTION_CONTENT}>
            <div className="flex flex-col gap-0.5">
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

      <AccordionItem value="genes" className="border-b">
        <AccordionTrigger className={SECTION_TRIGGER}>Genes</AccordionTrigger>
        <AccordionContent className={SECTION_CONTENT}>
          {gene_columns.length ? (
            <GenesCombobox lm={lm} />
          ) : (
            <FieldDescription>
              No genes loaded. Pass genes=… to LandmarksWidget (default: all
              var names) or call set_expression.
            </FieldDescription>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="selections" className="border-b">
        <AccordionTrigger className={SECTION_TRIGGER}>Selections</AccordionTrigger>
        <AccordionContent className={SECTION_CONTENT}>
          {selections.length ? (
            <ItemGroup className="gap-0.5">
              {selections.map((sel, i) => (
                <LayerRow
                  key={`${sel.id}-${i}`}
                  active={selected_kind === "selection" && selected_index === i}
                  color={SELECTION_COLORS[i % SELECTION_COLORS.length]}
                  swatchVariant="selection"
                  label={sel.id}
                  hidden={!!sel.hidden}
                  menuContainer={menuContainer}
                  onSelect={() => lm.select("selection", i)}
                  onRename={(next) => lm.renameSelection(i, next)}
                  onToggleHidden={() => lm.toggleSelectionHidden(i)}
                  onDelete={() => lm.deleteSelection(i)}
                />
              ))}
            </ItemGroup>
          ) : (
            <FieldDescription>No selections yet.</FieldDescription>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="landmarks" className="border-b-0">
        <AccordionTrigger className={SECTION_TRIGGER}>Landmarks</AccordionTrigger>
        <AccordionContent className={SECTION_CONTENT}>
          {landmarks.length ? (
            <ItemGroup className="gap-0.5">
              {landmarks.map((lmItem, i) => (
                <LayerRow
                  key={`${lmItem.id}-${i}`}
                  active={selected_kind === "landmark" && selected_index === i}
                  color={
                    (typeof lmItem.color === "string" && lmItem.color) ||
                    LANDMARK_COLORS[i % LANDMARK_COLORS.length]
                  }
                  swatchVariant="landmark"
                  swatchFillOpacity={0.28}
                  label={lmItem.id}
                  hidden={!!lmItem.hidden}
                  menuContainer={menuContainer}
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

  return (
    <div ref={rootRef} className="landmarks__layers-panel">
      <Card className={FLOAT_PANEL}>
        <CardContent
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain",
            PANEL_INSET,
          )}
        >
          {accordion}
        </CardContent>
      </Card>
    </div>
  );
}
