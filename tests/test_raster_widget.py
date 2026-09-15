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
    # Tiny synthetic coords — use a small bin so we get multiple cells.
    w.raster_bin_size = 1.0
    w.raster_window_radius = 2.0
    assert w.render_mode == "points"
    assert w.raster_basis == "composition"
    w.set_raster_basis(genes="active")
    w.set_render_mode("raster")
    assert w.render_mode == "raster"
    assert w.raster_basis == "genes"
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
    assert w.raster_feature_labels == ["0", "1"]
    w.raster_embedding_dims = []
    assert w.raster_feature_dim == 2

    w.set_raster_basis(composition="cell_class")
    assert w.raster_basis == "composition"
    assert w.raster_feature_dim == 3  # Epi, Imm, Fib
    assert w.raster_status == "ready"

    w.set_render_mode("points")
    # Features stay available so probe works in points mode.
    assert w.raster_n_bins >= 2
    assert w.raster_features != ""


def test_raster_default_bin_and_window_microns():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 10.0, 20.0, 30.0],
        [0.0, 5.0, 10.0, 15.0],
        color=["A", "A", "B", "B"],
        color_key="cell_class",
        genes={"g1": [0.0, 1.0, 2.0, 3.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["g1"])
    assert w.raster_bin_size == pytest.approx(8.0)
    assert w.raster_window_radius == pytest.approx(24.0)
    w.active_genes = ["g1"]
    w.set_render_mode("raster")
    assert w.raster_status == "ready"
    assert w.raster_window_radius == pytest.approx(24.0)


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
    w.raster_bin_size = 2.0
    w.raster_window_radius = 4.0
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

def test_raster_genes_use_display_normalized_gene_values():
    """Bin gene features should match packed gene_values (point coloring scale)."""
    import base64
    import numpy as np
    from spatial_rx import LandmarksWidget
    from tests.helpers import adata_xy

    adata = adata_xy(
        [0.0, 0.2, 2.0, 2.1],
        [0.0, 0.1, 0.0, 2.0],
        color=["Epi", "Epi", "Imm", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 2.0, 0.0, 4.0], "Lgr5": [1.0, 1.0, 0.0, 0.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    w.active_genes = ["Apob"]
    w.raster_bin_size = 1.0
    w.raster_window_radius = 2.0
    w.set_raster_basis(genes="active")
    w.set_render_mode("raster")
    assert w.raster_basis == "genes"
    assert w.raster_feature_dim == 1
    assert w.raster_feature_labels == ["Apob"]
    packed = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert packed.size == 4
    # Features are windowed means of [0,1] packed values — stay in [0,1].
    feats = np.frombuffer(base64.b64decode(w.raster_features), dtype=np.float32)
    assert feats.size == w.raster_n_bins
    assert np.all(feats >= -1e-5)
    assert np.all(feats <= 1.0 + 1e-5)


def test_embedding_values_pack_for_point_rgb():
    """Selecting an embedding packs ≤3 display-normalized channels for points."""
    import base64
    import numpy as np
    from spatial_rx import LandmarksWidget
    from tests.helpers import adata_xy

    adata = adata_xy(
        [0.0, 0.2, 2.0, 2.1],
        [0.0, 0.1, 0.0, 2.0],
        color=["Epi", "Epi", "Imm", "Fib"],
        color_key="cell_class",
        genes={"g1": [0.0, 1.0, 2.0, 3.0]},
    )
    adata.obsm["X_pca"] = np.array(
        [[0.0, 1.0, 2.0], [0.5, 1.0, 0.0], [1.0, 0.0, 1.0], [1.0, 0.5, 0.5]],
        dtype=np.float32,
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["g1"])
    assert w.raster_embedding_key == "X_pca"
    assert w.embedding_channel_labels == ["0", "1", "2"]
    packed = np.frombuffer(base64.b64decode(w.embedding_values), dtype=np.float32)
    assert packed.size == 4 * 3
    assert np.all(packed >= 0) and np.all(packed <= 1)
    w.color_by = "embedding"
    assert w.color_by == "embedding"


def test_probe_builds_features_in_points_mode():
    """Entering probe in points mode builds bin features without raster view."""
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 0.2, 2.0, 2.1],
        [0.0, 0.1, 0.0, 2.0],
        color=["Epi", "Epi", "Imm", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 2.0, 0.0, 4.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob"])
    w.raster_bin_size = 1.0
    w.raster_window_radius = 2.0
    assert w.render_mode == "points"
    assert w.raster_n_bins == 0
    w.mode = "probe"
    # Trait observer on mode rebuilds bin features for points probe.
    assert w.raster_n_bins > 0


def test_empty_genes_keeps_gene_view_across_render_mode():
    """Clearing genes / flipping View must stay on genes, not fall back to category."""
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 0.2, 2.0, 2.1],
        [0.0, 0.1, 0.0, 2.0],
        color=["Epi", "Epi", "Imm", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 2.0, 0.0, 4.0], "Lgr5": [1.0, 0.0, 1.0, 0.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    w.active_genes = ["Apob"]
    assert w.color_by == "continuous"

    w.active_genes = []
    assert w.active_genes == []
    assert w.color_by == "continuous"

    w.set_render_mode("raster")
    assert w.render_mode == "raster"
    assert w.raster_basis == "genes"
    assert w.color_by == "continuous"

    w.set_render_mode("points")
    assert w.render_mode == "points"
    assert w.color_by == "continuous"
    assert w.raster_basis == "genes"
