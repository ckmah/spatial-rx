import { useModel } from "@/hooks/use-model";

import type {
  AnyModel,
  CategoryColumn,
  LandmarkItem,
  SelectionItem,
  TypeNeighborhood,
} from "./helpers";
import {
  applyActiveCategory,
  deleteLandmark as deleteLandmarkTrait,
  deleteSelection as deleteSelectionTrait,
  neighborhoodFor,
  patchLandmark as patchLandmarkTrait,
  patchNeighborhood as patchNeighborhoodTrait,
  renameLandmark as renameLandmarkTrait,
  renameSelection as renameSelectionTrait,
  setMode as setModeTrait,
  setSelected,
  toggleLandmarkHidden as toggleLandmarkHiddenTrait,
} from "./state";

export type LandmarksState = {
  mode: string;
  modes: string[];
  selections: SelectionItem[];
  landmarks: LandmarkItem[];
  selected_kind: string;
  selected_index: number;
  category_columns: CategoryColumn[];
  active_category: string;
  legend_labels: string[];
  type_neighborhoods: TypeNeighborhood[];
  default_tension: number;
  neighbor_radius_max: number;
  neighbor_k_max: number;
  x_bounds: number[];
  y_bounds: number[];
};

const MODEL_KEYS: (keyof LandmarksState)[] = [
  "mode",
  "modes",
  "selections",
  "landmarks",
  "selected_kind",
  "selected_index",
  "category_columns",
  "active_category",
  "legend_labels",
  "type_neighborhoods",
  "default_tension",
  "neighbor_radius_max",
  "neighbor_k_max",
  "x_bounds",
  "y_bounds",
];

export type LandmarksModel = LandmarksState & {
  setMode(mode: string): void;
  select(kind: string, index: number): void;
  setActiveCategory(col: CategoryColumn): void;
  selectType(col: CategoryColumn, labelIndex: number): void;
  patchNeighborhood(patch: Record<string, unknown>): void;
  patchLandmark(patch: Record<string, unknown>): void;
  deleteSelection(index: number): void;
  deleteLandmark(index: number): void;
  renameSelection(index: number, name: string): void;
  renameLandmark(index: number, name: string): void;
  toggleLandmarkHidden(index: number): void;
  activeNeighborhood(): ReturnType<typeof neighborhoodFor>;
  selectedLandmark(): LandmarkItem | null;
};

/** Typed landmarks state + domain actions; chrome never touches raw traitlets. */
export function useLandmarksModel(model: AnyModel): LandmarksModel {
  const state = useModel<LandmarksState>(model, MODEL_KEYS);

  return {
    ...state,
    setMode(mode) {
      setModeTrait(model, mode);
    },
    select(kind, index) {
      setSelected(model, kind, index);
    },
    setActiveCategory(col) {
      applyActiveCategory(model, col);
    },
    selectType(col, labelIndex) {
      if (col.name !== state.active_category) {
        applyActiveCategory(model, col);
      }
      setSelected(model, "type", labelIndex);
    },
    patchNeighborhood(patch) {
      patchNeighborhoodTrait(
        model,
        state.selected_kind,
        state.selected_index,
        patch,
        state.selections,
        state.type_neighborhoods,
        state.legend_labels,
        state.active_category,
      );
    },
    patchLandmark(patch) {
      if (state.selected_kind !== "landmark" || state.selected_index < 0) return;
      patchLandmarkTrait(model, state.selected_index, patch, state.landmarks);
    },
    deleteSelection(index) {
      deleteSelectionTrait(
        model,
        index,
        state.selections,
        state.selected_kind,
        state.selected_index,
      );
    },
    deleteLandmark(index) {
      deleteLandmarkTrait(
        model,
        index,
        state.landmarks,
        state.selected_kind,
        state.selected_index,
      );
    },
    renameSelection(index, name) {
      renameSelectionTrait(model, index, name, state.selections);
    },
    renameLandmark(index, name) {
      renameLandmarkTrait(model, index, name, state.landmarks);
    },
    toggleLandmarkHidden(index) {
      toggleLandmarkHiddenTrait(model, index, state.landmarks);
    },
    activeNeighborhood() {
      return neighborhoodFor(
        state.selected_kind,
        state.selected_index,
        state.selections,
        state.type_neighborhoods,
        state.legend_labels,
        state.active_category,
      );
    },
    selectedLandmark() {
      if (state.selected_kind !== "landmark" || state.selected_index < 0) {
        return null;
      }
      return state.landmarks[state.selected_index] ?? null;
    },
  };
}
