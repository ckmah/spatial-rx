import numpy as np
from scipy.sparse import csr_matrix
import pytest


def _csr_from_pairs(n, pairs):
    if not pairs:
        return csr_matrix((n, n))
    rows, cols = zip(*pairs)
    return csr_matrix((np.ones(len(rows)), (rows, cols)), shape=(n, n))


def test_from_sparse_drops_diag():
    from spatial_rx.neighbors import NeighborhoodIndex

    n = 3
    pairs = [(0, 0), (0, 1), (1, 0), (1, 2)]
    idx = NeighborhoodIndex.from_sparse(_csr_from_pairs(n, pairs), n=n)
    assert idx.n == 3
    assert 0 not in set(idx.indices[int(idx.indptr[0]) : int(idx.indptr[1])].tolist())
    assert set(idx.indices[int(idx.indptr[0]) : int(idx.indptr[1])].tolist()) == {1}


def test_expand_knn_subsets_k():
    from spatial_rx.neighbors import NeighborhoodIndex

    n = 3
    rows = [0, 0, 1, 1, 2, 2]
    cols = [1, 2, 0, 2, 0, 1]
    data = [1.0, 3.0, 1.0, 2.0, 3.0, 2.0]
    dist = csr_matrix((data, (rows, cols)), shape=(n, n))
    idx = NeighborhoodIndex.from_sparse(dist, dist, n=n)
    seed = np.array([True, False, False])
    assert idx.k_max == 2
    assert idx.expand(seed, "knn", k=1).tolist() == [False, True, False]
    assert idx.expand(seed, "knn", k=2).tolist() == [False, True, True]


def test_expand_radius_filters_distance():
    from spatial_rx.neighbors import NeighborhoodIndex

    n = 3
    rows = [0, 0, 1, 1, 2, 2]
    cols = [1, 2, 0, 2, 0, 1]
    data = [1.0, 3.0, 1.0, 2.0, 3.0, 2.0]
    dist = csr_matrix((data, (rows, cols)), shape=(n, n))
    idx = NeighborhoodIndex.from_sparse(dist, dist, n=n)
    seed = np.array([True, False, False])
    assert idx.radius_max == pytest.approx(3.0)
    assert idx.expand(seed, "radius", radius=0).tolist() == [False, False, False]
    assert idx.expand(seed, "radius", radius=1.5).tolist() == [False, True, False]
    assert idx.expand(seed, "radius", radius=3.0).tolist() == [False, True, True]


def test_to_sync_roundtrip():
    from spatial_rx.neighbors import NeighborhoodIndex

    n = 3
    idx = NeighborhoodIndex.from_sparse(_csr_from_pairs(n, [(0, 1), (1, 0)]), n=n)
    sync = idx.to_sync()
    back = NeighborhoodIndex.from_sync(**sync)
    assert back.n == idx.n
    assert np.array_equal(back.indptr, idx.indptr)
    assert np.array_equal(back.indices, idx.indices)


def test_to_sync_radius_prefix():
    from spatial_rx.neighbors import NeighborhoodIndex

    idx = NeighborhoodIndex.from_sparse(_csr_from_pairs(2, [(0, 1)]), n=2)
    sync = idx.to_sync(prefix="radius")
    assert "radius_indptr" in sync
    assert "neighbor_indptr" not in sync


def test_empty_graph():
    from spatial_rx.neighbors import empty_graph

    g = empty_graph(5)
    seed = np.zeros(5, dtype=bool)
    seed[0] = True
    assert not g.expand(seed, "knn").any()
