import { useMemo, useState, type PointerEvent } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { VolumeCubeView } from "@/widgets/volume-cube/VolumeCubeView";

const EXTENT_XY = 256;
const EXTENT_Z = 64;
const SIZE = 100;

type Model = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

function mockModel(values: Record<string, unknown>): Model {
  const data = { ...values };
  const listeners = new Map<string, Set<() => void>>();
  return {
    get: (key) => data[key],
    set: (key, value) => {
      data[key] = value;
      listeners.get(key)?.forEach((fn) => fn());
    },
    save_changes() {},
    on(event, fn) {
      const key = event.replace(/^change:/, "");
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(fn);
    },
    off(event, fn) {
      const key = event.replace(/^change:/, "");
      if (fn) listeners.get(key)?.delete(fn);
    },
  };
}

function SliceControls({
  label,
  max,
  minKey,
  maxKey,
  model,
}: {
  label: string;
  max: number;
  minKey: string;
  maxKey: string;
  model: Model;
}) {
  const [range, setRange] = useState<[number, number]>([
    Number(model.get(minKey)),
    Number(model.get(maxKey)),
  ]);

  return (
    <div className="flex min-w-44 flex-col gap-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Slider
        min={0}
        max={max}
        step={1}
        value={range}
        onValueChange={(value) => {
          const next: [number, number] = [value[0] ?? 0, value[1] ?? max];
          setRange(next);
          model.set(minKey, next[0]);
          model.set(maxKey, next[1]);
        }}
      />
    </div>
  );
}

function ToyInspect({
  model,
}: {
  model: Model;
}) {
  const [center, setCenter] = useState({ x: EXTENT_XY / 2, y: EXTENT_XY / 2 });

  function place(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * EXTENT_XY;
    const y = ((event.clientY - rect.top) / rect.height) * EXTENT_XY;
    const next = { x, y };
    setCenter(next);
    model.set("window_cx", x);
    model.set("window_cy", y);
  }

  const half = (SIZE / EXTENT_XY) * 100;
  const left = (center.x / EXTENT_XY) * 100 - half / 2;
  const top = (center.y / EXTENT_XY) * 100 - half / 2;

  return (
    <div className="flex w-72 shrink-0 flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        Toy inspect. Drag the 100 µm square. Tissue is {EXTENT_XY} µm.
      </p>
      <div
        className="relative h-72 w-72 cursor-crosshair rounded-md bg-neutral-900"
        onPointerDown={place}
        onPointerMove={(event) => {
          if (event.buttons === 1) place(event);
        }}
      >
        <div
          className="pointer-events-none absolute border border-white/80 bg-white/10"
          style={{
            width: `${half}%`,
            height: `${half}%`,
            left: `${left}%`,
            top: `${top}%`,
          }}
        />
      </div>
    </div>
  );
}

function Harness() {
  const model = useMemo(() => {
    const m = mockModel({
      image_url: "/toy.ome.zarr/",
      labels_url: "/toy.ome.zarr/labels/cells/",
      window_cx: EXTENT_XY / 2,
      window_cy: EXTENT_XY / 2,
      window_size_um: SIZE,
      slice_x_min: 0,
      slice_x_max: EXTENT_XY,
      slice_y_min: 0,
      slice_y_max: EXTENT_XY,
      slice_z_min: 0,
      slice_z_max: EXTENT_Z,
    });
    (window as unknown as { __volumeCubeModel?: Model }).__volumeCubeModel = m;
    return m;
  }, []);
  const host = useMemo(() => document.body, []);
  return (
    <div className="dark flex min-h-screen gap-4 bg-neutral-950 p-4 text-neutral-100">
      <div className="flex w-72 shrink-0 flex-col gap-4">
        <ToyInspect model={model} />
        <SliceControls
          label="X slice (µm)"
          max={EXTENT_XY}
          minKey="slice_x_min"
          maxKey="slice_x_max"
          model={model}
        />
        <SliceControls
          label="Y slice (µm)"
          max={EXTENT_XY}
          minKey="slice_y_min"
          maxKey="slice_y_max"
          model={model}
        />
        <SliceControls
          label="Z slice (µm)"
          max={EXTENT_Z}
          minKey="slice_z_min"
          maxKey="slice_z_max"
          model={model}
        />
      </div>
      <div className="min-w-0 flex-1">
        <VolumeCubeView model={model} hostEl={host} />
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("missing #root");
createRoot(root).render(<Harness />);
