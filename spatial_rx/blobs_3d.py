"""Synthetic 3D SpatialData patterned after ``spatialdata.datasets.blobs``."""

from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd
from geopandas import GeoDataFrame
from numpy.random import default_rng
from shapely.geometry import Point
from spatialdata import SpatialData
from spatialdata.datasets import BlobsDataset
from spatialdata.models import PointsModel, ShapesModel
from spatialdata.transformations import Identity

DEFAULT_LENGTH = 48
DEFAULT_N_POINTS = 80
DEFAULT_N_SHAPES = 4


def _label_centroids(labels: np.ndarray) -> list[tuple[float, float, float, float, int]]:
    """Return ``(x, y, z, radius, label_id)`` for each non-zero label."""
    blobs: list[tuple[float, float, float, float, int]] = []
    for label_id in np.unique(labels):
        if label_id == 0:
            continue
        mask = labels == label_id
        if not mask.any():
            continue
        zz, yy, xx = np.where(mask)
        cx, cy, cz = xx.mean(), yy.mean(), zz.mean()
        radius = float(np.cbrt(mask.sum() / (4.0 / 3.0 * np.pi)) * 0.85)
        radius = max(radius, 2.0)
        blobs.append((cx, cy, cz, radius, int(label_id)))
    return blobs


def _points_3d(
    length: int,
    n_points: int,
    rng: np.random.Generator,
    padding: int = 2,
) -> Any:
    arr = rng.integers(padding, length - padding, size=(n_points, 3)).astype(np.float64)
    annotation = pd.DataFrame(
        {
            "genes": rng.choice(["gene_a", "gene_b", "gene_c"], size=n_points),
            "instance_id": rng.integers(0, 10, size=n_points),
        }
    )
    return PointsModel.parse(
        arr,
        transformations={"global": Identity()},
        annotation=annotation,
        feature_key="genes",
        instance_key="instance_id",
    )


def _sphere_shapes(
    centroids: list[tuple[float, float, float, float, int]],
) -> GeoDataFrame:
    if not centroids:
        return ShapesModel.parse(
            GeoDataFrame({"geometry": [], "radius": []}),
            transformations={"global": Identity()},
        )
    return ShapesModel.parse(
        GeoDataFrame(
            {
                "geometry": [Point(x, y, z) for x, y, z, _radius, _label in centroids],
                "radius": [radius for _x, _y, _z, radius, _label in centroids],
                "label_id": [label for _x, _y, _z, _radius, label in centroids],
            }
        ),
        transformations={"global": Identity()},
    )


def blobs_3d(
    length: int = DEFAULT_LENGTH,
    n_points: int = DEFAULT_N_POINTS,
    n_shapes: int = DEFAULT_N_SHAPES,
    n_channels: int = 1,
    seed: int = 0,
) -> SpatialData:
    """Return a tiny 3D blobs SpatialData object for Luxar and CI.

    Includes a grayscale image volume, integer label volume, 3D points, and
    sphere shapes derived from label centroids. No network access required.
    """
    if length < 16:
        raise ValueError("length must be at least 16 voxels per axis")
    rng = default_rng(seed)
    dataset = BlobsDataset(
        length=length,
        n_points=n_points,
        n_shapes=n_shapes,
        n_channels=n_channels,
    )
    transformations = {"global": Identity()}
    image = dataset._image_blobs(transformations, length=length, n_channels=n_channels, ndim=3)
    labels = dataset._labels_blobs(transformations, length=length, ndim=3)
    labels_arr = np.asarray(labels.data, dtype=np.int32)
    centroids = _label_centroids(labels_arr)[:n_shapes]
    points = _points_3d(length, n_points, rng)
    shapes = _sphere_shapes(centroids)
    return SpatialData(
        images={"blobs_image": image},
        labels={"blobs_labels": labels},
        points={"blobs_points": points},
        shapes={"blobs_spheres": shapes},
    )
