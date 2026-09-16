import type { AnyModel } from "./helpers";

export declare const NOTEBOOK_KEYS: Set<string>;

export declare function isRasterView(model: AnyModel): boolean;

export type LandmarksModelFacade = AnyModel & {
  _raw: AnyModel;
};

export declare function wrapLandmarksModel(raw: AnyModel): LandmarksModelFacade;
