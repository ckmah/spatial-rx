import {
  cloneElement,
  isValidElement,
  useCallback,
  useState,
  type ComponentType,
  type ReactElement,
  type Ref,
} from "react";
import {
  CircleIcon,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  LassoIcon,
  MousePointer2Icon,
  MoveIcon,
  PencilIcon,
  PentagonIcon,
  ShapesIcon,
  MoveUpRightIcon,
  SplineIcon,
  SquareIcon,
  Trash2Icon,
  type LucideProps,
} from "lucide-react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { MODE_LABELS, MODE_SHORTCUTS } from "../helpers";

function FilledCircleIcon(props: LucideProps) {
  return <CircleIcon {...props} fill="currentColor" strokeWidth={0} />;
}

const MODE_ICONS: Record<string, ComponentType<LucideProps>> = {
  pointer: MousePointer2Icon,
  move: MoveIcon,
  selection: LassoIcon,
  lasso: LassoIcon,
  polygon: PentagonIcon,
  rectangle: SquareIcon,
  ellipse: CircleIcon,
  point: FilledCircleIcon,
  line: MoveUpRightIcon,
  spline: SplineIcon,
  shape: PentagonIcon,
};

export function modeIcon(mode: string) {
  return MODE_ICONS[mode] ?? ShapesIcon;
}

/** Shared toolbar hit target — top, bottom, and mobile chrome. */
export const chromeHitClass =
  "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";

export const chromeHitOnClass =
  "bg-foreground text-background hover:bg-foreground hover:text-background";

/** Opaque chrome tooltip surface (portaled into widget so theme tokens apply). */
const chromeTooltipClass =
  "landmarks-tooltip z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-balance text-popover-foreground shadow-md fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

/** Soft float popover — selection dropdown, layer menus, canvas context. */
export const chromeMenuClass =
  "landmarks-menu z-50 min-w-[9rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md";

export function ToolbarDivider() {
  return (
    <span
      aria-hidden
      className="mx-0.5 h-5 w-px shrink-0 bg-foreground/30"
    />
  );
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") {
        (ref as { current: T }).current = value;
      }
    }
  };
}

export function ChromeTooltip({
  label,
  shortcut,
  children,
}: {
  label: string;
  /** Optional key glyph shown muted on the right (e.g. "V", "⌘C"). */
  shortcut?: string;
  children: ReactElement;
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const setTriggerNode = useCallback((node: HTMLElement | null) => {
    setContainer(
      node?.closest(".spatial-rx-widget, .landmarks") as HTMLElement | null,
    );
  }, []);

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ ref?: Ref<HTMLElement> }>, {
        ref: mergeRefs(
          (children as ReactElement<{ ref?: Ref<HTMLElement> }>).props.ref,
          setTriggerNode,
        ),
      })
    : children;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{child}</TooltipTrigger>
      <TooltipPrimitive.Portal container={container ?? undefined}>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          side="bottom"
          sideOffset={6}
          className={cn(
            chromeTooltipClass,
            shortcut && "flex items-center gap-3",
          )}
        >
          <span>{label}</span>
          {shortcut ? (
            <span className="font-normal text-muted-foreground tabular-nums">
              {shortcut}
            </span>
          ) : null}
          <TooltipPrimitive.Arrow className="landmarks-tooltip-arrow z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-popover fill-popover" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </Tooltip>
  );
}

type SwatchVariant = "solid" | "landmark" | "selection";

export function ColorSwatch({
  color,
  variant = "solid",
  fillOpacity = 0.25,
  className,
}: {
  color?: string;
  variant?: SwatchVariant;
  fillOpacity?: number;
  className?: string;
}) {
  if (variant === "landmark") {
    const pct = Math.round(Math.min(1, Math.max(0, fillOpacity)) * 100);
    return (
      <span
        className={cn(
          "landmarks-layer-swatch landmarks-layer-swatch--landmark inline-block shrink-0 rounded-full",
          !color && "border-border",
          className,
        )}
        style={
          color
            ? {
                borderColor: color,
                backgroundColor: `color-mix(in srgb, ${color} ${pct}%, transparent)`,
              }
            : undefined
        }
        aria-hidden
      />
    );
  }
  if (variant === "selection") {
    return (
      <span
        className={cn(
          "landmarks-layer-swatch landmarks-layer-swatch--selection inline-block shrink-0 rounded-full",
          !color && "border-border",
          className,
        )}
        style={color ? { borderColor: color } : undefined}
        aria-hidden
      />
    );
  }
  return (
    <span
      className={cn(
        "landmarks-layer-swatch inline-block shrink-0 rounded-full ring-1 ring-border",
        !color && "bg-muted-foreground/40",
        className,
      )}
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden
    />
  );
}

export function ModeToggle({
  modes,
  value,
  onChange,
}: {
  modes: string[];
  value: string;
  onChange: (mode: string) => void;
}) {
  if (!modes.length) return null;
  return (
    <ToggleGroup
      type="single"
      variant="default"
      size="sm"
      spacing={1}
      value={value || undefined}
      className="landmarks-mode-toggle gap-1"
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      {modes.map((mode) => {
        const Icon = modeIcon(mode);
        const label = MODE_LABELS[mode] ?? mode;
        return (
          <ToggleGroupItem
            key={mode}
            value={mode}
            aria-label={label}
            className="size-8 min-w-8 rounded-full border-0 px-0 text-muted-foreground shadow-none hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none data-[spacing=1]:rounded-full"
          >
            <ChromeTooltip label={label} shortcut={MODE_SHORTCUTS[mode]}>
              <span className="inline-flex size-full items-center justify-center">
                <Icon className="size-4" />
              </span>
            </ChromeTooltip>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

export function LayerRow({
  active,
  color,
  swatchVariant = "solid",
  swatchFillOpacity,
  label,
  hidden,
  disabled,
  onSelect,
  onRename,
  onDelete,
  onToggleHidden,
  menuContainer,
}: {
  active: boolean;
  color?: string;
  swatchVariant?: SwatchVariant;
  swatchFillOpacity?: number;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  onRename?: (next: string) => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
  menuContainer?: HTMLElement | null;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);
  const hasMenu = !!(onRename || onDelete || onToggleHidden);

  const startRename = () => {
    if (!onRename || disabled) return;
    setDraft(label);
    setEditing(true);
  };

  return (
    <div
      role="listitem"
      aria-disabled={disabled || undefined}
      className={cn(
        "landmarks-layer-row text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        disabled ? "cursor-default opacity-60" : "cursor-pointer",
        active && "landmarks-layer-row--active",
        hidden && "opacity-50",
      )}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (!disabled) onSelect();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <ColorSwatch
        color={color}
        variant={swatchVariant}
        fillOpacity={swatchFillOpacity}
        className="landmarks-layer-swatch"
      />
      <div className="landmarks-layer-label">
        {editing && onRename ? (
          <Input
            aria-label="Rename layer"
            value={draft}
            className="h-6 text-xs"
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              onRename(draft);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                e.preventDefault();
                onRename(draft);
                setEditing(false);
              } else if (e.key === "Escape") {
                e.preventDefault();
                setDraft(label);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span
            className={cn(
              "max-w-full truncate text-xs text-foreground",
              active ? "font-medium" : "font-normal",
            )}
            title={label}
            onDoubleClick={(e) => {
              if (!onRename) return;
              e.preventDefault();
              e.stopPropagation();
              startRename();
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div className="landmarks-trail">
        <span className="landmarks-trail-cell" aria-hidden />
        {hasMenu ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="landmarks-trail-hit"
                aria-label="Layer actions"
                onClick={(e) => e.stopPropagation()}
              >
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={6}
              container={menuContainer}
              className={chromeMenuClass}
              onCloseAutoFocus={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              {onToggleHidden ? (
                <DropdownMenuItem
                  className="gap-2 text-xs"
                  onSelect={() => onToggleHidden()}
                >
                  {hidden ? (
                    <EyeIcon className="size-3.5" />
                  ) : (
                    <EyeOffIcon className="size-3.5" />
                  )}
                  {hidden ? "Show" : "Hide"}
                </DropdownMenuItem>
              ) : null}
              {onRename ? (
                <DropdownMenuItem
                  className="gap-2 text-xs"
                  onSelect={() => startRename()}
                >
                  <PencilIcon className="size-3.5" />
                  Rename
                </DropdownMenuItem>
              ) : null}
              {onDelete ? (
                <DropdownMenuItem
                  variant="destructive"
                  className="gap-2 text-xs"
                  onSelect={() => onDelete()}
                >
                  <Trash2Icon className="size-3.5" />
                  Delete
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="landmarks-trail-cell" aria-hidden />
        )}
      </div>
    </div>
  );
}
