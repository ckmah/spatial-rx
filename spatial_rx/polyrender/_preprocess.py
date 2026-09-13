from __future__ import annotations

import geopandas as gpd


def preprocess_gdf(
    gdf: gpd.GeoDataFrame,
    simplify_tol: float = 0.5,
) -> gpd.GeoDataFrame:
    """Simplify geometry.

    Args:
        gdf: Raw GeoDataFrame with columns cell_id, ZIndex, geometry.
        simplify_tol: Shapely simplify tolerance in CRS units (often microns for
            microscopy segmentations); 0 disables.
    """
    out = gdf.copy()
    if simplify_tol > 0:
        out["geometry"] = out["geometry"].simplify(simplify_tol, preserve_topology=False)
    return out
