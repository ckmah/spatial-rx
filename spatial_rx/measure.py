"""Landmark measurements on AnnData (tidy DataFrames + obs write-back).

Measure helpers take a landmarks `geopandas.GeoDataFrame` (build with
`spatial_rx.landmarks_to_geodataframe` from widget landmark dicts).

Required columns
----------------
geometry
    Active geometry used for distance / containment / projection:
    Point, LineString (line or densified spline), or Polygon (shape).
id
    Stable landmark id (string).
type
    One of `point`, `line`, `spline`, `shape`.

Optional columns
----------------
buffer_width
    Buffer half-width in tissue units (default 0). When > 0 on a line/spline,
    `distances` / `along_positions` / `composition` restrict to that band.
buffer_side
    `both` (default), `left`, or `right` for single-sided buffers.

Other export columns (`vertices`, `tension`, `radius`) are ignored by measure;
they matter for widget round-trip only. See
`docs/landmarks-spatialdata-contract.md`.
"""

from __future__ import annotations

from typing import Iterator, Sequence

import geopandas as gpd
import numpy as np
import pandas as pd
from anndata import AnnData
from geopandas import GeoDataFrame


def write_obs(
    adata: AnnData,
    df: pd.DataFrame,
    column: str,
    value_col: str,
    *,
    obs_name_col: str = "obs_name",
) -> None:
    """Write a per-cell measurement column into `adata.obs`.

    Aligns rows of `df` to cells by `obs_name` (matching `adata.obs_names`),
    then assigns `df[value_col]` into `adata.obs[column]`. Missing cells stay
    NaN. No-op when `df` is empty or lacks the name column.

    Parameters
    ----------
    adata :
        Target AnnData (mutated in place).
    df :
        Tidy measurement frame, typically from `distances` or `along_positions`.
    column :
        New or existing `obs` column to write.
    value_col :
        Column in `df` holding the numeric values (e.g. "distance", "s").
    obs_name_col :
        Column in `df` with cell ids (default "obs_name").
    """
    if df is None or df.empty or obs_name_col not in df.columns:
        return
    names = df[obs_name_col].astype(str).to_numpy()
    values = df[value_col].to_numpy()
    if column not in adata.obs.columns:
        adata.obs[column] = np.nan
    adata.obs.loc[names, column] = values


def cardinal_sample(vertices, tension=0.0, n_per_seg=20, closed=False):
    """Densify cardinal-spline control points into a polyline.

    Shared by GeoDataFrame export. `tension` is in [0, 1] (widget default 0).
    Open curves with two points return those points unchanged; closed curves
    need at least three distinct vertices.
    """
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


def _landmark_rows(
    landmarks: GeoDataFrame,
) -> Iterator[tuple[str, str, object, float, str]]:
    """Yield (id, type, geometry, buffer_width, buffer_side) from a GeoDataFrame."""
    if landmarks is None or len(landmarks) == 0:
        return
    cols = getattr(landmarks, "columns", [])
    for _, row in landmarks.iterrows():
        geom = row.geometry
        if geom is None or getattr(geom, "is_empty", False):
            continue
        kind = str(row.get("type") or "point")
        if kind == "gradient":
            kind = "spline"
        width = 0.0
        if "buffer_width" in cols and row.get("buffer_width") is not None:
            width = float(row["buffer_width"])
        side = "both"
        if "buffer_side" in cols and row.get("buffer_side") is not None:
            side = str(row["buffer_side"])
        yield str(row.get("id") or ""), kind, geom, width, side


def buffer_polygon(geom, ltype, *, buffer_width: float = 0.0, buffer_side: str = "both"):
    """Polygon band around a line/spline from buffer_width / buffer_side.

    Returns None when the landmark is not a line/spline, width is <= 0, or
    geometry is not a LineString. buffer_side is "both" (default), "left", or
    "right" (right reverses the line for single-sided buffer).
    """
    from shapely.geometry import LineString

    if ltype not in ("line", "spline") or geom.geom_type != "LineString":
        return None
    width = float(buffer_width or 0)
    if width <= 0:
        return None
    line = geom
    side = buffer_side or "both"
    if side == "right":
        line = LineString(list(line.coords)[::-1])
        return line.buffer(width, single_sided=True)
    if side == "left":
        return line.buffer(width, single_sided=True)
    return line.buffer(width)


def _xy_groups(adata: AnnData, obs_key: str, spatial_key: str):
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
    adata: AnnData,
    landmarks: GeoDataFrame,
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
) -> pd.DataFrame:
    """Per-cell distance to landmark geometry in tissue coordinates.

    Distance is Euclidean to each row's `geometry` (point, line, densified
    spline, or shape polygon). When a line/spline has `buffer_width` > 0, only
    cells inside that band are returned. Pair with `write_obs` to store a
    column such as `dist_<landmark_id>`.

    Parameters
    ----------
    adata :
        AnnData with `obsm[spatial_key]` xy and `obs[obs_key]` labels.
    landmarks :
        Landmarks GeoDataFrame. Required: `geometry`, `id`, `type`. Optional:
        `buffer_width`, `buffer_side` (see module docstring).
    obs_key :
        `obs` column copied into the returned `group` field.
    spatial_key :
        `obsm` key for coordinates (default "spatial").
    obs_names :
        Optional cell subset (e.g. `widget.get_obs_names(...)`). None uses all
        cells.

    Returns
    -------
    pandas.DataFrame
        One row per included cell: `obs_name`, `point_index`, `landmark_id`,
        `landmark_type`, `group`, `distance`.
    """
    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    rows = []
    for lid, ltype, geom, width, side in _landmark_rows(landmarks):
        dist = points.distance(geom).to_numpy()
        poly = buffer_polygon(geom, ltype, buffer_width=width, buffer_side=side)
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
    adata: AnnData,
    landmarks: GeoDataFrame,
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
) -> pd.DataFrame:
    """Cell-type composition inside a shape or line/spline buffer.

    For `shape` landmarks, counts cells whose coordinates fall in the polygon
    `geometry`. For line/spline landmarks, requires `buffer_width` > 0 and
    counts cells inside that band. Returns tidy counts and proportions per
    `obs_key` group.

    Parameters
    ----------
    adata :
        AnnData with `obsm[spatial_key]` and `obs[obs_key]`.
    landmarks :
        Landmarks GeoDataFrame. Required: `geometry`, `id`, `type`. Optional:
        `buffer_width`, `buffer_side`. Typically one closed `shape` (or a
        buffered line/spline).
    obs_key :
        Categorical `obs` column whose levels become `group`.
    spatial_key :
        `obsm` key for coordinates (default "spatial").
    obs_names :
        Optional cell subset. None uses all cells.

    Returns
    -------
    pandas.DataFrame
        Columns: `landmark_id`, `group`, `count`, `proportion`, `n_total`.
        Empty when no landmark covers any selected cells.
    """
    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    cand = np.zeros(len(x), dtype=bool)
    cand[indices] = True
    rows = []
    for lid, ltype, geom, width, side in _landmark_rows(landmarks):
        if ltype == "shape":
            region = geom
        else:
            region = buffer_polygon(geom, ltype, buffer_width=width, buffer_side=side)
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
    adata: AnnData,
    landmarks: GeoDataFrame,
    *,
    obs_key: str,
    spatial_key: str = "spatial",
    obs_names: Sequence[str] | None = None,
    radius: float | None = None,
) -> pd.DataFrame:
    """Project cells onto a line/spline as a normalized arc coordinate `s`.

    Each included cell gets `s` in [0, 1] along the landmark (start → end),
    plus perpendicular `distance`. Membership: if `buffer_width` > 0, cells
    inside the buffer band; otherwise cells within `radius` of the centerline
    (default ~5% of the larger spatial span). Pair with `write_obs` to store
    `s` on `adata.obs`.

    Parameters
    ----------
    adata :
        AnnData with `obsm[spatial_key]` and `obs[obs_key]`.
    landmarks :
        Landmarks GeoDataFrame with line or spline `geometry` (points/shapes
        are skipped). Required: `geometry`, `id`, `type`. Optional:
        `buffer_width`, `buffer_side`.
    obs_key :
        `obs` column copied into `group`.
    spatial_key :
        `obsm` key for coordinates (default "spatial").
    obs_names :
        Optional cell subset. None uses all cells.
    radius :
        Fallback inclusion radius when the landmark has no buffer. None
        derives a span-based default.

    Returns
    -------
    pandas.DataFrame
        Columns: `obs_name`, `point_index`, `landmark_id`, `landmark_type`,
        `group`, `s`, `distance`.
    """
    x, y, names, groups = _xy_groups(adata, obs_key, spatial_key)
    indices = _subset_indices(names, obs_names)
    points = gpd.GeoSeries(gpd.points_from_xy(x, y))
    default_radius = (
        float(radius)
        if radius is not None
        else 0.05 * max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
    )
    rows = []
    for lid, ltype, geom, width, side in _landmark_rows(landmarks):
        if ltype not in ("line", "spline") or geom.geom_type != "LineString":
            continue
        dist = points.distance(geom).to_numpy()
        poly = buffer_polygon(geom, ltype, buffer_width=width, buffer_side=side)
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
