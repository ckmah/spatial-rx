#!/usr/bin/env python3
"""Regenerate frontend/dev/fixture.json from synthetic AnnData."""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from spatial_rx import LandmarksWidget  # noqa: E402
from tests.helpers import adata_xy, graph  # noqa: E402

FIXTURE_KEYS = [
    "mode",
    "modes",
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
    "color_by",
    "continuous_palette",
    "legend_labels",
    "legend_title",
    "type_neighborhoods",
    "default_tension",
    "neighbor_radius_max",
    "neighbor_k_max",
    "x_bounds",
    "y_bounds",
    "n_points",
    "point_size",
    "point_opacity",
    "landmark_opacity",
    "stroke_width",
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
    "axes_pixel_bounds",
    "color_vmin",
    "color_vmax",
    "plot_background",
]


def main() -> None:
    rng = np.random.default_rng(42)
    centers = [(2500, 800), (3200, 400), (3600, 1300)]
    labels = ["Stem", "Immune", "Fibroblast"]
    pts: list[tuple[float, float]] = []
    colors: list[str] = []
    for ci, (cx, cy) in enumerate(centers):
        for _ in range(120):
            pts.append((cx + rng.normal(0, 120), cy + rng.normal(0, 90)))
            colors.append(labels[ci % len(labels)])
        for _ in range(40):
            pts.append((cx + rng.normal(0, 200), cy + rng.normal(0, 160)))
            colors.append(labels[(ci + 1) % len(labels)])

    x = np.array([p[0] for p in pts], dtype=np.float64)
    y = np.array([p[1] for p in pts], dtype=np.float64)
    n = len(x)
    pairs: list[tuple[int, int, float]] = []
    for i in range(n):
        dists: list[tuple[float, int]] = []
        for j in range(n):
            if i == j:
                continue
            d = math.hypot(x[i] - x[j], y[i] - y[j])
            dists.append((d, j))
        dists.sort()
        for d, j in dists[:8]:
            pairs.append((i, j, float(d)))

    knn = graph(n, pairs)
    radius = graph(n, [(i, j, d) for i, j, d in pairs if d <= 180.0])

    adata = adata_xy(
        x,
        y,
        color=colors,
        color_key="celltype",
        genes={"GeneA": rng.random(n).tolist(), "GeneB": rng.random(n).tolist()},
        knn=knn,
        radius=radius,
    )
    widget = LandmarksWidget(adata, color="celltype", genes=["GeneA", "GeneB"])
    widget.selections = [
        {
            "id": "lasso-1",
            "type": "polygon",
            "vertices": [[2800, 600], [3100, 600], [3100, 900], [2800, 900]],
            "neighborhood": "radius",
            "neighborhood_radius": 80.0,
        }
    ]
    widget.landmarks = [{"id": "lm-1", "type": "point", "vertices": [[2500, 800]]}]
    widget.selected_kind = "landmark"
    widget.selected_index = 0

    out = Path(__file__).with_name("fixture.json")
    payload = {key: getattr(widget, key) for key in FIXTURE_KEYS}
    out.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"wrote {out} ({n} points)")


if __name__ == "__main__":
    main()
