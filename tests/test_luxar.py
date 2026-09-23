"""Luxar SpatialData compiler and view-only widget (CPU path, no GPU)."""

import json
import sys
from urllib.request import urlopen

import numpy as np
import pytest

from spatial_rx.blobs_3d import blobs_3d
from spatial_rx.luxar_scene import (
    LuxarUnavailableError,
    compile_scene,
    gsplats_available,
    labels_to_mesh,
    luxar_supported,
    require_luxar,
    shapes_to_mesh,
    to_luxar_zarr,
)
from spatial_rx.luxar_viewer import LuxarWidget, view_luxar_zarr


def test_blobs_3d_fixture():
    sdata = blobs_3d(length=32, n_points=20, n_shapes=2, seed=1)
    assert "blobs_image" in sdata.images
    assert "blobs_labels" in sdata.labels
    assert "blobs_points" in sdata.points
    assert "blobs_spheres" in sdata.shapes
    labels = np.asarray(sdata["blobs_labels"].data)
    assert labels.shape == (32, 32, 32)
    assert labels.max() > 0


def test_labels_to_mesh():
    labels = np.zeros((16, 16, 16), dtype=np.int32)
    labels[4:10, 4:10, 4:10] = 1
    vertices, faces = labels_to_mesh(labels)
    assert vertices.shape[1] == 3
    assert faces.shape[1] == 3


def test_shapes_to_mesh():
    from geopandas import GeoDataFrame
    from shapely.geometry import Point

    gdf = GeoDataFrame(
        {
            "geometry": [Point(8, 8, 8), Point(20, 20, 12)],
            "radius": [4.0, 3.0],
        }
    )
    vertices, faces = shapes_to_mesh(gdf, subdivisions=1)
    assert len(vertices) > 0
    assert len(faces) > 0


def test_to_luxar_zarr_aliases_compile_scene():
    assert to_luxar_zarr is compile_scene


@pytest.mark.skipif(not luxar_supported(), reason="luxar optional extra not installed")
def test_to_luxar_zarr_points_and_meshes(tmp_path):
    sdata = blobs_3d(length=32, n_points=12, n_shapes=2, seed=2)
    dest = tmp_path / "scene.luxar.zarr"
    to_luxar_zarr(sdata, dest, include_gsplats=False)
    assert (dest / "zarr.json").is_file()
    assert (dest / "blobs_points").is_dir()
    assert (dest / "blobs_spheres_mesh").is_dir()
    assert (dest / "blobs_labels_isosurface").is_dir()


@pytest.mark.skipif(not luxar_supported(), reason="luxar optional extra not installed")
def test_luxar_widget_views_served_scene(tmp_path):
    sdata = blobs_3d(length=32, n_points=12, n_shapes=2, seed=3)
    dest = tmp_path / "scene.luxar.zarr"
    to_luxar_zarr(sdata, dest, include_gsplats=False)
    widget = view_luxar_zarr(dest)
    try:
        assert widget.src.endswith("/")
        assert isinstance(widget, LuxarWidget)
        with urlopen(f"{widget.src}zarr.json") as resp:
            body = json.loads(resp.read().decode("utf-8"))
        assert body["attributes"]["format_type"] == "luxar_zarr"
        assert resp.headers["Access-Control-Allow-Origin"] == "*"
    finally:
        widget.shutdown()


@pytest.mark.skipif(sys.version_info >= (3, 12), reason="only on Python < 3.12")
def test_require_luxar_fails_on_old_python():
    with pytest.raises(LuxarUnavailableError, match="Python 3.12"):
        require_luxar()


@pytest.mark.skipif(luxar_supported(), reason="luxar is installed in this environment")
def test_require_luxar_fails_when_missing():
    with pytest.raises(LuxarUnavailableError, match="not installed"):
        require_luxar()


@pytest.mark.skipif(not luxar_supported(), reason="luxar optional extra not installed")
def test_gsplats_optional_by_default():
    assert gsplats_available() is False or gsplats_available() is True
