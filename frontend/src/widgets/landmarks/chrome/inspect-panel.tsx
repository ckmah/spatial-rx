import { useMemo } from "react";
import { Pie, PieChart, Line, LineChart, XAxis, YAxis } from "recharts";

import { FieldDescription } from "@/components/ui/field";

import type { LandmarksModel } from "../use-landmarks-model";

type StatChipProps = {
  label: string;
  value: string | number;
};

function StatChip({ label, value }: StatChipProps) {
  return (
    <div className="landmarks-stat-chip">
      <dt>{label}</dt>
      <dd className="truncate">{value}</dd>
    </div>
  );
}

export function InspectPanel({ lm }: { lm: LandmarksModel }) {
  const {
    selections,
    selected_kind,
    selected_index,
    category_columns,
    gene_columns,
    n_points,
  } = lm;

  const stats = useMemo(() => {
    const chips: StatChipProps[] = [];

    if (selected_kind === "molecule" && selected_index >= 0) {
      chips.push({ label: "Pinned", value: `molecule ${selected_index}` });
    }

    if (selected_kind === "selection" && selected_index >= 0) {
      const sel = selections[selected_index];
      if (sel) {
        // Count points in this selection
        const count = n_points; // Placeholder - real implementation would use get_mask
        const pct = n_points > 0 ? "100" : "0";
        chips.push({ label: "Name", value: sel.id });
        chips.push({ label: "Cells", value: count });
        chips.push({ label: "% of total", value: `${pct}%` });
      }
    } else if (selected_kind === "type" && selected_index >= 0) {
      chips.push({ label: "Type", value: selected_index });
    } else {
      // Empty state / overview
      chips.push({ label: "Points", value: n_points });
      chips.push({ label: "Categories", value: category_columns.length });
      chips.push({ label: "Genes", value: gene_columns.length });
      chips.push({
        label: "Extent",
        value: `${(lm.x_bounds[1] - lm.x_bounds[0]).toFixed(2)} × ${(lm.y_bounds[1] - lm.y_bounds[0]).toFixed(2)}`,
      });
    }

    return chips;
  }, [selections, selected_kind, selected_index, category_columns, gene_columns, n_points, lm]);

  const donutData = useMemo(() => {
    // Placeholder - in real implementation, we'd decode category_codes from the model
    return [];
  }, []);

  const geneData = useMemo(() => {
    // Placeholder - in real implementation, we'd decode gene_values from the model
    return [];
  }, []);

  if (selected_kind === "landmark" || selected_kind === "molecule") {
    return (
      <dl className="landmarks-stat-grid" data-testid="inspect-stats">
        {stats.map((chip) => (
          <StatChip key={chip.label} {...chip} />
        ))}
      </dl>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <dl className="landmarks-stat-grid" data-testid="inspect-stats">
        {stats.map((chip) => (
          <StatChip key={chip.label} {...chip} />
        ))}
      </dl>

      {donutData.length > 0 ? (
        <div className="landmarks-inspect-chart">
          <PieChart width={150} height={150}>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={60}
              strokeWidth={1}
            />
          </PieChart>
        </div>
      ) : null}

      {geneData.length > 0 ? (
        <div className="landmarks-inspect-chart">
          <LineChart width={150} height={100} data={geneData}>
            <XAxis hide />
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="density"
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </div>
      ) : null}

      {donutData.length === 0 && geneData.length === 0 ? (
        <FieldDescription className="text-[0.6875rem]">
          {selected_kind === "selection"
            ? "Selection active. Draw a region to select cells."
            : "Select a type or selection to inspect."}
        </FieldDescription>
      ) : null}
    </div>
  );
}
