import { GENE_COLORS, parseHexRgb } from "../helpers";

export function geneDisplayBounds(
  gene: { vmin?: number; vmax?: number } | undefined,
  log1p: boolean,
) {
  const vmin = gene?.vmin ?? 0;
  const vmax = gene?.vmax ?? 1;
  const lo = Math.max(0, vmin);
  const hi = Math.max(lo + 1e-6, Math.max(0, vmax));
  if (!log1p) return { lo, hi };
  return { lo: Math.log1p(lo), hi: Math.log1p(hi) };
}

export const TERNARY_SIZE = 80;
const TERNARY_PAD = 12;
export const TERNARY_VERTEX_R = 4;
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

export const TERNARY_DOT_LEFT = ternaryVertexDot(TERNARY_LEFT);
export const TERNARY_DOT_TOP = ternaryVertexDot(TERNARY_TOP);
export const TERNARY_DOT_RIGHT = ternaryVertexDot(TERNARY_RIGHT);

export const TERNARY_PATH = roundedTernaryPath(
  TERNARY_LEFT.x,
  TERNARY_LEFT.y,
  TERNARY_TOP.x,
  TERNARY_TOP.y,
  TERNARY_RIGHT.x,
  TERNARY_RIGHT.y,
  8,
);

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

export function buildTernaryFillUrl() {
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
