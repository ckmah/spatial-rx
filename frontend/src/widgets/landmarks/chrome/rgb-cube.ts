/**
 * Isometric channel cube for gene / embed.
 * Orientation: channel0 down-left, channel1 down-right, channel2 up,
 * all-three toward the viewer, origin hidden. Colors from GENE_COLORS
 * (magenta / lime / azure) via the same additive mix as the canvas.
 */

import { GENE_COLORS, parseHexRgb } from "../helpers";

const COS30 = Math.sqrt(3) / 2;
const SIN30 = 0.5;

export type IsoOpts = { s: number; ox: number; oy: number };

/** Project channel weights (w0,w1,w2) in [0,1]^3 → screen. */
export function isoProject(
  w0: number,
  w1: number,
  w2: number,
  opts: IsoOpts,
) {
  const { s, ox, oy } = opts;
  return {
    x: ox + (w1 - w0) * COS30 * s,
    y: oy - w2 * s + (w1 + w0) * SIN30 * s,
  };
}

/** Compact corner legend for the info-plot overlay. */
export const LEGEND_CUBE: IsoOpts & { vbW: number; vbH: number } = {
  s: 16,
  ox: 46,
  oy: 30,
  vbW: 92,
  vbH: 54,
};

/** Embedding cloud — tight viewBox around the isometric hull (little chrome padding). */
export const CLOUD_CUBE: IsoOpts & { vbW: number; vbH: number } = {
  s: 38,
  ox: 35,
  oy: 40,
  vbW: 70,
  vbH: 80,
};

/**
 * Cloud dot radius in viewBox units. Scales with 1/√n like an overplot-aware
 * scatter (minimap keeps dots tiny relative to the map; denser clouds shrink).
 */
export function embeddingCloudPointRadius(
  nPoints: number,
  vbSpan = CLOUD_CUBE.vbW,
): number {
  // ~0.75 CSS-px on a ~180px minimap ≈ 0.4% of span.
  const base = Math.max(0.5, vbSpan * 0.0085);
  if (nPoints <= 1) return base * 2.4;
  const densityScale = Math.sqrt(48 / Math.max(nPoints, 12));
  return Math.max(0.4, Math.min(1.25, base * 2.1 * densityScale));
}

/** Bare dim index from labels like "X_pca_0" → "0". */
export function cubeCornerLabel(raw: string, index: number) {
  const s = String(raw || "");
  const m = s.match(/(\d+)\s*$/);
  return m ? m[1] : String(index);
}

/** Same additive mix as canvas blendGeneColors / blendEmbeddingColors. */
export function mixChannelRgb(w0: number, w1: number, w2: number) {
  const a = Math.max(0, Math.min(1, w0));
  const b = Math.max(0, Math.min(1, w1));
  const c = Math.max(0, Math.min(1, w2));
  const c0 = parseHexRgb(GENE_COLORS[0]);
  const c1 = parseHexRgb(GENE_COLORS[1]);
  const c2 = parseHexRgb(GENE_COLORS[2]);
  return {
    rr: Math.min(255, Math.round(c0[0] * a + c1[0] * b + c2[0] * c)),
    gg: Math.min(255, Math.round(c0[1] * a + c1[1] * b + c2[1] * c)),
    bb: Math.min(255, Math.round(c0[2] * a + c1[2] * b + c2[2] * c)),
    sum: a + b + c,
  };
}

export function cubeCorners(opts: IsoOpts) {
  return {
    c0: isoProject(1, 0, 0, opts),
    c1: isoProject(0, 1, 0, opts),
    c2: isoProject(0, 0, 1, opts),
    c01: isoProject(1, 1, 0, opts),
    c02: isoProject(1, 0, 1, opts),
    c12: isoProject(0, 1, 1, opts),
    c012: isoProject(1, 1, 1, opts),
  };
}

function paraUV(
  px: number,
  py: number,
  ax: number,
  ay: number,
  e1x: number,
  e1y: number,
  e2x: number,
  e2y: number,
) {
  const det = e1x * e2y - e1y * e2x;
  if (Math.abs(det) < 1e-8) return null;
  const dx = px - ax;
  const dy = py - ay;
  const u = (dx * e2y - dy * e2x) / det;
  const v = (e1x * dy - e1y * dx) / det;
  if (u < -0.01 || v < -0.01 || u > 1.01 || v > 1.01) return null;
  return {
    u: Math.max(0, Math.min(1, u)),
    v: Math.max(0, Math.min(1, v)),
  };
}

/**
 * Three visible faces (w0=1, w1=1, w2=1) sampled with mixChannelRgb.
 * Primaries are GENE_COLORS (magenta / lime / azure).
 */
export function buildIsoCubeFillUrl(opts: typeof LEGEND_CUBE = LEGEND_CUBE) {
  if (typeof document === "undefined") return "";
  const scale = 3;
  const w = Math.round(opts.vbW * scale);
  const h = Math.round(opts.vbH * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const c = cubeCorners(opts);

  type Face = {
    ax: number;
    ay: number;
    e1x: number;
    e1y: number;
    e2x: number;
    e2y: number;
    weights: (u: number, v: number) => [number, number, number];
  };

  const faces: Face[] = [
    {
      ax: c.c2.x,
      ay: c.c2.y,
      e1x: c.c02.x - c.c2.x,
      e1y: c.c02.y - c.c2.y,
      e2x: c.c12.x - c.c2.x,
      e2y: c.c12.y - c.c2.y,
      weights: (u, v) => [u, v, 1],
    },
    {
      ax: c.c0.x,
      ay: c.c0.y,
      e1x: c.c01.x - c.c0.x,
      e1y: c.c01.y - c.c0.y,
      e2x: c.c02.x - c.c0.x,
      e2y: c.c02.y - c.c0.y,
      weights: (u, v) => [1, u, v],
    },
    {
      ax: c.c1.x,
      ay: c.c1.y,
      e1x: c.c01.x - c.c1.x,
      e1y: c.c01.y - c.c1.y,
      e2x: c.c12.x - c.c1.x,
      e2y: c.c12.y - c.c1.y,
      weights: (u, v) => [u, 1, v],
    },
  ];

  for (let py = 0; py < h; py++) {
    const y = (py + 0.5) / scale;
    for (let px = 0; px < w; px++) {
      const x = (px + 0.5) / scale;
      let hit: [number, number, number] | null = null;
      for (const face of faces) {
        const uv = paraUV(
          x,
          y,
          face.ax,
          face.ay,
          face.e1x,
          face.e1y,
          face.e2x,
          face.e2y,
        );
        if (!uv) continue;
        hit = face.weights(uv.u, uv.v);
      }
      if (!hit) continue;
      const { rr, gg, bb } = mixChannelRgb(hit[0], hit[1], hit[2]);
      const i = (py * w + px) * 4;
      data[i] = rr;
      data[i + 1] = gg;
      data[i + 2] = bb;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}
