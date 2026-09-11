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
import squidpy as sq

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
    "neighbor_indptr",
    "neighbor_indices",
    "neighbor_distances",
    "radius_indptr",
    "radius_indices",
    "radius_distances",
    "color_vmin",
    "color_vmax",
    "render_mode",
    "raster_bin_size",
    "raster_basis",
    "raster_embedding_key",
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

    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    span = float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))
    radius = 0.05 * span
    t0 = time.perf_counter()
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", n_neighs=64, key_added="spatial_knn"
    )
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", radius=radius, key_added="spatial_radius"
    )
    print(f"neighbors {time.perf_counter() - t0:.1f}s  n={adata.n_obs} genes={adata.n_vars}")

    genes = [str(g) for g in adata.var_names[:6]]
    t1 = time.perf_counter()
    widget = LandmarksWidget(adata, color=cluster, genes=genes)
    widget.active_genes = genes
    widget.set_render_mode("raster")
    # Pin a mid-body bin if available for similarity demo.
    if widget.raster_n_bins > 10:
        widget.raster_query_bin = int(widget.raster_n_bins // 3)
    print(
        f"widget {time.perf_counter() - t1:.1f}s  "
        f"bin_size={widget.raster_bin_size:.4g}  "
        f"grid={widget.raster_n_cols}x{widget.raster_n_rows}  "
        f"nonempty={widget.raster_n_bins}  "
        f"dim={widget.raster_feature_dim}  "
        f"status={widget.raster_status}  "
        f"query={widget.raster_query_bin}"
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
