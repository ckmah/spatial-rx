import { useCallback, useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { decodeF32Base64 } from "../binary";
import type { EngineHandle } from "../engine";
import type { LandmarksModel } from "../use-landmarks-model";
import { FLOAT_PANEL } from "./sections";

type WorldBounds = [number, number, number, number];

/** Slightly wider than square overview frame; data letterboxed inside. */
const MINIMAP_ASPECT = 1.35;

/** Roughly match deck scrollZoom: ~0.01 zoom units per wheel deltaY. */
const MINIMAP_ZOOM_PER_DELTA = 0.01;

function mapLayout(
  cssW: number,
  cssH: number,
  xBounds: number[],
  yBounds: number[],
) {
  const x0 = Number(xBounds[0]);
  const x1 = Number(xBounds[1]);
  const y0 = Number(yBounds[0]);
  const y1 = Number(yBounds[1]);
  const dx = Math.abs(x1 - x0) || 1;
  const dy = Math.abs(y1 - y0) || 1;
  const scale = Math.min(cssW / dx, cssH / dy);
  const mapW = dx * scale;
  const mapH = dy * scale;
  return {
    x0,
    x1,
    y0,
    y1,
    dx,
    dy,
    scale,
    mapW,
    mapH,
    ox: (cssW - mapW) / 2,
    oy: (cssH - mapH) / 2,
  };
}

/**
 * World → minimap canvas.
 * deck.gl OrthographicView puts world max-Y at the top of the screen; canvas
 * y grows downward, so flip Y (maxY → row 0) to match the main plot.
 */
function toCanvasXY(
  x: number,
  y: number,
  layout: ReturnType<typeof mapLayout>,
) {
  const u = (x - layout.x0) / (layout.x1 - layout.x0 || 1);
  const v = (layout.y1 - y) / (layout.y1 - layout.y0 || 1);
  return [layout.ox + u * layout.mapW, layout.oy + v * layout.mapH] as const;
}

function clientToWorld(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  xBounds: number[],
  yBounds: number[],
) {
  const layout = mapLayout(rect.width, rect.height, xBounds, yBounds);
  const px = clientX - rect.left - layout.ox;
  const py = clientY - rect.top - layout.oy;
  const u = px / Math.max(layout.mapW, 1);
  const v = py / Math.max(layout.mapH, 1);
  return {
    x: layout.x0 + u * (layout.x1 - layout.x0),
    // Inverse of the Y flip in toCanvasXY.
    y: layout.y1 - v * (layout.y1 - layout.y0),
  };
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawMinimap(
  canvas: HTMLCanvasElement,
  opts: {
    pointsB64: string;
    xBounds: number[];
    yBounds: number[];
    viewport: WorldBounds | null;
    dark: boolean;
  },
) {
  const { pointsB64, xBounds, yBounds, viewport, dark } = opts;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = canvas.clientWidth || 160;
  const cssH = canvas.clientHeight || 120;
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const layout = mapLayout(w, h, xBounds, yBounds);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dark ? "#141414" : "#e8e8e8";
  ctx.fillRect(0, 0, w, h);

  if (pointsB64) {
    try {
      const pts = decodeF32Base64(pointsB64);
      const n = Math.floor(pts.length / 4);
      ctx.fillStyle = dark ? "rgba(160,160,160,0.55)" : "rgba(100,100,100,0.45)";
      const r = Math.max(0.75 * dpr, 1);
      for (let i = 0; i < n; i++) {
        const x = layout.x0 + ((pts[i * 4] + 1) / 2) * (layout.x1 - layout.x0);
        const y = layout.y0 + ((pts[i * 4 + 1] + 1) / 2) * (layout.y1 - layout.y0);
        const [cx, cy] = toCanvasXY(x, y, layout);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } catch {
      /* ignore decode errors */
    }
  }

  if (viewport) {
    const [vx0, vy0, vx1, vy1] = viewport;
    const [a, b] = [toCanvasXY(vx0, vy0, layout), toCanvasXY(vx1, vy1, layout)];
    const mapTop = layout.oy;
    const mapBottom = layout.oy + layout.mapH;
    const left = Math.min(Math.max(Math.min(a[0], b[0]), 0), w);
    const right = Math.min(Math.max(Math.max(a[0], b[0]), 0), w);
    const top = Math.min(Math.max(Math.min(a[1], b[1]), mapTop), mapBottom);
    const bottom = Math.min(Math.max(Math.max(a[1], b[1]), mapTop), mapBottom);
    const rw = Math.max(0, right - left);
    const rh = Math.max(0, bottom - top);
    if (rw > 0.5 && rh > 0.5) {
      // Match canvas / panel corner radius (--lm-float-radius on the shell).
      // Framer neutrals — viewport chrome stays achromatic (data owns saturation).
      const cssRadius =
        parseFloat(getComputedStyle(canvas).borderTopLeftRadius) || 0;
      const radius = Math.max(0, cssRadius * dpr);
      ctx.strokeStyle = dark
        ? "rgba(255, 255, 255, 0.92)"
        : "rgba(17, 17, 17, 0.88)";
      ctx.lineWidth = 1.5 * dpr;
      roundRectPath(ctx, left, top, rw, rh, radius);
      ctx.stroke();
      roundRectPath(ctx, left, top, rw, rh, radius);
      ctx.fillStyle = dark
        ? "rgba(255, 255, 255, 0.10)"
        : "rgba(17, 17, 17, 0.08)";
      ctx.fill();
    }
  }
}

export function MinimapPanel({
  lm,
  engine,
  dark = false,
  embedded = false,
}: {
  lm: LandmarksModel;
  engine: EngineHandle | null;
  dark?: boolean;
  embedded?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const paint = () => {
      drawMinimap(canvas, {
        pointsB64: lm.points_data || "",
        xBounds: lm.x_bounds || [0, 1],
        yBounds: lm.y_bounds || [0, 1],
        viewport: engine?.getViewportWorldBounds?.() ?? null,
        dark,
      });
    };

    paint();
    const raf = requestAnimationFrame(paint);
    const t = window.setTimeout(paint, 80);
    const unsub = engine?.subscribeViewState?.(() => paint());
    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      unsub?.();
      ro.disconnect();
    };
  }, [lm.points_data, lm.x_bounds, lm.y_bounds, engine, dark]);

  const panAt = useCallback(
    (clientX: number, clientY: number, animate = false) => {
      if (!engine?.panTo) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const { x, y } = clientToWorld(
        clientX,
        clientY,
        rect,
        lm.x_bounds || [0, 1],
        lm.y_bounds || [0, 1],
      );
      engine.panTo(x, y, { animate });
    },
    [engine, lm.x_bounds, lm.y_bounds],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    panAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return;
    panAt(e.clientX, e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!engine?.zoomBy) return;
    e.preventDefault();
    e.stopPropagation();
    // Match deck.gl scrollZoom scaling (deltaY * ~0.01), not ±1 toolbar steps.
    const delta = -e.deltaY * MINIMAP_ZOOM_PER_DELTA;
    if (!delta) return;
    engine.zoomBy(delta, { animate: false });
    panAt(e.clientX, e.clientY, false);
  };

  const body = (
    <canvas
      ref={canvasRef}
      className="w-full cursor-grab active:cursor-grabbing rounded-[var(--lm-float-radius)]"
      style={{ aspectRatio: `${MINIMAP_ASPECT} / 1` }}
      data-testid="landmarks-minimap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      aria-label="Minimap — drag to pan, scroll to zoom"
    />
  );

  if (embedded) {
    return <div className="shrink-0">{body}</div>;
  }

  return (
    <Card
      className={cn(FLOAT_PANEL, "shrink-0 overflow-hidden p-0")}
      data-testid="minimap-panel"
    >
      <CardHeader className="sr-only">
        <CardTitle>Overview</CardTitle>
        <CardDescription>Minimap of the tissue scatter</CardDescription>
      </CardHeader>
      <CardContent className="p-0">{body}</CardContent>
    </Card>
  );
}
