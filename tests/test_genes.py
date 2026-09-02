import base64

import numpy as np
import polars as pl


def test_from_frame_packs_genes():
    from spatial_rx import LandmarksWidget

    df = pl.DataFrame(
        {
            "x": [0.0, 1.0, 2.0, 3.0],
            "y": [0.0, 1.0, 0.0, 1.0],
            "cell_class": ["Epi", "Imm", "Epi", "Fib"],
        }
    )
    expr = pl.DataFrame(
        {
            "Apob": [0.0, 1.0, 2.0, 4.0],
            "Lgr5": [0.0, 0.0, 0.5, 1.0],
        }
    )
    w = LandmarksWidget.from_frame(
        df,
        color="cell_class",
        expr=expr,
        width=400,
        height=400,
    )
    names = [g["name"] for g in w.gene_columns]
    assert names == ["Apob", "Lgr5"]
    assert w.active_genes == []
    assert w.color_by == "categorical"
    raw = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw.size == 4 * 2
    apob = raw[0:4]
    assert apob.min() == 0.0
    assert apob.max() == 1.0
    assert w.continuous_palette
    assert w.gene_scale_mode == "independent"
    assert w.gene_log1p is False
    w.set_expression(expr.select("Lgr5"))
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]


def test_encode_gene_bundle_rejects_row_mismatch():
    import pytest
    from spatial_rx.genes import encode_gene_bundle

    expr = pl.DataFrame({"Apob": [0.0, 1.0]})
    with pytest.raises(ValueError, match="n_points"):
        encode_gene_bundle(expr, 3)
