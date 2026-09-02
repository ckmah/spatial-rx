import base64

import numpy as np

from tests.helpers import adata_xy


def test_constructor_packs_genes():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
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
    w.set_expression({"Lgr5": [0.0, 0.0, 0.5, 1.0]})
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]


def test_encode_gene_bundle_rejects_row_mismatch():
    import pytest
    from spatial_rx.genes import encode_gene_bundle
    import polars as pl

    expr = pl.DataFrame({"Apob": [0.0, 1.0]})
    with pytest.raises(ValueError, match="n_points"):
        encode_gene_bundle(expr, 3)
