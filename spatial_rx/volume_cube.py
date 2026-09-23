"""VolumeCubeWidget: isometric OME-Zarr detail cube (Viv).

Competes with PolyrenderWidget (Fiber + GLB). A Landmarks inspect window
(fixed 100 µm square) is consumed one-way via ``window_cx`` / ``window_cy``.
The toy fixture is a small OME-Zarr (1 µm/voxel) served over loopback HTTP
so Viv can ``fetch`` it.

Landmarks ``obsm["spatial"]`` XY and cube ``window_cx`` / ``window_cy`` /
``slice_*`` traits share the same coordinate frame: **one unit = one voxel**
unless OME metadata supplies physical scales (the Blin IDR demo uses voxel
indices directly; x=271, y=275, z=236).
"""

from __future__ import annotations

import json
from http.server import ThreadingHTTPServer
from pathlib import Path
from typing import Any

import numpy as np
import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm
from spatial_rx.http_serve import serve_directory

TOY_SHAPE_ZYX = (64, 256, 256)
TOY_CHUNK_ZYX = (32, 64, 64)
TOY_UM_PER_VOXEL = 1.0
DEFAULT_WINDOW_UM = 100.0

# IDR Blin nuclear segmentation (idr0062) — public OME-Zarr for demos.
# Level 0 shape (c, z, y, x): 2 × 236 × 275 × 271, uint16, LaminB1 + DAPI.
# No /labels group; browser CORS OK. Playwright / CI use ``toy()`` instead.
BLIN_IDR_IMAGE_URL = (
    "https://minio-dev.openmicroscopy.org/idr/v0.3/"
    "idr0062-blin-nuclearsegmentation/6001240.zarr"
)
BLIN_SHAPE_CZYX = (2, 236, 275, 271)
BLIN_SHAPE_ZYX = (236, 275, 271)
DEFAULT_Z_SLAB = 64


def mid_z_slab(depth: int, slab: int = DEFAULT_Z_SLAB) -> tuple[float, float]:
    """Return ``(z_min, z_max)`` for a centered Z slab (GPU-safe default)."""
    slab = min(slab, depth)
    z_min = (depth - slab) / 2.0
    return z_min, z_min + slab


def cells_in_inspect_window(
    spatial_xy: np.ndarray,
    cx: float,
    cy: float,
    size: float = DEFAULT_WINDOW_UM,
) -> np.ndarray:
    """Boolean mask of ``spatial_xy`` points inside the square inspect window."""
    half = size / 2.0
    return (
        (spatial_xy[:, 0] >= cx - half)
        & (spatial_xy[:, 0] <= cx + half)
        & (spatial_xy[:, 1] >= cy - half)
        & (spatial_xy[:, 1] <= cy + half)
    )


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
        (16, 80, 70, 22, 200, 1),
        (32, 150, 160, 28, 240, 2),
        (48, 190, 100, 18, 160, 3),
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


class VolumeCubeWidget(AnyWidget):
    """Isometric Viv cube of an OME-Zarr image and optional labels."""

    _esm = widget_esm("volume-cube")
    _css = widget_css()

    image_url = traitlets.Unicode("").tag(sync=True)
    labels_url = traitlets.Unicode("").tag(sync=True)
    window_cx = traitlets.Float(128.0).tag(sync=True)
    window_cy = traitlets.Float(128.0).tag(sync=True)
    window_size_um = traitlets.Float(DEFAULT_WINDOW_UM).tag(sync=True)
    slice_x_min = traitlets.Float(0.0).tag(sync=True)
    slice_x_max = traitlets.Float(float(TOY_SHAPE_ZYX[2])).tag(sync=True)
    slice_y_min = traitlets.Float(0.0).tag(sync=True)
    slice_y_max = traitlets.Float(float(TOY_SHAPE_ZYX[1])).tag(sync=True)
    slice_z_min = traitlets.Float(0.0).tag(sync=True)
    slice_z_max = traitlets.Float(float(TOY_SHAPE_ZYX[0])).tag(sync=True)

    def __init__(
        self,
        image_url: str = "",
        labels_url: str = "",
        window_cx: float = 128.0,
        window_cy: float = 128.0,
        window_size_um: float = DEFAULT_WINDOW_UM,
        slice_x_min: float = 0.0,
        slice_x_max: float = float(TOY_SHAPE_ZYX[2]),
        slice_y_min: float = 0.0,
        slice_y_max: float = float(TOY_SHAPE_ZYX[1]),
        slice_z_min: float = 0.0,
        slice_z_max: float = float(TOY_SHAPE_ZYX[0]),
        **kwargs: Any,
    ) -> None:
        self._server: ThreadingHTTPServer | None = None
        super().__init__(
            image_url=image_url,
            labels_url=labels_url,
            window_cx=window_cx,
            window_cy=window_cy,
            window_size_um=window_size_um,
            slice_x_min=slice_x_min,
            slice_x_max=slice_x_max,
            slice_y_min=slice_y_min,
            slice_y_max=slice_y_max,
            slice_z_min=slice_z_min,
            slice_z_max=slice_z_max,
            **kwargs,
        )

    @classmethod
    def from_url(
        cls,
        image_url: str,
        labels_url: str = "",
        *,
        shape_zyx: tuple[int, int, int] | None = None,
        z_slab: int | None = DEFAULT_Z_SLAB,
        window_cx: float | None = None,
        window_cy: float | None = None,
        **kwargs: Any,
    ) -> VolumeCubeWidget:
        """Point at a remote or local OME-Zarr URL with slice defaults from shape.

        When ``shape_zyx`` is known, ``slice_*`` maxima and window center default
        to the volume extents. ``z_slab`` limits the Z range to a centered slab
        (``DEFAULT_Z_SLAB`` planes) to reduce GPU memory next to Landmarks.
        Pass ``z_slab=None`` to use the full Z extent.
        """
        slice_kwargs: dict[str, float] = {}
        if shape_zyx is not None:
            depth, height, width = shape_zyx
            slice_kwargs = {
                "slice_x_min": 0.0,
                "slice_x_max": float(width),
                "slice_y_min": 0.0,
                "slice_y_max": float(height),
            }
            if z_slab is None:
                slice_kwargs["slice_z_min"] = 0.0
                slice_kwargs["slice_z_max"] = float(depth)
            else:
                z_min, z_max = mid_z_slab(depth, z_slab)
                slice_kwargs["slice_z_min"] = z_min
                slice_kwargs["slice_z_max"] = z_max
            if window_cx is None:
                window_cx = width / 2.0
            if window_cy is None:
                window_cy = height / 2.0
        return cls(
            image_url=image_url,
            labels_url=labels_url,
            window_cx=window_cx if window_cx is not None else 128.0,
            window_cy=window_cy if window_cy is not None else 128.0,
            **slice_kwargs,
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
