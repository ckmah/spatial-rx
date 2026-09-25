import {
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelRightCloseIcon,
  PanelRightOpenIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { ChromeTooltip } from "./primitives";

type DockSide = "left" | "right";

const COLLAPSE_ICON = {
  left: PanelLeftCloseIcon,
  right: PanelRightCloseIcon,
} as const;

const EXPAND_ICON = {
  left: PanelLeftOpenIcon,
  right: PanelRightOpenIcon,
} as const;

/**
 * Collapse affordance pinned to a dock's outer top corner. Clicking it hides
 * the dock (see `.landmarks__chrome-dock--collapsed`) and hands control to
 * the sibling `PanelPeekTab`.
 */
export function PanelCollapseButton({
  side,
  onCollapse,
}: {
  side: DockSide;
  onCollapse: () => void;
}) {
  const Icon = COLLAPSE_ICON[side];
  const label = side === "left" ? "Collapse left panel" : "Collapse right panel";
  return (
    <TooltipProvider delayDuration={80} skipDelayDuration={0}>
      <ChromeTooltip label={label}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          onClick={onCollapse}
          className={cn(
            "pointer-events-auto absolute top-0 z-[17] rounded-full text-foreground/70 hover:bg-foreground/10 hover:text-foreground",
            side === "left" ? "left-0" : "right-0",
          )}
        >
          <Icon className="size-4" />
        </Button>
      </ChromeTooltip>
    </TooltipProvider>
  );
}

/**
 * Edge tab shown in place of a collapsed dock — click to bring the panel
 * back. Sits above the minimap slot so the left tab never covers it.
 */
export function PanelPeekTab({
  side,
  onExpand,
}: {
  side: DockSide;
  onExpand: () => void;
}) {
  const Icon = EXPAND_ICON[side];
  const label = side === "left" ? "Show left panel" : "Show right panel";
  return (
    <TooltipProvider delayDuration={80} skipDelayDuration={0}>
      <ChromeTooltip label={label}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          onClick={onExpand}
          className={cn(
            "landmarks-float landmarks__peek-tab pointer-events-auto text-foreground/70 hover:bg-foreground/10 hover:text-foreground",
            side === "left" ? "landmarks__peek-tab--left" : "landmarks__peek-tab--right",
          )}
        >
          <Icon className="size-4" />
        </Button>
      </ChromeTooltip>
    </TooltipProvider>
  );
}
