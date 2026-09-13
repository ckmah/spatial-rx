import { CircleDot, Grid2x2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { LandmarksModel } from "../use-landmarks-model";
import { ChromeTooltip } from "./primitives";

/**
 * Soft Float View CTA — floating icon that flips to the other mode on hover.
 * Top-right on the canvas so it stays clear of the context toolbar.
 */
export function ViewCta({ lm }: { lm: LandmarksModel }) {
  const binsOn = (lm.render_mode || "points") === "raster";
  const CurrentIcon = binsOn ? Grid2x2 : CircleDot;
  const NextIcon = binsOn ? CircleDot : Grid2x2;
  const nextLabel = binsOn ? "Points" : "Bins";

  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={0}>
      <div
        className="landmarks-float landmarks-float--toolbar pointer-events-auto p-1 text-card-foreground"
        data-testid="view-cta"
      >
        <ChromeTooltip label={`Switch to ${nextLabel}`}>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            role="switch"
            aria-checked={binsOn}
            aria-label={
              binsOn
                ? "Bins view — switch to Points"
                : "Points view — switch to Bins"
            }
            onClick={() => lm.setRenderMode(binsOn ? "points" : "raster")}
            className={cn(
              "group relative overflow-hidden rounded-full",
              "text-foreground/70 hover:bg-foreground/10 hover:text-foreground",
            )}
          >
            <CurrentIcon
              aria-hidden
              className={cn(
                "absolute size-4 transition duration-200 ease-out",
                "group-hover:scale-75 group-hover:-rotate-45 group-hover:opacity-0",
              )}
            />
            <NextIcon
              aria-hidden
              className={cn(
                "pointer-events-none absolute size-4",
                "scale-75 rotate-45 opacity-0 transition duration-200 ease-out",
                "group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100",
              )}
            />
          </Button>
        </ChromeTooltip>
      </div>
    </TooltipProvider>
  );
}
