import { cn } from "@/lib/utils";

/**
 * Bidirectional Soft Float pill slider for signed buffer width.
 *
 * - Capsule track + **white fill** + dark **line handle**(s)
 * - Center mark at 0; dragging near 0 **snaps** to 0
 * - Value drawn **inside** the capsule (same as `.landmarks-slider-value`)
 * - **Both** mode: symmetric fill + handles on **both** ends
 *
 * Signed mapping: negative ← left of center, positive → right of center.
 */
export function BidirectionalPillSlider({
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
  /** Formatted label drawn inside the capsule. */
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
  // Snap threshold ~2% of span so the center line is easy to hit.
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
        "landmarks-slider-control landmarks-pill-slider group/slider relative h-7 w-full min-w-[180px] shrink-0",
        className,
      )}
      data-testid={testId}
      data-both={both ? "1" : "0"}
      data-signed-side={
        both ? "both" : clamped < 0 ? "neg" : clamped > 0 ? "pos" : "zero"
      }
    >
      <div
        className="landmarks-pill-slider__track relative h-full w-full overflow-hidden rounded-[var(--radius)]"
        aria-hidden
      >
        {/* Snap target — 0 at center */}
        <div
          className="landmarks-pill-slider__center absolute top-0.5 bottom-0.5 z-[1] w-px bg-foreground/35"
          style={{ left: `${centerPct}%` }}
          data-testid="context-buffer-center"
        />
        <div
          className="landmarks-pill-slider__fill absolute inset-y-0 z-[1] rounded-[var(--radius)]"
          style={{
            left: `${Math.max(0, Math.min(100, fillLeft))}%`,
            width: `${Math.max(0, Math.min(100, fillWidth))}%`,
          }}
        />
        {leftThumbPct != null ? (
          <div
            className="landmarks-pill-slider__thumb absolute top-1/2 z-[2] h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${Math.max(0, Math.min(100, leftThumbPct))}%` }}
            data-thumb="left"
          />
        ) : null}
        {rightThumbPct != null &&
        (both || rightThumbPct !== leftThumbPct) ? (
          <div
            className="landmarks-pill-slider__thumb absolute top-1/2 z-[2] h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${Math.max(0, Math.min(100, rightThumbPct))}%` }}
            data-thumb="right"
          />
        ) : null}
        {displayValue != null ? (
          <span className="landmarks-slider-value landmarks-pill-slider__value z-[2]">
            {displayValue}
          </span>
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
        className="landmarks-pill-slider__input absolute inset-0 z-[3] h-full w-full cursor-pointer opacity-0"
        onChange={(e) => commit(Number(e.target.value))}
      />
    </div>
  );
}
