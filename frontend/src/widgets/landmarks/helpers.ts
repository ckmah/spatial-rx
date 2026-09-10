/** Keyboard shortcuts for the landmarks canvas (see engine handleKeyDown). */
export const KEYBOARD_SHORTCUTS: { action: string; keys: string }[] = [
  { action: "Pointer", keys: "V" },
  { action: "Move", keys: "H" },
  { action: "Lasso", keys: "L" },
  { action: "Square", keys: "R" },
  { action: "Circle", keys: "O" },
  { action: "Selection polygon", keys: "G" },
  { action: "Point", keys: "1" },
  { action: "Line", keys: "2" },
  { action: "Spline", keys: "3" },
  { action: "Shape", keys: "4" },
  { action: "Zoom in", keys: "=" },
  { action: "Zoom out", keys: "-" },
  { action: "Reset view", keys: "0" },
  { action: "Full screen", keys: "F" },
  { action: "Copy", keys: "⌘/Ctrl+C" },
  { action: "Cut", keys: "⌘/Ctrl+X" },
  { action: "Paste", keys: "⌘/Ctrl+V" },
  {
    action: "Delete selected landmark or selection",
    keys: "⌫ / Delete",
  },
  { action: "Finish draft", keys: "Enter" },
  { action: "Cancel draft / deselect", keys: "Esc" },
];

/** Mode id → tooltip shortcut glyph. */
export const MODE_SHORTCUTS: Record<string, string> = {
  pointer: "V",
  move: "H",
  lasso: "L",
  rectangle: "R",
  ellipse: "O",
  polygon: "G",
  point: "1",
  line: "2",
  spline: "3",
  shape: "4",
};

/** Landmark stroke accents (dedicated; not the categorical point palette). */
export const LANDMARK_COLORS = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3",
];
/** Quiet Framer-neutral selection strokes (active selection uses stronger chrome). */
export const SELECTION_COLORS = ["#a3a3a3", "#8a8a8a", "#737373", "#c4c4c4"];
/** Additive channels for multi-gene blend (selection order): magenta / lime / azure. */
export const GENE_COLORS = ["#ff0099", "#b8ff00", "#00b7ff"];
export const MAX_ACTIVE_GENES = GENE_COLORS.length;
/** Scatter fallback when no palette is set (landmark cyan — never Tailwind blue). */
export const FALLBACK_POINT_COLOR = LANDMARK_COLORS[0];
export type GeneScaleMode = "independent" | "shared";
export const BUFFERABLE = ["line", "spline", "gradient"];
export const TENSION_TYPES = ["spline", "shape", "gradient"];

export const MODE_LABELS: Record<string, string> = {
  pointer: "Pointer",
  move: "Move",
  selection: "Selection",
  lasso: "Lasso",
  polygon: "Shape",
  rectangle: "Square",
  ellipse: "Circle",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape",
};

/** Top-level interaction tools (left ToggleGroup). */
export const INTERACTION_MODE_IDS = ["pointer", "move"];
/** Selection geometry modes (lasso dropdown on Topbar). */
export const GEOMETRY_MODE_IDS = ["lasso", "rectangle", "ellipse", "polygon"];
export const LANDMARK_MODE_IDS = ["point", "line", "spline", "shape"];

export function isGeometryMode(mode: string) {
  return GEOMETRY_MODE_IDS.includes(mode);
}

/** Map concrete mode → left-group interaction value (empty when landmark/geometry). */
export function interactionFromMode(mode: string) {
  if (mode === "pointer" || mode === "move") return mode;
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
  /** Exact member point indices — preferred membership source. */
  point_indices?: number[];
  hidden?: boolean;
  /** Legacy geometry (read for membership fallback only; new commits omit). */
  vertices?: number[][];
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

export function blendHex(a: string, b: string) {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  const ra = parseInt(pa.slice(0, 2), 16);
  const ga = parseInt(pa.slice(2, 4), 16);
  const ba = parseInt(pa.slice(4, 6), 16);
  const rb = parseInt(pb.slice(0, 2), 16);
  const gb = parseInt(pb.slice(2, 4), 16);
  const bb = parseInt(pb.slice(4, 6), 16);
  const r = Math.min(255, ra + rb);
  const g = Math.min(255, ga + gb);
  const bch = Math.min(255, ba + bb);
  return `#${[r, g, bch].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function parseHexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
