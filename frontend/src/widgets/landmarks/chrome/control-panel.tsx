import {
  ClipboardPasteIcon,
  CopyIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import {
  BUFFERABLE,
  TENSION_TYPES,
  formatParam,
  maxBufferWidth,
} from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { SliderRow, SoftToggleGroup, ColorSwatch } from "./primitives";
import { InspectPanel } from "./inspect-panel";
import {
  PANEL_INSET,
  SECTION_TRIGGER,
  FLOAT_PANEL,
  type PanelSectionId,
} from "./sections";

export function ControlPanel({
  lm,
  forceSection,
  embedded = false,
}: {
  lm: LandmarksModel;
  forceSection?: PanelSectionId;
  embedded?: boolean;
}) {
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
  const rMax = neighbor_radius_max > 0 ? neighbor_radius_max : bufMax;
  const kMax = Math.max(1, neighbor_k_max || 64);
  const radiusValue = Math.min(Number(hood?.neighborhood_radius || 0), rMax);

  const pinLabel =
    lm.selected_kind === "molecule" && lm.selected_index >= 0
      ? `molecule ${lm.selected_index}`
      : lm.selected_kind === "type" && lm.selected_index >= 0
        ? `type ${lm.selected_index}`
        : null;

  const accordion = (
    <Accordion
      className={cn(forceSection && "landmarks-section-solo")}
      {...(forceSection
        ? { type: "single" as const, value: forceSection, collapsible: true }
        : {
            type: "multiple" as const,
            defaultValue: ["inspect", "neighbors", "landmark"],
          })}
    >
      <AccordionItem value="inspect" className="border-b">
        <AccordionTrigger className={SECTION_TRIGGER}>Inspect</AccordionTrigger>
        <AccordionContent className="px-0 pb-2">
          <InspectPanel lm={lm} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="neighbors"
        className={usesTension || usesBuffer ? "border-b" : "border-b-0"}
      >
        <AccordionTrigger className={SECTION_TRIGGER}>Neighbors</AccordionTrigger>
        <AccordionContent className="px-0 pb-2">
          <FieldGroup className="gap-2.5">
            {usesHood ? (
              <>
                <FieldDescription className="text-[0.6875rem]">
                  {hood.id ? String(hood.id) : "Selection"}
                </FieldDescription>
                <div className="flex flex-wrap gap-3 text-muted-foreground text-[0.6875rem]">
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
                <Field className="gap-1.5">
                  <FieldLabel className="text-[0.6875rem] font-medium text-muted-foreground">
                    Neighborhood
                  </FieldLabel>
                  <SoftToggleGroup
                    value={hood.neighborhood || "off"}
                    onChange={(next) => lm.patchNeighborhood({ neighborhood: next })}
                    options={[
                      { value: "off", label: "Off" },
                      { value: "radius", label: "Radius" },
                      { value: "knn", label: "k-NN" },
                    ]}
                  />
                </Field>
                {hood.neighborhood === "radius" ? (
                  <SliderRow
                    label="Radius"
                    valueLabel={`${formatParam(radiusValue, "0")}${
                      rMax > 0 ? ` / ${formatParam(rMax, "0")}` : ""
                    }`}
                  >
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
                  </SliderRow>
                ) : null}
                {hood.neighborhood === "knn" ? (
                  <SliderRow
                    label="k"
                    valueLabel={String(
                      Math.min(Number(hood.neighborhood_k || 12), kMax),
                    )}
                  >
                    <Slider
                      min={1}
                      max={kMax}
                      step={1}
                      value={[Math.min(Number(hood.neighborhood_k || 12), kMax)]}
                      onValueChange={(v) =>
                        lm.patchNeighborhood({
                          neighborhood: "knn",
                          neighborhood_k: v[0] ?? 12,
                        })
                      }
                    />
                  </SliderRow>
                ) : null}
                <FieldDescription className="text-[0.6875rem]">
                  Sliders subset precomputed graphs. Shift+wheel sizes the
                  neighborhood.
                </FieldDescription>
                {hood.neighborhood && hood.neighborhood !== "off" ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => lm.promoteNeighborhoodToSelection()}
                  >
                    Make Selection
                  </Button>
                ) : null}
              </>
            ) : (
              <FieldDescription className="text-[0.6875rem]">
                Select a type or selection to edit neighbors.
              </FieldDescription>
            )}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      {usesTension || usesBuffer ? (
        <AccordionItem value="landmark" className="border-b-0">
          <AccordionTrigger className={SECTION_TRIGGER}>Landmark</AccordionTrigger>
          <AccordionContent className="px-0 pb-2">
            <FieldGroup className="gap-2.5">
              {usesTension ? (
                <SliderRow
                  label="Tension"
                  valueLabel={Number(
                    selectedLm?.tension ?? default_tension ?? 0,
                  ).toPrecision(3)}
                >
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={[Number(selectedLm?.tension ?? default_tension ?? 0)]}
                    onValueChange={(v) => lm.patchLandmark({ tension: v[0] ?? 0 })}
                  />
                </SliderRow>
              ) : null}
              {usesBuffer ? (
                <>
                  <Field className="gap-1.5">
                    <FieldLabel className="text-[0.6875rem] font-medium text-muted-foreground">
                      Buffer
                    </FieldLabel>
                    <SoftToggleGroup
                      value={selectedLm?.buffer_side || "both"}
                      onChange={(next) => lm.patchLandmark({ buffer_side: next })}
                      options={[
                        { value: "left", label: "Left" },
                        { value: "both", label: "Both" },
                        { value: "right", label: "Right" },
                      ]}
                    />
                  </Field>
                  <SliderRow
                    label="Width"
                    valueLabel={formatParam(Number(selectedLm?.buffer_width || 0))}
                  >
                    <Slider
                      min={0}
                      max={bufMax}
                      step={bufMax / 200}
                      value={[
                        Math.min(Number(selectedLm?.buffer_width || 0), bufMax),
                      ]}
                      onValueChange={(v) =>
                        lm.patchLandmark({ buffer_width: v[0] ?? 0 })
                      }
                    />
                  </SliderRow>
                  <FieldDescription className="text-[0.6875rem]">
                    Shift+wheel sizes the buffer.
                  </FieldDescription>
                </>
              ) : null}
              <Field className="gap-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="landmarks-trail-hit"
                  aria-label="Copy landmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    lm.copyLandmark(lm.selected_index);
                  }}
                >
                  <CopyIcon className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="landmarks-trail-hit ml-1"
                  aria-label="Paste landmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    lm.pasteLandmark();
                  }}
                >
                  <ClipboardPasteIcon className="size-3.5" />
                </Button>
              </Field>
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
      ) : null}
    </Accordion>
  );

  const pinBanner = pinLabel ? (
    <div
      className="mb-2 rounded-md bg-muted/50 px-2 py-1.5 text-[0.6875rem]"
      data-testid="inspect-pin"
    >
      <span className="text-muted-foreground">Pinned · </span>
      <span className="font-medium text-foreground">{pinLabel}</span>
    </div>
  ) : null;

  if (embedded) {
    return (
      <div className={cn("min-h-0 overflow-y-auto py-0", PANEL_INSET)}>
        {pinBanner}
        {accordion}
      </div>
    );
  }

  return (
    <Card className={FLOAT_PANEL}>
      <CardContent className={cn("min-h-0 overflow-y-auto py-0", PANEL_INSET)}>
        {pinBanner}
        {accordion}
      </CardContent>
    </Card>
  );
}
