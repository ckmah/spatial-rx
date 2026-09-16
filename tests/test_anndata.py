import numpy as np
import pandas as pd
import pytest
from scipy.sparse import csr_matrix

from tests.helpers import adata_xy


def _adata(n=4):
    import anndata as ad

    obs = pd.DataFrame(
        {
            "cell_type": pd.Categorical(["a", "b", "a", "c"][:n]),
            "cell_class": pd.Categorical(["X", "Y", "X", "Y"][:n]),
        },
        index=[f"c{i}" for i in range(n)],
    )
    X = np.arange(n * 2, dtype=float).reshape(n, 2)
    adata = ad.AnnData(X, obs=obs)
    adata.var_names = ["g1", "g2"]
    adata.obsm["spatial"] = np.column_stack(
        [np.arange(n, dtype=float), np.zeros(n)]
    )
    adata.uns["cell_type_colors"] = ["#111111", "#222222", "#333333"][
        : len(obs["cell_type"].cat.categories)
    ]
    adata.uns["cell_class_colors"] = ["#aaaaaa", "#bbbbbb"]
    return adata


def test_constructor_no_graphs_required():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget(adata, color="cell_type")
    assert not hasattr(w, "neighbor_indptr") or not getattr(w, "neighbor_indptr", None)
    assert w.neighbor_k_max >= 1
    assert w.neighbor_radius_max > 0


def test_constructor_packs_obs_palette_and_genes():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget(adata, color="cell_type", genes=["g1"])
    assert w.legend_title == "cell_type"
    assert w.legend_labels == ["a", "b", "c"]
    assert w.point_palette[0].lower() == "#111111"
    assert [g["name"] for g in w.gene_columns] == ["g1"]
    assert w.gene_format == "dense"
    assert w.gene_values  # eager pack
    assert w.neighbor_k_max >= 1
    assert w.neighbor_radius_max > 0
    assert len(w._data_x) == 4
    assert w.mode == "pointer"
    assert w.point_size == pytest.approx(0.4)


def test_chrome_kwargs_rejected():
    from spatial_rx import LandmarksWidget

    adata = adata_xy([0.0, 1.0], [0.0, 0.0])
    with pytest.raises(TypeError):
        LandmarksWidget(adata, width=400)
    with pytest.raises(TypeError):
        LandmarksWidget(adata, point_size=2.0)


def test_get_obs_names_and_subset_join():
    from spatial_rx import LandmarksWidget, write_obs
    from spatial_rx.selection import selection_mask

    adata = _adata()
    w = LandmarksWidget(adata, color="cell_type")
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    names = w.get_obs_names(adata, selection_id="selection 1")
    assert list(names) == ["c0"]
    mask = selection_mask(
        list(w.selections),
        adata.obsm["spatial"][:, 0],
        adata.obsm["spatial"][:, 1],
        "selection 1",
    )
    assert list(np.flatnonzero(mask)) == [0]

    w.assign_obs_mask(adata, "in_sel", selection_id="selection 1")
    assert bool(adata.obs.loc["c0", "in_sel"]) is True
    assert bool(adata.obs.loc["c1", "in_sel"]) is False

    sub = adata[["c0", "c2"]].copy()
    with pytest.raises(ValueError, match="row count"):
        w.get_obs_names(sub, selection_id="selection 1")

    df = pd.DataFrame(
        {"obs_name": ["c0", "c2"], "s": [0.1, 0.9], "point_index": [0, 2]}
    )
    write_obs(adata, df, "crypt_villus_s", "s")
    assert adata.obs.loc["c0", "crypt_villus_s"] == pytest.approx(0.1)
    sub2 = adata[["c2"]].copy()
    joined = df.set_index("obs_name")
    assert joined.loc[str(sub2.obs_names[0]), "s"] == pytest.approx(0.9)


def test_set_neighbor_graphs_removed():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget(adata, color="cell_type")
    bad = csr_matrix((2, 2))
    with pytest.raises(RuntimeError, match="set_neighbor_graphs was removed"):
        w.set_neighbor_graphs(bad, bad)
