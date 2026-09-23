"""Toy OME-Zarr fixture and loopback server for VolumeCubeWidget."""

import json

import numpy as np
from urllib.request import urlopen

from spatial_rx.volume_cube import (
    BLIN_IDR_IMAGE_URL,
    BLIN_SHAPE_ZYX,
    DEFAULT_Z_SLAB,
    TOY_CHUNK_ZYX,
    TOY_SHAPE_ZYX,
    VolumeCubeWidget,
    cells_in_inspect_window,
    mid_z_slab,
    serve_directory,
    write_toy_ome_zarr,
)


def test_write_toy_ome_zarr(tmp_path):
    root = write_toy_ome_zarr(tmp_path / "toy.ome.zarr")
    attrs = json.loads((root / ".zattrs").read_text(encoding="utf-8"))
    assert attrs["multiscales"][0]["datasets"][0]["path"] == "0"
    labels = json.loads((root / "labels" / ".zattrs").read_text(encoding="utf-8"))
    assert labels["labels"] == ["cells"]
    cz, cy, cx = TOY_CHUNK_ZYX
    chunk = root / "0" / "0" / "0" / "0"
    assert chunk.stat().st_size == cz * cy * cx
    assert (root / "labels" / "cells" / "0" / ".zarray").is_file()


def test_toy_widget_serves_zattrs(tmp_path):
    root = write_toy_ome_zarr(tmp_path / "toy.ome.zarr")
    server, base = serve_directory(root)
    try:
        with urlopen(f"{base}/.zattrs") as resp:
            body = json.loads(resp.read().decode("utf-8"))
        assert body["multiscales"][0]["name"] == "toy-image"
        assert resp.headers["Access-Control-Allow-Origin"] == "*"
    finally:
        server.shutdown()


def test_volume_cube_toy_urls(tmp_path):
    widget = VolumeCubeWidget.toy(tmp_path / "toy.ome.zarr")
    try:
        assert widget.image_url.endswith("/")
        assert widget.labels_url.endswith("/labels/cells/")
        assert widget.window_size_um == 100
        assert widget.window_cx == 128
        assert widget.slice_z_max == 64
    finally:
        assert widget._server is not None
        widget._server.shutdown()


def test_blin_idr_url_constant():
    assert "idr0062-blin-nuclearsegmentation" in BLIN_IDR_IMAGE_URL
    assert BLIN_IDR_IMAGE_URL.endswith(".zarr")


def test_from_url_blin_extents():
    widget = VolumeCubeWidget.from_url(
        BLIN_IDR_IMAGE_URL,
        labels_url="",
        shape_zyx=BLIN_SHAPE_ZYX,
    )
    depth, height, width = BLIN_SHAPE_ZYX
    assert widget.image_url == BLIN_IDR_IMAGE_URL
    assert widget.labels_url == ""
    assert widget.slice_x_max == float(width)
    assert widget.slice_y_max == float(height)
    assert widget.window_cx == width / 2
    assert widget.window_cy == height / 2
    z_min, z_max = mid_z_slab(depth, DEFAULT_Z_SLAB)
    assert widget.slice_z_min == z_min
    assert widget.slice_z_max == z_max


def test_coord_contract_landmarks_cube_xy():
    """Landmarks spatial XY and cube window traits share the same voxel frame."""
    depth, height, width = BLIN_SHAPE_ZYX
    cube = VolumeCubeWidget.from_url(
        "http://example.test/vol.zarr",
        shape_zyx=BLIN_SHAPE_ZYX,
    )
    cx, cy = 120.0, 140.0
    spatial = np.array([[cx, cy], [width + 10, cy], [cx, height + 10]])
    mask = cells_in_inspect_window(spatial, cx, cy, cube.window_size_um)
    assert mask.tolist() == [True, False, False]
    half = cube.window_size_um / 2
    assert cube.slice_x_min <= cx - half
    assert cube.slice_x_max >= cx + half
    assert cube.slice_y_min <= cy - half
    assert cube.slice_y_max >= cy + half
    assert cube.slice_z_max - cube.slice_z_min == DEFAULT_Z_SLAB
