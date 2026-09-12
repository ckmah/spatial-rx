"""Unit tests for spatial bin assignment and aggregation."""

from __future__ import annotations

import base64

import numpy as np
import pytest

from spatial_rx.raster import (
    aggregate_mean,
    aggregate_mean_window,
    assign_bins,
    build_grid,
    build_raster_payload,
    composition_hist,
    composition_hist_window,
    decode_f32,
    default_bin_size,
    l2_normalize_rows,
    pack_features,
)


def test_assign_bins_square_nonempty_only():
    xy = np.array(
        [
            [0.1, 0.1],
            [0.2, 0.15],
            [1.1, 0.1],
            [1.2, 1.2],
        ],
        dtype=np.float64,
    )
    grid = build_grid(xy, bin_size=1.0)
    assert grid.n_cols >= 2
    assert grid.n_rows >= 2
    asg = assign_bins(xy, grid)
    assert asg.counts.shape[0] == len(asg.rows) == len(asg.cols)
    # First two points share a bin; third and fourth are separate → 3 non-empty.
    assert asg.counts.shape[0] == 3
    assert int(asg.counts.sum()) == 4
    assert asg.compact_ids[0] == asg.compact_ids[1]
    assert asg.compact_ids[0] != asg.compact_ids[2]


def test_aggregate_mean_and_normalize():
    xy = np.array([[0.0, 0.0], [0.1, 0.0], [2.0, 0.0]], dtype=np.float64)
    grid = build_grid(xy, 1.0)
    asg = assign_bins(xy, grid)
    feats = np.array([[1.0, 0.0], [3.0, 2.0], [0.0, 4.0]], dtype=np.float64)
    B = aggregate_mean(feats, asg.compact_ids, asg.counts.shape[0])
    # Bin with first two points: mean ([1,0]+[3,2])/2 = [2,1]
    b0 = asg.compact_ids[0]
    np.testing.assert_allclose(B[b0], [2.0, 1.0], rtol=1e-5)
    Bn = l2_normalize_rows(B)
    norms = np.linalg.norm(Bn, axis=1)
    for i, c in enumerate(asg.counts):
        if c > 0 and np.linalg.norm(B[i]) > 0:
            assert norms[i] == pytest.approx(1.0, abs=1e-5)


def test_composition_hist_fractions():
    compact = np.array([0, 0, 1, 1], dtype=np.int32)
    codes = np.array([0, 1, 1, 1], dtype=np.int32)
    H = composition_hist(codes, compact, n_cats=2, n_bins=2)
    np.testing.assert_allclose(H[0], [0.5, 0.5])
    np.testing.assert_allclose(H[1], [0.0, 1.0])


def test_pack_features_row_major_roundtrip():
    B = np.array([[1.0, 2.0], [3.0, 4.0]], dtype=np.float32)
    raw = decode_f32(pack_features(B))
    assert raw.tolist() == [1.0, 2.0, 3.0, 4.0]


def test_build_raster_payload_shape():
    xy = np.column_stack([np.linspace(0, 5, 20), np.linspace(0, 3, 20)])
    feats = np.random.default_rng(0).normal(size=(20, 4)).astype(np.float32)
    payload = build_raster_payload(xy, bin_size=1.0, features=feats, feature_labels=["a", "b", "c", "d"])
    assert payload["raster_n_bins"] == payload["assignment"].counts.shape[0]
    assert payload["raster_feature_dim"] == 4
    B = payload["B"]
    assert B.shape == (payload["raster_n_bins"], 4)
    raw = np.frombuffer(base64.b64decode(payload["raster_features"]), dtype=np.float32)
    assert raw.size == B.size


def test_default_bin_size_fixed_microns():
    # Fixed physical defaults (µm when spatial coords are µm).
    assert default_bin_size(2.0) == pytest.approx(10.0)
    assert default_bin_size(None, point_size=0.5) == pytest.approx(10.0)
    assert default_bin_size(None) == pytest.approx(10.0)
    from spatial_rx.raster import default_window_radius

    assert default_window_radius(10.0) == pytest.approx(20.0)
    assert default_window_radius(None) == pytest.approx(20.0)


def test_aggregate_mean_window_radius_extremes():
    """Tiny window ≈ hard bin mean; huge window ≈ global mean per bin."""
    xy = np.array(
        [
            [0.1, 0.1],
            [0.2, 0.15],
            [1.1, 0.1],
            [1.2, 1.2],
        ],
        dtype=np.float64,
    )
    feats = np.array(
        [
            [1.0, 0.0],
            [3.0, 0.0],
            [0.0, 4.0],
            [0.0, 8.0],
        ],
        dtype=np.float64,
    )
    grid = build_grid(xy, bin_size=1.0)
    asg = assign_bins(xy, grid)
    hard = aggregate_mean(feats, asg.compact_ids, asg.counts.shape[0])
    tiny = aggregate_mean_window(xy, feats, asg, window_radius=0.01)
    # Each bin center sits near its member cells; tiny radius recovers hard mean.
    np.testing.assert_allclose(tiny, hard, rtol=1e-5, atol=1e-5)

    huge = aggregate_mean_window(xy, feats, asg, window_radius=1e6)
    global_mean = feats.mean(axis=0)
    for i in range(huge.shape[0]):
        np.testing.assert_allclose(huge[i], global_mean, rtol=1e-5)

    # Neighbor-scale radius should differ from hard for at least one bin.
    soft = aggregate_mean_window(xy, feats, asg, window_radius=1.0)
    assert not np.allclose(soft, hard)


def test_composition_hist_window_matches_hard_when_radius_tiny():
    xy = np.array([[0.2, 0.2], [0.3, 0.25], [1.2, 0.2]], dtype=np.float64)
    codes = np.array([0, 1, 1], dtype=np.int32)
    grid = build_grid(xy, 1.0)
    asg = assign_bins(xy, grid)
    hard = composition_hist(codes, asg.compact_ids, n_cats=2, n_bins=asg.counts.shape[0])
    soft = composition_hist_window(xy, codes, asg, 2, window_radius=0.05)
    np.testing.assert_allclose(soft, hard, atol=1e-6)
