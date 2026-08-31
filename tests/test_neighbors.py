import numpy as np
import pytest


def test_neighborhood_index_csr_sorted():
    from spatial_rx.neighbors import NeighborhoodIndex

    rng = np.random.default_rng(0)
    x = rng.uniform(0, 10, 80)
    y = rng.uniform(0, 10, 80)
    idx = NeighborhoodIndex.build(x, y, k_max=8, radius_max=100.0)
    assert idx.n == 80
    assert idx.indptr.shape == (81,)
    assert idx.indptr[0] == 0
    assert idx.indptr[-1] == idx.indices.shape[0] == idx.distances.shape[0]
    for i in range(idx.n):
        start, end = int(idx.indptr[i]), int(idx.indptr[i + 1])
        assert end - start <= 8
        row_d = idx.distances[start:end]
        assert np.all(row_d[:-1] <= row_d[1:] + 1e-6)
        assert i not in set(idx.indices[start:end].tolist())


def test_expand_radius_and_knn_exclude_seeds():
    from spatial_rx.neighbors import NeighborhoodIndex

    # 3x3 grid
    xs, ys = np.meshgrid(np.arange(3.0), np.arange(3.0))
    x = xs.ravel()
    y = ys.ravel()
    idx = NeighborhoodIndex.build(x, y, k_max=8, radius_max=10.0)
    seed = np.zeros(9, dtype=bool)
    seed[4] = True  # center
    neigh = idx.expand(seed, "radius", radius=1.01)
    assert not neigh[4]
    # 4-adjacent at distance 1
    assert neigh.sum() >= 4
    knn = idx.expand(seed, "knn", k=4)
    assert not knn[4]
    assert knn.sum() == 4


def test_expand_radius_beyond_knn_horizon():
    from spatial_rx.neighbors import NeighborhoodIndex

    # Points on a line: with k_max=1 only the adjacent neighbor is in the CSR,
    # but radius expand should still reach farther points.
    x = np.asarray([0.0, 1.0, 2.0, 3.0, 4.0])
    y = np.zeros(5)
    idx = NeighborhoodIndex.build(x, y, k_max=1, radius_max=10.0)
    seed = np.array([True, False, False, False, False])
    neigh = idx.expand(seed, "radius", radius=2.5)
    assert neigh.tolist() == [False, True, True, False, False]


def test_expand_radius_matches_brute_small():
    from spatial_rx.neighbors import NeighborhoodIndex
    from spatial_rx.selection import neighborhood_expand

    rng = np.random.default_rng(1)
    x = rng.uniform(0, 5, 40)
    y = rng.uniform(0, 5, 40)
    idx = NeighborhoodIndex.build(x, y, k_max=3, radius_max=100.0)
    seed = np.zeros(40, dtype=bool)
    seed[[0, 7, 15]] = True
    r = 1.25
    got = idx.expand(seed, "radius", radius=r)
    brute = neighborhood_expand(seed, x, y, "radius", radius=r, index=None)
    assert np.array_equal(got, brute)


def test_to_sync_roundtrip():
    from spatial_rx.neighbors import NeighborhoodIndex

    x = np.array([0.0, 1.0, 2.0, 0.0])
    y = np.array([0.0, 0.0, 1.0, 1.0])
    idx = NeighborhoodIndex.build(x, y, k_max=3, radius_max=5.0)
    sync = idx.to_sync()
    back = NeighborhoodIndex.from_sync(**sync)
    assert back.n == idx.n
    assert np.array_equal(back.indptr, idx.indptr)
    assert np.array_equal(back.indices, idx.indices)
    assert np.allclose(back.distances, idx.distances)


def test_selection_expand_uses_index():
    from spatial_rx.neighbors import NeighborhoodIndex
    from spatial_rx.selection import neighborhood_expand

    x = np.array([0.0, 1.0, 2.0])
    y = np.array([0.0, 0.0, 0.0])
    idx = NeighborhoodIndex.build(x, y, k_max=2, radius_max=10.0)
    seed = np.array([True, False, False])
    out = neighborhood_expand(seed, x, y, "knn", k=1, index=idx)
    assert out.tolist() == [False, True, False]


def test_pynndescent_smoke_1k():
    from spatial_rx.neighbors import NeighborhoodIndex

    rng = np.random.default_rng(2)
    x = rng.normal(size=1000)
    y = rng.normal(size=1000)
    idx = NeighborhoodIndex.build(x, y, k_max=16, radius_max=2.0)
    assert idx.n == 1000
    assert idx.indices.size > 0
