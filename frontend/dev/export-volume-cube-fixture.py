#!/usr/bin/env python3
"""Export a small Landmarks harness fixture matching VolumeCube toy extents (256×256)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from spatial_rx import LandmarksWidget  # noqa: E402
from tests.helpers import adata_xy  # noqa: E402

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
    "gene_format",
    "gene_csc_indptr",
    "gene_csc_indices",
    "gene_csc_data",
    "x_bounds",
    "y_bounds",
    "point_size",
    "points_data",
    "point_palette",
    "category_codes",
    "gene_values",
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
    "raster_similarity_enabled",
    "raster_query_bin",
    "inspect_cx",
    "inspect_cy",
    "inspect_size_um",
]

EXTENT_XY = 256


def main() -> None:
    rng = np.random.default_rng(0)
    n = 400
    x = rng.uniform(20, EXTENT_XY - 20, n)
    y = rng.uniform(20, EXTENT_XY - 20, n)
    types = rng.choice(["A", "B", "C"], n)
    adata = adata_xy(x, y, color=types, color_key="celltype")
    widget = LandmarksWidget(adata, color="celltype")
    widget.set_render_mode("points")
    out = Path(__file__).with_name("volume-cube-fixture.json")
    payload = {key: getattr(widget, key) for key in FIXTURE_KEYS}
    out.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"wrote {out} ({n} points, {out.stat().st_size / 1e3:.1f} KB)")


if __name__ == "__main__":
    main()
