import { useEffect, useRef, useState } from "react";
import {
  ArrowUpFromLineIcon,
  LockIcon,
  LockOpenIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { ItemGroup } from "@/components/ui/item";
import { cn } from "@/lib/utils";

import { LANDMARK_COLORS, SELECTION_COLORS } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { LayerRow, ToolbarDivider, chromeHitClass } from "./primitives";
import { FLOAT_PANEL, FLOAT_PANEL_CLIP, SECTION_LABEL } from "./sections";

/** Left dock: selections + landmarks only. Overlay-scrolls when lists overflow. */
export function LayersPanel({ lm }: { lm: LandmarksModel }) {
  const { selections, landmarks, selected_kind, selected_index } = lm;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);
  const [multi, setMulti] = useState<number[]>([]);

  useEffect(() => {
    setMenuContainer(
      (rootRef.current?.closest(
        ".spatial-rx-widget, .landmarks",
      ) as HTMLElement | null) ?? null,
    );
  }, []);

  useEffect(() => {
    if (selected_kind === "landmark" && selected_index >= 0) {
      setMulti((prev) =>
        prev.includes(selected_index) ? prev : [selected_index],
      );
    } else if (selected_kind !== "landmark") {
      setMulti([]);
    }
  }, [selected_kind, selected_index]);

  const onLandmarkSelect = (i: number, e?: React.MouseEvent) => {
    if (e?.shiftKey && selected_kind === "landmark" && selected_index >= 0) {
      setMulti((prev) => {
        const set = new Set(prev.length ? prev : [selected_index]);
        if (set.has(i)) set.delete(i);
        else set.add(i);
        const next = [...set].sort((a, b) => a - b);
        return next.length ? next : [i];
      });
      lm.select("landmark", i);
      return;
    }
    setMulti([i]);
    lm.select("landmark", i);
  };

  const batch = multi.length > 1 ? multi : selected_kind === "landmark" && selected_index >= 0
    ? [selected_index]
    : [];

  return (
    <div
      ref={rootRef}
      className="landmarks__layers-panel flex h-full min-h-0 flex-1 flex-col"
    >
      <Card className={cn(FLOAT_PANEL, "flex h-full min-h-0 flex-1 flex-col")}>
        <div className={cn(FLOAT_PANEL_CLIP, "flex h-full min-h-0 flex-1 flex-col")}>
          <div
            className={cn(
              "py-1.5",
              "landmarks-overlay-scroll min-h-0 flex-1",
            )}
          >
            <section>
              <div className="flex items-center justify-between gap-1 pr-1">
                <h3 className={SECTION_LABEL}>Selections</h3>
                {selected_kind === "selection" && selected_index >= 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className={chromeHitClass}
                    data-testid="selection-to-landmark"
                    aria-label="Convert selection to landmark"
                    title="Convert selection to landmark"
                    onClick={(e) => {
                      e.stopPropagation();
                      lm.selectionToLandmark();
                    }}
                  >
                    <ArrowUpFromLineIcon className="size-3.5" />
                  </Button>
                ) : null}
              </div>
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

            <section className="pt-1">
              <div className="flex items-center justify-between gap-1 pr-1">
                <h3 className={SECTION_LABEL}>Landmarks</h3>
                {batch.length > 0 ? (
                  <div className="flex items-center gap-0.5">
                    {batch.length === 1 ? (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className={chromeHitClass}
                          data-testid="landmark-lock-toggle"
                          aria-label={
                            landmarks[batch[0]]?.locked
                              ? "Unlock landmark"
                              : "Lock landmark"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            lm.toggleLandmarkLocked(batch[0]);
                          }}
                        >
                          {landmarks[batch[0]]?.locked ? (
                            <LockIcon className="size-3.5" />
                          ) : (
                            <LockOpenIcon className="size-3.5" />
                          )}
                        </Button>
                        {batch[0] > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className={chromeHitClass}
                            data-testid="landmark-reorder-up"
                            aria-label="Move landmark up"
                            onClick={(e) => {
                              e.stopPropagation();
                              lm.reorderLandmark(batch[0], batch[0] - 1);
                            }}
                          >
                            <span className="text-[10px] font-semibold">↑</span>
                          </Button>
                        ) : null}
                        {batch[0] < landmarks.length - 1 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className={chromeHitClass}
                            data-testid="landmark-reorder-down"
                            aria-label="Move landmark down"
                            onClick={(e) => {
                              e.stopPropagation();
                              lm.reorderLandmark(batch[0], batch[0] + 1);
                            }}
                          >
                            <span className="text-[10px] font-semibold">↓</span>
                          </Button>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <ToolbarDivider />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className={chromeHitClass}
                          data-testid="landmark-batch-hide"
                          aria-label="Hide selected landmarks"
                          onClick={(e) => {
                            e.stopPropagation();
                            lm.patchLandmarks(batch, { hidden: true });
                          }}
                        >
                          <span className="text-[10px]">Hide</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className={cn(chromeHitClass, "text-destructive")}
                          data-testid="landmark-batch-delete"
                          aria-label="Delete selected landmarks"
                          onClick={(e) => {
                            e.stopPropagation();
                            lm.deleteLandmarks(batch);
                            setMulti([]);
                          }}
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                ) : null}
              </div>
              {landmarks.length ? (
                <ItemGroup className="gap-0.5">
                  {landmarks.map((lmItem, i) => (
                    <LayerRow
                      key={`${lmItem.id}-${i}`}
                      active={
                        (selected_kind === "landmark" &&
                          selected_index === i) ||
                        multi.includes(i)
                      }
                      color={
                        (typeof lmItem.color === "string" && lmItem.color) ||
                        LANDMARK_COLORS[i % LANDMARK_COLORS.length]
                      }
                      swatchVariant="landmark"
                      swatchFillOpacity={0.28}
                      label={
                        lmItem.locked
                          ? `${lmItem.id} (locked)`
                          : String(lmItem.id)
                      }
                      hidden={!!lmItem.hidden}
                      menuContainer={menuContainer}
                      onSelect={(e) => onLandmarkSelect(i, e)}
                      onRename={(next) => lm.renameLandmark(i, next)}
                      onToggleHidden={() => lm.toggleLandmarkHidden(i)}
                      onDelete={() => lm.deleteLandmark(i)}
                    />
                  ))}
                </ItemGroup>
              ) : (
                <FieldDescription>No landmarks yet.</FieldDescription>
              )}
              {landmarks.length > 1 ? (
                <FieldDescription className="pt-1">
                  Shift-click to multi-select.
                </FieldDescription>
              ) : null}
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}
