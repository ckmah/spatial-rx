"""Compile SpatialData elements into a Luxar ``.luxar.zarr`` scene."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import numpy as np
from spatialdata import SpatialData

DEFAULT_GSPLAT_SEEDS = 400
DEFAULT_GSPLAT_ITERS = 80


class LuxarUnavailableError(RuntimeError):
    """Raised when Luxar is missing or the Python version is too old."""


def require_luxar() -> None:
    """Fail clearly when Luxar is not installed or Python is too old."""
    if sys.version_info < (3, 12):
        raise LuxarUnavailableError(
            "Luxar requires Python 3.12 or newer. "
            "Install with: pip install 'spatial-rx[luxar]' on Python >= 3.12."
        )
    try:
        import luxar  # noqa: F401
    except ImportError as exc:
        raise LuxarUnavailableError(
            "Luxar is not installed. Install with: pip install 'spatial-rx[luxar]'"
        ) from exc


def luxar_supported() -> bool:
    """Return True when this Python can compile Luxar scenes (3.12+ and luxar installed)."""
    if sys.version_info < (3, 12):
        return False
    try:
        require_luxar()
    except LuxarUnavailableError:
        return False
    return True


def gsplats_available() -> bool:
    """Return True when the optional Luxar gsplats stack is importable."""
    require_luxar()
    try:
        import luxar.gsplats  # noqa: F401
    except ImportError:
        return False
    return True


def _import_luxar() -> tuple[Any, Any, Any]:
    require_luxar()
    from luxar import Dimension, Dimensions, LuxarZarrCompiler

    return LuxarZarrCompiler, Dimensions, Dimension


def _as_numpy(array: Any) -> np.ndarray:
    data = getattr(array, "data", array)
    if hasattr(data, "compute"):
        return np.asarray(data.compute())
    return np.asarray(data)


def _points_xyz(points_df: Any) -> np.ndarray:
    frame = points_df.compute() if hasattr(points_df, "compute") else points_df
    cols = [c for c in ("x", "y", "z") if c in frame.columns]
    if len(cols) < 3:
        raise ValueError("points element must provide x, y, and z columns")
    return frame[cols].to_numpy(dtype=np.float32, copy=False)


def _default_dimensions(extents: tuple[float, float, float]) -> Any:
    _, Dimensions, Dimension = _import_luxar()
    width, height, depth = extents
    return Dimensions(
        [
            Dimension("x", unit="um", display=True, range=(0.0, width)),
            Dimension("y", unit="um", display=True, range=(0.0, height)),
            Dimension("z", unit="um", display=True, range=(0.0, depth)),
        ]
    )


def _merge_meshes(
    parts: list[tuple[np.ndarray, np.ndarray]],
) -> tuple[np.ndarray, np.ndarray]:
    if not parts:
        raise ValueError("no mesh parts to merge")
    verts: list[np.ndarray] = []
    faces: list[np.ndarray] = []
    offset = 0
    for vertices, triangles in parts:
        verts.append(vertices)
        faces.append(triangles.astype(np.uint32) + offset)
        offset += len(vertices)
    return np.vstack(verts).astype(np.float32), np.vstack(faces)


def shapes_to_mesh(gdf: Any, subdivisions: int = 2) -> tuple[np.ndarray, np.ndarray]:
    """Convert sphere Shapes (Point + radius) to a single triangle mesh."""
    from luxar.mesh.primitives import icosphere

    parts: list[tuple[np.ndarray, np.ndarray]] = []
    for row in gdf.itertuples():
        geom = row.geometry
        radius = float(getattr(row, "radius", 1.0))
        center = np.array([geom.x, geom.y, getattr(geom, "z", 0.0)], dtype=np.float32)
        vertices, faces, _normals = icosphere(subdivisions=subdivisions, radius=radius)
        parts.append((vertices + center, faces))
    return _merge_meshes(parts)


def labels_to_mesh(labels: np.ndarray, level: float = 0.5) -> tuple[np.ndarray, np.ndarray]:
    """Marching-cubes isosurface for a positive label mask."""
    from skimage.measure import marching_cubes

    mask = labels > 0
    if not mask.any():
        raise ValueError("labels volume has no foreground")
    verts, faces, _normals, _values = marching_cubes(mask.astype(np.float32), level=level)
    # marching_cubes returns z, y, x ordering; Luxar expects x, y, z.
    verts = verts.astype(np.float32)
    verts = verts[:, [2, 1, 0]]
    return verts, faces.astype(np.uint32)


def _image_volume_zyx(image: Any) -> np.ndarray:
    arr = _as_numpy(image)
    if arr.ndim == 4:
        arr = arr[0] if arr.shape[0] == 1 else arr.mean(axis=0)
    if arr.ndim != 3:
        raise ValueError(f"expected a 3D image volume, got shape {arr.shape}")
    return arr


def _scene_extents(sdata: SpatialData) -> tuple[float, float, float]:
    max_x = max_y = max_z = 1.0
    for name in sdata.shapes:
        gdf = sdata[name]
        for row in gdf.itertuples():
            geom = row.geometry
            radius = float(getattr(row, "radius", 0.0))
            max_x = max(max_x, float(geom.x) + radius + 1.0)
            max_y = max(max_y, float(geom.y) + radius + 1.0)
            max_z = max(max_z, float(getattr(geom, "z", 0.0)) + radius + 1.0)
    for name in sdata.points:
        pts = _points_xyz(sdata[name])
        if len(pts):
            max_x = max(max_x, float(pts[:, 0].max()) + 1.0)
            max_y = max(max_y, float(pts[:, 1].max()) + 1.0)
            max_z = max(max_z, float(pts[:, 2].max()) + 1.0)
    for name in sdata.labels:
        labels = _as_numpy(sdata[name])
        max_z = max(max_z, float(labels.shape[0]))
        max_y = max(max_y, float(labels.shape[1]))
        max_x = max(max_x, float(labels.shape[2]))
    for name in sdata.images:
        image = _image_volume_zyx(sdata[name])
        max_z = max(max_z, float(image.shape[0]))
        max_y = max(max_y, float(image.shape[1]))
        max_x = max(max_x, float(image.shape[2]))
    return max_x, max_y, max_z


def compile_spatialdata(
    sdata: SpatialData,
    dest: Path,
    *,
    include_gsplats: bool = False,
    gsplat_seeds: int = DEFAULT_GSPLAT_SEEDS,
    gsplat_iters: int = DEFAULT_GSPLAT_ITERS,
) -> Path:
    """Compile points, meshes, and optional image splats into ``dest``."""
    LuxarZarrCompiler, Dimensions, Dimension = _import_luxar()
    dest = Path(dest)
    if dest.exists():
        raise FileExistsError(dest)

    extents = _scene_extents(sdata)
    with LuxarZarrCompiler(dest) as compiler:
        scene = compiler.create_scene(dimensions=_default_dimensions(extents))

        for name in sdata.points:
            positions = _points_xyz(sdata[name])
            if len(positions):
                scene.add_points(name, positions)

        for name in sdata.shapes:
            gdf = sdata[name]
            if len(gdf) == 0:
                continue
            vertices, faces = shapes_to_mesh(gdf)
            scene.add_mesh(f"{name}_mesh", vertices, faces)

        for name in sdata.labels:
            labels = _as_numpy(sdata[name])
            if labels.ndim != 3:
                continue
            vertices, faces = labels_to_mesh(labels)
            scene.add_mesh(f"{name}_isosurface", vertices, faces)

        if include_gsplats:
            if not gsplats_available():
                raise LuxarUnavailableError(
                    "Gaussian splat fitting requires: pip install 'spatial-rx[luxar-gsplats]'"
                )
            for name in sdata.images:
                volume = _image_volume_zyx(sdata[name])
                scene.add_gsplats_from_volume(
                    f"{name}_gsplats",
                    volume,
                    seeds=gsplat_seeds,
                    n_iters=gsplat_iters,
                    device="cpu",
                )

    return dest


to_luxar_zarr = compile_spatialdata
compile_scene = compile_spatialdata
