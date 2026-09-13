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

export type EmbeddingCloudPoint = {
  x: number;
  y: number;
  color: string;
};

/** Sample cells in scope onto the RGB ternary (channels = packed embedding_values). */
export function embeddingTernaryCloud(opts: {
  n: number;
  mask: Uint8Array;
  embeddingValuesB64: string;
  nChannels: number;
  maxPoints?: number;
}): EmbeddingCloudPoint[] {
  const { n, mask, embeddingValuesB64, nChannels, maxPoints = 400 } = opts;
  if (!embeddingValuesB64 || n <= 0 || nChannels <= 0) return [];
  const values = decodeF32Base64(embeddingValuesB64);
  if (values.length < n * nChannels) return [];

  const idxs: number[] = [];
  for (let i = 0; i < n; i++) if (mask[i]) idxs.push(i);
  if (!idxs.length) return [];

  const step = Math.max(1, Math.ceil(idxs.length / maxPoints));
  const out: EmbeddingCloudPoint[] = [];
  for (let k = 0; k < idxs.length; k += step) {
    const i = idxs[k];
    const ch = [0, 0, 0];
    for (let c = 0; c < Math.min(3, nChannels); c++) {
      ch[c] = Math.max(0, Math.min(1, values[c * n + i] || 0));
    }
    const sum = ch[0] + ch[1] + ch[2];
    // Importing ternaryFromWeights would create a UI dependency in stats —
    // compute barycentric position inline (matches genes-ternary vertices).
    const size = 80;
    const pad = 12;
    const side = size - 2 * pad;
    const height = (Math.sqrt(3) / 2) * side;
    const topY = (size - height) / 2;
    const bottomY = topY + height;
    const left = { x: pad, y: bottomY };
    const top = { x: size / 2, y: topY };
    const right = { x: size - pad, y: bottomY };
    let u = 0;
    let v = 0;
    let w = 0;
    if (sum > 1e-8) {
      u = ch[0] / sum;
      v = ch[1] / sum;
      w = ch[2] / sum;
    } else {
      u = v = w = 1 / 3;
    }
    const x = left.x * u + top.x * v + right.x * w;
    const y = left.y * u + top.y * v + right.y * w;
    // Build additive RGB from channel weights using gene primaries.
    const parse = (hex: string) => {
      const h = hex.replace("#", "");
      const n = Number.parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
    };
    const c0 = parse(GENE_COLORS[0]);
    const c1 = parse(GENE_COLORS[1]);
    const c2 = parse(GENE_COLORS[2]);
    const rr = Math.min(255, Math.round(c0[0] * ch[0] + c1[0] * ch[1] + c2[0] * ch[2]));
    const gg = Math.min(255, Math.round(c0[1] * ch[0] + c1[1] * ch[1] + c2[1] * ch[2]));
    const bb = Math.min(255, Math.round(c0[2] * ch[0] + c1[2] * ch[1] + c2[2] * ch[2]));
    out.push({
      x,
      y,
      color: sum > 1e-8 ? `rgb(${rr},${gg},${bb})` : "var(--muted-foreground)",
    });
  }
  return out;
}
