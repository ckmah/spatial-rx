import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VolumeViewer, getDefaultInitialViewState, loadOmeZarr } from "@hms-dbmi/viv";

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
  const [showLabels, setShowLabels] = useState(true);
  const [viewState, setViewState] = useState<ViewState | null>(null);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const apply = () => {
      const rect = node.getBoundingClientRect();
      setBox({
        width: Math.max(320, Math.round(rect.width)),
        height: Math.max(360, Math.round(rect.height)),
      });
    };
    apply();
    const obs = new ResizeObserver(apply);
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setError("");
    setImage(null);
    setLabels(null);
    if (!image_url) return;
    (async () => {
      try {
        const loaded = await loadOmeZarr(absoluteUrl(image_url), { type: "multiscales" });
        if (cancelled) return;
        const pyramid = loaded.data as Loader[];
        setImage(pyramid);
        setViewState(isoHome(pyramid[0]!, boxRef.current));
        if (labels_url) {
          const lab = await loadOmeZarr(absoluteUrl(labels_url), { type: "multiscales" });
          if (!cancelled) setLabels(lab.data as Loader[]);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [image_url, labels_url]);

  const source = image?.[0];
  const width = source ? axisSize(source, "x") : 1;
  const height = source ? axisSize(source, "y") : 1;
  const depth = source ? axisSize(source, "z") : 1;
  const xSlice = useMemo(
    () => orderedSlice(slice_x_min, slice_x_max, width),
    [slice_x_min, slice_x_max, width],
  );
  const ySlice = useMemo(
    () => orderedSlice(slice_y_min, slice_y_max, height),
    [slice_y_min, slice_y_max, height],
  );
  const zSlice = useMemo(
    () => orderedSlice(slice_z_min, slice_z_max, depth),
    [slice_z_min, slice_z_max, depth],
  );

  const goIso = useCallback(() => {
    if (source) setViewState(isoHome(source, box));
  }, [source, box]);

  // New array identities make VolumeLayer refetch the whole OME-Zarr.
  const selections = useMemo(() => [{}], []);
  const channelsVisible = useMemo(() => [true], []);
  const imageContrast = useMemo(() => [[0, 48]] as [number, number][], []);
  const imageColors = useMemo(() => [[220, 225, 230]] as [number, number, number][], []);
  const labelContrast = useMemo(() => [[0, 3]] as [number, number][], []);
  const labelColors = useMemo(() => [[255, 96, 48]] as [number, number, number][], []);

  const onViewStateChange = useCallback((next: { viewState?: Partial<ViewState> }) => {
    if (!next.viewState) return;
    setViewState((prev) => ({
      ...(prev ?? {
        id: "3d",
        target: [0, 0, 0],
        zoom: 0,
        rotationX: ISO_PITCH,
        rotationOrbit: 45,
        minZoom: -4,
        maxZoom: 6,
      }),
      ...next.viewState,
      id: "3d",
      rotationX: ISO_PITCH,
    }));
  }, []);

  const sharedView = {
    channelsVisible,
    selections,
    xSlice,
    ySlice,
    zSlice,
    height: box.height,
    width: box.width,
    viewStates: viewState ? [viewState] : undefined,
    onViewStateChange,
  };

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
          <div className="pointer-events-none absolute inset-0 mix-blend-screen">
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
        <Button type="button" size="sm" variant="outline" onClick={goIso}>
          Iso
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={goIso}>
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
