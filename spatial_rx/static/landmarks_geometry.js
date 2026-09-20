/** Pure landmark geometry helpers (engine + optional chrome). */

export const BUFFERABLE = ["point", "line", "spline", "shape"];
export const TENSION_TYPES = ["spline", "shape"];
export const NODE_EDITABLE = ["line", "spline", "shape"];
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

function unitNormalLeft(dx, dy) {
  const len = Math.hypot(dx, dy) || 1;
  return { x: -dy / len, y: dx / len };
}

function unitVec(dx, dy) {
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

/**
 * Intermediate points (excluding both endpoints) of the circular arc from
 * `from` to `to`, centered at `center`, following the signed short-way turn
 * angle between them. `quadSegs` is segments-per-quarter-circle, as in
 * Shapely's `buffer(..., quad_segs=n)`.
 */
function roundJoinArc(center, from, to, radius, quadSegs) {
  const a0 = Math.atan2(from.y - center.y, from.x - center.x);
  let a1 = Math.atan2(to.y - center.y, to.x - center.x);
  let delta = a1 - a0;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta <= -Math.PI) delta += Math.PI * 2;
  const steps = Math.max(1, Math.round((Math.abs(delta) / (Math.PI / 2)) * quadSegs));
  const pts = [];
  for (let i = 1; i < steps; i++) {
    const a = a0 + delta * (i / steps);
    pts.push({ x: center.x + Math.cos(a) * radius, y: center.y + Math.sin(a) * radius });
  }
  return pts;
}

/**
 * Join between two adjacent offset edges at `vertex` (original, unoffset
 * corner), where `dirIn`/`dirOut` are the (non-unit) directions of the
 * incoming/outgoing original edges and `pFrom`/`pTo` are the corresponding
 * offset edge endpoints at this vertex, offset by `width` (signed; positive
 * = left-normal side).
 *
 * Round join only bulges the *convex* corner relative to the offset side.
 * `width`'s sign selects which side of travel is offset (left-normal side
 * for `width > 0`); a corner is convex for that side iff the turn
 * direction (sign of the cross product of `dirIn`/`dirOut`) is *opposite*
 * the offset side — offsetting to the side you're turning away from opens
 * a gap that needs the round fill, while offsetting to the side you're
 * turning into makes the two offset edges overlap. On that concave side
 * the offset edge lines cross before reaching `pFrom`/`pTo`; connecting
 * through their true intersection (not an arc, and not a straight bevel
 * between `pFrom`/`pTo`) keeps erosion of convex shapes sharp instead of
 * incorrectly rounding inward.
 */
function offsetCornerPoints(vertex, dirIn, dirOut, pFrom, pTo, width, quadSegs) {
  const crossZ = dirIn.x * dirOut.y - dirIn.y * dirOut.x;
  if (Math.abs(crossZ) < 1e-9) return [pFrom, pTo];
  const isConvexForSide = crossZ > 0 !== width > 0;
  if (isConvexForSide) {
    return [pFrom, ...roundJoinArc(vertex, pFrom, pTo, Math.abs(width), quadSegs), pTo];
  }
  const t = ((pTo.x - pFrom.x) * dirOut.y - (pTo.y - pFrom.y) * dirOut.x) / crossZ;
  return [{ x: pFrom.x + dirIn.x * t, y: pFrom.y + dirIn.y * t }];
}

/**
 * Intermediate points (excluding both endpoints) of the round-cap
 * semicircle starting at `from` and sweeping 180° through the point in
 * `outwardDir` (unit vector) away from `center`, ending at the antipode of
 * `from` around `center`.
 */
function roundCapArc(center, from, outwardDir, radius, quadSegs) {
  const a0 = Math.atan2(from.y - center.y, from.x - center.x);
  const aMid = Math.atan2(outwardDir.y, outwardDir.x);
  let d = aMid - a0;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d <= -Math.PI) d += Math.PI * 2;
  const sign = d >= 0 ? 1 : -1;
  const steps = Math.max(1, quadSegs * 2);
  const pts = [];
  for (let i = 1; i < steps; i++) {
    const a = a0 + sign * Math.PI * (i / steps);
    pts.push({ x: center.x + Math.cos(a) * radius, y: center.y + Math.sin(a) * radius });
  }
  return pts;
}

/**
 * One-sided offset of an open polyline (start→end order preserved), with
 * round joins (radius |width|) at interior vertices. `width` may be
 * negative (offsets to the right instead of the left).
 */
function offsetOpenPolylineRoundJoins(points, width, quadSegs) {
  const n = points.length;
  const dirs = [];
  const normals = [];
  for (let i = 0; i < n - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    dirs.push({ x: b.x - a.x, y: b.y - a.y });
    normals.push(unitNormalLeft(b.x - a.x, b.y - a.y));
  }
  const out = [
    { x: points[0].x + normals[0].x * width, y: points[0].y + normals[0].y * width },
  ];
  for (let j = 1; j < n - 1; j++) {
    const edgeIn = j - 1;
    const edgeOut = j;
    const pFrom = { x: points[j].x + normals[edgeIn].x * width, y: points[j].y + normals[edgeIn].y * width };
    const pTo = { x: points[j].x + normals[edgeOut].x * width, y: points[j].y + normals[edgeOut].y * width };
    out.push(...offsetCornerPoints(points[j], dirs[edgeIn], dirs[edgeOut], pFrom, pTo, width, quadSegs));
  }
  const last = n - 1;
  out.push({
    x: points[last].x + normals[last - 1].x * width,
    y: points[last].y + normals[last - 1].y * width,
  });
  return out;
}

/**
 * One-sided offset of a closed ring (same point order as input), with round
 * joins at every vertex (including the wrap-around joint).
 */
function offsetClosedRingRoundJoins(points, effWidth, quadSegs) {
  const n = points.length;
  const dirs = [];
  const normals = [];
  for (let i = 0; i < n; i++) {
    const a = points[i];
    const b = points[(i + 1) % n];
    dirs.push({ x: b.x - a.x, y: b.y - a.y });
    normals.push(unitNormalLeft(b.x - a.x, b.y - a.y));
  }
  const out = [];
  for (let j = 0; j < n; j++) {
    const edgeIn = (j - 1 + n) % n;
    const edgeOut = j;
    const pFrom = {
      x: points[j].x + normals[edgeIn].x * effWidth,
      y: points[j].y + normals[edgeIn].y * effWidth,
    };
    const pTo = {
      x: points[j].x + normals[edgeOut].x * effWidth,
      y: points[j].y + normals[edgeOut].y * effWidth,
    };
    out.push(...offsetCornerPoints(points[j], dirs[edgeIn], dirs[edgeOut], pFrom, pTo, effWidth, quadSegs));
  }
  return out;
}

/**
 * Round join/cap buffer outline of an open polyline, matching Shapely
 * `buffer(distance, join_style="round", cap_style="round")` semantics.
 * `side`: "left" | "right" | "both". "left"/"right" corridors keep the
 * original centerline as the flat (uncapped) edge — matching Shapely's
 * `single_sided=True` buffers, which are flat-ended. "both" produces a
 * full stroke buffer with round semicircle caps at both ends. Returns a
 * closed ring of `{x,y}` points.
 */
export function bufferPolylineRound(points, width, side = "both", quadSegs = 8) {
  const pts = (points || []).filter(Boolean);
  if (pts.length < 2 || !(width > 0)) return null;
  if (side === "left" || side === "right") {
    const w = side === "left" ? width : -width;
    const offset = offsetOpenPolylineRoundJoins(pts, w, quadSegs);
    return [...pts, ...offset.slice().reverse()];
  }
  const left = offsetOpenPolylineRoundJoins(pts, width, quadSegs);
  const right = offsetOpenPolylineRoundJoins(pts, -width, quadSegs);
  const n = pts.length;
  const startDir = unitVec(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
  const endDir = unitVec(pts[n - 1].x - pts[n - 2].x, pts[n - 1].y - pts[n - 2].y);
  const endCap = roundCapArc(
    pts[n - 1],
    left[left.length - 1],
    { x: endDir.x, y: endDir.y },
    width,
    quadSegs,
  );
  const startCap = roundCapArc(
    pts[0],
    right[0],
    { x: -startDir.x, y: -startDir.y },
    width,
    quadSegs,
  );
  return [...left, ...endCap, ...right.slice().reverse(), ...startCap];
}

/**
 * Round-join buffer of a closed ring, matching Shapely `buffer()` sign
 * semantics: positive `width` dilates the exterior, negative erodes,
 * independent of the ring's vertex winding order. Returns the outer
 * boundary ring as `{x,y}[]` (for corridor fills, combine with the
 * original ring — see `bufferPolygonData` in landmarks.js).
 */
export function bufferRingRound(points, width, quadSegs = 8) {
  const n = points.length;
  if (n < 3) return points.slice();
  let signedArea2 = 0;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[(i + 1) % n];
    signedArea2 += p.x * q.y - q.x * p.y;
  }
  // The left normal points outward for a CW ring and inward for a CCW
  // ring; flip the effective width so +width always dilates regardless of
  // winding (same convention as legacy `offsetRingData`).
  const effWidth = signedArea2 < 0 ? width : -width;
  return offsetClosedRingRoundJoins(points, effWidth, quadSegs);
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

/**
 * Simple closed-ring offset with Shapely `buffer()` sign semantics: positive
 * `width` always dilates the exterior, negative always erodes, independent
 * of the ring's vertex winding order. Vertices as {x,y}.
 */
export function offsetRingData(points, width) {
  const n = points.length;
  if (n < 3) return points.slice();
  let signedArea2 = 0;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[(i + 1) % n];
    signedArea2 += p.x * q.y - q.x * p.y;
  }
  // The per-vertex "left normal" below points outward for a CW ring and
  // inward for a CCW ring; flip the effective width so +width always
  // dilates regardless of winding.
  const effWidth = signedArea2 < 0 ? width : -width;
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
    out.push({ x: curr.x + nx * effWidth, y: curr.y + ny * effWidth });
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
