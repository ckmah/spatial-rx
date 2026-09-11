"""Meshify smoke tests for the polyrender pipeline."""

from __future__ import annotations

import json
import tempfile
from pathlib import Path

import geopandas as gpd
import pytest
import shapely.geometry as sg

pytest.importorskip("mapbox_earcut")
pytest.importorskip("numba")
pytest.importorskip("trimesh")
pytest.importorskip("pygltflib")

from spatial_rx.polyrender import meshify


def test_meshify_writes_tiles_json_and_glbs():
    poly = sg.Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
    gdf = gpd.GeoDataFrame(
        [
            {"cell_id": "x", "ZIndex": 0.0, "geometry": poly},
            {"cell_id": "x", "ZIndex": 1.0, "geometry": poly},
        ],
        geometry="geometry",
    )
    with tempfile.TemporaryDirectory() as td:
        out = meshify(gdf, out_dir=td, smooth=False, use_cache=False, show_progress=False)
        run_dir = Path(out["out_dir"])
        tiles_json = run_dir / "tiles.json"
        assert tiles_json.is_file()
        raw = json.loads(tiles_json.read_text(encoding="utf-8"))
        assert raw["tiles"]
        first = raw["tiles"][0]
        glb_rel = first["glb"]
        glb_path = run_dir / glb_rel
        assert glb_path.is_file()
        assert glb_path.stat().st_size > 64


def test_meshify_cache_hit_reuses_shard():
    poly = sg.Polygon([(0, 0), (2, 0), (2, 2), (0, 2)])
    gdf = gpd.GeoDataFrame(
        [
            {"cell_id": "a", "ZIndex": 0.0, "geometry": poly},
            {"cell_id": "a", "ZIndex": 1.0, "geometry": poly},
        ],
        geometry="geometry",
    )
    with tempfile.TemporaryDirectory() as td:
        first = meshify(gdf, out_dir=td, smooth=False, use_cache=True, show_progress=False)
        assert first["_cache_hit"] is False
        second = meshify(gdf, out_dir=td, smooth=False, use_cache=True, show_progress=False)
        assert second["_cache_hit"] is True
        assert second["out_dir"] == first["out_dir"]
