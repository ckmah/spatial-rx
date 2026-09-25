import * as zarr from "zarrita";

/**
 * Windowed volume loading for Viv.
 *
 * Viv's VolumeLayer is not tiled: it reads every Z plane of its source at full
 * width and height into one 3D texture. Handing it a whole Region mosaic
 * would fetch gigabytes and exceed the GPU's 3D texture limit, so the cube
 * hands it a source that *is* the inspect window instead: a box cut from one
 * pyramid level, fetched with a single `zarr.get` so each Zarr chunk (or shard
 * chunk) is read once, then served to Viv plane by plane.
 */

/** The subset of Viv's ZarrPixelSource this module relies on. */
export type ZarrSource = {
  shape: number[];
  labels: string[];
  dtype: string;
  tileSize: number;
  _data: zarr.Array<zarr.DataType, zarr.Readable>;
};

/** Level-0 physical frame, (z, y, x): `coord = origin + voxel * size`. */
export type Frame = {
  voxelSize: [number, number, number];
  origin: [number, number, number];
};

/** Half-open voxel box in one level's index space. */
export type Box = { z0: number; z1: number; y0: number; y1: number; x0: number; x1: number };

export type Level = {
  index: number;
  source: ZarrSource;
  /** Per-axis downsample from level 0, (z, y, x). */
  factor: [number, number, number];
};

/** Voxels one window may load. 64 M uint8 voxels is 64 MB of texture. */
export const WINDOW_VOXEL_BUDGET = 64 * 1024 * 1024;
/** WebGL2 guarantees 256 per 3D texture axis; desktop GPUs report 2048. */
export const MAX_TEXTURE_AXIS = 2048;

export function axisSize(source: { shape: number[]; labels: string[] }, axis: string): number {
  const i = source.labels.indexOf(axis);
  return i >= 0 ? source.shape[i]! : 1;
}

export function pyramidLevels(pyramid: ZarrSource[]): Level[] {
  const base = pyramid[0]!;
  return pyramid.map((source, index) => ({
    index,
    source,
    factor: (["z", "y", "x"] as const).map(
      (axis) => axisSize(base, axis) / axisSize(source, axis),
    ) as [number, number, number],
  }));
}

/** Level-0 voxels spanned by a square window of `sizeUm` over the full depth. */
function windowVoxels0(base: ZarrSource, frame: Frame, sizeUm: number): [number, number, number] {
  return [
    axisSize(base, "z"),
    Math.min(axisSize(base, "y"), Math.ceil(sizeUm / frame.voxelSize[1])),
    Math.min(axisSize(base, "x"), Math.ceil(sizeUm / frame.voxelSize[2])),
  ];
}

/** Finest level whose window fits the voxel budget and the texture axis limit. */
export function pickLevel(levels: Level[], frame: Frame, sizeUm: number): Level {
  const [d0, h0, w0] = windowVoxels0(levels[0]!.source, frame, sizeUm);
  for (const level of levels) {
    const [fz, fy, fx] = level.factor;
    const d = Math.ceil(d0 / fz);
    const h = Math.ceil(h0 / fy);
    const w = Math.ceil(w0 / fx);
    if (d * h * w <= WINDOW_VOXEL_BUDGET && Math.max(d, h, w) <= MAX_TEXTURE_AXIS) {
      return level;
    }
  }
  return levels[levels.length - 1]!;
}

/** Window box in `level` voxels, clamped to the level; full depth in Z. */
export function windowBox(
  level: Level,
  frame: Frame,
  cx: number,
  cy: number,
  sizeUm: number,
): Box {
  const [, fy, fx] = level.factor;
  const [, sy, sx] = frame.voxelSize;
  const [, oy, ox] = frame.origin;
  const height = axisSize(level.source, "y");
  const width = axisSize(level.source, "x");
  const half = sizeUm / 2;
  const clamp = (v: number, limit: number) => Math.max(0, Math.min(limit, v));
  return {
    z0: 0,
    z1: axisSize(level.source, "z"),
    y0: clamp(Math.floor((cy - half - oy) / (sy * fy)), height),
    y1: clamp(Math.ceil((cy + half - oy) / (sy * fy)), height),
    x0: clamp(Math.floor((cx - half - ox) / (sx * fx)), width),
    x1: clamp(Math.ceil((cx + half - ox) / (sx * fx)), width),
  };
}

export function boxIsEmpty(box: Box): boolean {
  return box.x1 <= box.x0 || box.y1 <= box.y0 || box.z1 <= box.z0;
}

type Raster = { data: ArrayLike<number> & { subarray(a: number, b: number): unknown }; width: number; height: number };

/**
 * A Viv pixel source over one window of one pyramid level.
 *
 * Shape and labels match the level except that Y, X and Z are the box extent,
 * so Viv's VolumeLayer loads exactly the window. `meta.physicalSizes` keeps the
 * voxel aspect (e.g. 0.45 um XY against 0.5 um Z) in the rendered cube.
 */
export class WindowPixelSource {
  readonly labels: string[];
  readonly tileSize: number;
  readonly meta: { physicalSizes: Record<"x" | "y" | "z", { size: number; unit: string }> };
  private readonly blocks = new Map<string, Promise<zarr.Chunk<zarr.DataType>>>();

  constructor(
    private readonly base: ZarrSource,
    readonly box: Box,
    voxelSize: [number, number, number],
  ) {
    this.labels = base.labels;
    this.tileSize = base.tileSize;
    const [sz, sy, sx] = voxelSize;
    this.meta = {
      physicalSizes: {
        x: { size: sx, unit: "µm" },
        y: { size: sy, unit: "µm" },
        z: { size: sz, unit: "µm" },
      },
    };
  }

  get shape(): number[] {
    const extent: Record<string, number> = {
      z: this.box.z1 - this.box.z0,
      y: this.box.y1 - this.box.y0,
      x: this.box.x1 - this.box.x0,
    };
    return this.base.shape.map((n, i) => extent[this.labels[i]!] ?? n);
  }

  get dtype(): string {
    return this.base.dtype;
  }

  get width(): number {
    return this.box.x1 - this.box.x0;
  }

  get height(): number {
    return this.box.y1 - this.box.y0;
  }

  /** The whole window for one (t, c), fetched once and shared by every plane. */
  private block(selection: Record<string, number>): Promise<zarr.Chunk<zarr.DataType>> {
    const key = this.labels
      .filter((l) => l !== "z" && l !== "y" && l !== "x")
      .map((l) => selection[l] ?? 0)
      .join("/");
    let pending = this.blocks.get(key);
    if (!pending) {
      const { z0, z1, y0, y1, x0, x1 } = this.box;
      const index = this.labels.map((label) => {
        if (label === "z") return zarr.slice(z0, z1);
        if (label === "y") return zarr.slice(y0, y1);
        if (label === "x") return zarr.slice(x0, x1);
        return selection[label] ?? 0;
      });
      pending = zarr.get(this.base._data, index) as Promise<zarr.Chunk<zarr.DataType>>;
      // A failed fetch must not poison later retries of the same window.
      pending.catch(() => this.blocks.delete(key));
      this.blocks.set(key, pending);
    }
    return pending;
  }

  async getRaster({ selection }: { selection: Record<string, number>; signal?: AbortSignal }): Promise<Raster> {
    const block = await this.block(selection);
    const plane = this.width * this.height;
    const z = selection.z ?? 0;
    const data = block.data as unknown as Raster["data"];
    return {
      data: data.subarray(z * plane, (z + 1) * plane) as Raster["data"],
      width: this.width,
      height: this.height,
    };
  }

  async getTile(): Promise<never> {
    throw new Error("WindowPixelSource serves whole planes only (VolumeViewer)");
  }

  onTileError(err: Error): void {
    throw err;
  }
}
