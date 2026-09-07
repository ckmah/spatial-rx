import { useState, type ReactElement, type ReactNode } from "react";
import {
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LassoIcon,
  LassoSelectIcon,
  MousePointer2Icon,
  MoveIcon,
  PentagonIcon,
  ShapesIcon,
  SlashIcon,
  SplineIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { MODE_LABELS } from "../helpers";

const MODE_ICONS: Record<string, typeof MoveIcon> = {
  pointer: MousePointer2Icon,
  move: MoveIcon,
  selection: LassoSelectIcon,
  lasso: LassoIcon,
  polygon: PentagonIcon,
  rectangle: SquareIcon,
  ellipse: CircleIcon,
  point: CircleIcon,
  line: SlashIcon,
  spline: SplineIcon,
  shape: ShapesIcon,
};

export function ChromeTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={6}
        className="landmarks-tooltip border-border/60 bg-card/95 text-foreground shadow-md"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export type SwatchVariant = "solid" | "landmark" | "selection";

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
      spacing={2}
      value={value}
      className="landmarks-mode-toggle rounded-full bg-muted/45 p-0.5"
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      {modes.map((mode) => {
        const Icon = MODE_ICONS[mode] ?? ShapesIcon;
        const label = MODE_LABELS[mode] ?? mode;
        return (
          <ToggleGroupItem
            key={mode}
            value={mode}
            aria-label={label}
            className="size-8 min-w-8 rounded-full border-0 px-0 text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none"
          >
            <ChromeTooltip label={label}>
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

export function SliderRow({
  label,
  valueLabel,
  children,
}: {
  label: string;
  valueLabel: string;
  children: ReactNode;
}) {
  return (
    <Field className="gap-0">
      <div className="landmarks-slider-row">
        <FieldLabel className="landmarks-slider-label">{label}</FieldLabel>
        <div className="landmarks-slider-capsule">
          <div className="landmarks-slider-control">{children}</div>
          <span className="landmarks-slider-value" aria-hidden>
            {valueLabel}
          </span>
        </div>
      </div>
    </Field>
  );
}

export function SoftToggleGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <ToggleGroup
      type="single"
      variant="default"
      size="sm"
      spacing={2}
      value={value}
      className="w-full justify-stretch rounded-lg bg-muted/55 p-0.5"
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          className="h-7 min-w-0 flex-1 rounded-md border-0 px-2 text-[0.6875rem] text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
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
  onSelect,
  onRename,
  onDelete,
  onToggleHidden,
}: {
  active: boolean;
  color?: string;
  swatchVariant?: SwatchVariant;
  swatchFillOpacity?: number;
  label: string;
  hidden?: boolean;
  onSelect: () => void;
  onRename?: (next: string) => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  return (
    <div
      role="listitem"
      className={cn(
        "landmarks-layer-row cursor-pointer text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        active && "landmarks-layer-row--active",
        hidden && "opacity-50",
      )}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
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
            title={onRename ? "Double-click to rename" : label}
            onDoubleClick={(e) => {
              if (!onRename) return;
              e.preventDefault();
              e.stopPropagation();
              setDraft(label);
              setEditing(true);
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div className="landmarks-trail">
        {onToggleHidden ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="landmarks-trail-hit"
            aria-label={hidden ? "Show landmark" : "Hide landmark"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleHidden();
            }}
          >
            {hidden ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        ) : (
          <span className="landmarks-trail-cell" aria-hidden />
        )}
        {onDelete ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="landmarks-trail-hit"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <XIcon />
          </Button>
        ) : (
          <span className="landmarks-trail-cell" aria-hidden />
        )}
      </div>
    </div>
  );
}
