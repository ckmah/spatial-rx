export type PanelSectionId =
  | "selections"
  | "categories"
  | "genes"
  | "landmarks"
  | "inspect"
  | "neighbors"
  | "landmark";

export const LAYER_SECTION_IDS = new Set<PanelSectionId>([
  "selections",
  "categories",
  "genes",
  "landmarks",
]);

export const SECTION_META: Record<PanelSectionId, { label: string }> = {
  selections: { label: "Selections" },
  categories: { label: "Categories" },
  genes: { label: "Genes" },
  landmarks: { label: "Landmarks" },
  inspect: { label: "Inspect" },
  neighbors: { label: "Neighbors" },
  landmark: { label: "Landmark" },
};

export const PANEL_INSET = "px-2.5";
export const SECTION_TRIGGER =
  "landmarks-section-trigger px-0 py-1.5 text-left hover:no-underline";
export const FLOAT_PANEL =
  "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-1 overflow-hidden py-1";
