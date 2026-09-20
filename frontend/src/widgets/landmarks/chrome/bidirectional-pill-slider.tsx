import { cn } from "@/lib/utils";

/**
 * Bidirectional pill slider for buffer width.
 * - Midpoint 0 at center.
 * - Signed mode: empty at center; pill grows left (neg) or right (pos).
 * - Both mode: pill grows symmetrically from center.
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
  const centerPct = ((0 - min) / span) * 100;

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

  return (
    <div
      className={cn(
        "landmarks-pill-slider relative flex h-8 min-w-[180px] flex-1 items-center",
        className,
      )}
      data-testid={testId}
      data-both={both ? "1" : "0"}
    >
      <div
        className="landmarks-pill-slider__track relative h-2.5 w-full overflow-hidden rounded-full bg-muted"
        aria-hidden
      >
        <div
          className="landmarks-pill-slider__center absolute top-0 bottom-0 w-px bg-border"
          style={{ left: `${centerPct}%` }}
        />
        <div
          className="landmarks-pill-slider__fill absolute top-0 bottom-0 rounded-full bg-foreground/80 transition-[left,width] duration-[var(--duration-quick)] ease-[cubic-bezier(0.2,0,0,1)]"
          style={{
            left: `${Math.max(0, Math.min(100, fillLeft))}%`,
            width: `${Math.max(0, Math.min(100, fillWidth))}%`,
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={span / 200 || 0.01}
        value={clamped}
        aria-label={ariaLabel}
        className="landmarks-pill-slider__input absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
