import { CircleDot, Grid2x2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { LandmarksModel } from "../use-landmarks-model";
import { ChromeTooltip } from "./primitives";

/**
 * Soft Float View CTA — top-right icon. Hover only highlights; click toggles
 * Points ↔ Raster. Icon stays on the current mode.
 */
export function ViewCta({ lm }: { lm: LandmarksModel }) {
  const rasterOn = (lm.render_mode || "points") === "raster";
  const Icon = rasterOn ? Grid2x2 : CircleDot;
  const tip = rasterOn ? "Points" : "Raster";

  return (
    <TooltipProvider delayDuration={80} skipDelayDuration={0}>
      <div
        className="landmarks-float landmarks-float--toolbar pointer-events-auto p-1 text-card-foreground"
        data-testid="view-cta"
      >
        <ChromeTooltip label={tip}>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            role="switch"
            aria-checked={rasterOn}
            aria-label={rasterOn ? "Raster view" : "Points view"}
            onClick={() => lm.setRenderMode(rasterOn ? "points" : "raster")}
            className={cn(
              "rounded-full text-foreground/70",
              "hover:bg-foreground/10 hover:text-foreground",
            )}
          >
            <Icon aria-hidden data-testid="view-cta-icon" className="size-4" />
          </Button>
        </ChromeTooltip>
      </div>
    </TooltipProvider>
  );
}
