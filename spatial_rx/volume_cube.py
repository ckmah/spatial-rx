"""VolumeCubeWidget: isometric OME-Zarr detail cube (Viv).

Competes with PolyrenderWidget (Fiber + GLB). A Landmarks inspect window
(fixed 100 µm square) is consumed one-way via ``window_cx`` / ``window_cy``.
The toy fixture is a small OME-Zarr (1 µm/voxel) served over loopback HTTP
so Viv can ``fetch`` it.
"""

from __future__ import annotations

import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

import numpy as np
import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm

TOY_SHAPE_ZYX = (32, 256, 256)
TOY_CHUNK_ZYX = (32, 64, 64)
TOY_UM_PER_VOXEL = 1.0
DEFAULT_WINDOW_UM = 100.0


def _write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload), encoding="utf-8")


def _multiscales(name: str) -> dict:
    return {
        "multiscales": [
            {
                "version": "0.4",
                "name": name,
                "axes": [
                    {"name": "z", "type": "space", "unit": "micrometer"},
                    {"name": "y", "type": "space", "unit": "micrometer"},
                    {"name": "x", "type": "space", "unit": "micrometer"},
                ],
                "datasets": [
                    {
                        "path": "0",
                        "coordinateTransformations": [
                            {
                                "type": "scale",
                                "scale": [
                                    TOY_UM_PER_VOXEL,
                                    TOY_UM_PER_VOXEL,
                                    TOY_UM_PER_VOXEL,
                                ],
                            }
                        ],
                    }
                ],
            }
        ]
    }


def _zarray(shape: tuple[int, int, int]) -> dict:
    return {
        "zarr_format": 2,
        "shape": list(shape),
        "chunks": list(TOY_CHUNK_ZYX),
        "dtype": "<u1",
        "compressor": None,
        "fill_value": 0,
        "order": "C",
        "filters": None,
        "dimension_separator": "/",
    }


def toy_volumes() -> tuple[np.ndarray, np.ndarray]:
    """Grayscale image and integer labels. Coordinates are µm (1 µm/voxel)."""
    z, y, x = TOY_SHAPE_ZYX
    image = np.full((z, y, x), 12, dtype=np.uint8)
    labels = np.zeros((z, y, x), dtype=np.uint8)
    zz, yy, xx = np.ogrid[:z, :y, :x]
    blobs = (
        (10, 80, 70, 22, 200, 1),
        (16, 150, 160, 28, 240, 2),
        (22, 190, 100, 18, 160, 3),
    )
    for cz, cy, cx, radius, value, label_id in blobs:
        mask = (zz - cz) ** 2 + (yy - cy) ** 2 + (xx - cx) ** 2 <= radius**2
        image[mask] = value
        labels[mask] = label_id
    return image, labels


def _write_array(array_dir: Path, volume: np.ndarray) -> None:
    array_dir.mkdir(parents=True, exist_ok=True)
    _write_json(array_dir / ".zarray", _zarray(tuple(volume.shape)))
    cz, cy, cx = TOY_CHUNK_ZYX
    nz, ny, nx = volume.shape
    for iz in range(0, nz, cz):
        for iy in range(0, ny, cy):
            for ix in range(0, nx, cx):
                chunk = np.ascontiguousarray(
                    volume[iz : iz + cz, iy : iy + cy, ix : ix + cx]
                )
                rel = Path(str(iz // cz)) / str(iy // cy) / str(ix // cx)
                path = array_dir / rel
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(chunk.tobytes())


def write_toy_ome_zarr(dest: Path) -> Path:
    """Write a tiny OME-Zarr image plus a ``labels/cells`` group."""
    dest = Path(dest)
    if dest.exists():
        raise FileExistsError(dest)
    image, labels = toy_volumes()
    dest.mkdir(parents=True)
    _write_json(dest / ".zgroup", {"zarr_format": 2})
    _write_json(dest / ".zattrs", _multiscales("toy-image"))
    _write_array(dest / "0", image)

    labels_root = dest / "labels"
    labels_root.mkdir()
    _write_json(labels_root / ".zgroup", {"zarr_format": 2})
    _write_json(labels_root / ".zattrs", {"labels": ["cells"]})
    cells = labels_root / "cells"
    cells.mkdir()
    _write_json(cells / ".zgroup", {"zarr_format": 2})
    _write_json(cells / ".zattrs", _multiscales("toy-labels"))
    _write_array(cells / "0", labels)
    return dest


class _QuietHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.end_headers()

    def log_message(self, format: str, *args: Any) -> None:
        return


def serve_directory(directory: Path) -> tuple[ThreadingHTTPServer, str]:
    """Serve ``directory`` on 127.0.0.1. Returns the server and base URL."""
    handler = partial(_QuietHandler, directory=str(directory))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    host, port = server.server_address[:2]
    return server, f"http://{host}:{port}"


class VolumeCubeWidget(AnyWidget):
    """Isometric Viv cube of an OME-Zarr image and optional labels."""

    _esm = widget_esm("volume-cube")
    _css = widget_css()

    image_url = traitlets.Unicode("").tag(sync=True)
    labels_url = traitlets.Unicode("").tag(sync=True)
    window_cx = traitlets.Float(128.0).tag(sync=True)
    window_cy = traitlets.Float(128.0).tag(sync=True)
    window_size_um = traitlets.Float(DEFAULT_WINDOW_UM).tag(sync=True)

    def __init__(
        self,
        image_url: str = "",
        labels_url: str = "",
        window_cx: float = 128.0,
        window_cy: float = 128.0,
        window_size_um: float = DEFAULT_WINDOW_UM,
        **kwargs: Any,
    ) -> None:
        self._server: ThreadingHTTPServer | None = None
        super().__init__(
            image_url=image_url,
            labels_url=labels_url,
            window_cx=window_cx,
            window_cy=window_cy,
            window_size_um=window_size_um,
            **kwargs,
        )

    @classmethod
    def toy(cls, dest: Path | None = None) -> VolumeCubeWidget:
        """Build the synthetic OME-Zarr, serve it, and return a widget pointed at it."""
        import tempfile

        root = Path(dest) if dest is not None else Path(tempfile.mkdtemp()) / "toy.ome.zarr"
        if not root.exists():
            write_toy_ome_zarr(root)
        server, base = serve_directory(root)
        widget = cls(
            image_url=f"{base}/",
            labels_url=f"{base}/labels/cells/",
            window_cx=TOY_SHAPE_ZYX[2] / 2,
            window_cy=TOY_SHAPE_ZYX[1] / 2,
        )
        widget._server = server
        return widget
