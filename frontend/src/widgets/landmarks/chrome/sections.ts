export type PanelSectionId =
  | "selections"
  | "categories"
  | "genes"
  | "landmarks"
  | "info";

/** Horizontal + vertical inset on float panel bodies. */
export const PANEL_INSET = "px-2.5 py-1.5";
/** Static section heading (non-collapsible). */
export const SECTION_LABEL = "landmarks-section-label px-0 py-1";
/** Field / control captions — foreground-based so glass stays readable. */
export const FIELD_CAPTION =
  "landmarks-field-caption m-0 text-[11px] font-medium";
/** Secondary meta line under controls. */
export const META_LINE = "landmarks-meta m-0 truncate text-[11px]";
/**
 * Soft Float sliding pill Tabs — rounded track + sliding active pill
 * (transitions.dev tabs-sliding). Pair with SoftFloatSlidingTabs.
 */
export const PILL_TABS_LIST =
  "landmarks-sliding-tabs relative h-8 w-full gap-0 rounded-[var(--lm-float-radius)] p-0.5";
export const PILL_TABS_TRIGGER =
  "landmarks-sliding-tab relative z-10 h-full flex-1 rounded-[calc(var(--lm-float-radius)-2px)] border-0 bg-transparent px-2 text-[11px] font-normal lowercase tracking-wide text-foreground/55 shadow-none transition-colors hover:bg-transparent hover:text-foreground/75 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:text-foreground/60 dark:hover:text-foreground/80 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-foreground";
/** @deprecated Use PILL_TABS_LIST. */
export const SEGMENT_TRAY = PILL_TABS_LIST;
/** @deprecated Use PILL_TABS_TRIGGER. */
export const SEGMENT_ITEM = PILL_TABS_TRIGGER;
/** Outer float shell — keep overflow visible so box-shadow is not clipped. */
export const FLOAT_PANEL =
  "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-0 overflow-visible p-0";
/** Nested section inside a shared float — no second glass shell. */
export const EMBEDDED_PANEL =
  "min-h-0 w-full gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none";
/** Inner clip for scrollable float panel bodies (pairs with FLOAT_PANEL). */
export const FLOAT_PANEL_CLIP =
  "landmarks-float-clip min-h-0 flex-1 overflow-hidden rounded-[inherit]";
