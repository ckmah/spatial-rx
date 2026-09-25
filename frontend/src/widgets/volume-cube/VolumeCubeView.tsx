import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Matrix4 } from "@math.gl/core";
import { ColorPalette3DExtensions, VivViewer, loadOmeZarr } from "@hms-dbmi/viv";

import { Badge } from "@/components/ui/badge";
import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

import { CELL_EXTENSIONS, EMPTY_CELL_LUT, type HighlightGroup, buildCellLut } from "./cell-lut-extension";
import { CubeControls, type Range, type RenderMode, type ViewPreset, useLiveRange } from "./CubeControls";
import { type CubeFrame, FramedVolumeView } from "./frame-layers";
import {
  type Box,
  type Frame,
  type Level,
  type ZarrSource,
  LabelVolumeSource,
  WindowPixelSource,
  axisSize,
  boxIsEmpty,
  matchingLevel,
  pickLevel,
  pyramidLevels,
  windowBox,
} from "./window-source";

type VolumeCubeModel = {
  image_url: string;
  labels_url: string;
  window_cx: number;
  window_cy: number;
  window_size_um: number;
  slice_x_min: number;
  slice_x_max: number;
  slice_y_min: number;
  slice_y_max: number;
  slice_z_min: number;
  slice_z_max: number;
  contrast_limits: [number, number];
  voxel_size_um: [number, number, number];
  origin_um: [number, number, number];
  highlight_groups: HighlightGroup[];
};

type ViewState = {
  id: string;
  target: number[];
  zoom: number;
  rotationX: number;
  rotationOrbit: number;
  minZoom: number;
  maxZoom: number;
  minRotationX: number;
  maxRotationX: number;
};

const ISO_PITCH = 35;
/** Camera tilt runs from head-on (0°, perpendicular to Z) to straight down (90°). */
const MIN_PITCH = 0;
const MAX_PITCH = 90;
const PRESETS: Record<ViewPreset, { rotationX: number; rotationOrbit: number }> = {
  // Orbit 0 from above shows x right and y down, the same as the Landmarks map.
  top: { rotationX: 90, rotationOrbit: 0 },
  iso: { rotationX: ISO_PITCH, rotationOrbit: 45 },
  side: { rotationX: 0, rotationOrbit: 0 },
};
const HOME_ZOOM_BACKOFF = 0.3;
const DEFAULT_CONTRAST: [number, number] = [0, 48];
const DEFAULT_VOXEL_SIZE: [number, number, number] = [1, 1, 1];
const DEFAULT_ORIGIN: [number, number, number] = [0, 0, 0];
const NO_GROUPS: HighlightGroup[] = [];
/** Coalesce the separate window_cx / window_cy updates of one inspect click. */
const WINDOW_DEBOUNCE_MS = 120;

const IMAGE_COLOR: [number, number, number] = [220, 225, 230];

/**
 * Tissue Z points up the screen. Viv's orbit view spins about world Y, so rotating
 * data Z onto world Y makes the orbit a turntable around the stack and Z slicing
 * cut horizontal slabs: (x, y, z) -> (x, z, -y).
 */
const Z_UP = new Matrix4().rotateX(-Math.PI / 2);

/** Viv volume raycast: additive compositing, or maximum-intensity projection. */
const EXTENSIONS: Record<RenderMode, unknown[]> = {
  additive: [new ColorPalette3DExtensions.AdditiveBlendExtension({})],
  mip: [new ColorPalette3DExtensions.MaximumIntensityProjectionExtension({})],
};

function absoluteUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

function clampRange(lo: number, hi: number, min: number, max: number): [number, number] {
  const a = Math.max(min, Math.min(lo, hi));
  // A range wholly outside [min, max] collapses to empty rather than inverting.
  return [a, Math.max(a, Math.min(max, Math.max(lo, hi)))];
}

function viewStatesEqual(a: ViewState, b: ViewState): boolean {
  return (
    a.zoom === b.zoom &&
    a.rotationOrbit === b.rotationOrbit &&
    a.rotationX === b.rotationX &&
    a.target[0] === b.target[0] &&
    a.target[1] === b.target[1] &&
    a.target[2] === b.target[2]
  );
}

/** Home camera frames the inspect window, in the window source's world units. */
function isoHome(fit: { width: number; height: number }, view: { width: number; height: number }): ViewState {
  const zoom = Math.log2(Math.min(view.width / fit.width, view.height / fit.height)) - HOME_ZOOM_BACKOFF;
  return {
    id: "3d",
    target: [0, 0, 0],
    zoom,
    ...PRESETS.iso,
    minZoom: zoom - 2,
    maxZoom: zoom + 5,
    minRotationX: MIN_PITCH,
    maxRotationX: MAX_PITCH,
  };
}

function presetOf(vs: ViewState | null): ViewPreset | null {
  if (!vs) return null;
  for (const [name, p] of Object.entries(PRESETS) as [ViewPreset, (typeof PRESETS)["top"]][]) {
    const orbit = ((vs.rotationOrbit % 360) + 360) % 360;
    if (Math.abs(vs.rotationX - p.rotationX) < 0.5 && Math.abs(orbit - p.rotationOrbit) < 0.5) return name;
  }
  return null;
}

function useDebounced<T>(value: T, ms: number): T {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setSettled(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return settled;
}

type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

export function VolumeCubeView({ model, hostEl }: { hostEl: HTMLElement; model: AnyModel }) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const {
    image_url,
    labels_url,
    window_cx,
    window_cy,
    window_size_um,
    slice_x_min,
    slice_x_max,
    slice_y_min,
    slice_y_max,
    slice_z_min,
    slice_z_max,
    contrast_limits,
    voxel_size_um,
    origin_um,
    highlight_groups,
  } = useModel<VolumeCubeModel>(model, [
    "image_url",
    "labels_url",
    "window_cx",
    "window_cy",
    "window_size_um",
    "slice_x_min",
    "slice_x_max",
    "slice_y_min",
    "slice_y_max",
    "slice_z_min",
    "slice_z_max",
    "contrast_limits",
    "voxel_size_um",
    "origin_um",
    "highlight_groups",
  ]);

  const commit = useCallback(
    (patch: Record<string, unknown>) => {
      for (const [k, v] of Object.entries(patch)) model.set(k, v);
      model.save_changes();
    },
    [model],
  );

  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 640, height: 520 });
  const [image, setImage] = useState<ZarrSource[] | null>(null);
  const [labels, setLabels] = useState<ZarrSource[] | null>(null);
  const [error, setError] = useState("");
  const [showLabels, setShowLabels] = useState(false);
  const [mode, setMode] = useState<RenderMode>("additive");
  const [viewState, setViewState] = useState<ViewState | null>(null);
  /** Pan must not drift the cube; the window moves the content instead. */
  const fixedTargetRef = useRef<number[] | null>(null);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    let raf = 0;
    const apply = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const width = Math.max(320, Math.round(rect.width));
        const height = Math.max(360, Math.round(rect.height));
        setBox((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
      });
    };
    apply();
    const obs = new ResizeObserver(apply);
    obs.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setError("");
    setImage(null);
    setViewState(null);
    if (!image_url) return;
    (async () => {
      try {
        const loaded = await loadOmeZarr(absoluteUrl(image_url), { type: "multiscales" });
        if (!cancelled) setImage(loaded.data as unknown as ZarrSource[]);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [image_url]);

  const groups = highlight_groups ?? NO_GROUPS;
  // Python highlighting cells is a request to see them: turn Labels on.
  useEffect(() => {
    if (groups.length > 0 && labels_url) setShowLabels(true);
  }, [groups, labels_url]);
  // Labels load on first use and then stay: the Labels switch and highlights
  // only rewrite a colour lookup, never the loaded volume.
  const [labelsWanted, setLabelsWanted] = useState(false);
  useEffect(() => {
    if (showLabels) setLabelsWanted(true);
  }, [showLabels]);
  const wantLabels = Boolean(labels_url) && labelsWanted;
  useEffect(() => {
    let cancelled = false;
    setLabels(null);
    if (!wantLabels) return;
    (async () => {
      try {
        const lab = await loadOmeZarr(absoluteUrl(labels_url), { type: "multiscales" });
        if (!cancelled) setLabels(lab.data as unknown as ZarrSource[]);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [wantLabels, labels_url]);

  const [szUm, syUm, sxUm] = voxel_size_um ?? DEFAULT_VOXEL_SIZE;
  const [ozUm, oyUm, oxUm] = origin_um ?? DEFAULT_ORIGIN;
  const frame: Frame = useMemo(
    () => ({ voxelSize: [szUm, syUm, sxUm], origin: [ozUm, oyUm, oxUm] }),
    [szUm, syUm, sxUm, ozUm, oyUm, oxUm],
  );

  const levels = useMemo(() => (image ? pyramidLevels(image) : null), [image]);
  const level: Level | null = useMemo(
    () => (levels ? pickLevel(levels, frame, window_size_um) : null),
    [levels, frame, window_size_um],
  );

  // Only the fetch waits for the debounce; the readout follows traits at once.
  const center = useDebounced(`${window_cx},${window_cy}`, WINDOW_DEBOUNCE_MS);
  const windowVoxels = useMemo(() => {
    if (!level) return null;
    const [cx, cy] = center.split(",").map(Number) as [number, number];
    return windowBox(level, frame, cx, cy, window_size_um);
  }, [level, frame, center, window_size_um]);
  const boxKey = windowVoxels ? Object.values(windowVoxels).join(",") : "";
  // The window the traits ask for right now, before the debounced fetch catches up.
  const liveBox = useMemo(
    () => (level ? windowBox(level, frame, window_cx, window_cy, window_size_um) : null),
    [level, frame, window_cx, window_cy, window_size_um],
  );
  // The window whose voxels are on the GPU (Viv keeps showing it while the next loads).
  const [loaded, setLoaded] = useState<{ box: Box; level: number } | null>(null);

  // Voxel size at the chosen level, and world scale relative to X (Viv's convention).
  const levelVoxel: [number, number, number] | null = level
    ? [szUm * level.factor[0], syUm * level.factor[1], sxUm * level.factor[2]]
    : null;
  const ry = levelVoxel ? levelVoxel[1] / levelVoxel[2] : 1;
  const rz = levelVoxel ? levelVoxel[0] / levelVoxel[2] : 1;

  // New loader identities make VolumeLayer refetch, which is the point here:
  // one fetch per window, keyed on the voxel box rather than the raw traits.
  const imageWindow = useMemo(() => {
    if (!level || !windowVoxels || !levelVoxel || boxIsEmpty(windowVoxels)) return null;
    return new WindowPixelSource(level.source, windowVoxels, levelVoxel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, boxKey, levelVoxel?.join(",")]);
  // Labels share the image's grid, so the same voxel box cuts both.
  const labelsLevel = useMemo(() => (labels && level ? matchingLevel(labels, level) : null), [labels, level]);
  const labelsMismatch = Boolean(wantLabels && labels && level && !labelsLevel);
  const cellsWindow = useMemo(() => {
    if (!labelsLevel || !windowVoxels || !levelVoxel || boxIsEmpty(windowVoxels)) return null;
    return new WindowPixelSource(labelsLevel, windowVoxels, levelVoxel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelsLevel, boxKey, levelVoxel?.join(",")]);
  const loader = useMemo(() => {
    if (!imageWindow) return null;
    if (!cellsWindow) return [imageWindow];
    return [new LabelVolumeSource(imageWindow, cellsWindow)];
  }, [imageWindow, cellsWindow]);
  const hasCells = loader?.[0] instanceof LabelVolumeSource;
  const cellLut = useMemo(() => (showLabels ? buildCellLut(groups) : EMPTY_CELL_LUT), [showLabels, groups]);

  // Frame, camera and cuts live in the requested window; the loaded volume pans
  // under it until the new window arrives, so moving Inspect slides the tissue
  // at once instead of jumping when the fetch lands.
  const shownBox = loaded && level && loaded.level === level.index ? loaded.box : windowVoxels;
  const winW = liveBox ? liveBox.x1 - liveBox.x0 : 1;
  const winH = liveBox ? liveBox.y1 - liveBox.y0 : 1;
  const shownW = shownBox ? shownBox.x1 - shownBox.x0 : 1;
  const shownH = shownBox ? shownBox.y1 - shownBox.y0 : 1;
  const levelDepth = level ? axisSize(level.source, "z") : 1;

  // Window and volume extents in the store's frame (um).
  const base = image?.[0];
  const extentX = base ? oxUm + axisSize(base, "x") * sxUm : oxUm;
  const extentY = base ? oyUm + axisSize(base, "y") * syUm : oyUm;
  const extentZ = base ? ozUm + axisSize(base, "z") * szUm : ozUm;
  const half = window_size_um / 2;
  const winX = clampRange(window_cx - half, window_cx + half, oxUm, extentX);
  const winY = clampRange(window_cy - half, window_cy + half, oyUm, extentY);
  const stackZ: Range = [ozUm, extentZ];

  // X/Y cuts follow the window: a full cut stays full, a partial one keeps its
  // place relative to the window's edge. The widget writes the new traits once.
  const prevWindowRef = useRef<{ x0: number; y0: number } | null>(null);
  useEffect(() => {
    const prev = prevWindowRef.current;
    const x0 = window_cx - half;
    const y0 = window_cy - half;
    prevWindowRef.current = { x0, y0 };
    if (!prev || (prev.x0 === x0 && prev.y0 === y0)) return;
    const follow = (lo: number, hi: number, p0: number, n0: number): Range =>
      lo <= p0 + 1e-6 && hi >= p0 + window_size_um - 1e-6 ? [n0, n0 + window_size_um] : [lo - p0 + n0, hi - p0 + n0];
    const [xl, xh] = follow(slice_x_min, slice_x_max, prev.x0, x0);
    const [yl, yh] = follow(slice_y_min, slice_y_max, prev.y0, y0);
    commit({ slice_x_min: xl, slice_x_max: xh, slice_y_min: yl, slice_y_max: yh });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window_cx, window_cy, window_size_um]);

  // Live mirrors: sliders render every frame and commit to the traits on release.
  const [xLive, setXLive] = useLiveRange([slice_x_min, slice_x_max]);
  const [yLive, setYLive] = useLiveRange([slice_y_min, slice_y_max]);
  const [zLive, setZLive] = useLiveRange([slice_z_min, slice_z_max]);
  const [contrastLo, contrastHi] = contrast_limits ?? DEFAULT_CONTRAST;
  const [cLive, setCLive] = useLiveRange([contrastLo, contrastHi]);
  const xShown = clampRange(xLive[0], xLive[1], winX[0], winX[1]);
  const yShown = clampRange(yLive[0], yLive[1], winY[0], winY[1]);
  const zShown = clampRange(zLive[0], zLive[1], stackZ[0], stackZ[1]);

  // Cuts in the loaded volume's voxel space, already clamped to the requested
  // window (so a panning volume is clipped to the frame). Viv's texture stores
  // rows reversed: a Y cut on data rows [a, b] is texture rows [height - b, height - a].
  const xSlice = useMemo(() => {
    const step = levelVoxel ? levelVoxel[2] : 1;
    const x0 = shownBox ? shownBox.x0 : 0;
    return clampRange((xShown[0] - oxUm) / step - x0, (xShown[1] - oxUm) / step - x0, 0, shownW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xShown[0], xShown[1], oxUm, shownW, shownBox?.x0, levelVoxel?.[2]]);
  const ySlice = useMemo(() => {
    const step = levelVoxel ? levelVoxel[1] : 1;
    const y0 = shownBox ? shownBox.y0 : 0;
    const [a, b] = clampRange((yShown[0] - oyUm) / step - y0, (yShown[1] - oyUm) / step - y0, 0, shownH);
    return [shownH - b, shownH - a] as [number, number];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yShown[0], yShown[1], oyUm, shownH, shownBox?.y0, levelVoxel?.[1]]);
  // Place the loaded volume in the requested window's world frame: x shifts by
  // the boxes' x0 offset; y by their y1 offset, because texture rows run reversed.
  const panX = shownBox && liveBox ? shownBox.x0 - liveBox.x0 : 0;
  const panY = shownBox && liveBox ? liveBox.y1 - shownBox.y1 : 0;
  const volumeMatrix = useMemo(
    () => (panX === 0 && panY === 0 ? Z_UP : Z_UP.clone().translate([panX, panY * ry, 0])),
    [panX, panY, ry],
  );
  const zSlice = useMemo(() => {
    const scale = levelVoxel ? levelVoxel[0] : 1;
    return clampRange((zShown[0] - ozUm) / scale, (zShown[1] - ozUm) / scale, 0, levelDepth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zShown[0], zShown[1], ozUm, levelDepth, levelVoxel?.[0]]);

  // Centre of the whole window box in world units (physical scale, then Z_UP).
  // Deliberately not the cut region's centre: cross-sections must not move the cube.
  const aimTarget = useMemo(
    () => Array.from(Z_UP.transformPoint([winW / 2, (winH / 2) * ry, (levelDepth / 2) * rz])),
    [winW, winH, ry, rz, levelDepth],
  );
  fixedTargetRef.current = aimTarget;

  // Fit the nominal window (not the clamped box, so the zoom holds at edges) and
  // the full stack height, which is what stands vertical on screen.
  const fit = useMemo(() => {
    if (!level) return null;
    const wx = Math.min(axisSize(level.source, "x"), window_size_um / (sxUm * level.factor[2]));
    const wy = Math.min(axisSize(level.source, "y"), window_size_um / (syUm * level.factor[1])) * ry;
    // Screen footprint of the upright box at orbit 45 and ISO_PITCH: the horizontal
    // diagonal across, and the stack height foreshortened plus the tilted top face.
    const pitch = (ISO_PITCH * Math.PI) / 180;
    const diagonal = Math.hypot(wx, wy);
    const height = levelDepth * rz * Math.cos(pitch) + diagonal * Math.sin(pitch);
    // Room for the axis labels drawn just outside the box.
    return { width: diagonal * 1.12, height: height * 1.12 };
  }, [level, window_size_um, sxUm, syUm, ry, levelDepth, rz]);

  useEffect(() => {
    if (fit && !viewState) setViewState(isoHome(fit, box));
  }, [fit, viewState, box]);

  const displayViewStates = useMemo(() => {
    if (!viewState) return undefined;
    return [{ ...viewState, id: "3d", target: aimTarget }];
  }, [viewState, aimTarget]);

  const resetView = useCallback(() => {
    if (!fit) return;
    setViewState(isoHome(fit, box));
  }, [fit, box]);

  const applyPreset = useCallback((preset: ViewPreset) => {
    setViewState((prev) => (prev ? { ...prev, ...PRESETS[preset] } : prev));
  }, []);

  const onViewStateChange = useCallback(
    ({ viewState: next }: { viewId: string; viewState: ViewState }) => {
      const fixedTarget = fixedTargetRef.current;
      const clamped: ViewState = {
        ...next,
        id: "3d",
        target: fixedTarget ?? next.target,
        rotationX: Math.max(MIN_PITCH, Math.min(MAX_PITCH, next.rotationX)),
        minRotationX: MIN_PITCH,
        maxRotationX: MAX_PITCH,
      };
      setViewState((prev) => (prev && viewStatesEqual(prev, clamped) ? prev : clamped));
      return clamped;
    },
    [],
  );

  // Channel 0 is the image; channel 1, once labels load, the signed label ids,
  // coloured on the GPU from `cellLut` rather than by Viv's channel colour.
  const selections = useMemo(() => (hasCells ? [{ c: 0 }, { c: 1 }] : [{}]), [hasCells]);
  const channelsVisible = useMemo(() => selections.map(() => true), [selections]);
  const contrastLimits = useMemo(
    () => [[cLive[0], cLive[1]], ...(hasCells ? [[0, 1]] : [])] as [number, number][],
    [cLive[0], cLive[1], hasCells],
  );
  const colors = useMemo(() => [IMAGE_COLOR, ...(hasCells ? [[0, 0, 0]] : [])], [hasCells]);

  const cubeFrame: CubeFrame | null = useMemo(
    () =>
      levelVoxel
        ? { size: [winW, winH * ry, levelDepth * rz], umPerUnit: levelVoxel[2], zOriginUm: ozUm, dark }
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [winW, winH, ry, rz, levelDepth, levelVoxel?.[2], ozUm, dark],
  );

  const views = useMemo(
    () => [new FramedVolumeView({ id: "3d", target: aimTarget, useFixedAxis: true } as never)],
    [aimTarget],
  );
  const layerProps = useMemo(
    () =>
      loader
        ? [
            {
              loader,
              contrastLimits,
              colors,
              channelsVisible,
              selections,
              xSlice,
              ySlice,
              zSlice,
              resolution: 0,
              extensions: hasCells ? CELL_EXTENSIONS[mode] : EXTENSIONS[mode],
              cellLut,
              modelMatrix: volumeMatrix,
              frameMatrix: Z_UP,
              clippingPlanes: [],
              cubeFrame,
              // VolumeLayer captures this with the loader it starts fetching.
              onViewportLoad: () => {
                if (windowVoxels && level) setLoaded({ box: windowVoxels, level: level.index });
              },
            },
          ]
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loader, contrastLimits, colors, channelsVisible, selections, xSlice, ySlice, zSlice, mode, hasCells, cellLut, cubeFrame, volumeMatrix],
  );

  const readZ = clampRange(slice_z_min, slice_z_max, stackZ[0], stackZ[1]);
  const readX = clampRange(slice_x_min, slice_x_max, winX[0], winX[1]);
  const readY = clampRange(slice_y_min, slice_y_max, winY[0], winY[1]);
  const sliceReadout = `X ${Math.round(readX[0])}–${Math.round(readX[1])} · Y ${Math.round(readY[0])}–${Math.round(readY[1])} · Z ${Math.round(readZ[0])}–${Math.round(readZ[1])}`;
  const outside = windowVoxels ? boxIsEmpty(windowVoxels) : false;

  let status = "";
  if (!image) status = error || "Loading volume…";
  else if (outside) status = "Inspect window is outside the volume";
  else if (labelsMismatch) status = "Labels are on a different grid from the image";

  let labelsState = "off";
  if (showLabels) {
    if (labelsMismatch || (error && !labels)) labelsState = "error";
    else labelsState = hasCells ? "on" : "loading";
  }
  const legend = showLabels && hasCells ? groups.filter((g) => g.labels.length > 0) : NO_GROUPS;

  const contrastMax = base && base.dtype === "Uint8" ? 255 : Math.max(255, Math.ceil(contrastHi * 4));

  return (
    <div
      className={cn("spatial-rx-widget volume-cube relative min-w-0 w-full", dark && "dark")}
      data-labels={labelsState}
      data-channels={hasCells ? 2 : 1}
      data-highlight={legend.length}
      data-render={mode}
      data-pan={`${panX},${panY}`}
    >
      <div ref={hostRef} className="relative h-[520px] w-full overflow-hidden rounded-md bg-neutral-950">
        {layerProps && displayViewStates ? (
          <VivViewer
            {...({
              layerProps,
              views,
              viewStates: displayViewStates,
              onViewStateChange,
              useDevicePixels: false,
            } as unknown as React.ComponentProps<typeof VivViewer>)}
          />
        ) : null}
        {status ? <p className="p-4 text-sm text-neutral-400">{status}</p> : null}
        {legend.length ? (
          <div
            className="pointer-events-none absolute top-2 left-2 flex max-w-[60%] flex-wrap gap-1"
            aria-label="Highlighted cells"
          >
            {legend.map((g) => (
              <Badge key={g.name} variant="outline" className="border-white/15 bg-neutral-900/70 text-neutral-100">
                <span className="size-2 rounded-full" style={{ backgroundColor: g.color }} />
                {g.name}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
      <CubeControls
        preset={presetOf(viewState)}
        onPreset={applyPreset}
        onReset={resetView}
        mode={mode}
        onMode={setMode}
        labelsAvailable={Boolean(labels_url)}
        showLabels={showLabels}
        onShowLabels={setShowLabels}
        cuts={{
          x: {
            bounds: winX,
            value: xShown,
            onLive: setXLive,
            onCommit: (v) => commit({ slice_x_min: v[0], slice_x_max: v[1] }),
          },
          y: {
            bounds: winY,
            value: yShown,
            onLive: setYLive,
            onCommit: (v) => commit({ slice_y_min: v[0], slice_y_max: v[1] }),
          },
          z: {
            bounds: stackZ,
            value: zShown,
            onLive: setZLive,
            onCommit: (v) => commit({ slice_z_min: v[0], slice_z_max: v[1] }),
          },
        }}
        contrast={{
          max: contrastMax,
          value: cLive,
          onLive: setCLive,
          onCommit: (v) => commit({ contrast_limits: v }),
        }}
      />
      <p className="mt-1 text-xs text-muted-foreground">
        window {Math.round(window_cx)}, {Math.round(window_cy)} · {window_size_um} µm · {sliceReadout}
        {level && level.index > 0 ? ` · level ${level.index}` : ""}
      </p>
    </div>
  );
}
