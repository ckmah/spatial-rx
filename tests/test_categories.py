import pandas as pd

from tests.helpers import adata_xy


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
    assert set(w.get_type_indices("Epi", expand=False).tolist()) == {0, 2}
