#!/usr/bin/env python3
"""Export Vite harness fixture from the ileum (gut) demo panel."""

from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import anndata as ad
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from spatial_rx import LandmarksWidget  # noqa: E402

# Keep in sync with export-fixture.py
FIXTURE_KEYS = [
    "mode",
    "selections",
    "landmarks",
    "selected_kind",
    "selected_index",
    "category_columns",
    "active_category",
    "gene_columns",
    "active_genes",
    "gene_scale_mode",
    "gene_log1p",
    "gene_expression_logged",
    "color_by",
    "legend_labels",
    "legend_title",
    "type_neighborhoods",
    "default_buffer_width",
    "neighbor_radius_max",
    "neighbor_k_max",
    "x_bounds",
    "y_bounds",
    "point_size",
    "points_data",
    "point_palette",
    "category_codes",
    "gene_values",
    "gene_format",
    "gene_csc_indptr",
    "gene_csc_indices",
    "gene_csc_data",
    "color_vmin",
    "color_vmax",
    "render_mode",
    "raster_bin_size",
    "raster_window_radius",
    "raster_basis",
    "raster_embedding_key",
    "raster_embedding_keys",
    "raster_embedding_dims",
    "embedding_values",
    "embedding_channel_labels",
    "embedding_matrix",
    "embedding_matrix_dim",
    "raster_obs_key",
    "raster_gene_mode",
    "raster_origin_x",
    "raster_origin_y",
    "raster_n_cols",
    "raster_n_rows",
    "raster_n_bins",
    "raster_bin_rows",
    "raster_bin_cols",
    "raster_bin_counts",
    "raster_features",
    "raster_feature_dim",
    "raster_feature_labels",
    "raster_query_bin",
    "raster_similarity_enabled",
    "raster_threshold",
    "raster_status",
]


def _pca_from_expression(X: np.ndarray, n_comps: int = 8) -> np.ndarray:
    """Cheap PCA via SVD so the harness has an embedding without sklearn."""
    x = np.asarray(X, dtype=np.float64)
    if x.ndim != 2 or x.shape[0] < 2 or x.shape[1] < 1:
        return np.zeros((x.shape[0], n_comps), dtype=np.float32)
    x = x - x.mean(axis=0, keepdims=True)
    # Economy SVD; right-multiply by singular values for scores.
    _u, s, vt = np.linalg.svd(x, full_matrices=False)
    k = int(min(n_comps, s.shape[0], x.shape[1], x.shape[0]))
    scores = x @ vt[:k].T
    if k < n_comps:
        pad = np.zeros((scores.shape[0], n_comps - k), dtype=np.float64)
        scores = np.hstack([scores, pad])
    return scores.astype(np.float32)


def main() -> None:
    data = ROOT / "demos" / "data" / "ileum"
    cells = pd.read_csv(data / "cells.csv")
    expr = pd.read_csv(data / "expr.csv")
    cluster = "cell_type"
    obs = cells.drop(columns=["x", "y"]).copy()
    obs.index = [f"c{i}" for i in range(len(obs))]
    adata = ad.AnnData(
        X=expr.to_numpy(dtype=np.float32),
        obs=obs,
        var=pd.DataFrame(index=expr.columns.astype(str)),
    )
    adata.obsm["spatial"] = cells[["x", "y"]].to_numpy(dtype=float)
    adata.obs[cluster] = pd.Categorical(adata.obs[cluster].astype(str))
    # Embeddings for Explore → embed chrome (ridge/cloud + raster basis).
    adata.obsm["X_pca"] = _pca_from_expression(adata.X, n_comps=8)
    adata.obsm["X_umap"] = adata.obsm["X_pca"][:, :2].copy()

    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    span = float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))

    t1 = time.perf_counter()
    widget = LandmarksWidget(adata, color=cluster, genes=list(adata.var_names))
    # Neutral harness boot: categorical points (genes/embeddings packed for Explore).
    widget.active_genes = []
    widget.color_by = "categorical"
    widget.raster_basis = "composition"
    widget.set_render_mode("points")
    widget.raster_similarity_enabled = False
    widget.raster_query_bin = -1
    print(
        f"widget {time.perf_counter() - t1:.1f}s  "
        f"bin_size={widget.raster_bin_size:.4g}  "
        f"gene_format={widget.gene_format}  "
        f"embed_dim={widget.embedding_matrix_dim}  "
        f"keys={widget.raster_embedding_keys}  "
        f"render_mode={widget.render_mode}  "
        f"basis={widget.raster_basis}  "
        f"color_by={widget.color_by}"
    )
    x0, x1 = widget.x_bounds
    y0, y1 = widget.y_bounds
    print(
        f"extent x=[{x0:.1f},{x1:.1f}] y=[{y0:.1f},{y1:.1f}]  "
        f"span≈{span:.1f}  median_nn≈{getattr(widget, '_median_nn', None)}"
    )

    out = Path(__file__).with_name("fixture.json")
    payload = {key: getattr(widget, key) for key in FIXTURE_KEYS}
    out.write_text(json.dumps(payload) + "\n")
    print(f"wrote {out} ({out.stat().st_size / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
