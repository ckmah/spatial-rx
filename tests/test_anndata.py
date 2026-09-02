import numpy as np
import pandas as pd
import pytest
from scipy.sparse import csr_matrix


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
    adata.uns["cell_type_colors"] = ["#111111", "#222222", "#333333"][: len(obs["cell_type"].cat.categories)]
    adata.uns["cell_class_colors"] = ["#aaaaaa", "#bbbbbb"]
    pairs = [(i, i + 1) for i in range(n - 1)] + [(i + 1, i) for i in range(n - 1)]
    rows, cols = zip(*pairs)
    conn = csr_matrix((np.ones(len(rows)), (rows, cols)), shape=(n, n))
    radius = csr_matrix((np.ones(2), ([0, 1], [1, 0])), shape=(n, n))
    adata.obsp["spatial_knn_connectivities"] = conn
    adata.obsp["spatial_radius_connectivities"] = radius
    return adata


def test_from_anndata_requires_graphs():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    del adata.obsp["spatial_knn_connectivities"]
    with pytest.raises(ValueError, match="spatial_knn_connectivities"):
        LandmarksWidget.from_anndata(adata, color="cell_type")

    adata = _adata()
    del adata.obsp["spatial_radius_connectivities"]
    with pytest.raises(ValueError, match="spatial_radius_connectivities"):
        LandmarksWidget.from_anndata(adata, color="cell_type")


def test_from_anndata_packs_obs_palette_and_genes():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget.from_anndata(
        adata, color="cell_type", genes=["g1"], width=400, height=400
    )
    assert w.legend_title == "cell_type"
    assert w.legend_labels == ["a", "b", "c"]
    assert w.point_palette[0].lower() == "#111111"
    assert [g["name"] for g in w.gene_columns] == ["g1"]
    assert w.neighbor_indptr
    assert w.radius_indptr
    assert w.neighbor_k_max >= 1
    assert w.neighbor_radius_max > 0
    assert w._knn_index is not None
    assert w._radius_index is not None
    assert w._knn_index.n == 4


def test_from_points_does_not_build_graph():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0])
    y = np.zeros(3)
    w = LandmarksWidget.from_points(x, y, width=400, height=400)
    assert w._knn_index.n == 3
    assert int(w._knn_index.indptr[-1]) == 0
    assert int(w._radius_index.indptr[-1]) == 0


def test_get_obs_names_and_subset_join():
    from spatial_rx import LandmarksWidget, write_obs

    adata = _adata()
    w = LandmarksWidget.from_anndata(adata, color="cell_type", width=400, height=400)
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    names = w.get_obs_names(adata, selection_id="selection 1")
    assert list(names) == ["c0"]
    idx = w.get_indices(
        adata.obsm["spatial"][:, 0],
        adata.obsm["spatial"][:, 1],
        selection_id="selection 1",
    )
    assert list(idx) == [0]

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


def test_expand_knn_vs_radius_graphs():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget.from_anndata(adata, color="cell_type", width=400, height=400)
    x = adata.obsm["spatial"][:, 0]
    y = adata.obsm["spatial"][:, 1]
    box = {
        "id": "selection 1",
        "type": "polygon",
        "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
    }
    w.selections = [{**box, "neighborhood": "knn"}]
    # knn chain 0-1-2-3; seed 0 expands to 1 (k default 12)
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0, 1}
    w.selections = [{**box, "neighborhood": "radius", "neighborhood_radius": 1.5}]
    # radius graph is only 0-1; same seed expands to 1
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0, 1}

    box2 = {
        "id": "selection 1",
        "type": "polygon",
        "vertices": [[1.5, -0.5], [2.5, -0.5], [2.5, 0.5], [1.5, 0.5]],
    }
    w.selections = [{**box2, "neighborhood": "knn", "neighborhood_k": 1}]
    # seed cell 2 (x=2); k=1 keeps nearer of 1 (d=1) and 3 (d=1) — both d=1, one neighbor
    knn1 = set(w.get_indices(x, y, selection_id="selection 1").tolist())
    assert 2 in knn1 and len(knn1) == 2
    w.selections = [{**box2, "neighborhood": "knn", "neighborhood_k": 2}]
    # seed cell 2 has knn neighbors 1 and 3
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {1, 2, 3}
    w.selections = [{**box2, "neighborhood": "radius", "neighborhood_radius": 1.5}]
    # radius graph has no edge at cell 2
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {2}
    w.selections = [{**box, "neighborhood": "off"}]
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0}


def test_n_obs_mismatch_set_neighbor_graphs():
    from spatial_rx import LandmarksWidget

    adata = _adata()
    w = LandmarksWidget.from_anndata(adata, color="cell_type", width=400, height=400)
    bad = csr_matrix((2, 2))
    with pytest.raises(ValueError, match="connectivities n"):
        w.set_neighbor_graphs(bad, bad)
