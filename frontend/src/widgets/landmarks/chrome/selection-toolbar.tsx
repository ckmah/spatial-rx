import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftRightIcon,
  CircleDotDashedIcon,
  CirclePlusIcon,
  GitCommitHorizontal,
  WaypointsIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  BUFFERABLE,
  LANDMARK_COLORS,
  TENSION_TYPES,
  formatParam,
  maxBufferWidth,
} from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { ChromeTooltip, ToolbarDivider, chromeHitClass, chromeHitOnClass } from "./primitives";

const toggleHitClass =
  "size-8 min-w-8 rounded-full border-0 px-0 text-muted-foreground shadow-none hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none data-[spacing=1]:rounded-full";

function IconBtn({
  title,
  active,
  onClick,
  onMouseEnter,
  disabled,
  children,
  testId,
  expandable,
}: {
  title: string;
  active?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  testId?: string;
  /** Show a small dropdown chevron (L2 / expandable control). */
  expandable?: boolean;
}) {
  return (
    <ChromeTooltip label={title}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={title}
        aria-pressed={active || false}
        disabled={disabled}
        data-testid={testId}
        className={cn(
          chromeHitClass,
          expandable && "w-auto gap-0.5 px-1.5",
          active && chromeHitOnClass,
          disabled && "opacity-40",
        )}
        onMouseEnter={onMouseEnter}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {children}
        {expandable ? (
          <ChevronDownIcon
            aria-hidden
            className={cn(
              "size-2.5 shrink-0 opacity-70 transition-transform",
              active && "rotate-180",
            )}
          />
        ) : null}
      </Button>
    </ChromeTooltip>
  );
}

function ColorControl({
  color,
  onChange,
}: {
  color: string;
  onChange: (hex: string) => void;
}) {
  const isCustom = !LANDMARK_COLORS.some(
    (c) => c.toLowerCase() === color.toLowerCase(),
  );
  return (
    <div className="flex items-center gap-1" data-testid="context-color-swatches">
      {LANDMARK_COLORS.map((c) => {
        const on = c.toLowerCase() === color.toLowerCase();
        return (
          <button
            key={c}
            type="button"
            title={c}
            aria-label={`Color ${c}`}
            onClick={(e) => {
              e.stopPropagation();
              onChange(c);
            }}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full",
              on
                ? "bg-foreground text-background"
                : "hover:bg-muted/70",
            )}
          >
            <span
              className={cn(
                "size-4 rounded-full border",
                on ? "border-2 border-background" : "border-border",
              )}
              style={{ background: c }}
            />
          </button>
        );
      })}
      <label
        title="Custom color"
        className={cn(
          "relative inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full",
          isCustom
            ? "bg-foreground text-background"
            : "hover:bg-muted/70",
        )}
      >
        <span
          className={cn(
            "flex size-4 items-center justify-center overflow-hidden rounded-full text-[10px] font-semibold",
            isCustom
              ? "border-2 border-background text-background"
              : "border border-dashed border-border bg-muted text-muted-foreground",
          )}
          style={isCustom ? { background: color } : undefined}
        >
          {!isCustom ? "+" : null}
        </span>
        <input
          type="color"
          value={color}
          aria-label="Custom landmark color"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </label>
    </div>
  );
}

function InlineSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  testId,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  testId?: string;
}) {
  return (
    <div
      className="flex min-w-[200px] items-center gap-2 px-0.5"
      data-testid={testId}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const dir = e.deltaY > 0 ? -1 : 1;
        const next = Math.min(max, Math.max(min, value + dir * step));
        if (next !== value) onChange(Math.round(next * 1000) / 1000);
      }}
      title="Scroll to adjust"
    >
      <span className="shrink-0 text-[0.6875rem] text-muted-foreground">
        {label}
      </span>
      <div className="landmarks-slider-control min-w-[140px] flex-1">
        <span className="landmarks-slider-value" aria-hidden>
          {formatParam(value, "0")}
        </span>
        <Slider
          min={min}
          max={max}
          step={step}
          value={[Math.min(Math.max(value, min), max)]}
          onValueChange={(v) => onChange(v[0] ?? value)}
          aria-label={label}
          className="w-full"
        />
      </div>
    </div>
  );
}

const pillClass =
  "landmarks-float landmarks-float--toolbar pointer-events-auto flex min-h-10 items-center gap-1 px-1.5 py-1 text-card-foreground";

/**
 * Sticky bottom-center context chrome (mirrors Topbar). L2 stacks above L1.
 */
export function SelectionToolbar({ lm }: { lm: LandmarksModel }) {
  const kind = lm.selected_kind;
  const index = lm.selected_index;
  const isLandmark = kind === "landmark" && index >= 0;
  const isHood = (kind === "selection" || kind === "type") && index >= 0;
  const selectedLm = isLandmark ? lm.selectedLandmark() : null;
  const hood = isHood ? lm.activeNeighborhood() : null;
  const usesBuffer = !!selectedLm && BUFFERABLE.includes(selectedLm.type);
  const usesTension = !!selectedLm && TENSION_TYPES.includes(selectedLm.type);
  const showLandmarkBar = isLandmark && (usesBuffer || usesTension || !!selectedLm);
  const showHoodBar = isHood && !!hood;

  const [lmL2, setLmL2] = useState<"width" | "color" | "tension">("width");
  const leaveTimer = useRef<number | null>(null);
  const openTimer = useRef<number | null>(null);

  useEffect(() => {
    setLmL2("width");
  }, [kind, index]);

  useEffect(
    () => () => {
      if (leaveTimer.current != null) window.clearTimeout(leaveTimer.current);
      if (openTimer.current != null) window.clearTimeout(openTimer.current);
    },
    [],
  );

  const clearLeave = () => {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };
  const clearOpen = () => {
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  };
  const showL2 = (next: "width" | "color" | "tension") => {
    clearLeave();
    clearOpen();
    setLmL2(next);
  };
  /** Hover peek — match tooltip / dropdown open delay. */
  const scheduleShowL2 = (next: "width" | "color" | "tension") => {
    clearLeave();
    if (lmL2 === next) return;
    clearOpen();
    openTimer.current = window.setTimeout(() => setLmL2(next), 400);
  };
  const scheduleWidth = () => {
    clearOpen();
    clearLeave();
    leaveTimer.current = window.setTimeout(() => setLmL2("width"), 160);
  };

  if (!showLandmarkBar && !showHoodBar) return null;

  const color =
    (typeof selectedLm?.color === "string" && selectedLm.color) ||
    LANDMARK_COLORS[Math.max(0, index) % LANDMARK_COLORS.length];
  const lineStyle =
    String(selectedLm?.line_style || "solid") === "dashed" ? "dashed" : "solid";
  const bufferSide = (selectedLm?.buffer_side as string) || "both";
  const bufMax = Math.max(maxBufferWidth(lm.x_bounds, lm.y_bounds), 1);
  const bufferWidth = Math.min(Number(selectedLm?.buffer_width || 0), bufMax);
  const rMax = lm.neighbor_radius_max > 0 ? lm.neighbor_radius_max : bufMax;
  const kMax = Math.max(1, lm.neighbor_k_max || 64);
  const hoodMode = hood?.neighborhood || "off";
  const canPromote = hoodMode === "radius" || hoodMode === "knn";

  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={0}>
    <div
      className="landmarks__chrome-context"
      data-testid="context-selection-toolbar"
      data-placement="dock"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="pointer-events-none flex flex-col items-center gap-1.5"
        onMouseLeave={scheduleWidth}
        onMouseEnter={clearLeave}
      >
        {showLandmarkBar && lmL2 === "color" ? (
          <div className={pillClass} onMouseEnter={() => showL2("color")}>
            <ColorControl
              color={color}
              onChange={(next) => lm.patchLandmark({ color: next })}
            />
          </div>
        ) : null}

        {showLandmarkBar && lmL2 === "width" && usesBuffer ? (
          <div className={pillClass} onMouseEnter={() => showL2("width")}>
            <InlineSlider
              label="Width"
              value={bufferWidth}
              min={0}
              max={bufMax}
              step={bufMax / 200 || 1}
              testId="context-buffer-width"
              onChange={(buffer_width) => lm.patchLandmark({ buffer_width })}
            />
          </div>
        ) : null}

        {showLandmarkBar && lmL2 === "tension" && usesTension ? (
          <div className={pillClass} onMouseEnter={() => showL2("tension")}>
            <InlineSlider
              label="Tension"
              value={Number(selectedLm?.tension ?? 0)}
              min={0}
              max={1}
              step={0.01}
              testId="context-tension"
              onChange={(tension) => lm.patchLandmark({ tension })}
            />
          </div>
        ) : null}

        {showHoodBar && hoodMode !== "off" ? (
          <div className={pillClass}>
            {hoodMode === "radius" ? (
              <InlineSlider
                label="r"
                value={Math.min(Number(hood?.neighborhood_radius || 0), rMax)}
                min={0}
                max={rMax}
                step={rMax / 200 || 1}
                testId="context-hood-radius"
                onChange={(neighborhood_radius) =>
                  lm.patchNeighborhood({
                    neighborhood: "radius",
                    neighborhood_radius,
                  })
                }
              />
            ) : (
              <InlineSlider
                label="k"
                value={Math.min(Number(hood?.neighborhood_k || 12), kMax)}
                min={1}
                max={kMax}
                step={1}
                testId="context-hood-k"
                onChange={(neighborhood_k) =>
                  lm.patchNeighborhood({
                    neighborhood: "knn",
                    neighborhood_k,
                  })
                }
              />
            )}
            <ToolbarDivider />
            <IconBtn
              title="Make selection"
              testId="promote-neighborhood"
              disabled={!canPromote}
              onClick={() => {
                if (canPromote) lm.promoteNeighborhoodToSelection();
              }}
            >
              <CirclePlusIcon className="size-4" />
            </IconBtn>
          </div>
        ) : null}

        <div className={pillClass} data-testid="context-toolbar-l1">
          {showLandmarkBar ? (
            <>
              <div className="flex items-center gap-1">
              <IconBtn
                title={
                  lineStyle === "solid"
                    ? "Line style: solid (click for dashed)"
                    : "Line style: dashed (click for solid)"
                }
                testId="context-line-style"
                onClick={() =>
                  lm.patchLandmark({
                    line_style: lineStyle === "solid" ? "dashed" : "solid",
                  })
                }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <line
                    x1="2"
                    y1="8"
                    x2="14"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={lineStyle === "dashed" ? "3.5 2.5" : undefined}
                  />
                </svg>
              </IconBtn>
              <IconBtn
                title="Color"
                testId="context-color-toggle"
                active={lmL2 === "color"}
                expandable
                onMouseEnter={() => scheduleShowL2("color")}
                onClick={() =>
                  showL2(lmL2 === "color" ? "width" : "color")
                }
              >
                <span
                  className="size-4 rounded-full border border-border"
                  style={{ background: color }}
                />
              </IconBtn>
              {usesTension ? (
                <IconBtn
                  title="Tension"
                  testId="context-tension-toggle"
                  active={lmL2 === "tension"}
                  expandable
                  onMouseEnter={() => scheduleShowL2("tension")}
                  onClick={() =>
                    showL2(lmL2 === "tension" ? "width" : "tension")
                  }
                >
                  <span className="inline-flex size-full items-center justify-center">
                    <GitCommitHorizontal className="size-4" />
                  </span>
                </IconBtn>
              ) : null}
              </div>
              {usesBuffer ? (
                <>
                  <ToolbarDivider />
                  <ToggleGroup
                    type="single"
                    variant="default"
                    size="sm"
                    spacing={1}
                    value={bufferSide}
                    className="gap-1"
                    onValueChange={(next) => {
                      if (!next) return;
                      lm.patchLandmark({ buffer_side: next });
                      setLmL2("width");
                    }}
                    onMouseEnter={() => scheduleShowL2("width")}
                  >
                    {(
                      [
                        {
                          id: "left",
                          label: "Left",
                          Icon: ChevronLeftIcon,
                        },
                        {
                          id: "both",
                          label: "Both",
                          Icon: ChevronsLeftRightIcon,
                        },
                        {
                          id: "right",
                          label: "Right",
                          Icon: ChevronRightIcon,
                        },
                      ] as const
                    ).map((side) => (
                      <ToggleGroupItem
                        key={side.id}
                        value={side.id}
                        aria-label={`Buffer ${side.label}`}
                        data-testid={`context-buffer-${side.id}`}
                        className={toggleHitClass}
                      >
                        <ChromeTooltip label={`Buffer ${side.label}`}>
                          <span className="inline-flex size-full items-center justify-center">
                            <side.Icon className="size-4" />
                          </span>
                        </ChromeTooltip>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </>
              ) : null}
            </>
          ) : null}

          {showHoodBar ? (
            <ToggleGroup
              type="single"
              variant="default"
              size="sm"
              spacing={1}
              value={hoodMode === "off" ? undefined : hoodMode}
              className="gap-1"
              onValueChange={(next) => {
                lm.patchNeighborhood({
                  neighborhood: next || "off",
                });
              }}
            >
              <ToggleGroupItem
                value="radius"
                aria-label="Radius neighborhood"
                data-testid="context-hood-radius-mode"
                className={cn(toggleHitClass, "w-auto gap-0.5 px-1.5")}
              >
                <ChromeTooltip label="Radius neighborhood">
                  <span className="inline-flex items-center gap-0.5">
                    <CircleDotDashedIcon className="size-4" />
                    <ChevronDownIcon className="size-2.5 opacity-70" />
                  </span>
                </ChromeTooltip>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="knn"
                aria-label="k-NN neighborhood"
                data-testid="context-hood-knn-mode"
                className={cn(toggleHitClass, "w-auto gap-0.5 px-1.5")}
              >
                <ChromeTooltip label="k-NN neighborhood">
                  <span className="inline-flex items-center gap-0.5">
                    <WaypointsIcon className="size-4" />
                    <ChevronDownIcon className="size-2.5 opacity-70" />
                  </span>
                </ChromeTooltip>
              </ToggleGroupItem>
            </ToggleGroup>
          ) : null}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
