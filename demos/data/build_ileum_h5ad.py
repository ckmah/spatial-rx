#!/usr/bin/env python3
"""Build demos/data/ileum.h5ad from demos/data/ileum/*.csv.

Writes expression, obs metadata, obsm['spatial'], batlowS cell_type colors,
and exploratory X_pca / X_umap embeddings. Neighbor graphs are not stored —
demo notebooks recompute spatial neighbors (and may recompute PCA/UMAP).

Usage:
  uv run --extra demo python demos/data/build_ileum_h5ad.py
"""

from __future__ import annotations

from pathlib import Path

import anndata as ad
import numpy as np
import pandas as pd
import scanpy as sc
from spatial_rx.categories import DEFAULT_CATEGORICAL_PALETTE

CLUSTER = "cell_type"
ROOT = Path(__file__).resolve().parent
CSV_DIR = ROOT / "ileum"
OUT = ROOT / "ileum.h5ad"


def build() -> ad.AnnData:
    cells = pd.read_csv(CSV_DIR / "cells.csv")
    expr = pd.read_csv(CSV_DIR / "expr.csv")
    obs = cells.drop(columns=["x", "y"]).copy()
    obs.index = [f"c{i}" for i in range(len(obs))]
    adata = ad.AnnData(
        X=expr.to_numpy(dtype=np.float32),
        obs=obs,
        var=pd.DataFrame(index=expr.columns.astype(str)),
    )
    adata.obsm["spatial"] = cells[["x", "y"]].to_numpy(dtype=float)
    adata.obs[CLUSTER] = pd.Categorical(adata.obs[CLUSTER].astype(str))
    cats = list(adata.obs[CLUSTER].cat.categories)
    adata.uns[f"{CLUSTER}_colors"] = [
        DEFAULT_CATEGORICAL_PALETTE[i % len(DEFAULT_CATEGORICAL_PALETTE)]
        for i in range(len(cats))
    ]

    n_comps = min(10, adata.n_vars - 1, adata.n_obs - 1)
    sc.pp.pca(adata, n_comps=n_comps)
    sc.pp.neighbors(adata, n_pcs=n_comps, use_rep="X_pca", random_state=0)
    # 14-gene panel: spectral init is unstable; pin random for reproducibility.
    sc.tl.umap(adata, init_pos="random", random_state=0)
    for key in list(adata.obsp.keys()):
        del adata.obsp[key]
    if "neighbors" in adata.uns:
        del adata.uns["neighbors"]
    return adata


def main() -> None:
    adata = build()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    adata.write_h5ad(OUT, compression="gzip")
    mb = OUT.stat().st_size / 1e6
    print(
        f"Wrote {OUT} ({mb:.2f} MB) n_obs={adata.n_obs} n_vars={adata.n_vars} "
        f"obsm={list(adata.obsm.keys())}"
    )
    if mb >= 10:
        raise SystemExit(f"ileum.h5ad is {mb:.2f} MB; keep under 10 MB before commit")


if __name__ == "__main__":
    main()
