"""Toy OME-Zarr fixture and loopback server for VolumeCubeWidget."""

import json
from urllib.request import urlopen

from spatial_rx.volume_cube import (
    TOY_CHUNK_ZYX,
    VolumeCubeWidget,
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
    finally:
        assert widget._server is not None
        widget._server.shutdown()
