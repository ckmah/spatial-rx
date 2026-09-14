import { useState } from "react";
import { CircleDot, Grid2x2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { LandmarksModel } from "../use-landmarks-model";
import { ChromeTooltip } from "./primitives";

/**
 * Soft Float View CTA — top-right icon. Hover highlights; click toggles
 * Points ↔ Raster with a short press-pop. Tooltip is always "points/raster".
 */
export function ViewCta({ lm }: { lm: LandmarksModel }) {
  const rasterOn = (lm.render_mode || "points") === "raster";
  const Icon = rasterOn ? Grid2x2 : CircleDot;
  const [popNonce, setPopNonce] = useState(0);

  const onToggle = () => {
    lm.setRenderMode(rasterOn ? "points" : "raster");
    // Bump nonce so the pop animation restarts on every click.
    setPopNonce((n) => n + 1);
  };

  return (
    <TooltipProvider delayDuration={80} skipDelayDuration={0}>
      <div
        className="landmarks-float landmarks-float--toolbar pointer-events-auto p-1 text-card-foreground"
        data-testid="view-cta"
      >
        <ChromeTooltip label="points/raster">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            role="switch"
            aria-checked={rasterOn}
            aria-label="points/raster"
            onClick={onToggle}
            className={cn(
              "landmarks-view-cta rounded-full text-foreground/70",
              "hover:bg-foreground/10 hover:text-foreground",
              "active:scale-[0.92]",
              "motion-reduce:active:scale-100",
            )}
          >
            <span
              key={popNonce || "idle"}
              className={cn(
                "inline-flex",
                popNonce > 0 && "landmarks-view-cta--pop",
              )}
            >
              <Icon
                aria-hidden
                data-testid="view-cta-icon"
                className="size-4"
              />
            </span>
          </Button>
        </ChromeTooltip>
      </div>
    </TooltipProvider>
  );
}
