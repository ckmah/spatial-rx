export const LANDMARK_COLORS = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3",
];
export const SELECTION_COLORS = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"];
export const BUFFERABLE = ["line", "spline", "gradient"];
export const TENSION_TYPES = ["spline", "shape", "gradient"];

export const MODE_LABELS: Record<string, string> = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape",
};

export const SELECT_MODE_IDS = ["select", "lasso"];
export const LANDMARK_MODE_IDS = ["point", "line", "spline", "shape"];

export type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

export type LandmarkItem = {
  id: string;
  type: string;
  hidden?: boolean;
  tension?: number;
  buffer_width?: number;
  buffer_side?: string;
  vertices?: number[][];
  [key: string]: unknown;
};

export type SelectionItem = {
  id: string;
  type: string;
  neighborhood?: string;
  neighborhood_radius?: number;
  neighborhood_k?: number;
  [key: string]: unknown;
};

export type CategoryColumn = {
  name: string;
  labels?: string[];
  palette?: string[];
};

export type TypeNeighborhood = {
  id: string;
  column?: string;
  neighborhood?: string;
  neighborhood_radius?: number;
  neighborhood_k?: number;
};

export function maxBufferWidth(xBounds: number[], yBounds: number[]) {
  const [xMin, xMax] = xBounds;
  const [yMin, yMax] = yBounds;
  return 0.25 * Math.min(Math.abs(xMax - xMin), Math.abs(yMax - yMin));
}

export function formatParam(value: number, empty = "off") {
  if (!value) return empty;
  return value.toPrecision(3);
}
