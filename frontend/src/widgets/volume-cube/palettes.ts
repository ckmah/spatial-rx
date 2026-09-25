/** Image colour maps for the volume cube, sampled by the cube shader. */

export type PaletteName = "gray" | "inferno" | "magma" | "viridis" | "cividis";
export const PALETTES: PaletteName[] = ["gray", "inferno", "magma", "viridis", "cividis"];

// sRGB stops, evenly spaced. Gray ends at the cube's previous image colour.
const STOPS: Record<PaletteName, string[]> = {
  gray: ["#000000", "#dce1e6"],
  inferno: ["#000004", "#1f0c48", "#550f6d", "#88226a", "#ba3655", "#e35933", "#f98e09", "#f9cb35", "#fcffa4"],
  magma: ["#000004", "#1c1044", "#4f127b", "#812581", "#b5367a", "#e55064", "#fb8761", "#fec287", "#fcfdbf"],
  viridis: ["#440154", "#472d7b", "#3b528b", "#2c728e", "#21918c", "#28ae80", "#5ec962", "#addc30", "#fde725"],
  cividis: ["#00224e", "#123570", "#3b496c", "#575d6d", "#707173", "#8a8678", "#a59c74", "#c3b369", "#fee838"],
};

const cache = new Map<PaletteName, { data: Uint8Array; width: 256; height: 1 }>();

function rgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** 256 RGBA texels in sRGB; the shader linearises before compositing. */
export function paletteLut(name: PaletteName) {
  const hit = cache.get(name);
  if (hit) return hit;
  const stops = STOPS[name].map(rgb);
  const data = new Uint8Array(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = (i / 255) * (stops.length - 1);
    const k = Math.min(Math.floor(t), stops.length - 2);
    const f = t - k;
    for (let c = 0; c < 3; c++) data[i * 4 + c] = Math.round(stops[k]![c]! * (1 - f) + stops[k + 1]![c]! * f);
    data[i * 4 + 3] = 255;
  }
  const lut = { data, width: 256 as const, height: 1 as const };
  cache.set(name, lut);
  return lut;
}
