export const LANDMARK_COLORS = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3",
];
export const SELECTION_COLORS = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"];
/** Additive channels for multi-gene blend (selection order): magenta / lime / azure. */
export const GENE_COLORS = ["#ff0099", "#b8ff00", "#00b7ff"];
export const MAX_ACTIVE_GENES = GENE_COLORS.length;
export type GeneScaleMode = "independent" | "shared";
export const BUFFERABLE = ["line", "spline", "gradient"];
export const TENSION_TYPES = ["spline", "shape", "gradient"];

export const MODE_LABELS: Record<string, string> = {
  pointer: "Pointer",
  move: "Move",
  selection: "Selection",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape",
};

/** Top-level interaction tools (left ToggleGroup). */
export const INTERACTION_MODE_IDS = ["pointer", "move", "selection"];
/** Selection geometry engine modes (Selection tool uses default; no Topbar shape picker). */
export const GEOMETRY_MODE_IDS = ["lasso", "polygon", "rectangle", "ellipse"];
export const LANDMARK_MODE_IDS = ["point", "line", "spline", "shape"];

/** @deprecated use INTERACTION_MODE_IDS + GEOMETRY_MODE_IDS */
export const SELECT_MODE_IDS = ["pointer", "move", "lasso", "polygon", "rectangle", "ellipse"];

export function isGeometryMode(mode: string) {
  return GEOMETRY_MODE_IDS.includes(mode);
}

export function isLandmarkMode(mode: string) {
  return LANDMARK_MODE_IDS.includes(mode);
}

/** Map concrete mode → left-group interaction value (empty when landmark). */
export function interactionFromMode(mode: string) {
  if (mode === "pointer" || mode === "move") return mode;
  if (isGeometryMode(mode)) return "selection";
  return "";
}

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

export type GeneColumn = {
  name: string;
  vmin?: number;
  vmax?: number;
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

export function spatialDiag(xBounds: number[], yBounds: number[]) {
  const [xMin, xMax] = xBounds;
  const [yMin, yMax] = yBounds;
  return Math.hypot(Math.abs(xMax - xMin), Math.abs(yMax - yMin));
}

export function formatParam(value: number, empty = "off") {
  if (!value) return empty;
  return value.toPrecision(3);
}

/** Compact numeric labels for gene expression scales. */
export function formatLegendValue(value: number | undefined | null) {
  if (value == null || !Number.isFinite(value)) return "";
  const a = Math.abs(value);
  if (a !== 0 && (a >= 1000 || a < 0.01)) return value.toExponential(1);
  if (a >= 100) return value.toFixed(0);
  if (a >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

export type LandmarkPoint = { x: number; y: number };

export const LABELABLE_TYPES = ["point", "line", "spline", "shape"];

export function copyLandmark(id: string, landmarks: LandmarkItem[]): LandmarkItem | null {
  const lm = landmarks.find((l) => l.id === id);
  return lm ? { ...lm } : null;
}

export function pasteLandmark(
  lm: LandmarkItem,
  existingIds: Set<string>,
): LandmarkItem {
  const nextId = nextNumberedId("landmark", [...existingIds, lm] as LandmarkItem[]);
  return { ...lm, id: nextId };
}

function nextNumberedId(prefix: string, items: LandmarkItem[]): string {
  const used = new Set(items.map((x) => String(x.id)));
  for (let i = 1; ; i++) {
    const id = `${prefix} ${i}`;
    if (!used.has(id)) return id;
  }
}
