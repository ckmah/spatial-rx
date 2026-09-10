import { useEffect, useMemo, useState } from "react";
import {
  Pie,
  PieChart,
  Cell,
  Sector,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { FieldDescription } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { decodeI32Base64 } from "../binary";
import type { EngineHandle } from "../engine";
import {
  LANDMARK_COLORS,
  SELECTION_COLORS,
} from "../helpers";
import type { LandmarksModel } from "../use-landmarks-model";
import {
  compositionSlices,
  geneDensities,
  resolvePointMask,
} from "./info-stats";
import { ColorSwatch } from "./primitives";
import { FLOAT_PANEL, PANEL_INSET, SECTION_CONTENT, SECTION_TRIGGER } from "./sections";

export function InfoPanel({
  lm,
  engine = null,
}: {
  lm: LandmarksModel;
  engine?: EngineHandle | null;
}) {
  const {
    selected_kind,
    selected_index,
    selections,
    points_data,
    category_codes,
    category_columns,
    active_category,
    gene_values,
    active_genes,
    gene_log1p,
    gene_expression_logged,
  } = lm;

  const [hoverTypeIndex, setHoverTypeIndex] = useState<number | null>(null);

  const n = useMemo(() => {
    const b64 = points_data || "";
    if (!b64) return 0;
    try {
      return Math.floor(atob(b64).length / 16);
    } catch {
      return 0;
    }
  }, [points_data]);

  useEffect(() => {
    if (!engine?.subscribeHover) return;
    return engine.subscribeHover((hit) => {
      if (!hit || hit.kind !== "molecule") {
        setHoverTypeIndex(null);
        return;
      }
      const cols = category_columns || [];
      const active = active_category || "";
      const ci = cols.findIndex((c) => c.name === active);
      if (ci < 0 || !category_codes || n <= 0) {
        setHoverTypeIndex(null);
        return;
      }
      try {
        const codes = decodeI32Base64(category_codes);
        const code = codes[ci * n + hit.index];
        setHoverTypeIndex(Number.isFinite(code) ? Number(code) : null);
      } catch {
        setHoverTypeIndex(null);
      }
    });
  }, [engine, category_codes, category_columns, active_category, n]);
  const genes = active_genes || [];
  const showGenes = genes.length > 0;

  const maskOpts = {
    n,
    selectedKind: selected_kind || "",
    selectedIndex: selected_index,
    selections: selections || [],
    pointsDataB64: points_data || "",
    categoryCodesB64: category_codes || "",
    categoryColumns: category_columns || [],
    activeCategory: active_category || "",
  };

  // Donut: selection scope or all cells; type focus only highlights a slice.
  const compositionMask = useMemo(
    () => resolvePointMask({ ...maskOpts, filterByType: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- maskOpts fields listed
    [
      n,
      selected_kind,
      selected_index,
      selections,
      points_data,
      category_codes,
      category_columns,
      active_category,
    ],
  );

  // Genes / “selected cells” count still follow type or selection focus.
  const focusMask = useMemo(
    () => resolvePointMask({ ...maskOpts, filterByType: true }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      n,
      selected_kind,
      selected_index,
      selections,
      points_data,
      category_codes,
      category_columns,
      active_category,
    ],
  );

  const scopeCount = useMemo(() => {
    let c = 0;
    const m =
      selected_kind === "type" || selected_kind === "selection"
        ? focusMask
        : compositionMask;
    for (let i = 0; i < m.length; i++) if (m[i]) c += 1;
    return c;
  }, [selected_kind, focusMask, compositionMask]);

  const composition = useMemo(
    () =>
      showGenes
        ? []
        : compositionSlices({
            n,
            mask: compositionMask,
            categoryCodesB64: category_codes || "",
            categoryColumns: category_columns || [],
            activeCategory: active_category || "",
          }),
    [
      showGenes,
      n,
      compositionMask,
      category_codes,
      category_columns,
      active_category,
    ],
  );

  const densities = useMemo(
    () =>
      showGenes
        ? geneDensities({
            n,
            mask: focusMask,
            geneValuesB64: gene_values || "",
            activeGenes: genes,
            geneLog1p: !!gene_log1p && !gene_expression_logged,
          })
        : { series: [], rows: [] },
    [
      showGenes,
      n,
      focusMask,
      gene_values,
      genes,
      gene_log1p,
      gene_expression_logged,
    ],
  );

  const layerChip = useMemo(() => {
    if (selected_kind === "selection" && selected_index >= 0) {
      return {
        label: selections[selected_index]?.id || "Selection",
        color: SELECTION_COLORS[selected_index % SELECTION_COLORS.length],
        variant: "selection" as const,
      };
    }
    if (selected_kind === "type" && selected_index >= 0) {
      const col =
        category_columns.find((c) => c.name === active_category) || null;
      const labels = col?.labels || [];
      const palette = col?.palette || [];
      return {
        label: labels[selected_index] || active_category || "Type",
        color:
          palette[selected_index % Math.max(palette.length, 1)] || undefined,
        variant: "solid" as const,
      };
    }
    if (selected_kind === "landmark" && selected_index >= 0) {
      const item = lm.landmarks[selected_index];
      const color =
        (typeof item?.color === "string" && item.color) ||
        LANDMARK_COLORS[selected_index % LANDMARK_COLORS.length];
      return {
        label: item?.id || "Landmark",
        color,
        variant: "landmark" as const,
      };
    }
    return {
      label: active_category || "All cells",
      color: undefined,
      variant: "solid" as const,
    };
  }, [
    selected_kind,
    selected_index,
    selections,
    category_columns,
    active_category,
    lm.landmarks,
  ]);

  const activeTypeIndex = useMemo(() => {
    if (hoverTypeIndex != null) return hoverTypeIndex;
    if (selected_kind === "type" && selected_index >= 0) return selected_index;
    return null;
  }, [hoverTypeIndex, selected_kind, selected_index]);

  const pieConfig = useMemo(() => {
    const cfg: ChartConfig = {};
    for (const s of composition) {
      cfg[s.key] = { label: s.label, color: s.fill };
    }
    return cfg;
  }, [composition]);

  const densityConfig = useMemo(() => {
    const cfg: ChartConfig = {};
    for (const s of densities.series) {
      cfg[s.key] = { label: s.label, color: s.color };
    }
    return cfg;
  }, [densities.series]);

  const pieTotal = useMemo(
    () => composition.reduce((acc, s) => acc + s.value, 0),
    [composition],
  );

  const charts = showGenes ? (
        densities.rows.length && densities.series.length ? (
          <ChartContainer
            config={densityConfig}
            className="aspect-[4/3] w-full"
            initialDimension={{ width: 240, height: 180 }}
          >
            <AreaChart data={densities.rows} margin={{ left: 4, right: 4, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="x"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                tickFormatter={(v) => Number(v).toFixed(2)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {densities.series.map((s) => (
                <Area
                  key={s.key}
                  dataKey={s.key}
                  type="monotone"
                  fill={`var(--color-${s.key})`}
                  fillOpacity={0.18}
                  stroke={`var(--color-${s.key})`}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        ) : (
          <FieldDescription>No expression in this scope.</FieldDescription>
        )
      ) : composition.length ? (
        <div className="relative w-full max-w-[14rem] self-center pb-0 pt-0">
          <ChartContainer
            config={pieConfig}
            className="aspect-square w-full [&_.recharts-responsive-container]:!aspect-square"
            initialDimension={{ width: 200, height: 200 }}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, _name, item) => {
                      const row = item?.payload as
                        | { label?: string; value?: number }
                        | undefined;
                      const count = Number(value) || 0;
                      const pct =
                        pieTotal > 0
                          ? ((count / pieTotal) * 100).toFixed(1)
                          : "0";
                      return (
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate font-medium text-foreground">
                            {row?.label ?? ""}
                          </span>
                          <span className="whitespace-nowrap text-muted-foreground tabular-nums">
                            {count.toLocaleString()} cells · {pct}%
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Pie
                data={composition}
                dataKey="value"
                nameKey="key"
                innerRadius="66%"
                outerRadius="82%"
                stroke="none"
                strokeWidth={0}
                isAnimationActive={false}
                // Recharts 3 drives activeIndex from tooltip hover only; use shape.
                shape={(props) => {
                  const p = props as {
                    outerRadius?: number;
                    cx?: number;
                    cy?: number;
                    innerRadius?: number;
                    startAngle?: number;
                    endAngle?: number;
                    fill?: string;
                    payload?: { key?: string };
                  };
                  const typeIdx = Number(
                    String(p.payload?.key ?? "").replace(/^c/, ""),
                  );
                  const active =
                    activeTypeIndex != null &&
                    Number.isFinite(typeIdx) &&
                    typeIdx === activeTypeIndex;
                  return (
                    <Sector
                      cx={p.cx}
                      cy={p.cy}
                      innerRadius={p.innerRadius}
                      outerRadius={(p.outerRadius ?? 0) + (active ? 10 : 0)}
                      startAngle={p.startAngle}
                      endAngle={p.endAngle}
                      fill={p.fill}
                      stroke="none"
                    />
                  );
                }}
              >
                {composition.map((s) => (
                  <Cell key={s.key} fill={s.fill} fillOpacity={1} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null;
                    }
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={(cy ?? 0) - 6}
                          className="fill-foreground text-lg font-semibold tabular-nums"
                        >
                          {scopeCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={cx}
                          y={(cy ?? 0) + 12}
                          className="fill-muted-foreground text-[0.65rem]"
                        >
                          cells
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      ) : (
        <FieldDescription>
          {category_columns.length
            ? "No category counts in this scope."
            : "Select genes for densities, or load categories for composition."}
        </FieldDescription>
      );

  const chip = (
    <Badge
      variant="secondary"
      title={layerChip.label}
      className="min-w-0 max-w-full shrink gap-1.5 truncate font-normal"
    >
      {layerChip.color ? (
        <ColorSwatch
          color={layerChip.color}
          variant={layerChip.variant}
          fillOpacity={0.28}
          className="!size-2.5 !min-h-2.5 !min-w-2.5 !flex-none"
        />
      ) : null}
      <span className="min-w-0 truncate">{layerChip.label}</span>
    </Badge>
  );

  const body = (
    <Accordion type="single" collapsible defaultValue="info">
      <AccordionItem value="info" className="border-b-0">
        <AccordionTrigger className={SECTION_TRIGGER}>Info</AccordionTrigger>
        <AccordionContent
          className={cn(SECTION_CONTENT, "flex flex-col gap-2")}
        >
          {chip}
          {charts}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <Card className={FLOAT_PANEL} data-testid="info-panel">
      <CardHeader className="sr-only">
        <CardTitle>Info</CardTitle>
        <CardDescription>Selection-linked composition and gene densities</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain",
          PANEL_INSET,
        )}
      >
        {body}
      </CardContent>
    </Card>
  );
}
