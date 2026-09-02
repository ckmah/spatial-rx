"""Synthetic AnnData for widget tests (no dataset downloads)."""

from __future__ import annotations

import anndata as ad
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix, spmatrix


def adata_xy(
    x,
    y,
    *,
    color=None,
    color_key="label",
    genes: dict[str, list[float]] | None = None,
    knn: spmatrix | None = None,
    radius: spmatrix | None = None,
    names: list[str] | None = None,
    uns: dict | None = None,
):
    """Build a tiny AnnData with ``obsm['spatial']`` and both neighbor graphs."""
    n = len(x)
    index = names if names is not None else [f"c{i}" for i in range(n)]
    obs = pd.DataFrame(index=index)
    if color is not None:
        obs[color_key] = color

    if genes:
        gene_names = list(genes)
        X = np.column_stack([np.asarray(genes[g], dtype=np.float32) for g in gene_names])
        var = pd.DataFrame(index=gene_names)
    else:
        X = np.zeros((n, 1), dtype=np.float32)
        var = pd.DataFrame(index=["g0"])

    adata = ad.AnnData(X=X, obs=obs, var=var)
    adata.obsm["spatial"] = np.column_stack(
        [np.asarray(x, dtype=np.float64), np.asarray(y, dtype=np.float64)]
    )
    empty = csr_matrix((n, n), dtype=np.float32)
    adata.obsp["spatial_knn_connectivities"] = knn if knn is not None else empty
    adata.obsp["spatial_radius_connectivities"] = radius if radius is not None else empty
    if uns:
        adata.uns.update(uns)
    return adata


def graph(n: int, pairs: list[tuple[int, int, float]]):
    """CSR with explicit (i, j, value) triples."""
    if not pairs:
        return csr_matrix((n, n), dtype=np.float32)
    rows, cols, data = zip(*pairs)
    return csr_matrix((data, (rows, cols)), shape=(n, n), dtype=np.float32)
