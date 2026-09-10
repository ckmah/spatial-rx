"""Widget no longer owns SpatialData attach / save surfaces."""

from __future__ import annotations

import numpy as np

from spatial_rx import LandmarksWidget
from tests.helpers import adata_xy


def test_no_spatialdata_attach_surface():
    w = LandmarksWidget(adata_xy(np.array([0.0, 1.0]), np.array([0.0, 1.0])))
    assert not hasattr(w, "attach_spatialdata")
    assert not hasattr(w, "write_landmarks")
    assert not hasattr(w, "load_landmarks")
    assert not hasattr(w, "spatialdata_attached")
    assert not hasattr(w, "save_landmarks_tick")
    assert not hasattr(w, "landmarks_dirty")
    assert not hasattr(w, "n_points")
    assert not hasattr(w, "modes")
    assert not hasattr(w, "axes_pixel_bounds")
    assert not hasattr(w, "continuous_palette")
