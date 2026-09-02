"""spatial-rx: tools for exploring spatial omics data in notebooks."""

from .gallery import GalleryWidget
from .landmarks import LandmarksWidget
from .measure import along_positions, composition, distances, write_obs

__version__ = "0.1.0"
__all__ = [
    "GalleryWidget",
    "LandmarksWidget",
    "along_positions",
    "composition",
    "distances",
    "write_obs",
    "__version__",
]
