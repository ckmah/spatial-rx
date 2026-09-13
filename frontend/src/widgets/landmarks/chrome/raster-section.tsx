import type { LandmarksModel } from "../use-landmarks-model";
import { FIELD_CAPTION, META_LINE } from "./sections";

/** Diverging similarity legend mid-stop at 0.5 (matches engine). */
const SIMILARITY_LEGEND =
  "linear-gradient(to right, #3b82f6 0%, #e8e8e8 50%, #ff0099 100%)";

/**
 * Raster-only similarity chrome. View (Points/Raster) lives in the floating Soft
 * Float View CTA (lab F) — not in Explore.
 */
export function RasterSection({ lm }: { lm: LandmarksModel }) {
  const isRaster = (lm.render_mode || "points") === "raster";
  const status = lm.raster_status || "";
  const pinned = lm.raster_query_bin >= 0;

  if (!isRaster) return null;

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
      className="flex flex-col gap-1"
      data-testid="raster-section"
      data-testid-legend="raster-legend"
    >
      <p className={FIELD_CAPTION}>Similarity</p>
      <div
        className="h-2 w-full rounded-sm"
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
      <div className="flex justify-between text-[10px] text-foreground/65">
        <span>Unlike</span>
        <span>Alike</span>
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
