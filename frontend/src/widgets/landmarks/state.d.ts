import type {
  AnyModel,
  CategoryColumn,
  LandmarkItem,
  SelectionItem,
  TypeNeighborhood,
} from "./helpers";

export declare const DEFAULT_HOOD: {
  neighborhood: string;
  neighborhood_radius: number;
  neighborhood_k: number;
};

export declare const MAX_ACTIVE_GENES: number;

export declare function withHood<T extends Record<string, unknown>>(
  item: T,
): T & typeof DEFAULT_HOOD;

export declare function applyActiveCategory(
  model: AnyModel,
  col: CategoryColumn,
): void;

export declare function setActiveGenes(
  model: AnyModel,
  names: string[],
): void;

export declare function setGeneScaleMode(
  model: AnyModel,
  mode: "independent" | "shared",
): void;

export declare function setGeneLog1p(model: AnyModel, enabled: boolean): void;

export declare function neighborhoodFor(
  kind: string,
  index: number,
  selections: SelectionItem[],
  typeNeighborhoods: TypeNeighborhood[],
  legendLabels: string[],
  activeCategory: string,
): (SelectionItem & TypeNeighborhood & typeof DEFAULT_HOOD) | null;

export declare function patchNeighborhood(
  model: AnyModel,
  kind: string,
  index: number,
  patch: Record<string, unknown>,
  selections: SelectionItem[],
  typeNeighborhoods: TypeNeighborhood[],
  legendLabels: string[],
  activeCategory: string,
): void;

export declare function patchLandmark(
  model: AnyModel,
  index: number,
  patch: Record<string, unknown>,
  landmarks: LandmarkItem[],
): void;

export declare function setSelected(
  model: AnyModel,
  kind: string,
  index: number,
): void;

export declare function setMode(model: AnyModel, mode: string): void;

export declare function removeAt<T>(items: T[], index: number): T[];

export declare function nextSelectedIndex(
  kind: string,
  selectedKind: string,
  selectedIndex: number,
  removed: number,
): { kind: string; index: number };

export declare function deleteSelection(
  model: AnyModel,
  index: number,
  selections: SelectionItem[],
  selectedKind: string,
  selectedIndex: number,
): void;

export declare function deleteLandmark(
  model: AnyModel,
  index: number,
  landmarks: LandmarkItem[],
  selectedKind: string,
  selectedIndex: number,
): void;

export declare function renameSelection(
  model: AnyModel,
  index: number,
  name: string,
  selections: SelectionItem[],
): void;

export declare function renameLandmark(
  model: AnyModel,
  index: number,
  name: string,
  landmarks: LandmarkItem[],
): void;

export declare function toggleLandmarkHidden(
  model: AnyModel,
  index: number,
  landmarks: LandmarkItem[],
): void;
