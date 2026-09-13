"""spatial-rx: tools for exploring spatial omics data in notebooks."""

from .gallery import GalleryWidget
from .landmarks import LandmarksWidget
from .measure import along_positions, composition, distances, write_obs
from .polyrender import PolyrenderWidget, meshify, plot
from .spatialdata_landmarks import (
    geodataframe_to_landmarks,
    landmarks_to_geodataframe,
)

__version__ = "0.1.0"
__all__ = [
    "GalleryWidget",
    "LandmarksWidget",
    "PolyrenderWidget",
    "along_positions",
    "composition",
    "distances",
    "geodataframe_to_landmarks",
    "landmarks_to_geodataframe",
    "meshify",
    "plot",
    "write_obs",
    "__version__",
]
