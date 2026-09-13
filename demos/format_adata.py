import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell(hide_code=True)
def intro(mo):
    mo.md(r"""
    # Format ileum AnnData

    Build `data/ileum.h5ad` from `data/ileum/*.csv`: expression, obs metadata,
    `obsm["spatial"]`, and Okabe–Ito `cell_type` colors.

    Neighbor graphs are **not** stored here — `landmarks.py` / `gut_study.py`
    compute them after load. Run this notebook once before those demos. The `.h5ad`
    is gitignored.
    """)
    return


@app.cell
def imports():
    import marimo as mo
    import anndata as ad
    import numpy as np
    import pandas as pd
    from spatial_rx.categories import DEFAULT_CATEGORICAL_PALETTE

    return DEFAULT_CATEGORICAL_PALETTE, ad, mo, np, pd


@app.cell
def build_and_save(DEFAULT_CATEGORICAL_PALETTE, ad, mo, np, pd):
    CLUSTER = "cell_type"
    _data = mo.notebook_dir() / "data"
    OUT = _data / "ileum.h5ad"

    _cells = pd.read_csv(_data / "ileum" / "cells.csv")
    _expr = pd.read_csv(_data / "ileum" / "expr.csv")
    _obs = _cells.drop(columns=["x", "y"]).copy()
    _obs.index = [f"c{i}" for i in range(len(_obs))]

    adata = ad.AnnData(
        X=_expr.to_numpy(dtype=np.float32),
        obs=_obs,
        var=pd.DataFrame(index=_expr.columns.astype(str)),
    )
    adata.obsm["spatial"] = _cells[["x", "y"]].to_numpy(dtype=float)
    adata.obs[CLUSTER] = pd.Categorical(adata.obs[CLUSTER].astype(str))

    _cats = list(adata.obs[CLUSTER].cat.categories)
    adata.uns[f"{CLUSTER}_colors"] = [
        DEFAULT_CATEGORICAL_PALETTE[_i % len(DEFAULT_CATEGORICAL_PALETTE)]
        for _i in range(len(_cats))
    ]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    adata.write_h5ad(OUT, compression="gzip")
    {
        "path": str(OUT),
        "mb": round(OUT.stat().st_size / 1e6, 2),
        "n_obs": int(adata.n_obs),
        "n_vars": int(adata.n_vars),
        "obsm": list(adata.obsm.keys()),
        "obsp": list(adata.obsp.keys()),
    }
    return (OUT,)


@app.cell
def verify(OUT, ad):
    _loaded = ad.read_h5ad(OUT)
    {
        "path": str(OUT),
        "n_obs": int(_loaded.n_obs),
        "n_vars": int(_loaded.n_vars),
        "obs_cols": list(_loaded.obs.columns),
        "var_names": list(map(str, _loaded.var_names)),
        "obsm": list(_loaded.obsm.keys()),
        "obsp": list(_loaded.obsp.keys()),
        "uns_colors": len(_loaded.uns.get("cell_type_colors", [])),
    }
    return


if __name__ == "__main__":
    app.run()
