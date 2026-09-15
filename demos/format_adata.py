import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Format ileum AnnData

    Rebuild `data/ileum.h5ad` from `data/ileum/*.csv` (or run
    `uv run --extra demo python demos/data/build_ileum_h5ad.py`). The file
    includes expression, obs, `obsm["spatial"]`, Okabe–Ito `cell_type` colors,
    plus `X_pca` / `X_umap`.

    Spatial neighbor graphs are **not** stored — `landmarks.py` / `gut_study.py`
    compute them after load. The `.h5ad` is committed when under 10 MB.
    """)
    return


@app.cell
def _():
    import importlib.util
    import marimo as mo
    import anndata as ad
    from pathlib import Path

    _script = Path(__file__).resolve().parent / "data" / "build_ileum_h5ad.py"
    _spec = importlib.util.spec_from_file_location("build_ileum_h5ad", _script)
    _mod = importlib.util.module_from_spec(_spec)
    assert _spec.loader is not None
    _spec.loader.exec_module(_mod)
    OUT = _mod.OUT
    build = _mod.build
    return OUT, ad, build, mo


@app.cell
def _(OUT, build):
    adata = build()
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
def _(OUT, ad):
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
