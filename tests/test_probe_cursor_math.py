"""Contract tests for cursor-aligned probe query selection.

Mirrors the JS helpers in ``spatial_rx/static/landmarks.js``:
- raster / bin-backed points: nearest nonempty bin center within R
- points fallback: mean of raw features inside disk (quantized mouse, R)
- bin→point score mapping: each point inherits its home bin's cosine
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


def l2_normalize_rows(features: np.ndarray) -> np.ndarray:
    """Row-wise L2 normalize (pre-normalize for cosine-as-dot)."""
    norms = np.linalg.norm(features, axis=1, keepdims=True)
    norms = np.maximum(norms, 1e-12)
    return features / norms


def bin_cosine_scores(features: np.ndarray, query_idx: int) -> np.ndarray:
    """Cosine of each bin row to query row via pre-normalized dots."""
    normed = l2_normalize_rows(features)
    q = normed[query_idx]
    return normed @ q


def map_bin_scores_to_points(
    point_bin_indices: np.ndarray, bin_scores: np.ndarray
) -> np.ndarray:
    """Point i inherits score of its home bin (bin-backed points probe)."""
    out = np.full(len(point_bin_indices), np.nan, dtype=np.float64)
    for i, b in enumerate(point_bin_indices):
        bi = int(b)
        if 0 <= bi < len(bin_scores):
            out[i] = bin_scores[bi]
    return out


def quantize_probe_world(x: float, y: float, radius: float) -> tuple[float, float]:
    """Snap to ~R/2 grid (fallback points probe cache key)."""
    q = max(radius * 0.5, 1e-6)
    return (round(x / q) * q, round(y / q) * q)


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


def test_bin_backed_point_scores_follow_home_bin():
    feats = np.array([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]], dtype=np.float64)
    scores = bin_cosine_scores(feats, query_idx=0)
    point_bins = np.array([0, 1, 0, 2], dtype=np.int32)
    mapped = map_bin_scores_to_points(point_bins, scores)
    np.testing.assert_allclose(mapped[0], scores[0])
    np.testing.assert_allclose(mapped[1], scores[1])
    np.testing.assert_allclose(mapped[2], scores[0])
    np.testing.assert_allclose(mapped[3], scores[2])


def test_pre_normalize_cosine_matches_explicit():
    feats = np.array([[3.0, 0.0], [0.0, 4.0], [1.0, 1.0]], dtype=np.float64)
    via_norm = bin_cosine_scores(feats, 2)
    q = feats[2] / np.linalg.norm(feats[2])
    explicit = np.array(
        [float(np.dot(row / np.linalg.norm(row), q)) for row in feats]
    )
    np.testing.assert_allclose(via_norm, explicit)


def test_quantize_probe_world_snaps_to_half_radius():
    assert quantize_probe_world(10.2, 10.4, radius=2.0) == (10.0, 10.0)
    assert quantize_probe_world(10.6, 11.4, radius=2.0) == (11.0, 11.0)


def sticky_hover_bin(
    x: float,
    y: float,
    *,
    current: int,
    origin: tuple[float, float],
    bin_size: float,
    cols: np.ndarray,
    rows: np.ndarray,
    radius: float,
) -> int:
    """Keep ``current`` unless another bin is closer by a hysteresis margin."""
    next_idx = nearest_nonempty_bin_within_radius(
        x,
        y,
        origin=origin,
        bin_size=bin_size,
        cols=cols,
        rows=rows,
        radius=radius,
    )
    if next_idx < 0:
        return current
    if current < 0 or current == next_idx:
        return next_idx
    ox, oy = origin

    def dist2(i: int) -> float:
        cx = ox + (int(cols[i]) + 0.5) * bin_size
        cy = oy + (int(rows[i]) + 0.5) * bin_size
        return (cx - x) ** 2 + (cy - y) ** 2

    hyst = max(bin_size * 0.35, radius * 0.12, 1e-6)
    d_cur = dist2(current)
    if d_cur > radius * radius:
        return next_idx
    d_next = dist2(next_idx)
    if np.sqrt(d_next) + hyst < np.sqrt(d_cur):
        return next_idx
    return current


def test_sticky_hover_bin_hysteresis_holds_near_boundary():
    # Centers at (0.5, 0.5) and (1.5, 0.5); cursor just past midpoint toward bin 1.
    cols = np.array([0, 1], dtype=np.int32)
    rows = np.array([0, 0], dtype=np.int32)
    held = sticky_hover_bin(
        1.05,
        0.5,
        current=0,
        origin=(0.0, 0.0),
        bin_size=1.0,
        cols=cols,
        rows=rows,
        radius=2.0,
    )
    assert held == 0
    switched = sticky_hover_bin(
        1.45,
        0.5,
        current=0,
        origin=(0.0, 0.0),
        bin_size=1.0,
        cols=cols,
        rows=rows,
        radius=2.0,
    )
    assert switched == 1


def test_sticky_hover_bin_keeps_current_when_sample_empty():
    cols = np.array([0], dtype=np.int32)
    rows = np.array([0], dtype=np.int32)
    held = sticky_hover_bin(
        50.0,
        50.0,
        current=0,
        origin=(0.0, 0.0),
        bin_size=1.0,
        cols=cols,
        rows=rows,
        radius=1.0,
    )
    assert held == 0
