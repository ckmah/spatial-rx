export type EngineHandle = {
  zoomBy(delta: number): void;
  resetZoom(): void;
  resize(): void;
  getViewState(): {
    target?: number[];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    [key: string]: unknown;
  } | null;
  getSelectionOverlay(): Array<{
    index: number;
    selected: boolean;
    pointCount: number;
    lineWidth: number;
    lineAlpha: number;
  }>;
  getNeighborhoodOverlay(): {
    mode: string;
    edgeCount: number;
    /** Always 0 — stroked per-seed disks removed in favor of soft gradient. */
    radiusDiskCount: number;
    radiusGradient: boolean;
    gradientKind: "bitmap" | null;
    gradientSeedCount: number;
    gradientTextureSize: [number, number] | null;
    gradientBounds: [number, number, number, number] | null;
    /** r_max used for the distance-field bake; remap uses current radius. */
    gradientBakeRadius: number | null;
    radius: number;
    k: number;
  };
  getHover(): { kind: string; index: number } | null;
  getInspectPin(): { kind: string; index: number } | null;
  destroy(): void;
};

type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

/** Mount the deck.gl drawing board into an empty plot-slot host. */
export function mountEngine(opts: {
  model: AnyModel;
  host: HTMLElement;
}): EngineHandle;
