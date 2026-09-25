import { useCallback, useState } from "react";

import { DEFAULT_RENDER, type RenderSettings } from "@/widgets/volume-cube/palettes";
import type { ViewPreset } from "@/widgets/volume-cube/CubeControls";
import type { CubeBounds, CubeCut } from "@/widgets/volume-cube/VolumeCube";

/** Client-local state of the Inspect cube window and its context toolbar. */
export type CubeSettings = {
  open: boolean;
  mode: "additive" | "mip";
  preset: ViewPreset | null;
  resetTick: number;
  showLabels: boolean;
  render: RenderSettings;
  contrast: [number, number];
  cut: CubeCut;
  bounds: CubeBounds | null;
};

export type CubeSettingsPatch = Omit<Partial<CubeSettings>, "render"> & {
  render?: Partial<RenderSettings>;
};

/** Shallow-merging settings; `render` merges one level deeper. */
export function useCubeSettings(
  initialContrast: [number, number],
  initialCut: CubeCut,
): [CubeSettings, (patch: CubeSettingsPatch) => void] {
  const [settings, setSettings] = useState<CubeSettings>(() => ({
    open: false,
    mode: "additive",
    preset: "iso",
    resetTick: 0,
    showLabels: false,
    render: DEFAULT_RENDER,
    contrast: initialContrast,
    cut: initialCut,
    bounds: null,
  }));
  const patch = useCallback((p: CubeSettingsPatch) => {
    setSettings((prev) => {
      const { render, ...rest } = p;
      const differs = (a: object, b: object) =>
        Object.entries(b).some(([k, v]) => !Object.is((a as Record<string, unknown>)[k], v));
      // Drag placements re-send `open: true` every move; keep the state then.
      if (!differs(prev, rest) && !(render && differs(prev.render, render))) return prev;
      return { ...prev, ...rest, render: render ? { ...prev.render, ...render } : prev.render };
    });
  }, []);
  return [settings, patch];
}

/**
 * The cut after the window moves from `prev` to `next` (centres, µm): a partial
 * X or Y cut shifts with the window, a cut spanning the old window stays as it
 * is (the cube clamps it to the new one). Null when nothing changes.
 */
export function followWindowCut(
  cut: CubeCut,
  prev: { cx: number; cy: number },
  next: { cx: number; cy: number },
  size: number,
): CubeCut | null {
  const half = size / 2;
  const shift = (lo: number, hi: number, c0: number, c1: number): [number, number] =>
    lo <= c0 - half + 1e-6 && hi >= c0 + half - 1e-6 ? [lo, hi] : [lo + c1 - c0, hi + c1 - c0];
  const [x0, x1] = shift(cut[0], cut[1], prev.cx, next.cx);
  const [y0, y1] = shift(cut[2], cut[3], prev.cy, next.cy);
  if (x0 === cut[0] && x1 === cut[1] && y0 === cut[2] && y1 === cut[3]) return null;
  return [x0, x1, y0, y1, cut[4], cut[5]];
}
