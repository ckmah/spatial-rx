import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BUFFERABLE, TENSION_TYPES } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { LayersPanel } from "./layers-panel";
import { ControlPanel } from "./control-panel";
import { LAYER_SECTION_IDS, SECTION_META, type PanelSectionId } from "./sections";

export function MobileSectionChrome({
  lm,
  open,
  onOpenChange,
}: {
  lm: LandmarksModel;
  open: PanelSectionId | null;
  onOpenChange: (id: PanelSectionId | null) => void;
}) {
  const selectedLm = lm.selectedLandmark();
  const usesTension = !!selectedLm && TENSION_TYPES.includes(selectedLm.type);
  const usesBuffer = !!selectedLm && BUFFERABLE.includes(selectedLm.type);
  const categoryCount = lm.category_columns.length;
  const geneCount = lm.gene_columns.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeStart, setFadeStart] = useState(false);
  const [fadeEnd, setFadeEnd] = useState(false);

  const sections = useMemo(() => {
    const ids: PanelSectionId[] = ["selections"];
    if (categoryCount) ids.push("categories");
    if (geneCount) ids.push("genes");
    ids.push("landmarks", "inspect", "neighbors");
    if (usesTension || usesBuffer) ids.push("landmark");
    return ids;
  }, [categoryCount, geneCount, usesTension, usesBuffer]);

  useEffect(() => {
    if (open && !sections.includes(open)) onOpenChange(null);
  }, [open, sections, onOpenChange]);

  const syncScrollFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setFadeStart(false);
      setFadeEnd(false);
      return;
    }
    setFadeStart(el.scrollLeft > 1);
    setFadeEnd(el.scrollLeft < max - 1);
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncScrollFades();
    const ro =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => syncScrollFades());
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [sections, syncScrollFades]);

  useLayoutEffect(() => {
    if (!open || !scrollRef.current) return;
    const active = scrollRef.current.querySelector<HTMLElement>(
      `[data-section-id="${open}"]`,
    );
    active?.scrollIntoView({ inline: "nearest", block: "nearest" });
    syncScrollFades();
  }, [open, syncScrollFades]);

  const meta = open ? SECTION_META[open] : null;

  return (
    <div
      className="landmarks__chrome-sections"
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      {open && meta ? (
        <div
          className="landmarks__chrome-sheet landmarks-float landmarks-float--panel"
          role="dialog"
          aria-label={meta.label}
        >
          <div className="landmarks__chrome-sheet-head">
            <span className="text-sm font-medium">{meta.label}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-7 shrink-0 text-muted-foreground"
              aria-label={`Close ${meta.label}`}
              onClick={() => onOpenChange(null)}
            >
              <XIcon className="size-3.5" />
            </Button>
          </div>
          <div className="landmarks__chrome-sheet-body">
            {LAYER_SECTION_IDS.has(open) ? (
              <LayersPanel lm={lm} forceSection={open} embedded />
            ) : (
              <ControlPanel lm={lm} forceSection={open} embedded />
            )}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "landmarks__chrome-section-bar landmarks-float landmarks-float--toolbar",
          fadeStart && "landmarks__chrome-section-bar--fade-start",
          fadeEnd && "landmarks__chrome-section-bar--fade-end",
        )}
      >
        <div
          ref={scrollRef}
          className="landmarks__chrome-section-scroll"
          role="toolbar"
          aria-label="Panel sections"
          onScroll={syncScrollFades}
        >
          {sections.map((id) => {
            const { label } = SECTION_META[id];
            const active = open === id;
            return (
              <Button
                key={id}
                type="button"
                variant="ghost"
                size="sm"
                data-section-id={id}
                aria-pressed={active}
                className={cn(
                  "h-7 shrink-0 rounded-full px-2.5 text-[0.6875rem] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  active && "bg-muted text-foreground",
                )}
                onClick={() => onOpenChange(active ? null : id)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
