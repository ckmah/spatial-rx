import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VolumeViewer, getDefaultInitialViewState, loadOmeZarr } from "@hms-dbmi/viv";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

function absoluteUrl(url: string): string {
  if (!url) return url;
  return new URL(url, window.location.href).href;
}

function axisSize(loader: Loader, axis: string): number {
  const i = loader.labels.indexOf(axis);
  return i >= 0 ? loader.shape[i]! : 1;
}

function clampRange(center: number, size: number, limit: number): [number, number] {
  const half = size / 2;
  let a = center - half;
  let b = center + half;
  if (b - a > limit) {
    a = 0;
    b = limit;
  }
  if (a < 0) {
    b -= a;
    a = 0;
  }
  if (b > limit) {
    a -= b - limit;
    b = limit;
  }
  return [Math.max(0, a), Math.min(limit, b)];
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
    rotationX: 35,
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
  const { image_url, labels_url, window_cx, window_cy, window_size_um } =
    useModel<VolumeCubeModel>(model, [
      "image_url",
      "labels_url",
      "window_cx",
      "window_cy",
      "window_size_um",
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
  const [zMin, setZMin] = useState(0);
  const [zMax, setZMax] = useState(1);

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
        const depth = axisSize(pyramid[0]!, "z");
        setZMin(0);
        setZMax(depth);
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
    () => clampRange(window_cx, window_size_um, width),
    [window_cx, window_size_um, width],
  );
  const ySlice = useMemo(
    () => clampRange(window_cy, window_size_um, height),
    [window_cy, window_size_um, height],
  );
  const zSlice = useMemo(
    (): [number, number] => [Math.min(zMin, zMax), Math.max(zMin, zMax)],
    [zMin, zMax],
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
        rotationX: 35,
        rotationOrbit: 45,
        minZoom: -4,
        maxZoom: 6,
      }),
      ...next.viewState,
      id: "3d",
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
        <div className="flex min-w-40 items-center gap-2">
          <Label className="shrink-0">Z min</Label>
          <Slider
            min={0}
            max={depth}
            step={1}
            value={[zMin]}
            onValueChange={(v) => setZMin(v[0] ?? 0)}
          />
        </div>
        <div className="flex min-w-40 items-center gap-2">
          <Label className="shrink-0">Z max</Label>
          <Slider
            min={0}
            max={depth}
            step={1}
            value={[zMax]}
            onValueChange={(v) => setZMax(v[0] ?? depth)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          window {Math.round(window_cx)}, {Math.round(window_cy)} · {window_size_um} µm · full Z
        </p>
      </div>
    </div>
  );
}
