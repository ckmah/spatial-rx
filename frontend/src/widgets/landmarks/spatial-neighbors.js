/** Client-side spatial neighbor queries via @thi.ng/geom-accel (n-D KD-tree). */

import { KdTreeMap } from "@thi.ng/geom-accel";

/**
 * Build a KD-tree over point positions. Values are point indices.
 * @param {Array<{x:number,y:number,z?:number}>} pts
 * @returns {import("@thi.ng/geom-accel").KdTreeMap<number[], number> | null}
 */
export function buildSpatialIndex(pts) {
  if (!pts || !pts.length) return null;
  const dim = pts[0].z != null && Number.isFinite(pts[0].z) ? 3 : 2;
  const pairs = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const key = dim === 3 ? [p.x, p.y, p.z] : [p.x, p.y];
    pairs.push([key, i]);
  }
  return new KdTreeMap(dim, pairs);
}

/**
 * Query knn or radius neighbors of seed indices (seeds themselves excluded).
 * @param {ReturnType<typeof buildSpatialIndex>} tree
 * @param {Array<{x:number,y:number,z?:number}>} pts
 * @param {number[]} seedIdxs
 * @param {{ mode?: string, k?: number, radius?: number, edges?: boolean }} opts
 */
export function queryNeighbors(tree, pts, seedIdxs, opts) {
  const edges = [];
  const neighbors = [];
  if (!tree || !seedIdxs.length || !pts.length) return { edges, neighbors };
  const mode = opts?.mode || "knn";
  const takeK = Math.max(0, opts?.k | 0);
  const radius = Number(opts?.radius) || 0;
  const wantEdges = opts?.edges === true || (opts?.edges !== false && mode === "knn");
  if (mode === "knn" && takeK <= 0) return { edges, neighbors };
  if (mode === "radius" && !(radius > 0)) return { edges, neighbors };

  const dim = tree.dim | 0;
  const seen = new Set();
  const seedSet = new Set(seedIdxs);
  // Large cap for radius queries; knn uses takeK (+1 to skip self).
  const limit = mode === "knn" ? takeK + 1 : Math.max(pts.length, 1);
  const maxDist = mode === "knn" ? Number.POSITIVE_INFINITY : radius;

  for (const si of seedIdxs) {
    const s = pts[si];
    if (!s) continue;
    const q = dim === 3 ? [s.x, s.y, s.z ?? 0] : [s.x, s.y];
    const hits = tree.queryValues(q, maxDist, limit) || [];
    for (const j of hits) {
      if (j === si || seedSet.has(j)) continue;
      if (!seen.has(j)) {
        seen.add(j);
        neighbors.push(j);
      }
      if (wantEdges) {
        const t = pts[j];
        if (!t) continue;
        edges.push({
          path: [
            [s.x, s.y],
            [t.x, t.y],
          ],
        });
      }
    }
  }
  return { edges, neighbors };
}
