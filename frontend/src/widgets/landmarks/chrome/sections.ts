export type PanelSectionId =
  | "selections"
  | "categories"
  | "genes"
  | "landmarks"
  | "info";

/** Horizontal + vertical inset on float panel bodies (collapsed and expanded). */
export const PANEL_INSET = "px-2.5 py-1.5";
/** Accordion section row — same vertical step as panel inset for even collapsed chrome. */
export const SECTION_TRIGGER =
  "landmarks-section-trigger px-0 py-1.5 text-left hover:no-underline";
/** Open-section body under a trigger. */
export const SECTION_CONTENT = "px-0 pb-2";
export const FLOAT_PANEL =
  "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-0 overflow-hidden p-0";
