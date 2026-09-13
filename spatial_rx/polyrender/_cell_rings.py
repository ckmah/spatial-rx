from __future__ import annotations

from collections import defaultdict

import numpy as np
import shapely as _shapely
from shapely.geometry import MultiPolygon as _SGMultiPolygon
from shapely.geometry import Polygon as _SGPolygon

from spatial_rx.polyrender._mesh_build import _cell_max_turning, cell_color


def prepare_cell_rings(gdf_render, cfg: dict):
    """Extract per-cell exterior rings and z values from a preprocessed GeoDataFrame.

    Returns:
        (all_cell_ids, cell_colors, rings_by_cid, zs_by_cid, scores_by_cid)
    """
    all_cell_ids = sorted(gdf_render["cell_id"].unique().tolist())
    cell_colors = {cid: cell_color(i) for i, cid in enumerate(all_cell_ids)}

    z_scale = float(cfg.get("z_scale", 2.0))
    geoms = gdf_render.geometry.values
    zvals = gdf_render["ZIndex"].to_numpy(dtype=np.float64)
    cids = gdf_render["cell_id"].values

    gmap: dict = defaultdict(list)
    zmap: dict = defaultdict(list)
    for cid, g, z in zip(cids, geoms, zvals):
        gmap[cid].append(g)
        zmap[cid].append(z)

    rings_by_cid: dict = {}
    zs_by_cid: dict = {}
    scores_by_cid: dict = {}
    for cid in all_cell_ids:
        polys: list = []
        zi: list = []
        for geom, zi_v in zip(gmap[cid], zmap[cid], strict=True):
            if isinstance(geom, _SGPolygon):
                polys.append(geom)
                zi.append(zi_v)
            elif isinstance(geom, _SGMultiPolygon):
                subs = [g for g in geom.geoms if not g.is_empty]
                if subs:
                    polys.append(max(subs, key=lambda p: p.area))
                    zi.append(zi_v)

        if not polys:
            rings_by_cid[cid] = []
            zs_by_cid[cid] = []
            scores_by_cid[cid] = 0.0
            continue

        ext = _shapely.get_exterior_ring(np.asarray(polys, dtype=object))
        npts = _shapely.get_num_coordinates(ext)
        coords = _shapely.get_coordinates(ext, include_z=False)

        rings: list[np.ndarray] = []
        zs: list[float] = []
        off = 0
        for n, zv in zip(npts, zi):
            nc = int(n)
            if nc < 4:
                off += nc
                continue
            pts = coords[off : off + nc - 1]
            off += nc
            if len(pts) < 3:
                continue

            a2 = (pts[:-1, 0] * pts[1:, 1] - pts[1:, 0] * pts[:-1, 1]).sum()
            a2 += pts[-1, 0] * pts[0, 1] - pts[0, 0] * pts[-1, 1]
            if a2 < 0:
                pts = pts[::-1]

            rings.append(pts)
            zs.append(float(zv) * z_scale)

        rings_by_cid[cid] = rings
        zs_by_cid[cid] = zs
        scores_by_cid[cid] = _cell_max_turning(rings)

    return all_cell_ids, cell_colors, rings_by_cid, zs_by_cid, scores_by_cid

