"""LandmarksWidget raster mode + similarity query."""

from __future__ import annotations

import base64

import numpy as np
import pytest

from tests.helpers import adata_xy


def test_raster_genes_mean_builds_features():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 0.2, 2.0, 2.1],
        [0.0, 0.1, 0.0, 2.0],
        color=["Epi", "Epi", "Imm", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 2.0, 0.0, 4.0], "Lgr5": [1.0, 1.0, 0.0, 0.0]},
    )
    adata.obsm["X_pca"] = np.array(
        [[0.0, 1.0], [0.5, 1.0], [1.0, 0.0], [1.0, 0.5]], dtype=np.float32
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    w.active_genes = ["Apob", "Lgr5"]
    assert w.render_mode == "points"
    w.set_render_mode("raster")
    assert w.render_mode == "raster"
    assert w.raster_status == "ready"
    assert w.raster_n_bins >= 2
    assert w.raster_feature_dim == 2
    raw = np.frombuffer(base64.b64decode(w.raster_features), dtype=np.float32)
    assert raw.size == w.raster_n_bins * 2
    # Raw bin means (engine L2-normalizes for cosine).
    B = raw.reshape(w.raster_n_bins, 2)
    assert np.all(np.isfinite(B))
    assert np.any(np.abs(B) > 0)

    w.raster_query_bin = 0
    assert w.raster_query_bin == 0
    w.clear_raster_query()
    assert w.raster_query_bin == -1

    w.set_raster_basis(embedding="X_pca")
    assert w.raster_basis == "embedding"
    assert w.raster_feature_dim == 2
    assert w.raster_status == "ready"
    # Dim mask is client-side; packed features stay full-rank.
    w.raster_embedding_dims = [0]
    assert w.raster_feature_dim == 2
    assert w.raster_feature_labels == ["X_pca_0", "X_pca_1"]
    w.raster_embedding_dims = []
    assert w.raster_feature_dim == 2

    w.set_raster_basis(composition="cell_class")
    assert w.raster_basis == "composition"
    assert w.raster_feature_dim == 3  # Epi, Imm, Fib
    assert w.raster_status == "ready"

    w.set_render_mode("points")
    assert w.raster_n_bins == 0
    assert w.raster_features == ""


def test_raster_discovers_embedding_keys():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 0.5, 1.0, 1.5],
        color=["A", "A", "B", "B"],
        color_key="cell_class",
        genes={"g1": [0.0, 1.0, 2.0, 3.0]},
    )
    adata.obsm["X_umap"] = np.random.randn(4, 2).astype(np.float32)
    adata.obsm["X_pca"] = np.random.randn(4, 8).astype(np.float32)
    adata.obsm["spatial"] = np.column_stack(
        [adata.obsm["spatial"][:, 0], adata.obsm["spatial"][:, 1]]
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["g1"])
    assert "X_pca" in w.raster_embedding_keys
    assert "X_umap" in w.raster_embedding_keys
    assert "spatial" not in w.raster_embedding_keys
    # Prefer PCA over UMAP as default.
    assert w.raster_embedding_key == "X_pca"


def test_raster_bin_size_change_rebuilds():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        np.linspace(0, 10, 30),
        np.linspace(0, 5, 30),
        color=["A"] * 15 + ["B"] * 15,
        color_key="cell_class",
        genes={"g1": list(range(30))},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["g1"])
    w.active_genes = ["g1"]
    w.set_render_mode("raster")
    n1 = w.raster_n_bins
    w.raster_bin_size = w.raster_bin_size * 2
    assert w.raster_status == "ready"
    # Coarser bins → fewer or equal non-empty bins
    assert w.raster_n_bins <= n1


def test_set_raster_basis_requires_one_kwarg():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0],
        [0.0, 1.0],
        color=["A", "B"],
        color_key="cell_class",
        genes={"g1": [0.0, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["g1"])
    with pytest.raises(ValueError, match="exactly one"):
        w.set_raster_basis(genes="active", embedding="X_pca")
