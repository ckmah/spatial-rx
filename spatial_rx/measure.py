"""Landmark measurements on AnnData (tidy DataFrames + obs write-back)."""

from __future__ import annotations

from typing import Any, Sequence

import numpy as np
import pandas as pd


def write_obs(
    adata: Any,
    df: pd.DataFrame,
    column: str,
    value_col: str,
    *,
    obs_name_col: str = "obs_name",
) -> None:
    """Write a per-cell measurement into ``adata.obs``, aligned by ``obs_name``."""
    if df is None or df.empty or obs_name_col not in df.columns:
        return
    names = df[obs_name_col].astype(str).to_numpy()
    values = df[value_col].to_numpy()
    if column not in adata.obs.columns:
        adata.obs[column] = np.nan
    adata.obs.loc[names, column] = values


def cardinal_sample(vertices, tension=0.0, n_per_seg=20, closed=False):
    pts = [(float(x), float(y)) for x, y in vertices]
    if closed:
        if len(pts) >= 2 and pts[0] == pts[-1]:
            pts = pts[:-1]
        if len(pts) < 3:
            return pts
        n = len(pts)

        def at(i):
            return pts[i % n]

        n_seg = n
    else:
        if len(pts) < 2:
            return pts
        if len(pts) == 2:
            return pts
        n = len(pts)
        ext = [
            (2 * pts[0][0] - pts[1][0], 2 * pts[0][1] - pts[1][1]),
            *pts,
            (2 * pts[-1][0] - pts[-2][0], 2 * pts[-1][1] - pts[-2][1]),
        ]

        def at(i):
            return ext[i + 1]

        n_seg = n - 1

    s = (1.0 - max(0.0, min(1.0, float(tension)))) / 2.0
    out = []
    for i in range(n_seg):
        p0, p1, p2, p3 = at(i - 1), at(i), at(i + 1), at(i + 2)
        m1x = s * (p2[0] - p0[0])
        m1y = s * (p2[1] - p0[1])
        m2x = s * (p3[0] - p1[0])
        m2y = s * (p3[1] - p1[1])
        for j in range(n_per_seg):
            u = j / n_per_seg
            u2 = u * u
            u3 = u2 * u
            h00 = 2 * u3 - 3 * u2 + 1
            h10 = u3 - 2 * u2 + u
            h01 = -2 * u3 + 3 * u2
            h11 = u3 - u2
            out.append(
                (
                    h00 * p1[0] + h10 * m1x + h01 * p2[0] + h11 * m2x,
                    h00 * p1[1] + h10 * m1y + h01 * p2[1] + h11 * m2y,
                )
            )
    out.append(at(n_seg if closed else n - 1))
    return out


def landmark_geoms(landmarks):
    from shapely.geometry import LineString, Point, Polygon

    geoms = {}
    for lm in landmarks:
        if lm.get("hidden"):
            continue
        kind = lm.get("type", "point")
        if kind == "gradient":
            kind = "spline"
        verts = lm.get("vertices") or []
        data_pts = [(float(v[0]), float(v[1])) for v in verts]
        lid = str(lm.get("id"))
        if kind == "point" and data_pts:
            geoms[lid] = ("point", Point(data_pts[0]))
        elif kind == "line" and len(data_pts) >= 2:
            geoms[lid] = ("line", LineString(data_pts))
        elif kind == "spline":
            sampled = cardinal_sample(data_pts, float(lm.get("tension") or 0.0))
            if len(sampled) >= 2:
                geoms[lid] = ("spline", LineString(sampled))
        elif kind == "shape":
            sampled = cardinal_sample(
                data_pts, float(lm.get("tension") or 0.0), closed=True
            )
            if len(sampled) >= 3:
                ring = list(sampled)
                if ring[0] != ring[-1]:
                    ring.append(ring[0])
                geoms[lid] = ("shape", Polygon(ring))
    return geoms


def buffer_polygon(lm, ltype, geom):
    """Band around a line/spline from landmark buffer_width / buffer_side."""
    from shapely.geometry import LineString

    if ltype not in ("line", "spline") or geom.geom_type != "LineString":
        return None
    width = float(lm.get("buffer_width") or 0)
    if width <= 0:
        return None
    line = geom
    side = lm.get("buffer_side") or "both"
    if side == "right":
        line = LineString(list(line.coords)[::-1])
        return line.buffer(width, single_sided=True)
    if side == "left":
        return line.buffer(width, single_sided=True)
    return line.buffer(width)


def _xy_groups(adata, obs_key: str, spatial_key: str):
    xy = np.asarray(adata.obsm[spatial_key], dtype=float)
    names = np.asarray(adata.obs_names.astype(str))
    groups = np.asarray(adata.obs[obs_key]).astype(str)
    return xy[:, 0], xy[:, 1], names, groups


def _subset_indices(names: np.ndarray, obs_names: Sequence[str] | None) -> np.ndarray:
    if obs_names is None:
        return np.arange(names.shape[0], dtype=int)
    lookup = {n: i for i, n in enumerate(names)}
    return np.asarray(
        [lookup[str(n)] for n in obs_names if str(n) in lookup], dtype=int
    )


def distances(
    adata: Any,
    landmarks: Sequence[dict],
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
) -> pd.DataFrame:
    """Distance to landmark centerline; if buffer > 0, only cells inside the band."""
    import geopandas as gpd

    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    rows = []
    for lm in landmarks:
        geoms = landmark_geoms([lm])
        if not geoms:
            continue
        lid, (ltype, geom) = next(iter(geoms.items()))
        dist = points.distance(geom).to_numpy()
        poly = buffer_polygon(lm, ltype, geom)
        if poly is not None:
            inside = points.intersects(poly).to_numpy()
        else:
            inside = np.ones(len(points), dtype=bool)
        for i in indices:
            if not inside[i]:
                continue
            rows.append(
                {
                    "obs_name": names[i],
                    "point_index": int(i),
                    "landmark_id": lid,
                    "landmark_type": ltype,
                    "group": groups[i],
                    "distance": float(dist[i]),
                }
            )
    return pd.DataFrame(rows)


def composition(
    adata: Any,
    landmarks: Sequence[dict],
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
) -> pd.DataFrame:
    """Composition inside a shape, or inside a line/spline buffer band."""
    import geopandas as gpd

    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    cand = np.zeros(len(x), dtype=bool)
    cand[indices] = True
    rows = []
    for lm in landmarks:
        geoms = landmark_geoms([lm])
        if not geoms:
            continue
        lid, (ltype, geom) = next(iter(geoms.items()))
        if ltype == "shape":
            region = geom
        else:
            region = buffer_polygon(lm, ltype, geom)
            if region is None:
                continue
        mask = cand & points.intersects(region).to_numpy()
        subset = groups[mask]
        n = int(mask.sum())
        if n == 0:
            continue
        values, counts = np.unique(subset, return_counts=True)
        for value, count in zip(values, counts, strict=True):
            rows.append(
                {
                    "landmark_id": lid,
                    "group": value,
                    "count": int(count),
                    "proportion": float(count) / n,
                    "n_total": n,
                }
            )
    return pd.DataFrame(rows)


def along_positions(
    adata: Any,
    landmarks: Sequence[dict],
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
    radius: float | None = None,
) -> pd.DataFrame:
    """Project cells onto line/spline; membership uses buffer when set."""
    import geopandas as gpd

    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    default_radius = (
        float(radius)
        if radius is not None
        else 0.05 * max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
    )
    rows = []
    for lm in landmarks:
        geoms = landmark_geoms([lm])
        if not geoms:
            continue
        lid, (ltype, geom) = next(iter(geoms.items()))
        if ltype not in ("line", "spline") or geom.geom_type != "LineString":
            continue
        dist = points.distance(geom).to_numpy()
        poly = buffer_polygon(lm, ltype, geom)
        if poly is not None:
            inside = points.intersects(poly).to_numpy()
        else:
            inside = dist <= default_radius
        for i in indices:
            if not inside[i]:
                continue
            s = float(geom.project(points.iloc[i], normalized=True))
            rows.append(
                {
                    "obs_name": names[i],
                    "point_index": int(i),
                    "landmark_id": lid,
                    "landmark_type": ltype,
                    "group": groups[i],
                    "s": s,
                    "distance": float(dist[i]),
                }
            )
    return pd.DataFrame(rows)
