import { useState } from "react";
import { BoxIcon, ChevronDownIcon, CircleDotIcon, RotateCcwIcon, ScissorsIcon, SunMediumIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RangeControl, type Range, type ViewPreset } from "@/widgets/volume-cube/CubeControls";
import { PALETTES, type PaletteName, paletteLut } from "@/widgets/volume-cube/palettes";
import type { CubeCut } from "@/widgets/volume-cube/VolumeCube";

import type { CubeSettings, CubeSettingsPatch } from "../use-cube-settings";
import { ChromeTooltip, ToolbarDivider, chromeHitClass, chromeMenuClass } from "./primitives";
import { IconBtn, ToolStack, pillClass } from "./selection-toolbar";

const toggleTextClass =
  "h-8 min-w-8 rounded-full border-0 px-2.5 text-xs text-muted-foreground shadow-none hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none data-[spacing=1]:rounded-full";

const GAMMA_LOG2 = 2.32;

type Panel = "cuts" | "image" | "cells";

function clamp(lo: number, hi: number, [min, max]: Range): Range {
  const a = Math.max(min, Math.min(lo, hi));
  return [a, Math.max(a, Math.min(max, Math.max(lo, hi)))];
}

function gradientCss(name: PaletteName): string {
  const { data } = paletteLut(name);
  const stops = Array.from({ length: 9 }, (_, i) => {
    const k = Math.round((i / 8) * 255) * 4;
    return `rgb(${data[k]} ${data[k + 1]} ${data[k + 2]})`;
  });
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

function PaletteSwatch({ name }: { name: PaletteName }) {
  return (
    <span
      aria-hidden
      className="h-2.5 w-8 shrink-0 rounded-full border border-foreground/15"
      style={{ backgroundImage: gradientCss(name) }}
    />
  );
}

/** One value on the same grid as `RangeControl`; `caption` is the short visible label. */
function ValueControl({
  label,
  caption,
  min,
  max,
  step,
  value,
  shown,
  onChange,
}: {
  label: string;
  caption: string;
  min: number;
  max: number;
  step: number;
  value: number;
  shown: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_5.5rem] items-center gap-2">
      <Label className="text-xs text-muted-foreground">{caption}</Label>
      <Slider
        aria-label={label}
        className="h-2 [&_[data-slot=slider-range]]:bg-blue-500/70"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
      />
      <span className="text-right text-xs tabular-nums text-muted-foreground">{shown}</span>
    </div>
  );
}

/**
 * Context bar while Inspect has a cube open: camera, projection, palette,
 * labels, then Cuts / Image / Cells panels that rise above their buttons.
 * Cuts render live and commit `volume_cut` on release (`onCommitCut`).
 */
export function InspectToolbar({
  settings,
  patch,
  labelsAvailable,
  onCommitCut,
}: {
  settings: CubeSettings;
  patch: (p: CubeSettingsPatch) => void;
  labelsAvailable: boolean;
  onCommitCut: (cut: CubeCut) => void;
}) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);
  // The cube sizes the contrast range from the contrast it draws; hold the max
  // from pointer down to commit so it cannot run away under the dragged thumb.
  const [heldContrastMax, setHeldContrastMax] = useState<number | null>(null);
  const { bounds, cut, render } = settings;
  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));

  const xShown = bounds ? clamp(cut[0], cut[1], bounds.winX) : null;
  const yShown = bounds ? clamp(cut[2], cut[3], bounds.winY) : null;
  const zShown = bounds ? clamp(cut[4], cut[5], bounds.stackZ) : null;
  const shownCut = (axis: 0 | 1 | 2, v: Range): CubeCut | null => {
    if (!xShown || !yShown || !zShown) return null;
    const next: [Range, Range, Range] = [xShown, yShown, zShown];
    next[axis] = v;
    return [...next[0], ...next[1], ...next[2]] as CubeCut;
  };
  const cutRow = (axis: 0 | 1 | 2, label: string, value: Range, range: Range, fromEdge: boolean) => (
    <RangeControl
      label={label}
      unit="µm"
      min={range[0]}
      max={range[1]}
      step={1}
      value={value}
      offset={fromEdge ? range[0] : 0}
      onLive={(v) => {
        const next = shownCut(axis, v);
        if (next) patch({ cut: next });
      }}
      onCommit={(v) => {
        const next = shownCut(axis, v);
        if (next) onCommitCut(next);
      }}
    />
  );

  const contrastMax =
    heldContrastMax ?? bounds?.contrastMax ?? Math.max(255, Math.ceil(settings.contrast[1] * 4));
  const gammaLog2 = Math.log2(render.imageGamma);

  return (
    <TooltipProvider delayDuration={80} skipDelayDuration={0}>
      <div
        className="landmarks__chrome-context"
        data-testid="context-inspect-toolbar"
        data-placement="dock"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <div
          ref={(node) => setMenuContainer(node?.closest(".spatial-rx-widget, .landmarks") as HTMLElement | null)}
          className={cn(pillClass, "pointer-events-auto")}
          data-testid="context-toolbar-l1"
        >
          <ToggleGroup
            type="single"
            size="sm"
            spacing={1}
            aria-label="Camera"
            className="gap-0.5"
            value={settings.preset ?? ""}
            onValueChange={(v) => v && patch({ preset: v as ViewPreset })}
          >
            <ToggleGroupItem value="top" aria-label="Top view" className={toggleTextClass}>
              Top
            </ToggleGroupItem>
            <ToggleGroupItem value="iso" aria-label="Oblique view" className={toggleTextClass}>
              Iso
            </ToggleGroupItem>
            <ToggleGroupItem value="side" aria-label="Side view" className={toggleTextClass}>
              Side
            </ToggleGroupItem>
          </ToggleGroup>
          <ToolbarDivider />
          <ToggleGroup
            type="single"
            size="sm"
            spacing={1}
            aria-label="Projection"
            className="gap-0.5"
            value={settings.mode}
            onValueChange={(v) => v && patch({ mode: v as CubeSettings["mode"] })}
          >
            <ToggleGroupItem value="additive" aria-label="Additive" className={toggleTextClass}>
              Additive
            </ToggleGroupItem>
            <ToggleGroupItem value="mip" aria-label="Maximum intensity" className={toggleTextClass}>
              MIP
            </ToggleGroupItem>
          </ToggleGroup>
          <ToolbarDivider />
          <DropdownMenu>
            <ChromeTooltip label="Palette">
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Palette"
                  className={cn(chromeHitClass, "w-auto gap-1 px-2")}
                >
                  <PaletteSwatch name={render.palette} />
                  <ChevronDownIcon aria-hidden className="size-2.5 shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
            </ChromeTooltip>
            <DropdownMenuContent
              side="top"
              align="center"
              sideOffset={8}
              container={menuContainer}
              className={chromeMenuClass}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuRadioGroup
                value={render.palette}
                onValueChange={(v) => patch({ render: { palette: v as PaletteName } })}
              >
                {PALETTES.map((name) => (
                  <DropdownMenuRadioItem key={name} value={name} className="gap-2 py-1 text-xs">
                    <PaletteSwatch name={name} />
                    {name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-1.5 px-1.5">
            <Switch
              id="landmarks-cube-labels"
              size="sm"
              aria-label="Labels"
              checked={settings.showLabels}
              disabled={!labelsAvailable}
              onCheckedChange={(on) => patch({ showLabels: on })}
            />
            <Label htmlFor="landmarks-cube-labels" className="text-xs text-muted-foreground">
              Labels
            </Label>
          </div>
          <ToolbarDivider />
          <ToolStack
            open={panel === "cuts"}
            panel={
              <div className="flex w-80 flex-col gap-1.5 px-1 py-1" data-testid="context-cube-cuts">
                {bounds && xShown && yShown && zShown ? (
                  <>
                    {cutRow(0, "X cut", xShown, bounds.winX, true)}
                    {cutRow(1, "Y cut", yShown, bounds.winY, true)}
                    {cutRow(2, "Z cut", zShown, bounds.stackZ, false)}
                  </>
                ) : (
                  <p className="m-0 text-xs text-muted-foreground">Loading volume…</p>
                )}
              </div>
            }
          >
            <IconBtn title="Cuts" active={panel === "cuts"} expandable onClick={() => toggle("cuts")}>
              <ScissorsIcon className="size-4" />
            </IconBtn>
          </ToolStack>
          <ToolStack
            open={panel === "image"}
            panel={
              <div className="flex w-80 flex-col gap-1.5 px-1 py-1" data-testid="context-cube-image">
                <div
                  onPointerDownCapture={() => setHeldContrastMax(contrastMax)}
                  onLostPointerCapture={() => setHeldContrastMax(null)}
                >
                  <RangeControl
                    label="Contrast"
                    unit=""
                    min={0}
                    max={contrastMax}
                    step={1}
                    value={settings.contrast}
                    onLive={(v) => patch({ contrast: v })}
                    onCommit={(v) => {
                      patch({ contrast: v });
                      setHeldContrastMax(null);
                    }}
                  />
                </div>
                <ValueControl
                  label="Image alpha"
                  caption="Alpha"
                  min={0}
                  max={1}
                  step={0.05}
                  value={render.imageAlpha}
                  shown={render.imageAlpha.toFixed(2)}
                  onChange={(v) => patch({ render: { imageAlpha: v } })}
                />
                <ValueControl
                  label="Image gamma"
                  caption="Gamma"
                  min={-GAMMA_LOG2}
                  max={GAMMA_LOG2}
                  step={0.05}
                  value={gammaLog2}
                  shown={(2 ** gammaLog2).toFixed(2)}
                  onChange={(v) => patch({ render: { imageGamma: 2 ** v } })}
                />
              </div>
            }
          >
            <IconBtn title="Image" active={panel === "image"} expandable onClick={() => toggle("image")}>
              <SunMediumIcon className="size-4" />
            </IconBtn>
          </ToolStack>
          <ToolStack
            open={panel === "cells"}
            panel={
              <div className="flex w-80 flex-col gap-1.5 px-1 py-1" data-testid="context-cube-cells">
                <ValueControl
                  label="Cell alpha"
                  caption="Alpha"
                  min={0}
                  max={1}
                  step={0.05}
                  value={render.cellAlpha}
                  shown={render.cellAlpha.toFixed(2)}
                  onChange={(v) => patch({ render: { cellAlpha: v } })}
                />
              </div>
            }
          >
            <IconBtn title="Cells" active={panel === "cells"} expandable onClick={() => toggle("cells")}>
              <CircleDotIcon className="size-4" />
            </IconBtn>
          </ToolStack>
          <ToolbarDivider />
          <IconBtn title="Reset view" onClick={() => patch({ resetTick: settings.resetTick + 1 })}>
            <RotateCcwIcon className="size-4" />
          </IconBtn>
        </div>
      </div>
    </TooltipProvider>
  );
}

/** Inspect without a 3D image: the square still places, there is no cube. */
export function InspectNoVolumePill() {
  return (
    <div className="landmarks__chrome-context" data-testid="context-inspect-no-volume">
      <div className={cn(pillClass, "px-3 text-xs text-muted-foreground")}>
        <BoxIcon aria-hidden className="size-3.5" />
        No 3D image in this SpatialData
      </div>
    </div>
  );
}
