/**
 * Soft Float SliderRow chrome — shared by regular + signed (bidirectional) sliders.
 *
 * Extracted so handle / fill / value / hover tokens stay in sync (Impeccable extract).
 * Styles live on `.landmarks-slider-control` in `landmarks.css`; both variants use the
 * same `data-slot` hooks (`slider`, `slider-track`, `slider-range`, `slider-thumb`) and
 * `.landmarks-slider-value`.
 */
import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import { ChromeTooltip, chromeHitClass } from "./primitives";

/** Reset control — Lucide rotate-ccw, placed immediately right of a Soft Float slider. */
export function SoftFloatSliderReset({
  title,
  onClick,
  testId,
  disabled,
}: {
  title: string;
  onClick: () => void;
  testId?: string;
  disabled?: boolean;
}) {
  return (
    <ChromeTooltip label={title}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={title}
        disabled={disabled}
        data-testid={testId}
        className={cn(
          chromeHitClass,
          disabled && "opacity-40",
          "active:scale-[0.97] transition-transform",
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <RotateCcwIcon className="size-4" />
      </Button>
    </ChromeTooltip>
  );
}

/** Unidirectional Soft Float capsule (tension, neighborhood radius/k, point buffer). */
export function SoftFloatCapsuleSlider({
  value,
  min,
  max,
  step,
  onValueChange,
  displayValue,
  "aria-label": ariaLabel,
  testId,
  className,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (v: number) => void;
  displayValue: string | number;
  "aria-label"?: string;
  testId?: string;
  className?: string;
}) {
  const span = Math.max(max - min, 1e-9);
  return (
    <div
      className={cn(
        "landmarks-slider-control min-w-[120px] flex-1",
        className,
      )}
      data-testid={testId}
    >
      <span className="landmarks-slider-value" aria-hidden>
        {displayValue}
      </span>
      <Slider
        min={min}
        max={max}
        step={step ?? (span / 200 || 0.01)}
        value={[value]}
        onValueChange={(v) => onValueChange(v[0] ?? min)}
        aria-label={ariaLabel}
        className="w-full"
      />
    </div>
  );
}

/**
 * Signed / bidirectional Soft Float capsule.
 * Same chrome tokens as SoftFloatCapsuleSlider; geometry differs (center 0, both thumbs).
 */
export function SoftFloatSignedSlider({
  value,
  min = -1,
  max = 1,
  both = false,
  onChange,
  displayValue,
  "aria-label": ariaLabel = "Buffer",
  testId,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  both?: boolean;
  onChange: (v: number) => void;
  displayValue?: string;
  "aria-label"?: string;
  testId?: string;
  className?: string;
}) {
  const span = Math.max(max - min, 1e-9);
  const clamped = Math.min(max, Math.max(min, value));
  const absMax = Math.max(Math.abs(min), Math.abs(max), 1e-9);
  const mag = Math.abs(clamped);
  const centerPct = ((0 - min) / span) * 100;
  const thumbPct = ((clamped - min) / span) * 100;
  const snapEps = Math.max(span * 0.02, span / 200);

  let fillLeft: number;
  let fillWidth: number;
  if (both) {
    const half = (mag / absMax) * 50;
    fillLeft = 50 - half;
    fillWidth = half * 2;
  } else if (clamped >= 0) {
    fillLeft = centerPct;
    fillWidth = ((clamped - 0) / span) * 100;
  } else {
    fillLeft = ((clamped - min) / span) * 100;
    fillWidth = ((0 - clamped) / span) * 100;
  }

  const leftThumbPct = both
    ? centerPct - (mag / absMax) * 50
    : clamped < 0
      ? thumbPct
      : null;
  const rightThumbPct = both
    ? centerPct + (mag / absMax) * 50
    : clamped > 0
      ? thumbPct
      : clamped === 0
        ? centerPct
        : null;

  const commit = (raw: number) => {
    let next = Math.min(max, Math.max(min, raw));
    if (Math.abs(next) <= snapEps) next = 0;
    onChange(next);
  };

  const signedHint =
    both || min >= 0
      ? undefined
      : clamped < 0
        ? "negative"
        : clamped > 0
          ? "positive"
          : "zero";

  return (
    <div
      className={cn(
        "landmarks-slider-control landmarks-slider-control--signed group/slider relative h-7 w-full min-w-[180px] shrink-0",
        className,
      )}
      data-slot="slider"
      data-testid={testId}
      data-both={both ? "1" : "0"}
      data-signed-side={
        both ? "both" : clamped < 0 ? "neg" : clamped > 0 ? "pos" : "zero"
      }
    >
      <div
        data-slot="slider-track"
        className="relative h-full w-full overflow-hidden rounded-[var(--radius)]"
        aria-hidden
      >
        {min < 0 ? (
          <div
            className="landmarks-slider-center absolute top-0.5 bottom-0.5 z-[1] w-px bg-foreground/35"
            style={{ left: `${centerPct}%` }}
            data-testid="context-buffer-center"
          />
        ) : null}
        <div
          data-slot="slider-range"
          className="absolute inset-y-0 z-[1] rounded-[var(--radius)]"
          style={{
            left: `${Math.max(0, Math.min(100, fillLeft))}%`,
            width: `${Math.max(0, Math.min(100, fillWidth))}%`,
          }}
        />
        {leftThumbPct != null ? (
          <div
            data-slot="slider-thumb"
            data-thumb="left"
            className="landmarks-slider-thumb-mark absolute top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${Math.max(0, Math.min(100, leftThumbPct))}%` }}
          />
        ) : null}
        {rightThumbPct != null &&
        (both || rightThumbPct !== leftThumbPct) ? (
          <div
            data-slot="slider-thumb"
            data-thumb="right"
            className="landmarks-slider-thumb-mark absolute top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${Math.max(0, Math.min(100, rightThumbPct))}%` }}
          />
        ) : null}
        {displayValue != null ? (
          <span className="landmarks-slider-value z-[2]">{displayValue}</span>
        ) : null}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={span / 200 || 0.01}
        value={clamped}
        aria-label={ariaLabel}
        aria-valuetext={
          signedHint ? `${signedHint}, ${mag}` : String(clamped)
        }
        className="absolute inset-0 z-[3] h-full w-full cursor-pointer opacity-0"
        onChange={(e) => commit(Number(e.target.value))}
      />
    </div>
  );
}

/** @deprecated Prefer SoftFloatSignedSlider — kept as alias during migrate. */
export const BidirectionalPillSlider = SoftFloatSignedSlider;
