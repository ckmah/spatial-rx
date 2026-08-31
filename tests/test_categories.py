import numpy as np


def test_from_frame_detects_categories():
    import polars as pl
    from spatial_rx import LandmarksWidget

    df = pl.DataFrame(
        {
            "x": [0.0, 1.0, 2.0, 3.0],
            "y": [0.0, 1.0, 0.0, 1.0],
            "cell_class": ["Epi", "Imm", "Epi", "Fib"],
            "cell_type": ["Stem", "T", "Enterocyte", "FB1"],
            "score": [0.1, 0.2, 0.3, 0.4],
        }
    )
    w = LandmarksWidget.from_frame(
        df,
        color="cell_class",
        color_maps={"cell_class": {"Epi": "#111111", "Imm": "#222222", "Fib": "#333333"}},
        width=400,
        height=400,
    )
    names = [c["name"] for c in w.category_columns]
    assert "cell_class" in names
    assert "cell_type" in names
    assert "score" not in names
    assert w.active_category == "cell_class"
    assert w.legend_labels == ["Epi", "Imm", "Fib"]
    assert w.category_codes
    assert set(w.get_type_indices("Epi", expand=False).tolist()) == {0, 2}
