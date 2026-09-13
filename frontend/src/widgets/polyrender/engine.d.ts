import type { ReactElement } from "react";

type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

type ViewCommand = { id: number; preset: "top" | "side" | "reset" } | null;

export function PolyrenderScene(props: {
  model: AnyModel;
  opacity: number;
  wireframe: boolean;
  background: string;
  showGrid: boolean;
  zMin: number;
  zMax: number;
  viewCommand: ViewCommand;
  frameTick: number;
}): ReactElement;
