import numpy as np
import pandas as pd
import pytest

geopandas = pytest.importorskip("geopandas")
pytest.importorskip("shapely")


def _adata():
    import anndata as ad
    from scipy.sparse import csr_matrix

    obs = pd.DataFrame(
        {"cell_type": ["a", "a", "b", "b"], "cell_class": ["X", "X", "Y", "Y"]},
        index=["c0", "c1", "c2", "c3"],
    )
    adata = ad.AnnData(np.ones((4, 1)), obs=obs)
    adata.obsm["spatial"] = np.array(
        [[0.0, 0.0], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]
    )
    n = 4
    adata.obsp["spatial_knn_connectivities"] = csr_matrix((n, n))
    adata.obsp["spatial_radius_connectivities"] = csr_matrix((n, n))
    return adata


def test_distances_obs_key_and_obs_name():
    from spatial_rx.measure import distances, write_obs

    adata = _adata()
    line = {
        "id": "axis",
        "type": "line",
        "vertices": [[0.0, -1.0], [0.0, 2.0]],
        "buffer_width": 0,
    }
    df = distances(adata, [line], obs_key="cell_type")
    assert "obs_name" in df.columns
    assert set(df["obs_name"]) == {"c0", "c1", "c2", "c3"}
    assert set(df["group"]) == {"a", "b"}
    by_class = distances(adata, [line], obs_key="cell_class")
    assert set(by_class["group"]) == {"X", "Y"}
    write_obs(adata, df, "dist_axis", "distance")
    assert "dist_axis" in adata.obs.columns
    assert np.isfinite(adata.obs.loc["c0", "dist_axis"])


def test_composition_shape():
    from spatial_rx.measure import composition

    adata = _adata()
    shape = {
        "id": "box",
        "type": "shape",
        "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        "tension": 0.0,
    }
    df = composition(adata, [shape], obs_key="cell_type", obs_names=["c0", "c1"])
    assert not df.empty
    assert int(df["n_total"].iloc[0]) >= 1
    assert "obs_name" not in df.columns


def test_along_positions_writes_s():
    from spatial_rx.measure import along_positions, write_obs

    adata = _adata()
    spline = {
        "id": "path",
        "type": "line",
        "vertices": [[-1.0, 0.0], [2.0, 0.0]],
        "buffer_width": 2.0,
        "buffer_side": "both",
    }
    df = along_positions(adata, [spline], obs_key="cell_type")
    assert "s" in df.columns
    assert "obs_name" in df.columns
    write_obs(adata, df, "path_s", "s")
    assert np.isfinite(adata.obs.loc["c0", "path_s"])
