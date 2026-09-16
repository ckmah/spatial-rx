import numpy as np
import pandas as pd

from spatial_rx.categories import (
    DEFAULT_CATEGORICAL_PALETTE,
    default_categorical_palette,
)
from tests.helpers import adata_xy


def test_default_categorical_palette_scales_with_n():
    assert len(DEFAULT_CATEGORICAL_PALETTE) == 60
    assert len(set(DEFAULT_CATEGORICAL_PALETTE)) == 60

    assert len(default_categorical_palette(3)) == 3
    assert default_categorical_palette(3) == default_categorical_palette(10)[:3]
    assert default_categorical_palette(10)[0] == "#1f77b4"
    assert len(default_categorical_palette(15)) == 15
    assert len(default_categorical_palette(25)) == 25
    assert len(default_categorical_palette(45)) == 45
    # tab10 vs tab20 diverge within the first 10 stops.
    assert default_categorical_palette(10) != default_categorical_palette(15)[:10]

    reserved = {
        "#00e5ff",
        "#ff2d95",
        "#b8ff00",
        "#ff0099",
        "#00b7ff",
    }
    assert reserved.isdisjoint(set(DEFAULT_CATEGORICAL_PALETTE))


def test_widget_uses_size_matched_palette_without_uns_colors():
    from spatial_rx import LandmarksWidget

    labels = [f"t{i}" for i in range(7)]
    adata = adata_xy(
        list(range(7)),
        list(range(7)),
        color=labels,
        color_key="cell_type",
    )
    w = LandmarksWidget(adata, color="cell_type")
    assert w.point_palette == default_categorical_palette(7)


def test_constructor_detects_categories():
    from spatial_rx import LandmarksWidget

    cell_class = pd.Categorical(
        ["Epi", "Imm", "Epi", "Fib"], categories=["Epi", "Imm", "Fib"]
    )
    cell_type = ["Stem", "T", "Enterocyte", "FB1"]
    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=cell_class,
        color_key="cell_class",
        uns={"cell_class_colors": ["#111111", "#222222", "#333333"]},
    )
    adata.obs["cell_type"] = cell_type
    adata.obs["score"] = [0.1, 0.2, 0.3, 0.4]
    w = LandmarksWidget(adata, color="cell_class")
    names = [c["name"] for c in w.category_columns]
    assert "cell_class" in names
    assert "cell_type" in names
    assert "score" not in names
    assert w.active_category == "cell_class"
    assert w.legend_labels == ["Epi", "Imm", "Fib"]
    assert w.point_palette == ["#111111", "#222222", "#333333"]
    assert w.category_codes
    labels = w._data_label_arrays["cell_class"]
    assert set(np.flatnonzero(np.asarray(labels).astype(str) == "Epi").tolist()) == {
        0,
        2,
    }
