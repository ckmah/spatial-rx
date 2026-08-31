export type EngineHandle = {
  zoomBy(delta: number): void;
  resetZoom(): void;
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
