from __future__ import annotations

import json
from pathlib import Path
from typing import TypedDict, cast

import geopandas as gpd


class TileRecord(TypedDict):
    """One spatial tile entry from ``tiles.json``."""

    col: int
    row: int
    bbox: list[float]
    center_xy: list[float]
    cell_count: int
    glb: str


class MeshifyInfo(TypedDict):
    """Tile index written by :func:`meshify` (same keys as ``tiles.json`` plus meshify metadata)."""

    version: int
    tile_size_xy: float
    scene_bbox: list[float]
    tiles: list[TileRecord]
    out_dir: str
    _cache_hit: bool


def meshify(
    gdf: gpd.GeoDataFrame,
    out_dir: str | Path = ".polyrender",
    *,
    smooth: bool = True,
    use_cache: bool = True,
    show_progress: bool = True,
) -> MeshifyInfo:
    """Export GLB tiles for ``gdf`` into a content-addressed cache directory.

    Writes::

        <out_dir>/<sha256>/tiles.json
        <out_dir>/<sha256>/tiles/*.glb

    The hash includes geometry, cell ids, Z indices, and the ``smooth`` flag.

    Args:
        gdf: GeoDataFrame with columns ``cell_id``, ``ZIndex``, and ``geometry``.
        out_dir: Root cache directory (default ``.polyrender`` under the process cwd).
        smooth: If ``True``, apply 3D Taubin smoothing (1 iteration); if ``False``, none.
        use_cache: If ``True`` and this fingerprint already exists, load ``tiles.json`` and skip rebuild.
        show_progress: If ``True`` and running in marimo, show a progress bar while building tiles.

    Returns:
        Parsed tile index (``tiles.json``) with ``out_dir`` set to the run directory
        and ``_cache_hit`` indicating whether the cache was reused.

    After each call, older cache shards under ``out_dir`` may be deleted (LRU by
    ``tiles.json`` mtime, capped). The current digest and any shard still served
    by an active :func:`plot` tile server are never removed.
    """
    from spatial_rx.polyrender._cache import gdf_cache_key, prune_stale_cache_shards
    from spatial_rx.polyrender._preprocess import preprocess_gdf
    from spatial_rx.polyrender._tile_export import export_tiles

    root = Path(out_dir).expanduser().resolve()
    fp = gdf_cache_key(gdf, smooth)
    cache_dir = root / fp
    tiles_path = cache_dir / "tiles.json"

    if use_cache and tiles_path.is_file():
        tiles_path.touch()
        raw = json.loads(tiles_path.read_text(encoding="utf-8"))
        info = cast(
            MeshifyInfo,
            {
                "version": int(raw["version"]),
                "tile_size_xy": float(raw["tile_size_xy"]),
                "scene_bbox": [float(x) for x in raw["scene_bbox"]],
                "tiles": raw["tiles"],
                "out_dir": str(cache_dir),
                "_cache_hit": True,
            },
        )
        prune_stale_cache_shards(root, keep_digest=fp)
        return info

    cache_dir.mkdir(parents=True, exist_ok=True)

    gdf_render = preprocess_gdf(gdf)
    cfg = {"smooth_iters": 1 if smooth else 0}
    tiles_info = export_tiles(gdf_render, cfg, cache_dir, show_progress=show_progress)
    out = cast(
        MeshifyInfo,
        {
            "version": int(tiles_info["version"]),
            "tile_size_xy": float(tiles_info["tile_size_xy"]),
            "scene_bbox": [float(x) for x in tiles_info["scene_bbox"]],
            "tiles": tiles_info["tiles"],
            "out_dir": str(cache_dir),
            "_cache_hit": False,
        },
    )
    prune_stale_cache_shards(root, keep_digest=fp)
    return out


def plot(
    gdf: gpd.GeoDataFrame,
    *,
    on_demand: bool = False,
    max_orbit_distance: float | None = None,
    smooth: bool = True,
    use_cache: bool = True,
    show_progress: bool = True,
    max_concurrent_fetches: int = 4,
) -> "PolyrenderWidget":
    """Open the 3D viewer for ``gdf``, building from cache or exporting first.

    Default behavior (`on_demand=False`): streams tiles by distance from the camera.

    On-demand tile streaming (`on_demand=True`): still streams tiles, but uses the
    orbit distance cap (``max_orbit_distance``) to bound how far the camera can
    pull back and, therefore, how many tiles can be loaded at once.

    Args:
        gdf: GeoDataFrame with columns ``cell_id``, ``ZIndex``, and ``geometry``.
        on_demand: If True, enforce a distance cap for streaming (via max_orbit_distance).
        max_orbit_distance: Maximum orbit distance from the target. When set, also caps
            the effective tile load/unload radii so only nearby tiles load.
        smooth: If True, apply 3D Taubin smoothing; if False, none.
        use_cache: Reuse existing meshify cache when available.
        show_progress: Show progress while building tiles (marimo only).
        max_concurrent_fetches: Maximum parallel HTTP fetches for tile GLBs.

    Returns:
        A :class:`~spatial_rx.polyrender.PolyrenderWidget` ready for notebook display
        (wrap with ``mo.ui.anywidget`` in marimo for downstream reactivity).
    """
    import base64

    import numpy as np

    from spatial_rx.polyrender._tile_server import get_or_start
    from spatial_rx.polyrender._widget import PolyrenderWidget

    # Minimap payload: centroid per cell_id (XY only), packed as float32 then base64.
    # Use area-weighted centroids across slices to better match the full footprint.
    areas = gdf.geometry.area.astype("float64")
    cents = gdf.geometry.centroid
    cx = cents.x.astype("float64")
    cy = cents.y.astype("float64")
    w = areas.to_numpy()
    # Guard against zero-area geometries.
    w = np.where(np.isfinite(w) & (w > 0), w, 1.0)
    tmp = gpd.GeoDataFrame({"cell_id": gdf["cell_id"], "wx": cx * w, "wy": cy * w, "w": w})
    grp = tmp.groupby("cell_id", sort=False)[["wx", "wy", "w"]].sum()
    cxy = np.empty((len(grp), 2), dtype=np.float32)
    cxy[:, 0] = (grp["wx"] / grp["w"]).to_numpy(dtype=np.float32, copy=False)
    cxy[:, 1] = (grp["wy"] / grp["w"]).to_numpy(dtype=np.float32, copy=False)
    centroids_xy_b64 = base64.b64encode(cxy.tobytes()).decode("ascii")
    centroids_cell_ids_json = json.dumps([str(x) for x in grp.index.tolist()], separators=(",", ":"))

    tiles_info = meshify(
        gdf,
        ".polyrender",
        smooth=smooth,
        use_cache=use_cache,
        show_progress=show_progress,
    )
    srv = get_or_start(Path(tiles_info["out_dir"]))

    # If user didn't specify a cap and asked for on-demand streaming, derive a
    # conservative default from the tile size (world units). With tile_size_xy ~ 4000,
    # this sets a ~10k neighborhood budget.
    if on_demand and max_orbit_distance is None:
        orbit_cap = float(tiles_info["tile_size_xy"]) * 2.5
    else:
        orbit_cap = float(max_orbit_distance) if max_orbit_distance is not None else 0.0

    return PolyrenderWidget(
        tile_server_url=srv.url,
        tiles_json_path="tiles.json",
        bbox=tiles_info["scene_bbox"],
        max_concurrent_fetches=max_concurrent_fetches,
        centroids_xy_b64=centroids_xy_b64,
        centroids_cell_ids_json=centroids_cell_ids_json,
        on_demand=bool(on_demand),
        max_orbit_distance=orbit_cap,
    )
