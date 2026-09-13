import { cn } from "@/lib/utils";

import type { LandmarksModel } from "../use-landmarks-model";

/**
 * Soft Float View CTA — lab variant F (text-in-thumb flip).
 * Points / Bins lives on the canvas, not inside Explore.
 */
export function ViewCta({ lm }: { lm: LandmarksModel }) {
  const binsOn = (lm.render_mode || "points") === "raster";

  return (
    <div
      className="landmarks-float landmarks-float--toolbar pointer-events-auto p-1 text-card-foreground"
      data-testid="view-cta"
    >
      <button
        type="button"
        role="switch"
        aria-checked={binsOn}
        aria-label={binsOn ? "Bins view" : "Points view"}
        onClick={() => lm.setRenderMode(binsOn ? "points" : "raster")}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            lm.setRenderMode("points");
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            lm.setRenderMode("raster");
          }
        }}
        className={cn(
          "relative h-9 w-[10.25rem] rounded-full outline-none",
          "bg-foreground/[0.1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "dark:bg-foreground/[0.16] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 flex w-1/2 items-center justify-center",
            "text-[11px] font-medium transition-opacity duration-200",
            binsOn ? "text-foreground/50 opacity-100" : "opacity-0",
          )}
        >
          Points
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 right-0 flex w-1/2 items-center justify-center",
            "text-[11px] font-medium transition-opacity duration-200",
            binsOn ? "opacity-0" : "text-foreground/50 opacity-100",
          )}
        >
          Bins
        </span>
        <span
          className={cn(
            "absolute top-0.5 bottom-0.5 flex w-[calc(50%-2px)] items-center justify-center",
            "rounded-full bg-foreground text-[11px] font-semibold text-background shadow-sm",
            "transition-transform duration-200 ease-out",
            binsOn ? "translate-x-[calc(100%+2px)]" : "translate-x-0.5",
          )}
        >
          {binsOn ? "Bins" : "Points"}
        </span>
      </button>
    </div>
  );
}
