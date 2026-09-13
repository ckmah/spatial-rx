import type { LandmarksModel } from "../use-landmarks-model";
import { META_LINE } from "./sections";

/** Diverging similarity legend mid-stop at 0.5 (matches engine). */
const SIMILARITY_LEGEND =
  "linear-gradient(to right, #3b82f6 0%, #e8e8e8 50%, #ff0099 100%)";

/**
 * Raster probe-mode similarity chrome. View (Points/Raster) lives in the Soft
 * Float View CTA — not in Explore. Legend only while probe / similarity is on.
 */
export function RasterSection({ lm }: { lm: LandmarksModel }) {
  const isRaster = (lm.render_mode || "points") === "raster";
  const probeOn =
    lm.mode === "probe" || !!lm.raster_similarity_enabled;
  const status = lm.raster_status || "";
  const pinned = lm.raster_query_bin >= 0;

  if (!isRaster || !probeOn) return null;

  let statusText: string | null = null;
  if (status === "computing") {
    statusText = "Computing raster…";
  } else if (status.startsWith("error:")) {
    statusText = status;
  } else if (pinned) {
    statusText = `Pinned cell ${lm.raster_query_bin} · Esc clears`;
  }

  return (
    <div
      className="flex flex-col gap-1.5 rounded-md bg-foreground/[0.08] p-2 dark:bg-foreground/[0.12]"
      data-testid="raster-section"
      data-testid-legend="raster-legend"
    >
      <p className="m-0 text-[11px] font-medium text-foreground">Similarity</p>
      <div
        className="h-2.5 w-full rounded-sm"
        style={{ background: SIMILARITY_LEGEND }}
        role="img"
        aria-label={
          pinned ? "Similarity to pinned cell" : "Similarity to hovered cell"
        }
        title={
          pinned
            ? "Similarity to pinned cell"
            : "Hover a cell to scrub similarity; click to pin"
        }
        data-testid="raster-legend"
      />
      <div className="flex justify-between text-[10px] tabular-nums text-foreground/70">
        <span>0</span>
        <span>0.5</span>
        <span>1</span>
      </div>
      {statusText ? (
        <p className={META_LINE} data-testid="raster-status">
          {statusText}
        </p>
      ) : (
        <span className="sr-only" data-testid="raster-status">
          Ready
        </span>
      )}
    </div>
  );
}
