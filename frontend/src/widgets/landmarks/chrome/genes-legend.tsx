import { useId, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

import { GENE_COLORS, MAX_ACTIVE_GENES, blendHex, formatLegendValue } from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import { ColorSwatch } from "./primitives";
import {
  geneDisplayBounds,
  buildTernaryFillUrl,
  TERNARY_SIZE,
  TERNARY_PATH,
  TERNARY_DOT_LEFT,
  TERNARY_DOT_TOP,
  TERNARY_DOT_RIGHT,
  TERNARY_VERTEX_R,
} from "./genes-ternary";
import { useWidgetPortalContainer } from "./use-widget-portal";

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
      ? `linear-gradient(to right, var(--background), ${colors[0]})`
      : `linear-gradient(to right, ${colors[0]}, ${blendHex(colors[0], colors[1])}, ${colors[1]})`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground">
        {labels.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex min-w-0 items-center gap-1 truncate text-foreground"
          >
            <ColorSwatch color={colors[i]} />
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
  const {
    active_genes,
    color_by,
    gene_scale_mode,
    gene_log1p,
    gene_expression_logged,
  } = lm;
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
          disabled={!!gene_expression_logged}
          onCheckedChange={(on) => {
            if (!gene_expression_logged) lm.setGeneLog1p(on);
          }}
        />
      </label>
    </div>
  );
}

export function GenesCombobox({ lm }: { lm: LandmarksModel }) {
  const { gene_columns, active_genes } = lm;
  const names = gene_columns.map((g) => g.name);
  const selected = active_genes || [];
  const atMax = selected.length >= MAX_ACTIVE_GENES;
  const [wrapRef, portalEl] = useWidgetPortalContainer();
  const anchor = useComboboxAnchor();

  return (
    <div ref={wrapRef} className="flex flex-col gap-1.5">
      <Combobox
        items={names}
        multiple
        value={selected}
        onValueChange={(next) => {
          const arr = Array.isArray(next) ? next.map(String) : [];
          lm.setActiveGenes(arr.slice(0, MAX_ACTIVE_GENES));
        }}
      >
        <div className="relative">
          <ComboboxChips
            ref={anchor}
            className={cn(
              "min-h-8 rounded-[var(--radius)] bg-card/60 px-2 py-1 text-xs shadow-none",
              selected.length > 0 && "pr-8",
            )}
          >
            <ComboboxValue>
              {selected.map((name, i) => (
                <ComboboxChip key={name} className="gap-1 text-[0.7rem]">
                  <ColorSwatch color={GENE_COLORS[i % GENE_COLORS.length]} />
                  {name}
                </ComboboxChip>
              ))}
            </ComboboxValue>
            <ComboboxChipsInput
              placeholder={selected.length ? "" : "Select genes"}
              className="min-w-16 text-xs"
            />
          </ComboboxChips>
          {selected.length > 0 ? (
            <ComboboxClear className="absolute top-1 right-1" />
          ) : null}
        </div>
        <ComboboxContent container={portalEl} anchor={anchor} className="text-xs">
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
                        : undefined
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
