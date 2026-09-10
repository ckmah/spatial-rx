import base64

import numpy as np

from tests.helpers import adata_xy


def test_constructor_gene_catalog_is_lazy():
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
    assert w.gene_values == ""
    assert w.color_by == "categorical"
    w.active_genes = ["Apob", "Lgr5"]
    raw = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw.size == 4 * 2
    apob = raw[0:4]
    assert apob.min() == 0.0
    assert apob.max() == 1.0
    assert w.point_palette
    assert w.gene_scale_mode == "independent"
    assert w.gene_log1p is False
    assert w.gene_expression_logged is False
    w.set_expression({"Lgr5": [0.0, 0.0, 0.5, 1.0]})
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]
    # Active genes filtered to remaining catalog; values re-packed.
    assert w.active_genes == ["Lgr5"]
    raw2 = np.frombuffer(base64.b64decode(w.gene_values), dtype=np.float32)
    assert raw2.size == 4


def test_genes_none_loads_all_var_names():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class")
    assert [g["name"] for g in w.gene_columns] == ["Apob", "Lgr5"]


def test_genes_str_loads_single_name():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.0, 1.0, 2.0, 4.0], "Lgr5": [0.0, 0.0, 0.5, 1.0]},
    )
    w = LandmarksWidget(adata, color="cell_class", genes="Lgr5")
    assert [g["name"] for g in w.gene_columns] == ["Lgr5"]


def test_expression_log_scaled_detection_from_uns():
    from spatial_rx import LandmarksWidget

    adata = adata_xy(
        [0.0, 1.0, 2.0, 3.0],
        [0.0, 1.0, 0.0, 1.0],
        color=["Epi", "Imm", "Epi", "Fib"],
        color_key="cell_class",
        genes={"Apob": [0.1, 0.5, 1.2, 2.0], "Lgr5": [0.0, 0.2, 0.4, 0.8]},
    )
    adata.uns["log1p"] = {"base": None}
    w = LandmarksWidget(adata, color="cell_class", genes=["Apob", "Lgr5"])
    assert w.gene_expression_logged is True
    assert w.gene_log1p is False


def test_expression_log_scaled_detection_from_values():
    from spatial_rx.genes import expression_is_log_scaled

    assert expression_is_log_scaled(sample=[0.0, 0.5, 1.2, 3.4]) is True
    assert expression_is_log_scaled(sample=[0, 1, 2, 40]) is False
    assert expression_is_log_scaled(sample=[0.0, 1.0, 2.0, 3.0]) is False


def test_encode_gene_bundle_rejects_row_mismatch():
    import pytest
    from spatial_rx.genes import encode_gene_bundle
    import polars as pl

    expr = pl.DataFrame({"Apob": [0.0, 1.0]})
    with pytest.raises(ValueError, match="n_points"):
        encode_gene_bundle(expr, 3)
