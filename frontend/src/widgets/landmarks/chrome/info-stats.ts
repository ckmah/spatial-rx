import { GENE_COLORS } from "../helpers";
import type { CategoryColumn, SelectionItem } from "../helpers";
import { decodeF32Base64, decodeI32Base64 } from "../binary";

type CompositionSlice = {
  key: string;
  label: string;
  value: number;
  fill: string;
};

type DensitySeries = {
  key: string;
  label: string;
  color: string;
};

type DensityRow = {
  x: number;
} & Record<string, number>;

function pointInRing(
  x: number,
  y: number,
  ring: ArrayLike<number> | number[][],
): boolean {
  // ring as [[x,y], ...]
  const n = (ring as number[][]).length;
  if (n < 3) return false;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = (ring as number[][])[i][0];
    const yi = (ring as number[][])[i][1];
    const xj = (ring as number[][])[j][0];
    const yj = (ring as number[][])[j][1];
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Indices of points in the current selection / type focus (or all). */
export function resolvePointMask(opts: {
  n: number;
  selectedKind: string;
  selectedIndex: number;
  selections: SelectionItem[];
  pointsDataB64: string;
  categoryCodesB64: string;
  categoryColumns: CategoryColumn[];
  activeCategory: string;
  /** When false, type focus does not narrow the mask (for full donut + slice highlight). */
  filterByType?: boolean;
}): Uint8Array {
  const {
    n,
    selectedKind,
    selectedIndex,
    selections,
    pointsDataB64,
    categoryCodesB64,
    categoryColumns,
    activeCategory,
    filterByType = true,
  } = opts;
  const mask = new Uint8Array(n);
  mask.fill(1);

  if (filterByType && selectedKind === "type" && selectedIndex >= 0) {
    const colIdx = categoryColumns.findIndex((c) => c.name === activeCategory);
    if (colIdx < 0 || !categoryCodesB64) {
      mask.fill(0);
      return mask;
    }
    const codes = decodeI32Base64(categoryCodesB64);
    for (let i = 0; i < n; i++) {
      mask[i] = codes[colIdx * n + i] === selectedIndex ? 1 : 0;
    }
    return mask;
  }

  if (selectedKind === "selection" && selectedIndex >= 0) {
    const sel = selections[selectedIndex];
    const rawIdx = sel?.point_indices;
    if (Array.isArray(rawIdx) && rawIdx.length) {
      mask.fill(0);
      for (let i = 0; i < rawIdx.length; i++) {
        const idx = Number(rawIdx[i]);
        if (Number.isInteger(idx) && idx >= 0 && idx < n) mask[idx] = 1;
      }
      return mask;
    }
    const verts = (sel?.vertices as number[][] | undefined) || [];
    if (verts.length < 3 || !pointsDataB64) {
      mask.fill(0);
      return mask;
    }
    const pts = decodeF32Base64(pointsDataB64);
    // points_data: Nx4 float32 [x, y, …]
    for (let i = 0; i < n; i++) {
      const x = pts[i * 4];
      const y = pts[i * 4 + 1];
      mask[i] = pointInRing(x, y, verts) ? 1 : 0;
    }
    return mask;
  }

  return mask;
}

export function compositionSlices(opts: {
  n: number;
  mask: Uint8Array;
  categoryCodesB64: string;
  categoryColumns: CategoryColumn[];
  activeCategory: string;
}): CompositionSlice[] {
  const { n, mask, categoryCodesB64, categoryColumns, activeCategory } = opts;
  const colIdx = categoryColumns.findIndex((c) => c.name === activeCategory);
  const col = colIdx >= 0 ? categoryColumns[colIdx] : null;
  if (!col || !categoryCodesB64 || n <= 0) return [];

  const labels = col.labels || [];
  const palette = col.palette || [];
  const codes = decodeI32Base64(categoryCodesB64);
  const counts = new Array(labels.length).fill(0);
  for (let i = 0; i < n; i++) {
    if (!mask[i]) continue;
    const c = codes[colIdx * n + i];
    if (c >= 0 && c < counts.length) counts[c] += 1;
  }
  return labels
    .map((label: string, i: number) => ({
      key: `c${i}`,
      label,
      value: counts[i] as number,
      fill: palette[i % Math.max(palette.length, 1)] || "var(--muted-foreground)",
    }))
    .filter((s: CompositionSlice) => s.value > 0);
}

/** Smooth density curves for active genes (Gaussian KDE on [0,1] or log1p space). */
export function geneDensities(opts: {
  n: number;
  mask: Uint8Array;
  geneValuesB64: string;
  activeGenes: string[];
  geneLog1p: boolean;
  bins?: number;
}): { series: DensitySeries[]; rows: DensityRow[] } {
  const {
    n,
    mask,
    geneValuesB64,
    activeGenes,
    geneLog1p,
    bins = 48,
  } = opts;
  const series: DensitySeries[] = activeGenes.map((name, i) => ({
    key: `g${i}`,
    label: name,
    color: GENE_COLORS[i % GENE_COLORS.length],
  }));
  if (!series.length || !geneValuesB64 || n <= 0) {
    return { series, rows: [] };
  }

  const values = decodeF32Base64(geneValuesB64);
  const samples: number[][] = series.map(() => []);
  for (let g = 0; g < series.length; g++) {
    for (let i = 0; i < n; i++) {
      if (!mask[i]) continue;
      let v = values[g * n + i];
      if (!Number.isFinite(v)) continue;
      if (geneLog1p) v = Math.log1p(v);
      samples[g].push(v);
    }
  }

  const xMax = geneLog1p ? Math.log1p(1) : 1;
  const bandwidth = Math.max(xMax / 24, 1e-3);
  const rows: DensityRow[] = [];
  for (let b = 0; b < bins; b++) {
    const x = (b / (bins - 1)) * xMax;
    const row: DensityRow = { x };
    for (let g = 0; g < series.length; g++) {
      const pts = samples[g];
      if (!pts.length) {
        row[series[g].key] = 0;
        continue;
      }
      let density = 0;
      const inv = 1 / (bandwidth * Math.sqrt(2 * Math.PI));
      const twoBw2 = 2 * bandwidth * bandwidth;
      for (const v of pts) {
        const d = x - v;
        density += inv * Math.exp(-(d * d) / twoBw2);
      }
      row[series[g].key] = density / pts.length;
    }
    rows.push(row);
  }
  return { series, rows };
}
