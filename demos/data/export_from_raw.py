#!/usr/bin/env python3
"""Regenerate demos/data TIFF + CSV from source imaging stores.

Requires: spatialdata, anndata, tifffile, pandas, numpy, matplotlib
"""

from __future__ import annotations

import argparse
from pathlib import Path

import anndata as ad
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import spatialdata as sd
import tifffile


def export_cells(zarr_path: Path, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    sdata = sd.read_zarr(zarr_path)

    image = (
        sdata["morphology_focus"].get("scale0").isel(c=[1, 2, 3]).image.to_numpy()
    )
    image = np.transpose(image, (1, 2, 0))
    hi = np.percentile(image, 99.5, axis=(0, 1), keepdims=True)
    hi = np.maximum(hi, 1)
    image_u8 = np.clip(image.astype(np.float32) / hi * 255, 0, 255).astype(np.uint8)
    tifffile.imwrite(out / "morphology_rgb.tif", image_u8, photometric="rgb")

    masks = sdata["nucleus_labels"].get("scale0").image.to_numpy()
    ids, inv = np.unique(masks, return_inverse=True)
    lut = np.zeros((len(ids), 3), dtype=np.uint8)
    fg = ids != 0
    hues = (np.arange(int(fg.sum())) * 0.618033988749895) % 1.0
    lut[fg] = (plt.cm.hsv(hues)[:, :3] * 255).astype(np.uint8)
    masks_rgb = lut[inv].reshape((*masks.shape, 3))
    tifffile.imwrite(out / "nucleus_labels_rgb.tif", masks_rgb, photometric="rgb")

    gene_totals = (
        sdata.tables["table"]
        .to_df()
        .sum()
        .sort_values(ascending=False)
        .rename("count")
        .rename_axis("gene")
        .reset_index()
    )
    gene_totals.attrs = {}
    gene_totals.to_csv(out / "gene_totals.csv", index=False)

    tx = sdata["transcripts"][["x", "y", "z", "feature_name", "cell_id"]].compute()
    tx = pd.DataFrame({c: tx[c].to_numpy() for c in tx.columns})
    tx.to_csv(out / "transcripts.csv", index=False)


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
        "--cells-zarr",
        type=Path,
        required=True,
        help="Path to cells.zarr (SpatialData)",
    )
    p.add_argument(
        "--ileum-h5ad",
        type=Path,
        required=True,
        help="Path to ileum panel .h5ad",
    )
    p.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parent,
        help="Output demos/data directory",
    )
    args = p.parse_args()
    export_cells(args.cells_zarr, args.out / "cells")
    export_ileum(args.ileum_h5ad, args.out / "ileum")
    print(f"Wrote cells + ileum under {args.out}")


if __name__ == "__main__":
    main()
