import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColorPalette3DExtensions,
  VolumeViewer,
  loadOmeZarr,
} from "@hms-dbmi/viv";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

import {
  type Frame,
  type Level,
  type ZarrSource,
  WindowPixelSource,
  axisSize,
  boxIsEmpty,
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
};

type ViewState = {
  id: string;
  target: number[];
  zoom: number;
  rotationX: number;
  rotationOrbit: number;
  minZoom: number;
  maxZoom: number;
};

const ISO_PITCH = 35;
const HOME_ZOOM_BACKOFF = 0.75;
const DEFAULT_CONTRAST: [number, number] = [0, 48];
const DEFAULT_VOXEL_SIZE: [number, number, number] = [1, 1, 1];
const DEFAULT_ORIGIN: [number, number, number] = [0, 0, 0];
/** Coalesce the separate window_cx / window_cy updates of one inspect click. */
const WINDOW_DEBOUNCE_MS = 120;

/** Viv volume raycast: additive compositing (not maximum-intensity projection). */
const VOLUME_EXTENSIONS = [new ColorPalette3DExtensions.AdditiveBlendExtension()];

function absoluteUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

function clampRange(lo: number, hi: number, min: number, max: number): [number, number] {
  return [Math.max(min, Math.min(lo, hi)), Math.min(max, Math.max(lo, hi))];
}

function viewStatesEqual(a: ViewState, b: ViewState): boolean {
  return (
    a.zoom === b.zoom &&
    a.rotationOrbit === b.rotationOrbit &&
    a.rotationX === b.rotationX &&
    a.minZoom === b.minZoom &&
    a.maxZoom === b.maxZoom &&
    a.target[0] === b.target[0] &&
    a.target[1] === b.target[1] &&
    a.target[2] === b.target[2]
  );
}

/** Home camera frames the inspect window, in the window source's world units. */
function isoHome(
  fit: { width: number; height: number },
  view: { width: number; height: number },
): ViewState {
  const zoom =
    Math.log2(Math.min(view.width / fit.width, view.height / fit.height)) - HOME_ZOOM_BACKOFF;
  return {
    id: "3d",
    target: [0, 0, 0],
    zoom,
    rotationX: ISO_PITCH,
    rotationOrbit: 45,
    minZoom: zoom - 2,
    maxZoom: zoom + 4,
  };
}

function useDebounced<T>(value: T, ms: number): T {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setSettled(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return settled;
}

export function VolumeCubeView({
  model,
  hostEl,
}: {
  hostEl: HTMLElement;
  model: {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    save_changes(): void;
    on(event: string, callback: () => void): void;
    off?(event: string, callback: () => void): void;
  };
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const {
    image_url,
    labels_url,
    window_cx,
    window_cy,
    window_size_um,
    slice_z_min,
    slice_z_max,
    contrast_limits,
    voxel_size_um,
    origin_um,
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
  ]);

  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 640, height: 520 });
  const [image, setImage] = useState<ZarrSource[] | null>(null);
  const [labels, setLabels] = useState<ZarrSource[] | null>(null);
  const [error, setError] = useState("");
  const [showLabels, setShowLabels] = useState(false);
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
        setBox((prev) =>
          prev.width === width && prev.height === height ? prev : { width, height },
        );
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

  useEffect(() => {
    let cancelled = false;
    if (!showLabels || !labels_url) {
      setLabels(null);
      return;
    }
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
  }, [showLabels, labels_url]);

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

  // Voxel size at the chosen level, and world scale relative to X (Viv's convention).
  const levelVoxel: [number, number, number] | null = level
    ? [szUm * level.factor[0], syUm * level.factor[1], sxUm * level.factor[2]]
    : null;
  const ry = levelVoxel ? levelVoxel[1] / levelVoxel[2] : 1;
  const rz = levelVoxel ? levelVoxel[0] / levelVoxel[2] : 1;

  // New loader identities make VolumeLayer refetch, which is the point here:
  // one fetch per window, keyed on the voxel box rather than the raw traits.
  const imageLoader = useMemo(() => {
    if (!level || !windowVoxels || !levelVoxel || boxIsEmpty(windowVoxels)) return null;
    return [new WindowPixelSource(level.source, windowVoxels, levelVoxel)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, boxKey, levelVoxel?.join(",")]);
  const labelsLoader = useMemo(() => {
    if (!labels || !level || !windowVoxels || !levelVoxel || boxIsEmpty(windowVoxels)) return null;
    const source = labels[Math.min(level.index, labels.length - 1)]!;
    return [new WindowPixelSource(source, windowVoxels, levelVoxel)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, level, boxKey, levelVoxel?.join(",")]);

  const winW = windowVoxels ? windowVoxels.x1 - windowVoxels.x0 : 1;
  const winH = windowVoxels ? windowVoxels.y1 - windowVoxels.y0 : 1;
  const levelDepth = level ? axisSize(level.source, "z") : 1;
  const xSlice = useMemo(() => [0, winW] as [number, number], [winW]);
  const ySlice = useMemo(() => [0, winH] as [number, number], [winH]);
  const zSlice = useMemo(() => {
    const scale = levelVoxel ? levelVoxel[0] : 1;
    return clampRange((slice_z_min - ozUm) / scale, (slice_z_max - ozUm) / scale, 0, levelDepth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slice_z_min, slice_z_max, ozUm, levelDepth, levelVoxel?.[0]]);

  const aimTarget = useMemo(
    () => [winW / 2, (winH / 2) * ry, ((zSlice[0] + zSlice[1]) / 2) * rz],
    [winW, winH, ry, rz, zSlice[0], zSlice[1]],
  );
  fixedTargetRef.current = aimTarget;

  // Fit the nominal window, not the clamped box, so the zoom holds at edges.
  const fit = useMemo(() => {
    if (!level) return null;
    const width = Math.min(axisSize(level.source, "x"), window_size_um / (sxUm * level.factor[2]));
    const height = Math.min(axisSize(level.source, "y"), window_size_um / (syUm * level.factor[1]));
    return { width, height: height * ry };
  }, [level, window_size_um, sxUm, syUm, ry]);

  useEffect(() => {
    if (fit && !viewState) setViewState(isoHome(fit, box));
  }, [fit, viewState, box]);

  const displayViewStates = useMemo(() => {
    if (!viewState) return undefined;
    return [{ ...viewState, id: "3d", target: aimTarget, rotationX: ISO_PITCH }];
  }, [viewState, aimTarget]);

  const resetView = useCallback(() => {
    if (!fit) return;
    setViewState(isoHome(fit, box));
  }, [fit, box]);

  const selections = useMemo(() => [{}], []);
  const channelsVisible = useMemo(() => [true], []);
  const [contrastLo, contrastHi] = contrast_limits ?? DEFAULT_CONTRAST;
  const imageContrast = useMemo(
    () => [[contrastLo, contrastHi]] as [number, number][],
    [contrastLo, contrastHi],
  );
  const imageColors = useMemo(() => [[220, 225, 230]] as [number, number, number][], []);
  const labelContrast = useMemo(() => [[0, 3]] as [number, number][], []);
  const labelColors = useMemo(() => [[255, 96, 48]] as [number, number, number][], []);

  const onViewStateChange = useCallback(
    ({
      viewState: next,
    }: {
      viewId: string;
      viewState: ViewState;
      interactionState?: Record<string, unknown>;
      oldViewState?: ViewState;
    }) => {
      const fixedTarget = fixedTargetRef.current;
      const clamped: ViewState = {
        ...next,
        id: "3d",
        target: fixedTarget ?? next.target,
        rotationX: ISO_PITCH,
      };
      setViewState((prev) => (prev && viewStatesEqual(prev, clamped) ? prev : clamped));
      return clamped;
    },
    [],
  );

  const sharedView = useMemo(
    () => ({
      channelsVisible,
      selections,
      extensions: VOLUME_EXTENSIONS,
      useFixedAxis: true,
      xSlice,
      ySlice,
      zSlice,
      height: box.height,
      width: box.width,
      viewStates: displayViewStates,
      onViewStateChange,
    }),
    [
      box.height,
      box.width,
      displayViewStates,
      onViewStateChange,
      selections,
      channelsVisible,
      xSlice,
      ySlice,
      zSlice,
    ],
  );

  // Readout in trait units (the store's physical frame), clamped to the volume.
  const base = image?.[0];
  const extentX = base ? oxUm + axisSize(base, "x") * sxUm : oxUm;
  const extentY = base ? oyUm + axisSize(base, "y") * syUm : oyUm;
  const extentZ = base ? ozUm + axisSize(base, "z") * szUm : ozUm;
  const half = window_size_um / 2;
  const readX = clampRange(window_cx - half, window_cx + half, oxUm, extentX);
  const readY = clampRange(window_cy - half, window_cy + half, oyUm, extentY);
  const readZ = clampRange(slice_z_min, slice_z_max, ozUm, extentZ);
  const sliceReadout = `X ${Math.round(readX[0])}–${Math.round(readX[1])} · Y ${Math.round(readY[0])}–${Math.round(readY[1])} · Z ${Math.round(readZ[0])}–${Math.round(readZ[1])}`;
  const outside = windowVoxels ? boxIsEmpty(windowVoxels) : false;

  let status = "";
  if (!image) status = error || "Loading volume…";
  else if (outside) status = "Inspect window is outside the volume";

  return (
    <div className={cn("spatial-rx-widget volume-cube relative min-w-0 w-full", dark && "dark")}>
      <div ref={hostRef} className="relative h-[520px] w-full overflow-hidden rounded-md bg-neutral-950">
        {imageLoader && displayViewStates ? (
          <VolumeViewer
            loader={imageLoader}
            contrastLimits={imageContrast}
            colors={imageColors}
            {...sharedView}
          />
        ) : null}
        {status ? <p className="p-4 text-sm text-neutral-400">{status}</p> : null}
        {showLabels && labelsLoader && imageLoader && displayViewStates ? (
          <div className="pointer-events-none absolute inset-0">
            <VolumeViewer
              loader={labelsLoader}
              contrastLimits={labelContrast}
              colors={labelColors}
              {...sharedView}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" variant="outline" onClick={resetView}>
          Reset
        </Button>
        <div className="flex items-center gap-2">
          <Switch
            id="volume-cube-labels"
            size="sm"
            checked={showLabels}
            onCheckedChange={setShowLabels}
          />
          <Label htmlFor="volume-cube-labels">Labels</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          window {Math.round(window_cx)}, {Math.round(window_cy)} · {window_size_um} µm · {sliceReadout}
          {level && level.index > 0 ? ` · level ${level.index}` : ""}
        </p>
      </div>
    </div>
  );
}
