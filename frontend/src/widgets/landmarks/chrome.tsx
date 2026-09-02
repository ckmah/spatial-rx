import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ChevronRightIcon,
  CircleIcon,
  ExpandIcon,
  EyeIcon,
  EyeOffIcon,
  LassoIcon,
  MaximizeIcon,
  MinusIcon,
  MoveIcon,
  PentagonIcon,
  PlusIcon,
  ShrinkIcon,
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
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import {
  BUFFERABLE,
  GENE_COLORS,
  LANDMARK_COLORS,
  LANDMARK_MODE_IDS,
  MAX_ACTIVE_GENES,
  MODE_LABELS,
  SELECT_MODE_IDS,
  SELECTION_COLORS,
  TENSION_TYPES,
  formatLegendValue,
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
  fullscreen,
  onToggleFullscreen,
}: {
  modes: string[];
  mode: string;
  onMode: (mode: string) => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
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
      <div className="ml-auto">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          title={fullscreen ? "Exit full screen" : "Full screen"}
          aria-label={fullscreen ? "Exit full screen" : "Full screen"}
          aria-pressed={fullscreen}
          onClick={onToggleFullscreen}
        >
          {fullscreen ? <ShrinkIcon /> : <ExpandIcon />}
        </Button>
      </div>
    </div>
  );
}

function LayerRow({
  active,
  color,
  label,
  hidden,
  shown,
  onSelect,
  onRename,
  onDelete,
  onToggleHidden,
}: {
  active: boolean;
  color?: string;
  label: string;
  hidden?: boolean;
  shown?: boolean;
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
      {shown !== undefined ? <CategoryStatusDot active={shown} /> : null}
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

function geneDisplayBounds(gene: { vmin?: number; vmax?: number } | undefined, log1p: boolean) {
  const vmin = gene?.vmin ?? 0;
  const vmax = gene?.vmax ?? 1;
  const lo = Math.max(0, vmin);
  const hi = Math.max(lo + 1e-6, Math.max(0, vmax));
  if (!log1p) return { lo, hi };
  return { lo: Math.log1p(lo), hi: Math.log1p(hi) };
}

function GenesHorizontalBar({
  colors,
  labels,
  lo,
  hi,
}: {
  colors: string[];
  labels: string[];
  lo: number;
  hi: number;
}) {
  const gradient =
    colors.length === 1
      ? `linear-gradient(to right, #0a0a0a, ${colors[0]})`
      : `linear-gradient(to right, ${colors[0]}, ${blendHex(colors[0], colors[1])}, ${colors[1]})`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground">
        {labels.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex min-w-0 items-center gap-1 truncate text-foreground"
          >
            <ColorSwatch color={colors[i] || "#94a3b8"} />
            <span className="truncate">{label}</span>
          </span>
        ))}
      </div>
      <div
        className="h-2.5 w-full rounded-full border border-border"
        style={{ background: gradient }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>{formatLegendValue(lo)}</span>
        <span>{formatLegendValue(hi)}</span>
      </div>
    </div>
  );
}

function blendHex(a: string, b: string) {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  const ra = parseInt(pa.slice(0, 2), 16);
  const ga = parseInt(pa.slice(2, 4), 16);
  const ba = parseInt(pa.slice(4, 6), 16);
  const rb = parseInt(pb.slice(0, 2), 16);
  const gb = parseInt(pb.slice(2, 4), 16);
  const bb = parseInt(pb.slice(4, 6), 16);
  const r = Math.min(255, ra + rb);
  const g = Math.min(255, ga + gb);
  const bch = Math.min(255, ba + bb);
  return `#${[r, g, bch].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function roundedTernaryPath(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  radius: number,
) {
  const verts = [
    [ax, ay],
    [bx, by],
    [cx, cy],
  ] as const;
  const parts: string[] = [];
  for (let i = 0; i < 3; i++) {
    const [x0, y0] = verts[(i + 2) % 3];
    const [x1, y1] = verts[i];
    const [x2, y2] = verts[(i + 1) % 3];
    const dIn = Math.hypot(x1 - x0, y1 - y0) || 1;
    const dOut = Math.hypot(x2 - x1, y2 - y1) || 1;
    const r = Math.min(radius, dIn * 0.35, dOut * 0.35);
    const ix = x1 + ((x0 - x1) / dIn) * r;
    const iy = y1 + ((y0 - y1) / dIn) * r;
    const ox = x1 + ((x2 - x1) / dOut) * r;
    const oy = y1 + ((y2 - y1) / dOut) * r;
    if (i === 0) parts.push(`M ${ix} ${iy}`);
    else parts.push(`L ${ix} ${iy}`);
    parts.push(`Q ${x1} ${y1} ${ox} ${oy}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

const TERNARY_SIZE = 80;
const TERNARY_PAD = 12;
const TERNARY_VERTEX_R = 4;
const TERNARY_VERTEX_OUTSET = 5;
const TERNARY_SIDE = TERNARY_SIZE - 2 * TERNARY_PAD;
const TERNARY_HEIGHT = (Math.sqrt(3) / 2) * TERNARY_SIDE;
const TERNARY_TOP_Y = (TERNARY_SIZE - TERNARY_HEIGHT) / 2;
const TERNARY_BOTTOM_Y = TERNARY_TOP_Y + TERNARY_HEIGHT;
const TERNARY_TOP = { x: TERNARY_SIZE / 2, y: TERNARY_TOP_Y };
const TERNARY_LEFT = { x: TERNARY_PAD, y: TERNARY_BOTTOM_Y };
const TERNARY_RIGHT = { x: TERNARY_SIZE - TERNARY_PAD, y: TERNARY_BOTTOM_Y };
const TERNARY_CENTROID = {
  x: (TERNARY_LEFT.x + TERNARY_TOP.x + TERNARY_RIGHT.x) / 3,
  y: (TERNARY_LEFT.y + TERNARY_TOP.y + TERNARY_RIGHT.y) / 3,
};
function ternaryVertexDot(v: { x: number; y: number }) {
  const dx = v.x - TERNARY_CENTROID.x;
  const dy = v.y - TERNARY_CENTROID.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: v.x + (dx / len) * TERNARY_VERTEX_OUTSET,
    y: v.y + (dy / len) * TERNARY_VERTEX_OUTSET,
  };
}
const TERNARY_DOT_LEFT = ternaryVertexDot(TERNARY_LEFT);
const TERNARY_DOT_TOP = ternaryVertexDot(TERNARY_TOP);
const TERNARY_DOT_RIGHT = ternaryVertexDot(TERNARY_RIGHT);
const TERNARY_PATH = roundedTernaryPath(
  TERNARY_LEFT.x,
  TERNARY_LEFT.y,
  TERNARY_TOP.x,
  TERNARY_TOP.y,
  TERNARY_RIGHT.x,
  TERNARY_RIGHT.y,
  8,
);

function parseHexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function buildTernaryFillUrl() {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  const n = 96;
  canvas.width = n;
  canvas.height = n;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(n, n);
  const c0 = parseHexRgb(GENE_COLORS[0]);
  const c1 = parseHexRgb(GENE_COLORS[1]);
  const c2 = parseHexRgb(GENE_COLORS[2]);
  const ax = TERNARY_LEFT.x / TERNARY_SIZE;
  const ay = TERNARY_LEFT.y / TERNARY_SIZE;
  const bx = TERNARY_TOP.x / TERNARY_SIZE;
  const by = TERNARY_TOP.y / TERNARY_SIZE;
  const cx = TERNARY_RIGHT.x / TERNARY_SIZE;
  const cy = TERNARY_RIGHT.y / TERNARY_SIZE;
  const denom = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
  for (let py = 0; py < n; py++) {
    for (let px = 0; px < n; px++) {
      const x = (px + 0.5) / n;
      const y = (py + 0.5) / n;
      const w0 = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / denom;
      const w1 = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / denom;
      const w2 = 1 - w0 - w1;
      const i = (py * n + px) * 4;
      if (w0 < -0.02 || w1 < -0.02 || w2 < -0.02) {
        img.data[i + 3] = 0;
        continue;
      }
      const a = Math.max(0, w0);
      const b = Math.max(0, w1);
      const c = Math.max(0, w2);
      img.data[i] = Math.min(255, Math.round(c0[0] * a + c1[0] * b + c2[0] * c));
      img.data[i + 1] = Math.min(
        255,
        Math.round(c0[1] * a + c1[1] * b + c2[1] * c),
      );
      img.data[i + 2] = Math.min(
        255,
        Math.round(c0[2] * a + c1[2] * b + c2[2] * c),
      );
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

function GenesTernaryLegend() {
  const clipId = useId();
  const fillUrl = useMemo(() => buildTernaryFillUrl(), []);

  return (
    <div className="flex justify-center py-0.5">
      <svg
        viewBox={`0 0 ${TERNARY_SIZE} ${TERNARY_SIZE}`}
        className="size-16"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <path d={TERNARY_PATH} />
          </clipPath>
        </defs>
        {fillUrl ? (
          <image
            href={fillUrl}
            width={TERNARY_SIZE}
            height={TERNARY_SIZE}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="none"
          />
        ) : null}
        <path
          d={TERNARY_PATH}
          fill="none"
          className="stroke-border"
          strokeWidth={1}
        />
        <circle
          cx={TERNARY_DOT_LEFT.x}
          cy={TERNARY_DOT_LEFT.y}
          r={TERNARY_VERTEX_R}
          fill={GENE_COLORS[0]}
        />
        <circle
          cx={TERNARY_DOT_TOP.x}
          cy={TERNARY_DOT_TOP.y}
          r={TERNARY_VERTEX_R}
          fill={GENE_COLORS[1]}
        />
        <circle
          cx={TERNARY_DOT_RIGHT.x}
          cy={TERNARY_DOT_RIGHT.y}
          r={TERNARY_VERTEX_R}
          fill={GENE_COLORS[2]}
        />
      </svg>
    </div>
  );
}

function GenesLegend({ lm }: { lm: LandmarksModel }) {
  const { active_genes, gene_columns, color_by, gene_log1p, gene_scale_mode } = lm;
  const selected = active_genes || [];
  if (color_by !== "continuous" || !selected.length) return null;

  if (selected.length >= 3) {
    return <GenesTernaryLegend />;
  }

  const colors = selected.map((_, i) => GENE_COLORS[i % GENE_COLORS.length]);
  let lo = 0;
  let hi = 1;
  if (gene_scale_mode === "shared") {
    hi = 0;
    for (const name of selected) {
      const g = gene_columns.find((c) => c.name === name);
      hi = Math.max(hi, geneDisplayBounds(g, gene_log1p).hi);
    }
    if (!(hi > 0)) hi = 1;
  } else {
    const g = gene_columns.find((c) => c.name === selected[0]);
    const b = geneDisplayBounds(g, gene_log1p);
    lo = b.lo;
    hi = b.hi;
  }

  return (
    <GenesHorizontalBar
      colors={colors}
      labels={selected}
      lo={lo}
      hi={hi}
    />
  );
}

function GenesScaleToggles({ lm }: { lm: LandmarksModel }) {
  const { active_genes, color_by, gene_scale_mode, gene_log1p } = lm;
  if (color_by !== "continuous" || !(active_genes?.length || 0)) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center justify-between gap-2 text-xs text-foreground">
        <span className="min-w-0 leading-snug">
          Shared scale
          <span className="mt-0.5 block text-[10px] text-muted-foreground">
            Max of selected genes
          </span>
        </span>
        <Switch
          size="sm"
          checked={gene_scale_mode === "shared"}
          onCheckedChange={(on) =>
            lm.setGeneScaleMode(on ? "shared" : "independent")
          }
        />
      </label>
      <label className="flex items-center justify-between gap-2 text-xs text-foreground">
        <span className="min-w-0 leading-snug">
          log1p
          <span className="mt-0.5 block text-[10px] text-muted-foreground">
            Compress high expression
          </span>
        </span>
        <Switch
          size="sm"
          checked={!!gene_log1p}
          onCheckedChange={(on) => lm.setGeneLog1p(on)}
        />
      </label>
    </div>
  );
}

/** Fixed portal host in the widget shadow root so popups keep widget theme tokens. */
function useWidgetPortalContainer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const widget = wrapRef.current?.closest(
      ".spatial-rx-widget",
    ) as HTMLElement | null;
    if (!widget) return;

    const root = widget.getRootNode();
    const parent =
      root instanceof ShadowRoot
        ? root
        : widget.ownerDocument?.body || document.body;
    let host = parent.querySelector(
      "[data-spatial-rx-portal]",
    ) as HTMLElement | null;
    if (!host) {
      host = widget.ownerDocument.createElement("div");
      host.setAttribute("data-spatial-rx-portal", "");
      parent.appendChild(host);
    }
    host.className = cn(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      widget.classList.contains("dark") && "dark",
    );
    setPortalEl(host);
  }, []);

  return [wrapRef, portalEl] as const;
}

function GenesCombobox({ lm }: { lm: LandmarksModel }) {
  const { gene_columns, active_genes } = lm;
  const names = gene_columns.map((g) => g.name);
  const selected = active_genes || [];
  const atMax = selected.length >= MAX_ACTIVE_GENES;
  const [wrapRef, portalEl] = useWidgetPortalContainer();

  return (
    <div ref={wrapRef} className="flex flex-col gap-1.5">
      <Combobox
        items={names}
        multiple
        value={selected}
        onValueChange={(next) => {
          const arr = Array.isArray(next) ? next.map(String) : [];
          lm.setActiveGenes(arr);
        }}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full justify-between px-2 font-normal text-xs"
            >
              <ComboboxValue>
                {(value: string[] | null) => {
                  const vals = Array.isArray(value) ? value : [];
                  if (!vals.length) {
                    return (
                      <span className="text-muted-foreground">Select genes</span>
                    );
                  }
                  return (
                    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                      {vals.map((name, i) => (
                        <span
                          key={name}
                          className="inline-flex max-w-full items-center gap-1 truncate"
                        >
                          <ColorSwatch
                            color={GENE_COLORS[i % GENE_COLORS.length]}
                          />
                          {name}
                        </span>
                      ))}
                    </span>
                  );
                }}
              </ComboboxValue>
            </Button>
          }
        />
        <ComboboxContent
          container={portalEl}
          className="w-(--anchor-width) text-xs"
        >
          <ComboboxInput
            showTrigger={false}
            showClear
            placeholder="Search"
            className="w-auto text-xs"
          />
          <ComboboxEmpty className="text-xs">No genes found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => {
              const name = String(item);
              const selIdx = selected.indexOf(name);
              const disabled = atMax && selIdx < 0;
              return (
                <ComboboxItem
                  key={name}
                  value={name}
                  disabled={disabled}
                  className="py-1 text-xs"
                >
                  <ColorSwatch
                    color={
                      selIdx >= 0
                        ? GENE_COLORS[selIdx % GENE_COLORS.length]
                        : "#94a3b8"
                    }
                  />
                  {name}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <GenesLegend lm={lm} />
      <GenesScaleToggles lm={lm} />
    </div>
  );
}

export function LayersPanel({ lm }: { lm: LandmarksModel }) {
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

  return (
    <Card className="pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md">
      <CardHeader className={cn("shrink-0 py-0", PANEL_INSET)}>
        <CardTitle className="text-sm font-semibold tracking-tight">Layers</CardTitle>
      </CardHeader>
      <CardContent className={cn("min-h-0 overflow-y-auto pb-2", PANEL_INSET)}>
        <Accordion
          type="multiple"
          defaultValue={["selections", "categories", "genes", "landmarks"]}
        >
          <AccordionItem value="selections" className="border-b">
            <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
              Selections
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-2">
              {selections.length ? (
                <ItemGroup className="max-h-40 gap-0.5 overflow-y-auto">
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
                <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto">
                  {category_columns.map((col) => {
                    const isShown = !genesActive && col.name === active_category;
                    return (
                      <Collapsible key={col.name} className="group/cat">
                        <CollapsibleTrigger
                          className={cn(
                            "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                            isShown && "text-foreground",
                          )}
                          onClick={() => {
                            if (col.name === active_category && !genesActive) {
                              return;
                            }
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
              </AccordionContent>
            </AccordionItem>
          ) : null}

          {gene_columns.length ? (
            <AccordionItem value="genes" className="border-b">
              <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
                Genes
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-2">
                <GenesCombobox lm={lm} />
              </AccordionContent>
            </AccordionItem>
          ) : null}

          <AccordionItem value="landmarks" className="border-b-0">
            <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
              Landmarks
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-2">
              {landmarks.length ? (
                <ItemGroup className="max-h-40 gap-0.5 overflow-y-auto">
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
                        Sliders subset the precomputed k-max / radius-max graphs.
                        Shift+wheel sizes the neighborhood.
                      </FieldDescription>
                    </>
                  ) : (
                    <FieldDescription>
                      Select a type or selection to edit neighbors.
                    </FieldDescription>
                  )}
                </FieldGroup>
            </AccordionContent>
          </AccordionItem>

          {usesTension || usesBuffer ? (
            <AccordionItem value="landmark" className="border-b-0">
              <AccordionTrigger className="px-0 py-1.5 text-left text-xs font-semibold hover:no-underline">
                Landmark
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-2">
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
      className="absolute right-5 bottom-5 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm"
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
