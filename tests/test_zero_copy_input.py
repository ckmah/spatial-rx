"""M1.5: zero-copy / lazy input for LandmarksWidget construct."""

from __future__ import annotations

import base64

import anndata as ad
import numpy as np
import pandas as pd
import pytest
from scipy.sparse import csr_matrix

from tests.helpers import adata_xy, graph


def _wide_sparse_adata(*, n_obs: int = 40, n_vars: int = 200):
    rng = np.random.default_rng(0)
    x = rng.normal(size=n_obs)
    y = rng.normal(size=n_obs)
    pairs = [(i, (i + 1) % n_obs, 1.0) for i in range(n_obs)]
    knn = graph(n_obs, pairs)
    rows, cols, data = [], [], []
    for i in range(n_obs):
        for j in range(0, n_vars, 17):
            rows.append(i)
            cols.append(j)
            data.append(float((i + j) % 7))
    wide = csr_matrix((data, (rows, cols)), shape=(n_obs, n_vars), dtype=np.float32)
    obs = pd.DataFrame(
        {"label": ["a" if i % 2 == 0 else "b" for i in range(n_obs)]},
        index=[f"c{i}" for i in range(n_obs)],
    )
    var = pd.DataFrame(index=[f"g{j}" for j in range(n_vars)])
    out = ad.AnnData(X=wide, obs=obs, var=var)
    out.obsm["spatial"] = np.column_stack([x, y])
    out.obsp["spatial_knn_connectivities"] = knn
    out.obsp["spatial_radius_connectivities"] = knn
    return out


def test_construct_genes_none_skips_full_expression_frame(monkeypatch):
    from spatial_rx import LandmarksWidget
    from spatial_rx import landmarks as L

    def boom(*_a, **_k):
        raise AssertionError("must not densify full expression at construct")

    monkeypatch.setattr(L, "_expr_from_adata", boom)
    adata = _wide_sparse_adata()
    w = LandmarksWidget(adata, color="label")
    assert len(w.gene_columns) == adata.n_vars
    assert w.gene_columns[0]["name"] == "g0"
    assert w.gene_values == ""
    assert w.active_genes == []


def test_construct_does_not_obs_copy():
    from spatial_rx import LandmarksWidget

    adata = adata_xy([0.0, 1.0], [0.0, 1.0], color=["a", "b"])
    calls: list[int] = []
    original = adata.obs.copy

    def spy(*args, **kwargs):
        calls.append(1)
        return original(*args, **kwargs)

    adata.obs.copy = spy  # type: ignore[method-assign]
    LandmarksWidget(adata, color="label")
    assert calls == []


def test_activate_genes_packs_only_active_columns():
    from spatial_rx import LandmarksWidget

    adata = _wide_sparse_adata(n_obs=20, n_vars=80)
    w = LandmarksWidget(adata, color="label")
    assert w.gene_values == ""
    w.active_genes = ["g0", "g17"]
    raw = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw.size == 20 * 2
    g0 = raw[0:20]
    assert g0.min() == 0.0
    assert g0.max() == 1.0
    meta0 = next(g for g in w.gene_columns if g["name"] == "g0")
    assert meta0["vmax"] > meta0["vmin"]


def test_widget_holds_adata_reference():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0], [0.0, 1.0], color=["a", "b"], genes={"Apob": [0.0, 1.0]}
    )
    w = LandmarksWidget(adata, color="label", genes=["Apob"])
    assert w._adata is adata
