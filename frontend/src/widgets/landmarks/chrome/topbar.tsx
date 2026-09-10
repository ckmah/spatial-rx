import {
  ChevronDownIcon,
  Maximize2Icon,
  MaximizeIcon,
  Minimize2Icon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  INTERACTION_MODE_IDS,
  GEOMETRY_MODE_IDS,
  LANDMARK_MODE_IDS,
  MODE_LABELS,
  MODE_SHORTCUTS,
  isGeometryMode,
  interactionFromMode,
} from "../helpers";
import {
  ChromeTooltip,
  ModeToggle,
  ToolbarDivider,
  chromeHitClass,
  chromeHitOnClass,
  chromeMenuClass,
  modeIcon,
} from "./primitives";

function SelectionShapeMenu({
  geometryModes,
  mode,
  onMode,
}: {
  geometryModes: string[];
  mode: string;
  onMode: (mode: string) => void;
}) {
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (openTimer.current != null) window.clearTimeout(openTimer.current);
      if (leaveTimer.current != null) window.clearTimeout(leaveTimer.current);
    },
    [],
  );

  if (!geometryModes.length) return null;
  const active = isGeometryMode(mode);
  const defaultMode = geometryModes.includes("lasso")
    ? "lasso"
    : geometryModes[0];
  const current = active ? mode : defaultMode;
  const Icon = modeIcon(current);
  const label = MODE_LABELS[current] ?? "Lasso";

  const clearOpen = () => {
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  };
  const clearLeave = () => {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };
  /** Immediate open — used when crossing into the menu panel. */
  const openMenu = () => {
    clearLeave();
    clearOpen();
    setOpen(true);
  };
  /** Match tooltip delay before peeking the menu from the trigger. */
  const scheduleOpen = () => {
    clearLeave();
    if (open) return;
    clearOpen();
    openTimer.current = window.setTimeout(() => setOpen(true), 400);
  };
  const scheduleClose = () => {
    clearOpen();
    clearLeave();
    leaveTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        className="relative"
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
      >
        <ChromeTooltip label={label} shortcut={MODE_SHORTCUTS[current]}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                chromeHitClass,
                "w-auto gap-0.5 px-1.5",
                active && chromeHitOnClass,
              )}
              aria-label={label}
              aria-pressed={active}
              ref={(node) => {
                setMenuContainer(
                  node?.closest(
                    ".spatial-rx-widget, .landmarks",
                  ) as HTMLElement | null,
                );
              }}
              onPointerDown={() => {
                // Click activates default lasso; hover only peeks the menu.
                clearOpen();
                if (!active) onMode(defaultMode);
              }}
            >
              <Icon className="size-4" />
              <ChevronDownIcon className="size-2.5 shrink-0 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
        </ChromeTooltip>
        <DropdownMenuContent
          align="start"
          sideOffset={8}
          container={menuContainer}
          className={chromeMenuClass}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          {geometryModes.map((id) => {
            const ItemIcon = modeIcon(id);
            const itemLabel = MODE_LABELS[id] ?? id;
            const isActive = mode === id;
            return (
              <DropdownMenuItem
                key={id}
                className={cn(
                  "gap-2",
                  isActive &&
                    "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                )}
                onSelect={() => onMode(id)}
              >
                <ItemIcon className="size-4" />
                <span className="flex-1">{itemLabel}</span>
                {MODE_SHORTCUTS[id] ? (
                  <span className="text-muted-foreground tabular-nums">
                    {MODE_SHORTCUTS[id]}
                  </span>
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}

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
  const interactionModes = INTERACTION_MODE_IDS.filter((id) =>
    modes.includes(id),
  );
  const landmarkModes = modes.filter((m) => LANDMARK_MODE_IDS.includes(m));
  const geometryModes = GEOMETRY_MODE_IDS.filter((m) => modes.includes(m));
  const interactionValue = interactionFromMode(mode);

  const fullscreenLabel = fullscreen ? "Exit full screen" : "Full screen";

  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={0}>
      <div
        className="landmarks-float landmarks-float--toolbar pointer-events-auto flex min-h-10 items-center gap-1 px-1.5 py-1 text-card-foreground"
        role="toolbar"
        aria-label="Drawing tools"
        onMouseDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {interactionModes.length ? (
          <ModeToggle
            modes={interactionModes}
            value={interactionValue}
            onChange={onMode}
          />
        ) : null}
        {geometryModes.length ? (
          <>
            <ToolbarDivider />
            <SelectionShapeMenu
              geometryModes={geometryModes}
              mode={mode}
              onMode={onMode}
            />
          </>
        ) : null}
        {landmarkModes.length ? (
          <>
            <ToolbarDivider />
            <ModeToggle modes={landmarkModes} value={mode} onChange={onMode} />
          </>
        ) : null}
        <ToolbarDivider />
        <ChromeTooltip label="Zoom in" shortcut="=">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={chromeHitClass}
            aria-label="Zoom in"
            onClick={(e) => {
              e.stopPropagation();
              onZoomIn();
            }}
          >
            <PlusIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <ChromeTooltip label="Zoom out" shortcut="-">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={chromeHitClass}
            aria-label="Zoom out"
            onClick={(e) => {
              e.stopPropagation();
              onZoomOut();
            }}
          >
            <MinusIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <ChromeTooltip label="Reset view" shortcut="0">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={chromeHitClass}
            aria-label="Reset view"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
          >
            <MaximizeIcon className="size-4" />
          </Button>
        </ChromeTooltip>
        <ToolbarDivider />
        <ChromeTooltip label={fullscreenLabel} shortcut="F">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={chromeHitClass}
            aria-label={fullscreenLabel}
            aria-pressed={fullscreen}
            onClick={onToggleFullscreen}
          >
            {fullscreen ? (
              <Minimize2Icon className="size-4" />
            ) : (
              <Maximize2Icon className="size-4" />
            )}
          </Button>
        </ChromeTooltip>
      </div>
    </TooltipProvider>
  );
}
