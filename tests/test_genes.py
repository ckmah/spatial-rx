import base64

import numpy as np
import pytest

from tests.helpers import adata_xy


def test_constructor_gene_catalog_is_eager():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    names = [g["name"] for g in w.gene_columns]
    assert names == ["Apob", "Lgr5"]
    assert w.active_genes == []
    assert w.gene_format == "dense"
    assert w.gene_values
    raw = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw.size == 4 * 2
    apob = raw[0:4]
    assert apob.min() == 0.0
    assert apob.max() == 1.0
    assert w.color_by == "categorical"
    w.active_genes = ["Apob", "Lgr5"]
    # Eager pack unchanged by view-only active_genes.
    raw2 = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw2.size == 4 * 2
    assert w.point_palette
    assert w.gene_scale_mode == "independent"
    assert w.gene_log1p is False
    assert w.gene_expression_logged is False
    w.set_expression({"Lgr5": [0.0, 0.0, 0.5, 1.0]})
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]
    assert w.active_genes == ["Lgr5"]
    raw3 = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw3.size == 4


def test_genes_none_loads_all_var_names():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class")
    assert [g["name"] for g in w.gene_columns] == ["Apob", "Lgr5"]
    assert w.gene_values


def test_genes_str_loads_single_name():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes="Lgr5")
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]


def test_expression_log_scaled_detection_from_uns():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.1, 0.5, 1.2, 2.0], "Lgr5": [0.0, 0.2, 0.4, 0.8]},
    )
    adata.uns["log1p"] = {"base": None}
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    assert w.gene_expression_logged is True
    assert w.gene_log1p is False


def test_expression_log_scaled_detection_from_values():
    from spatial_rx.genes import expression_is_log_scaled

    assert expression_is_log_scaled(sample=[0.0, 0.5, 1.2, 3.4]) is True
    assert expression_is_log_scaled(sample=[0, 1, 2, 40]) is False
    assert expression_is_log_scaled(sample=[0.0, 1.0, 2.0, 3.0]) is False


def test_encode_gene_bundle_rejects_row_mismatch():
    import pytest
    from spatial_rx.genes import encode_gene_bundle
    import polars as pl

    expr = pl.DataFrame({"Apob": [0.0, 1.0]})
    with pytest.raises(ValueError, match="n_points"):
        encode_gene_bundle(expr, 3)


def _plain_adata(X):
    import anndata as ad
    import pandas as pd

    n_obs, n_vars = X.shape
    obs = pd.DataFrame(index=[f"c{i}" for i in range(n_obs)])
    var = pd.DataFrame(index=[f"g{j}" for j in range(n_vars)])
    return ad.AnnData(X=X, obs=obs, var=var)


def _decode_payload(payload, n_obs, n_vars):
    """Dense float32 (n_obs, n_vars) view of either payload format."""
    from scipy import sparse

    if payload["gene_format"] == "dense":
        raw = np.frombuffer(base64.b64decode(payload["gene_values"]), dtype=np.float32)
        return raw.reshape((n_obs, n_vars), order="F")
    def decode(key, dtype):
        return np.frombuffer(base64.b64decode(payload[key]), dtype=dtype)

    indptr = decode("gene_csc_indptr", np.int32)
    indices = decode("gene_csc_indices", np.int32)
    data = decode("gene_csc_data", np.float32)
    assert indptr.size == n_vars + 1
    return sparse.csc_matrix((data, indices, indptr), shape=(n_obs, n_vars)).toarray()


def _awkward_sparse_matrix():
    """Columns that stress sparse vs dense normalization parity."""
    rng = np.random.default_rng(7)
    n_obs = 400
    cols = []
    # Typical counts, ~5% nonzero.
    cols.append(np.where(rng.random(n_obs) < 0.05, rng.integers(1, 50, n_obs), 0))
    # All zeros.
    cols.append(np.zeros(n_obs))
    # Negative values (implicit zeros normalize above 0).
    neg = np.zeros(n_obs)
    neg[rng.choice(n_obs, 20, replace=False)] = rng.normal(0, 2, 20)
    cols.append(neg)
    # NaN and inf among the stored entries.
    bad = np.zeros(n_obs)
    bad[:10] = rng.random(10) * 5
    bad[10] = np.nan
    bad[11] = np.inf
    cols.append(bad)
    # Fully stored column (no implicit zeros), all positive.
    cols.append(rng.random(n_obs) + 0.5)
    # Single nonzero entry (99th percentile lands on implicit zeros).
    one = np.zeros(n_obs)
    one[3] = 9.0
    cols.append(one)
    return np.column_stack(cols).astype(np.float32)


def test_sparse_pack_matches_dense_pack():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    csr = sparse.csr_matrix(_awkward_sparse_matrix())
    # Explicitly stored zeros must be treated like implicit zeros.
    csr.data[::7] = 0.0
    dense = csr.toarray()
    n_obs, n_vars = dense.shape
    names = [f"g{j}" for j in range(n_vars)]

    meta_s, pay_s = pack_eager_gene_matrix(_plain_adata(csr), names, n_obs)
    meta_d, pay_d = pack_eager_gene_matrix(_plain_adata(dense), names, n_obs)

    assert [m["name"] for m in meta_s] == names
    for ms, md in zip(meta_s, meta_d):
        assert ms["vmin"] == pytest.approx(md["vmin"], rel=1e-12, abs=1e-12)
        assert ms["vmax"] == pytest.approx(md["vmax"], rel=1e-12, abs=1e-12)
    assert pay_s["gene_format"] == pay_d["gene_format"]
    np.testing.assert_allclose(
        _decode_payload(pay_s, n_obs, n_vars),
        _decode_payload(pay_d, n_obs, n_vars),
        rtol=1e-6,
        atol=1e-7,
    )


def test_sparse_pack_payload_is_canonical_csc():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    rng = np.random.default_rng(1)
    csr = sparse.random(
        300, 40, density=0.03, format="csr", random_state=rng, dtype=np.float32
    )
    csr.data *= 20.0
    names = [f"g{j}" for j in range(40)]
    _, pay_s = pack_eager_gene_matrix(_plain_adata(csr), names, 300)
    _, pay_d = pack_eager_gene_matrix(_plain_adata(csr.toarray()), names, 300)
    assert pay_s["gene_format"] == "csc"
    assert pay_s["gene_values"] == ""
    # Same indptr/indices bytes as csc_matrix(dense): sorted, zeros dropped.
    assert pay_s["gene_csc_indptr"] == pay_d["gene_csc_indptr"]
    assert pay_s["gene_csc_indices"] == pay_d["gene_csc_indices"]
    np.testing.assert_allclose(
        np.frombuffer(base64.b64decode(pay_s["gene_csc_data"]), dtype=np.float32),
        np.frombuffer(base64.b64decode(pay_d["gene_csc_data"]), dtype=np.float32),
        rtol=1e-6,
    )


def test_sparse_pack_respects_catalog_order_and_subset():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    dense = _awkward_sparse_matrix()
    n_obs = dense.shape[0]
    names = ["g5", "g0", "g3"]
    meta_s, pay_s = pack_eager_gene_matrix(
        _plain_adata(sparse.csr_matrix(dense)), names, n_obs
    )
    _, pay_d = pack_eager_gene_matrix(_plain_adata(dense), names, n_obs)
    assert [m["name"] for m in meta_s] == names
    assert pay_s["gene_format"] == pay_d["gene_format"]
    np.testing.assert_allclose(
        _decode_payload(pay_s, n_obs, 3), _decode_payload(pay_d, n_obs, 3), rtol=1e-6
    )


def test_sparse_pack_csc_input_matches_and_leaves_x_untouched():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    dense = _awkward_sparse_matrix()
    n_obs, n_vars = dense.shape
    names = [f"g{j}" for j in range(n_vars)]
    csc = sparse.csc_matrix(dense)
    # Force the canonicalize path; the caller's arrays must not be rewritten.
    csc.has_canonical_format = False
    before = (csc.indptr.copy(), csc.indices.copy(), csc.data.copy())

    _, pay_s = pack_eager_gene_matrix(_plain_adata(csc), names, n_obs)
    _, pay_d = pack_eager_gene_matrix(_plain_adata(dense), names, n_obs)
    np.testing.assert_allclose(
        _decode_payload(pay_s, n_obs, n_vars),
        _decode_payload(pay_d, n_obs, n_vars),
        rtol=1e-6,
        atol=1e-7,
    )
    np.testing.assert_array_equal(csc.indptr, before[0])
    np.testing.assert_array_equal(csc.indices, before[1])
    np.testing.assert_array_equal(csc.data, before[2])


def test_sparse_pack_dense_enough_sends_dense():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    rng = np.random.default_rng(3)
    dense = (rng.random((50, 6)) + 0.1).astype(np.float32)
    names = [f"g{j}" for j in range(6)]
    _, pay_s = pack_eager_gene_matrix(_plain_adata(sparse.csr_matrix(dense)), names, 50)
    _, pay_d = pack_eager_gene_matrix(_plain_adata(dense), names, 50)
    assert pay_s["gene_format"] == "dense"
    assert pay_s["gene_csc_data"] == ""
    np.testing.assert_allclose(
        _decode_payload(pay_s, 50, 6), _decode_payload(pay_d, 50, 6), rtol=1e-6
    )


def test_sparse_pack_all_zero_sends_dense_zeros():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    _, pay = pack_eager_gene_matrix(
        _plain_adata(sparse.csr_matrix((10, 2), dtype=np.float32)), ["g0", "g1"], 10
    )
    assert pay["gene_format"] == "dense"
    assert not _decode_payload(pay, 10, 2).any()


def test_sparse_pack_rejects_row_mismatch():
    from scipy import sparse

    from spatial_rx.genes import pack_eager_gene_matrix

    with pytest.raises(ValueError, match="n_points"):
        pack_eager_gene_matrix(
            _plain_adata(sparse.csr_matrix((10, 2), dtype=np.float32)), ["g0"], 11
        )


def test_sparse_pack_does_not_densify(monkeypatch):
    """Peak allocation stays far below the dense n_obs x n_genes float32 matrix."""
    import tracemalloc

    from scipy import sparse

    from spatial_rx import genes

    n_obs, n_vars = 100_000, 200
    rng = np.random.default_rng(0)
    csr = sparse.random(
        n_obs, n_vars, density=0.01, format="csr", random_state=rng, dtype=np.float32
    )
    csr.data *= 10.0
    adata = _plain_adata(csr)
    names = [f"g{j}" for j in range(n_vars)]
    dense_bytes = n_obs * n_vars * 4  # ~76 MiB

    def no_count_nonzero(*_a, **_k):
        raise AssertionError("sparse path must not count nonzeros on a dense matrix")

    monkeypatch.setattr(np, "count_nonzero", no_count_nonzero)
    tracemalloc.start()
    try:
        _, payload = genes.pack_eager_gene_matrix(adata, names, n_obs)
        _, peak = tracemalloc.get_traced_memory()
    finally:
        tracemalloc.stop()
    assert payload["gene_format"] == "csc"
    assert peak < dense_bytes / 4


def test_size_warning_reports_bytes_sent(monkeypatch):
    import warnings

    from scipy import sparse

    from spatial_rx import genes

    rng = np.random.default_rng(5)
    csr = sparse.random(
        2000, 50, density=0.02, format="csr", random_state=rng, dtype=np.float32
    )
    csr.data += 1.0
    names = [f"g{j}" for j in range(50)]
    monkeypatch.setattr(genes, "GENE_MATRIX_WARN_BYTES", 1024)
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        _, payload = genes.pack_eager_gene_matrix(_plain_adata(csr), names, 2000)
    assert payload["gene_format"] == "csc"
    nnz = np.frombuffer(
        base64.b64decode(payload["gene_csc_data"]), dtype=np.float32
    ).size
    sent = 4 * (50 + 1) + 8 * nnz
    msgs = [str(w.message) for w in caught if issubclass(w.category, UserWarning)]
    assert len(msgs) == 1
    assert f"{sent / (1024 ** 2):.1f} MiB" in msgs[0]
    assert "csc" in msgs[0] and f"{nnz} nonzeros" in msgs[0]

    # Below the threshold for what is sent: no warning, though dense would exceed it.
    monkeypatch.setattr(genes, "GENE_MATRIX_WARN_BYTES", sent)
    assert 2000 * 50 * 4 > sent
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        genes.pack_eager_gene_matrix(_plain_adata(csr), names, 2000)
    assert not [w for w in caught if issubclass(w.category, UserWarning)]


def test_size_warning_dense_input_reports_dense_bytes(monkeypatch):
    import warnings

    from spatial_rx import genes

    rng = np.random.default_rng(6)
    dense = (rng.random((300, 4)) + 0.1).astype(np.float32)
    monkeypatch.setattr(genes, "GENE_MATRIX_WARN_BYTES", 1024)
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        _, payload = genes.pack_eager_gene_matrix(
            _plain_adata(dense), [f"g{j}" for j in range(4)], 300
        )
    assert payload["gene_format"] == "dense"
    msgs = [str(w.message) for w in caught if issubclass(w.category, UserWarning)]
    assert len(msgs) == 1
    assert f"{300 * 4 * 4 / (1024 ** 2):.1f} MiB" in msgs[0] and "dense" in msgs[0]
