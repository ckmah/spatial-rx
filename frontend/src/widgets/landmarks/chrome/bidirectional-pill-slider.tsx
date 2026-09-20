import { cn } from "@/lib/utils";

/**
 * Bidirectional Soft Float pill slider for signed buffer width.
 *
 * Visual language matches `.landmarks-slider-control` (capsule track + fill).
 *
 * Signed mapping (also enforced by `applySignedBuffer` in the toolbar):
 * - **Left / In = negative** values (pill grows left of center).
 * - **Right / Out = positive** values (pill grows right of center).
 * - **Both** mode: magnitude only; pill grows symmetrically from center.
 */
export function BidirectionalPillSlider({
  value,
  min = -1,
  max = 1,
  both = false,
  onChange,
  "aria-label": ariaLabel = "Buffer",
  testId,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  both?: boolean;
  onChange: (v: number) => void;
  "aria-label"?: string;
  testId?: string;
  className?: string;
}) {
  const span = Math.max(max - min, 1e-9);
  const clamped = Math.min(max, Math.max(min, value));
  const absMax = Math.max(Math.abs(min), Math.abs(max), 1e-9);
  const mag = Math.abs(clamped);
  // Center at signed 0 — left of center is negative, right is positive.
  const centerPct = ((0 - min) / span) * 100;
  const thumbPct = ((clamped - min) / span) * 100;

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

  const signedHint =
    both || min >= 0
      ? undefined
      : clamped < 0
        ? "left negative"
        : clamped > 0
          ? "right positive"
          : "zero";

  return (
    <div
      className={cn(
        "landmarks-slider-control landmarks-pill-slider relative min-w-[180px] flex-1",
        className,
      )}
      data-testid={testId}
      data-both={both ? "1" : "0"}
      data-signed-side={
        both ? "both" : clamped < 0 ? "left" : clamped > 0 ? "right" : "zero"
      }
    >
      <div
        className="landmarks-pill-slider__track relative h-full w-full overflow-hidden rounded-[var(--radius)]"
        aria-hidden
      >
        <div
          className="landmarks-pill-slider__center absolute top-1 bottom-1 w-px bg-border/80"
          style={{ left: `${centerPct}%` }}
        />
        <div
          className="landmarks-pill-slider__fill absolute inset-y-0 rounded-[var(--radius)]"
          style={{
            left: `${Math.max(0, Math.min(100, fillLeft))}%`,
            width: `${Math.max(0, Math.min(100, fillWidth))}%`,
          }}
        />
        <div
          className="landmarks-pill-slider__thumb absolute top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 transition-[height,opacity] duration-150 ease-out group-hover/slider:opacity-100"
          style={{ left: `${Math.max(0, Math.min(100, thumbPct))}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={span / 200 || 0.01}
        value={clamped}
        aria-label={ariaLabel}
        aria-valuetext={
          signedHint
            ? `${signedHint}, ${mag}`
            : String(clamped)
        }
        className="landmarks-pill-slider__input absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
