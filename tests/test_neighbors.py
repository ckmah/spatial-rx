import numpy as np
from scipy.sparse import csr_matrix


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


def test_expand_uses_full_csr():
    from spatial_rx.neighbors import NeighborhoodIndex

    n = 4
    # 0 -- 1 -- 2    3 isolated
    knn = NeighborhoodIndex.from_sparse(
        _csr_from_pairs(n, [(0, 1), (1, 0), (1, 2), (2, 1)]), n=n
    )
    seed = np.array([True, False, False, False])
    neigh = knn.expand(seed, "knn")
    assert neigh.tolist() == [False, True, False, False]
    assert not neigh[0]


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
