import { useState } from "react";
import {
  ChevronRightIcon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LassoIcon,
  MaximizeIcon,
  MinusIcon,
  MoveIcon,
  PentagonIcon,
  PlusIcon,
  ShapesIcon,
  SplineIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import {
  BUFFERABLE,
  LANDMARK_COLORS,
  LANDMARK_MODE_IDS,
  MODE_LABELS,
  SELECT_MODE_IDS,
  SELECTION_COLORS,
  TENSION_TYPES,
  formatParam,
  maxBufferWidth,
} from "./helpers";
import type { LandmarksModel } from "./use-landmarks-model";

const MODE_ICONS: Record<string, typeof MoveIcon> = {
  select: MoveIcon,
  lasso: LassoIcon,
  polygon: PentagonIcon,
  rectangle: SquareIcon,
  ellipse: CircleIcon,
  point: CircleIcon,
  line: MinusIcon,
  spline: SplineIcon,
  shape: ShapesIcon,
};

function ModeToggle({
  modes,
  value,
  onChange,
}: {
  modes: string[];
  value: string;
  onChange: (mode: string) => void;
}) {
  if (!modes.length) return null;
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      spacing={0}
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      {modes.map((mode) => {
        const Icon = MODE_ICONS[mode] ?? ShapesIcon;
        const label = MODE_LABELS[mode] ?? mode;
        return (
          <ToggleGroupItem
            key={mode}
            value={mode}
            title={label}
            aria-label={label}
            className="size-6 min-w-6 px-0"
          >
            <Icon />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

function ColorSwatch({ color, className }: { color: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 shrink-0 rounded-full ring-1 ring-border",
        className,
      )}
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

/** Filled = active coloring column; open = inactive. Same size as category value dots. */
function CategoryStatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 shrink-0 rounded-full border border-foreground",
        active ? "bg-foreground" : "bg-transparent",
      )}
      aria-hidden
    />
  );
}

export function Topbar({
  modes,
  mode,
  onMode,
}: {
  modes: string[];
  mode: string;
  onMode: (mode: string) => void;
}) {
  const selectModes = modes.filter((m) => SELECT_MODE_IDS.includes(m));
  const landmarkModes = modes.filter((m) => LANDMARK_MODE_IDS.includes(m));
  return (
    <div
      className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground"
      role="toolbar"
      aria-label="Drawing tools"
    >
      {selectModes.length ? (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">Select</span>
          <ModeToggle modes={selectModes} value={mode} onChange={onMode} />
        </div>
      ) : null}
      {selectModes.length && landmarkModes.length ? (
        <Separator orientation="vertical" className="h-5" />
      ) : null}
      {landmarkModes.length ? (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium">Landmarks</span>
          <ModeToggle modes={landmarkModes} value={mode} onChange={onMode} />
        </div>
      ) : null}
    </div>
  );
}

function LayerRow({
  active,
  color,
  label,
  hidden,
  onSelect,
  onRename,
  onDelete,
  onToggleHidden,
}: {
  active: boolean;
  color?: string;
  label: string;
  hidden?: boolean;
  onSelect: () => void;
  onRename?: (next: string) => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  return (
    <Item
      variant={active ? "muted" : "default"}
      size="sm"
      className={cn(
        "w-full min-w-0 cursor-pointer flex-nowrap gap-1 px-0 py-0.5",
        active && "border-ring ring-[3px] ring-ring/35",
        hidden && "opacity-50",
      )}
      onClick={onSelect}
    >
      {onToggleHidden ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={hidden ? "Show landmark" : "Hide landmark"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleHidden();
          }}
        >
          {hidden ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      ) : null}
      {color ? <ColorSwatch color={color} /> : null}
      <ItemContent className="min-w-0 gap-0">
        {editing && onRename ? (
          <Input
            aria-label="Rename layer"
            value={draft}
            className="h-6 text-xs"
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              onRename(draft);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                e.preventDefault();
                onRename(draft);
                setEditing(false);
              } else if (e.key === "Escape") {
                e.preventDefault();
                setDraft(label);
                setEditing(false);
              }
            }}
          />
        ) : (
          <ItemTitle
            className="max-w-full truncate text-xs font-normal text-foreground"
            title={onRename ? "Double-click to rename" : label}
            onDoubleClick={(e) => {
              if (!onRename) return;
              e.preventDefault();
              e.stopPropagation();
              setDraft(label);
              setEditing(true);
            }}
          >
            {label}
          </ItemTitle>
        )}
      </ItemContent>
      {onDelete ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <XIcon />
        </Button>
      ) : null}
    </Item>
  );
}

/** Shared inset for panel title, section triggers, and content. */
const PANEL_INSET = "px-3";

export function LayersPanel({ lm }: { lm: LandmarksModel }) {
  const {
    selections,
    landmarks,
    selected_kind,
    selected_index,
    category_columns,
    active_category,
  } = lm;

  return (
    <Card className="pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md">
      <CardHeader className={cn("shrink-0 py-0", PANEL_INSET)}>
        <CardTitle className="text-sm font-semibold tracking-tight">Layers</CardTitle>
      </CardHeader>
      <CardContent className={cn("min-h-0 overflow-hidden pb-2", PANEL_INSET)}>
        <Accordion type="multiple" defaultValue={["selections", "categories", "landmarks"]}>
          <AccordionItem value="selections" className="border-b">
            <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
              Selections
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-2">
              {selections.length ? (
                <ScrollArea className="h-40">
                  <ItemGroup className="gap-0.5">
                    {selections.map((sel, i) => (
                      <LayerRow
                        key={`${sel.id}-${i}`}
                        active={selected_kind === "selection" && selected_index === i}
                        color={SELECTION_COLORS[i % SELECTION_COLORS.length]}
                        label={sel.id}
                        onSelect={() => lm.select("selection", i)}
                        onRename={(next) => lm.renameSelection(i, next)}
                        onDelete={() => lm.deleteSelection(i)}
                      />
                    ))}
                  </ItemGroup>
                </ScrollArea>
              ) : (
                <FieldDescription>No selections yet.</FieldDescription>
              )}
            </AccordionContent>
          </AccordionItem>

          {category_columns.length ? (
            <AccordionItem value="categories" className="border-b">
              <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
                Categories
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-2">
                <ScrollArea className="h-48">
                  <div className="flex flex-col gap-0.5">
                    {category_columns.map((col) => {
                      const isShown = col.name === active_category;
                      return (
                        <Collapsible key={col.name} className="group/cat">
                          <CollapsibleTrigger
                            className={cn(
                              "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                              isShown && "text-foreground",
                            )}
                            onClick={() => {
                              if (col.name === active_category) return;
                              lm.setActiveCategory(col);
                              lm.select("", -1);
                            }}
                          >
                            <ChevronRightIcon className="size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" />
                            <CategoryStatusDot active={isShown} />
                            <span className="min-w-0 flex-1 truncate">{col.name}</span>
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
                                    ] || "#888888"
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
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          ) : null}

          <AccordionItem value="landmarks" className="border-b-0">
            <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
              Landmarks
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-2">
              {landmarks.length ? (
                <ScrollArea className="h-40">
                  <ItemGroup className="gap-0.5">
                    {landmarks.map((lmItem, i) => (
                      <LayerRow
                        key={`${lmItem.id}-${i}`}
                        active={selected_kind === "landmark" && selected_index === i}
                        color={LANDMARK_COLORS[i % LANDMARK_COLORS.length]}
                        label={lmItem.id}
                        hidden={!!lmItem.hidden}
                        onSelect={() => lm.select("landmark", i)}
                        onRename={(next) => lm.renameLandmark(i, next)}
                        onToggleHidden={() => lm.toggleLandmarkHidden(i)}
                        onDelete={() => lm.deleteLandmark(i)}
                      />
                    ))}
                  </ItemGroup>
                </ScrollArea>
              ) : (
                <FieldDescription>No landmarks yet.</FieldDescription>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function ToolsPanel({ lm }: { lm: LandmarksModel }) {
  const {
    default_tension,
    neighbor_radius_max,
    neighbor_k_max,
    x_bounds,
    y_bounds,
  } = lm;

  const selectedLm = lm.selectedLandmark();
  const usesTension = !!selectedLm && TENSION_TYPES.includes(selectedLm.type);
  const usesBuffer = !!selectedLm && BUFFERABLE.includes(selectedLm.type);
  const hood = lm.activeNeighborhood();
  const usesHood = !!hood;
  const bufMax = Math.max(maxBufferWidth(x_bounds, y_bounds), 1);
  // Match engine maxNeighborhoodRadius: trait max when set, else buffer heuristic.
  const rMax = neighbor_radius_max > 0 ? neighbor_radius_max : bufMax;
  const kMax = Math.max(1, neighbor_k_max || 64);
  const radiusValue = Math.min(Number(hood?.neighborhood_radius || 0), rMax);

  return (
    <Card className="pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md">
      <CardHeader className={cn("shrink-0 py-0", PANEL_INSET)}>
        <CardTitle className="text-sm font-semibold tracking-tight">Tools</CardTitle>
      </CardHeader>
      <CardContent className={cn("min-h-0 overflow-hidden pb-2", PANEL_INSET)}>
        <Accordion
          type="multiple"
          defaultValue={["neighbors", "landmark"]}
        >
          <AccordionItem value="neighbors" className="border-b">
            <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
              Neighbors
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-2">
              <ScrollArea className="h-48">
                <FieldGroup className="gap-2">
                  {usesHood ? (
                    <>
                      <FieldDescription>
                        {hood.id ? String(hood.id) : "Selection"}
                      </FieldDescription>
                      <div className="flex flex-wrap gap-3 text-muted-foreground text-xs">
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" />
                          seed
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ColorSwatch color="#00e5cc" />
                          neighborhood
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" />
                          other
                        </span>
                      </div>
                      <Field>
                        <FieldLabel>Neighborhood</FieldLabel>
                        <ToggleGroup
                          type="single"
                          variant="outline"
                          size="sm"
                          spacing={0}
                          value={hood.neighborhood || "off"}
                          onValueChange={(next) => {
                            if (!next) return;
                            lm.patchNeighborhood({ neighborhood: next });
                          }}
                        >
                          <ToggleGroupItem value="off">Off</ToggleGroupItem>
                          <ToggleGroupItem value="radius">Radius</ToggleGroupItem>
                          <ToggleGroupItem value="knn">k-NN</ToggleGroupItem>
                        </ToggleGroup>
                      </Field>
                      {hood.neighborhood === "radius" ? (
                        <Field>
                          <FieldLabel>Radius</FieldLabel>
                          <Slider
                            min={0}
                            max={rMax}
                            step={rMax / 200 || 1}
                            value={[radiusValue]}
                            onValueChange={(v) => {
                              const next = Math.min(Math.max(v[0] ?? 0, 0), rMax);
                              lm.patchNeighborhood({
                                neighborhood: "radius",
                                neighborhood_radius: next,
                              });
                            }}
                          />
                          <FieldDescription>
                            {formatParam(radiusValue, "0")}
                            {rMax > 0 ? ` / ${formatParam(rMax, "0")}` : ""}
                          </FieldDescription>
                        </Field>
                      ) : null}
                      {hood.neighborhood === "knn" ? (
                        <Field>
                          <FieldLabel>k</FieldLabel>
                          <Slider
                            min={1}
                            max={kMax}
                            step={1}
                            value={[
                              Math.min(Number(hood.neighborhood_k || 12), kMax),
                            ]}
                            onValueChange={(v) =>
                              lm.patchNeighborhood({
                                neighborhood: "knn",
                                neighborhood_k: v[0] ?? 12,
                              })
                            }
                          />
                          <FieldDescription>
                            {String(
                              Math.min(Number(hood.neighborhood_k || 12), kMax),
                            )}
                          </FieldDescription>
                        </Field>
                      ) : null}
                      <FieldDescription>
                        Shift+wheel sizes the neighborhood.
                      </FieldDescription>
                    </>
                  ) : (
                    <FieldDescription>
                      Select a type or selection to edit neighbors.
                    </FieldDescription>
                  )}
                </FieldGroup>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>

          {usesTension || usesBuffer ? (
            <AccordionItem value="landmark" className="border-b-0">
              <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
                Landmark
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-2">
                <ScrollArea className="h-40">
                  <FieldGroup className="gap-2">
                    {usesTension ? (
                      <Field>
                        <FieldLabel>Tension</FieldLabel>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          value={[
                            Number(selectedLm?.tension ?? default_tension ?? 0),
                          ]}
                          onValueChange={(v) =>
                            lm.patchLandmark({ tension: v[0] ?? 0 })
                          }
                        />
                        <FieldDescription>
                          {Number(
                            selectedLm?.tension ?? default_tension ?? 0,
                          ).toPrecision(3)}
                          . 0 = smooth, 1 = straight.
                        </FieldDescription>
                      </Field>
                    ) : null}
                    {usesBuffer ? (
                      <>
                        <Field>
                          <FieldLabel>Buffer</FieldLabel>
                          <ToggleGroup
                            type="single"
                            variant="outline"
                            size="sm"
                            spacing={0}
                            value={selectedLm?.buffer_side || "both"}
                            onValueChange={(next) => {
                              if (!next) return;
                              lm.patchLandmark({ buffer_side: next });
                            }}
                          >
                            <ToggleGroupItem value="left">Left</ToggleGroupItem>
                            <ToggleGroupItem value="both">Both</ToggleGroupItem>
                            <ToggleGroupItem value="right">Right</ToggleGroupItem>
                          </ToggleGroup>
                        </Field>
                        <Field>
                          <FieldLabel>Width</FieldLabel>
                          <Slider
                            min={0}
                            max={bufMax}
                            step={bufMax / 200}
                            value={[
                              Math.min(
                                Number(selectedLm?.buffer_width || 0),
                                bufMax,
                              ),
                            ]}
                            onValueChange={(v) =>
                              lm.patchLandmark({ buffer_width: v[0] ?? 0 })
                            }
                          />
                          <FieldDescription>
                            {formatParam(Number(selectedLm?.buffer_width || 0))}
                          </FieldDescription>
                        </Field>
                        <FieldDescription>
                          Shift+wheel sizes the buffer.
                        </FieldDescription>
                      </>
                    ) : null}
                  </FieldGroup>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function ZoomControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <div
      className="absolute right-2 bottom-2 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm"
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <ButtonGroup orientation="vertical">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          title="Zoom in"
          aria-label="Zoom in"
          className="rounded-none"
          onClick={(e) => {
            e.stopPropagation();
            onZoomIn();
          }}
        >
          <PlusIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          title="Zoom out"
          aria-label="Zoom out"
          className="rounded-none border-t border-border"
          onClick={(e) => {
            e.stopPropagation();
            onZoomOut();
          }}
        >
          <MinusIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          title="Reset view"
          aria-label="Reset view"
          className="rounded-none border-t border-border"
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
        >
          <MaximizeIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
