#!/usr/bin/env python3
"""Regenerate demos/data/ileum CSVs from a source ileum panel .h5ad.

Requires: anndata, pandas, numpy
"""

from __future__ import annotations

import argparse
from pathlib import Path

import anndata as ad
import numpy as np
import pandas as pd


def export_ileum(h5ad_path: Path, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    adata = ad.read_h5ad(h5ad_path)
    gut_xy = (
        adata.obs[
            [
                "x [μm]",
                "y [μm]",
                "cell_type",
                "cell_class",
                "anatomical_layer",
                "mucosal_pseudospace",
            ]
        ]
        .copy()
        .reset_index(drop=True)
        .rename(columns={"x [μm]": "x", "y [μm]": "y"})
    )
    X = adata.X
    if hasattr(X, "toarray"):
        X = X.toarray()
    gut_expr = pd.DataFrame(np.asarray(X), columns=adata.var_names.astype(str))

    xmin, xmax = float(gut_xy["x"].min()), float(gut_xy["x"].max())
    ymin, ymax = float(gut_xy["y"].min()), float(gut_xy["y"].max())
    side = min(xmax - xmin, ymax - ymin)
    x0 = (xmin + xmax) / 2.0 - side / 2.0
    y0 = ymin
    x1, y1 = x0 + side, y0 + side
    crop = (
        (gut_xy["x"] >= x0)
        & (gut_xy["x"] <= x1)
        & (gut_xy["y"] >= y0)
        & (gut_xy["y"] <= y1)
    )
    gut_xy = gut_xy.loc[crop].reset_index(drop=True)
    gut_expr = gut_expr.loc[crop.to_numpy()].reset_index(drop=True)
    for c in ("cell_type", "cell_class", "anatomical_layer"):
        gut_xy[c] = gut_xy[c].astype(str)
    gut_xy.to_csv(out / "cells.csv", index=False)
    gut_expr.to_csv(out / "expr.csv", index=False)


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument(
        "--ileum-h5ad",
        type=Path,
        required=True,
        help="Path to source ileum panel .h5ad",
    )
    p.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parent / "ileum",
        help="Output directory for cells.csv / expr.csv",
    )
    args = p.parse_args()
    export_ileum(args.ileum_h5ad, args.out)
    print(f"Wrote ileum CSVs under {args.out}")


if __name__ == "__main__":
    main()
