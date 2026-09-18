/** Pure landmark geometry helpers (engine + optional chrome). */

export const BUFFERABLE = ["point", "line", "spline", "shape"];
export const TENSION_TYPES = ["spline", "shape"];
export const NODE_EDITABLE = ["line", "spline", "shape"];
export const EXTENDABLE = ["line", "spline"];
export const LINE_BUFFER_SIDES = ["left", "both", "right"];
export const SHAPE_BUFFER_SIDES = ["out", "both", "in"];

export function minVerticesForType(type) {
  if (type === "line" || type === "spline") return 2;
  if (type === "shape") return 3;
  return 1;
}

export function circlePolygon(cx, cy, r, n = 48) {
  if (!(r > 0)) return null;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return pts;
}

/** Offset open polyline by width along left normal (negative → right). */
export function offsetPathData(points, width) {
  return points.map((p, i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const dx = (b.x - a.x) / len;
    const dy = (b.y - a.y) / len;
    return { x: p.x - dy * width, y: p.y + dx * width };
  });
}

/** Simple closed-ring offset (outward positive). Vertices as {x,y}. */
export function offsetRingData(points, width) {
  const n = points.length;
  if (n < 3) return points.slice();
  const out = [];
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const ax = curr.x - prev.x;
    const ay = curr.y - prev.y;
    const bx = next.x - curr.x;
    const by = next.y - curr.y;
    const al = Math.hypot(ax, ay) || 1;
    const bl = Math.hypot(bx, by) || 1;
    const n1x = -ay / al;
    const n1y = ax / al;
    const n2x = -by / bl;
    const n2y = bx / bl;
    let nx = n1x + n2x;
    let ny = n1y + n2y;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    // Keep outward for CCW rings; flip if inward product with edge normal is wrong.
    const midNx = n1x;
    const midNy = n1y;
    if (nx * midNx + ny * midNy < 0) {
      nx = -nx;
      ny = -ny;
    }
    out.push({ x: curr.x + nx * width, y: curr.y + ny * width });
  }
  return out;
}

export function pointInRing(p, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const hit =
      yi > p.y !== yj > p.y &&
      p.x < ((xj - xi) * (p.y - yi)) / (yj - yi + 1e-12) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

export function distPointToSeg(px, py, ax, ay, bx, by) {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const ab2 = abx * abx + aby * aby || 1;
  let t = (apx * abx + apy * aby) / ab2;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + abx * t;
  const qy = ay + aby * t;
  return { dist: Math.hypot(px - qx, py - qy), t, qx, qy };
}

export function polylineLength(verts) {
  let len = 0;
  for (let i = 1; i < verts.length; i++) {
    const a = verts[i - 1];
    const b = verts[i];
    len += Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
  return len;
}

export function polygonArea(verts) {
  if (!verts || verts.length < 3) return 0;
  let a = 0;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    a += verts[j][0] * verts[i][1] - verts[i][0] * verts[j][1];
  }
  return Math.abs(a) * 0.5;
}

/** Convex hull of [x,y] points (Andrew's monotone chain). */
export function convexHull(points) {
  const pts = points
    .map((p) => [Number(p[0]), Number(p[1])])
    .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]));
  if (pts.length < 3) return pts;
  pts.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const cross = (o, a, b) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

export function landmarkMeasure(lm, pathPts) {
  if (!lm) return null;
  const type = lm.type;
  if (type === "point") {
    const r = Number(lm.buffer_width || 0);
    return { kind: "radius", value: r };
  }
  const verts = pathPts || lm.vertices || [];
  if (type === "shape") {
    return { kind: "area", value: polygonArea(verts.map((p) => (Array.isArray(p) ? p : [p.x, p.y]))) };
  }
  if (type === "line" || type === "spline") {
    const asArr = verts.map((p) => (Array.isArray(p) ? p : [p.x, p.y]));
    return { kind: "length", value: polylineLength(asArr) };
  }
  return null;
}
