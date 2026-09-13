import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { ItemGroup } from "@/components/ui/item";
import { cn } from "@/lib/utils";

import { LANDMARK_COLORS, SELECTION_COLORS } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { LayerRow } from "./primitives";
import { FLOAT_PANEL, FLOAT_PANEL_CLIP, PANEL_INSET, SECTION_LABEL } from "./sections";

/** Left dock: selections + landmarks only. */
export function LayersPanel({ lm }: { lm: LandmarksModel }) {
  const { selections, landmarks, selected_kind, selected_index } = lm;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMenuContainer(
      (rootRef.current?.closest(
        ".spatial-rx-widget, .landmarks",
      ) as HTMLElement | null) ?? null,
    );
  }, []);

  return (
    <div ref={rootRef} className="landmarks__layers-panel">
      <Card className={FLOAT_PANEL}>
        <div className={FLOAT_PANEL_CLIP}>
        <CardContent
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain",
            PANEL_INSET,
          )}
        >
          <section className="pb-2">
            <h3 className={SECTION_LABEL}>Selections</h3>
            {selections.length ? (
              <ItemGroup className="gap-0.5">
                {selections.map((sel, i) => (
                  <LayerRow
                    key={`${sel.id}-${i}`}
                    active={
                      selected_kind === "selection" && selected_index === i
                    }
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
          </section>

          <section className="pb-1.5 pt-1">
            <h3 className={SECTION_LABEL}>Landmarks</h3>
            {landmarks.length ? (
              <ItemGroup className="gap-0.5">
                {landmarks.map((lmItem, i) => (
                  <LayerRow
                    key={`${lmItem.id}-${i}`}
                    active={
                      selected_kind === "landmark" && selected_index === i
                    }
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
          </section>
        </CardContent>
        </div>
      </Card>
    </div>
  );
}
