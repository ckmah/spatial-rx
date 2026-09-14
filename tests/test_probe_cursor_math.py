"""Contract tests for cursor-aligned probe query selection.

Mirrors the JS helpers in ``spatial_rx/static/landmarks.js``:
- raster: nearest nonempty bin center within R
- points: mean of raw features inside disk (mouse, R)
"""

from __future__ import annotations

import numpy as np


def nearest_nonempty_bin_within_radius(
    x: float,
    y: float,
    *,
    origin: tuple[float, float],
    bin_size: float,
    cols: np.ndarray,
    rows: np.ndarray,
    radius: float,
) -> int:
    """Return compact bin index of nearest center within radius, else -1."""
    if radius <= 0 or bin_size <= 0 or len(cols) == 0:
        return -1
    ox, oy = origin
    r2 = radius * radius
    best = -1
    best_d = np.inf
    for i, (c, r) in enumerate(zip(cols, rows, strict=True)):
        cx = ox + (int(c) + 0.5) * bin_size
        cy = oy + (int(r) + 0.5) * bin_size
        d2 = (cx - x) ** 2 + (cy - y) ** 2
        if d2 <= r2 and d2 < best_d:
            best_d = d2
            best = i
    return best


def mean_features_in_disk(
    x: float,
    y: float,
    xy: np.ndarray,
    features: np.ndarray,
    radius: float,
) -> np.ndarray | None:
    """Mean of point feature rows inside disk; None if empty."""
    if radius <= 0 or len(xy) == 0:
        return None
    d2 = (xy[:, 0] - x) ** 2 + (xy[:, 1] - y) ** 2
    mask = d2 <= radius * radius
    if not np.any(mask):
        return None
    return features[mask].mean(axis=0)


def test_nearest_bin_picks_closest_center_not_grid_under_cursor():
    # Two packed bins at (0.5, 0.5) and (2.5, 0.5); cursor over empty cell (1.2, 0.5)
    # with R=1.0 should pick bin 0 (distance 0.7), not fail as grid-under-cursor would.
    cols = np.array([0, 2], dtype=np.int32)
    rows = np.array([0, 0], dtype=np.int32)
    idx = nearest_nonempty_bin_within_radius(
        1.2,
        0.5,
        origin=(0.0, 0.0),
        bin_size=1.0,
        cols=cols,
        rows=rows,
        radius=1.0,
    )
    assert idx == 0


def test_nearest_bin_clears_beyond_radius():
    cols = np.array([0], dtype=np.int32)
    rows = np.array([0], dtype=np.int32)
    idx = nearest_nonempty_bin_within_radius(
        5.0,
        5.0,
        origin=(0.0, 0.0),
        bin_size=1.0,
        cols=cols,
        rows=rows,
        radius=1.0,
    )
    assert idx == -1


def test_mean_features_in_disk_empty_and_mean():
    xy = np.array([[0.0, 0.0], [1.0, 0.0], [10.0, 10.0]], dtype=np.float64)
    feats = np.array([[1.0, 0.0], [0.0, 1.0], [5.0, 5.0]], dtype=np.float64)
    assert mean_features_in_disk(50.0, 50.0, xy, feats, radius=1.0) is None
    mean = mean_features_in_disk(0.5, 0.0, xy, feats, radius=1.0)
    assert mean is not None
    np.testing.assert_allclose(mean, [0.5, 0.5])
