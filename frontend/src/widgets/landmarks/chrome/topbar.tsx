import {
  ExpandIcon,
  MaximizeIcon,
  MinusIcon,
  PlusIcon,
  ShrinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  INTERACTION_MODE_IDS,
  GEOMETRY_MODE_IDS,
  LANDMARK_MODE_IDS,
  isGeometryMode,
  interactionFromMode,
} from "../helpers";
import { ChromeTooltip, ModeToggle } from "./primitives";

const chromeHitClass =
  "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";

export function Topbar({
  modes,
  mode,
  onMode,
  fullscreen,
  onToggleFullscreen,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  modes: string[];
  mode: string;
  onMode: (mode: string) => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  const interactionModes = INTERACTION_MODE_IDS.filter(
    (id) =>
      id === "selection"
        ? modes.some((m) => isGeometryMode(m)) || modes.includes("selection")
        : modes.includes(id),
  );
  const geometryModes = modes.filter((m) => GEOMETRY_MODE_IDS.includes(m));
  const landmarkModes = modes.filter((m) => LANDMARK_MODE_IDS.includes(m));
  const interactionValue = interactionFromMode(mode);
  const defaultGeometry = geometryModes[0] || "lasso";

  const onInteraction = (next: string) => {
    if (next === "selection") {
      onMode(isGeometryMode(mode) ? mode : defaultGeometry);
      return;
    }
    onMode(next);
  };

  const fullscreenLabel = fullscreen ? "Exit full screen" : "Full screen";

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <div
        className="landmarks-float landmarks-float--toolbar pointer-events-auto flex items-center gap-1 rounded-full px-1.5 py-1 text-card-foreground"
        role="toolbar"
        aria-label="Drawing tools"
        onMouseDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {interactionModes.length ? (
          <ModeToggle
            modes={interactionModes}
            value={interactionValue}
            onChange={onInteraction}
          />
        ) : null}
        {landmarkModes.length ? (
          <>
            <Separator orientation="vertical" className="mx-0.5 h-5 bg-border/50" />
            <ModeToggle modes={landmarkModes} value={mode} onChange={onMode} />
          </>
        ) : null}
        <Separator orientation="vertical" className="mx-0.5 h-5 bg-border/50" />
        <ChromeTooltip label="Zoom in">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Zoom in"
            className={chromeHitClass}
            onClick={(e) => {
              e.stopPropagation();
              onZoomIn();
            }}
          >
            <PlusIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <ChromeTooltip label="Zoom out">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Zoom out"
            className={chromeHitClass}
            onClick={(e) => {
              e.stopPropagation();
              onZoomOut();
            }}
          >
            <MinusIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <ChromeTooltip label="Reset view">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Reset view"
            className={chromeHitClass}
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
          >
            <MaximizeIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <Separator orientation="vertical" className="mx-0.5 h-5 bg-border/50" />
        <ChromeTooltip label={fullscreenLabel}>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={chromeHitClass}
            aria-label={fullscreenLabel}
            aria-pressed={fullscreen}
            onClick={onToggleFullscreen}
          >
            {fullscreen ? <ShrinkIcon className="size-4" /> : <ExpandIcon className="size-4" />}
          </Button>
        </ChromeTooltip>
      </div>
    </TooltipProvider>
  );
}
