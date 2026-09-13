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
 * Soft Float pill Tabs (lab variant B) — quiet tray + solid active chip.
 * Prefer these over stock muted Tabs / outline ToggleGroup.
 */
export const PILL_TABS_LIST =
  "h-8 w-full rounded-md bg-foreground/[0.07] p-0.5 text-foreground/70 dark:bg-foreground/[0.12]";
export const PILL_TABS_TRIGGER =
  "h-full flex-1 rounded-[calc(var(--radius)-2px)] text-xs text-foreground/70 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-foreground dark:data-[state=active]:text-background dark:data-[state=active]:border-transparent";
/** @deprecated Use PILL_TABS_LIST. */
export const SEGMENT_TRAY = PILL_TABS_LIST;
/** @deprecated Use PILL_TABS_TRIGGER. */
export const SEGMENT_ITEM = PILL_TABS_TRIGGER;
export const FLOAT_PANEL =
  "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-0 overflow-hidden p-0";
