import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColorPalette3DExtensions,
  VolumeViewer,
  getDefaultInitialViewState,
  loadOmeZarr,
} from "@hms-dbmi/viv";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

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
};

type Loader = {
  shape: number[];
  labels: string[];
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

/** Viv volume raycast: additive compositing (not maximum-intensity projection). */
const VOLUME_EXTENSIONS = [new ColorPalette3DExtensions.AdditiveBlendExtension()];

function absoluteUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

function axisSize(loader: Loader, axis: string): number {
  const i = loader.labels.indexOf(axis);
  return i >= 0 ? loader.shape[i]! : 1;
}

function orderedSlice(min: number, max: number, limit: number): [number, number] {
  const lo = Math.max(0, Math.min(min, max));
  const hi = Math.min(limit, Math.max(min, max));
  return [lo, hi];
}

function windowAxisSlice(center: number, sizeUm: number, limit: number): [number, number] {
  const half = sizeUm / 2;
  return orderedSlice(center - half, center + half, limit);
}

function windowTarget(cx: number, cy: number, zSlice: [number, number]): number[] {
  return [Math.round(cx), Math.round(cy), (zSlice[0] + zSlice[1]) / 2];
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

function isoHome(loader: Loader, view: { width: number; height: number }): ViewState {
  const base = getDefaultInitialViewState(loader, view, 0.35, true) as {
    target: number[];
    zoom: number;
  };
  return {
    id: "3d",
    target: base.target,
    zoom: base.zoom,
    rotationX: ISO_PITCH,
    rotationOrbit: 45,
    minZoom: base.zoom - 2,
    maxZoom: base.zoom + 4,
  };
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
    slice_x_min,
    slice_x_max,
    slice_y_min,
    slice_y_max,
    slice_z_min,
    slice_z_max,
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
  ]);

  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 640, height: 520 });
  const boxRef = useRef(box);
  boxRef.current = box;
  const [image, setImage] = useState<Loader[] | null>(null);
  const [labels, setLabels] = useState<Loader[] | null>(null);
  const [error, setError] = useState("");
  const [showLabels, setShowLabels] = useState(false);
  const [viewState, setViewState] = useState<ViewState | null>(null);
  /** Pan must not drift the cube; slice traits move the visible content instead. */
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
    if (!image_url) return;
    (async () => {
      try {
        const loaded = await loadOmeZarr(absoluteUrl(image_url), { type: "multiscales" });
        if (cancelled) return;
        const pyramid = loaded.data as Loader[];
        const zMid = (slice_z_min + slice_z_max) / 2;
        const target = [Math.round(window_cx), Math.round(window_cy), zMid];
        fixedTargetRef.current = target;
        const home = isoHome(pyramid[0]!, boxRef.current);
        setImage(pyramid);
        setViewState({ ...home, target });
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
        if (!cancelled) setLabels(lab.data as Loader[]);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showLabels, labels_url]);

  const source = image?.[0];
  const width = source ? axisSize(source, "x") : 1;
  const height = source ? axisSize(source, "y") : 1;
  const depth = source ? axisSize(source, "z") : 1;
  const winX = Math.round(window_cx);
  const winY = Math.round(window_cy);
  const xSlice = useMemo(
    () => windowAxisSlice(winX, window_size_um, width),
    [winX, window_size_um, width],
  );
  const ySlice = useMemo(
    () => windowAxisSlice(winY, window_size_um, height),
    [winY, window_size_um, height],
  );
  const zSlice = useMemo(
    () => orderedSlice(slice_z_min, slice_z_max, depth),
    [slice_z_min, slice_z_max, depth],
  );

  const aimTarget = useMemo(
    () => windowTarget(winX, winY, zSlice),
    [winX, winY, zSlice[0], zSlice[1]],
  );
  fixedTargetRef.current = aimTarget;

  const displayViewStates = useMemo(() => {
    if (!viewState) return undefined;
    return [{ ...viewState, id: "3d", target: aimTarget, rotationX: ISO_PITCH }];
  }, [viewState, aimTarget]);

  const resetView = useCallback(() => {
    if (!source) return;
    fixedTargetRef.current = aimTarget;
    const home = isoHome(source, box);
    setViewState({ ...home, target: aimTarget });
  }, [source, box, aimTarget]);

  // New array identities make VolumeLayer refetch the whole OME-Zarr.
  const selections = useMemo(() => [{}], []);
  const channelsVisible = useMemo(() => [true], []);
  const imageContrast = useMemo(() => [[0, 48]] as [number, number][], []);
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
      xSlice,
      ySlice,
      zSlice,
    ],
  );

  const sliceReadout = `X ${Math.round(xSlice[0])}–${Math.round(xSlice[1])} · Y ${Math.round(ySlice[0])}–${Math.round(ySlice[1])} · Z ${Math.round(zSlice[0])}–${Math.round(zSlice[1])}`;

  return (
    <div className={cn("spatial-rx-widget volume-cube relative min-w-0 w-full", dark && "dark")}>
      <div ref={hostRef} className="relative h-[520px] w-full overflow-hidden rounded-md bg-neutral-950">
        {image ? (
          <VolumeViewer
            loader={image}
            contrastLimits={imageContrast}
            colors={imageColors}
            {...sharedView}
          />
        ) : (
          <p className="p-4 text-sm text-neutral-400">{error || "Loading volume…"}</p>
        )}
        {showLabels && labels && image ? (
          <div className="pointer-events-none absolute inset-0">
            <VolumeViewer
              loader={labels}
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
        </p>
      </div>
    </div>
  );
}
