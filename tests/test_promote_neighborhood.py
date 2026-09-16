"""Neighborhood promote is client-side; Python only persists selections."""

import numpy as np

from spatial_rx.selection import selection_mask
from tests.helpers import adata_xy


def test_selection_mask_prefers_point_indices_over_hull():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0])
    y = np.array([0.0, 0.0, 0.0])
    w = LandmarksWidget(adata_xy(x, y))
    sels = [
        {
            "id": "s",
            "type": "points",
            "point_indices": [0, 1],
            "vertices": [[9, 9], [10, 9], [10, 10]],
        }
    ]
    w.selections = sels
    mask = selection_mask(sels, x, y, "s")
    assert set(np.flatnonzero(mask).tolist()) == {0, 1}


def test_promote_tick_no_longer_mutates_python():
    from spatial_rx import LandmarksWidget

    w = LandmarksWidget(adata_xy([0.0, 1.0], [0.0, 0.0]))
    before = list(w.selections)
    w.promote_tick = int(w.promote_tick) + 1
    assert list(w.selections) == before
