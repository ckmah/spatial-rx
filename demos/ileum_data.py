"""Shared ileum AnnData load path for demos (local file or GitHub via fsspec)."""

from __future__ import annotations

import shutil
import tempfile
from pathlib import Path

import anndata as ad
import fsspec

# Committed under demos/data/; remote URL matches GitHub raw once on main.
ILEUM_H5AD_NAME = "ileum.h5ad"
ILEUM_H5AD_URL = (
    "https://raw.githubusercontent.com/ckmah/spatial-rx/main/demos/data/ileum.h5ad"
)


def load_ileum_adata(notebook_dir: Path | str | None = None) -> ad.AnnData:
    """Load SPF ileum panel AnnData.

    Prefers ``{notebook_dir}/data/ileum.h5ad`` when present (local checkout).
    Otherwise fetches ``ILEUM_H5AD_URL`` through fsspec (molab / remote) into a
    temp file and reads it with anndata (h5py needs a seekable path).
    """
    if notebook_dir is not None:
        local = Path(notebook_dir) / "data" / ILEUM_H5AD_NAME
        if local.is_file():
            return ad.read_h5ad(local)
    return _read_h5ad_fsspec(ILEUM_H5AD_URL)


def _read_h5ad_fsspec(url: str) -> ad.AnnData:
    with fsspec.open(url, "rb") as src:
        with tempfile.NamedTemporaryFile(suffix=".h5ad") as tmp:
            shutil.copyfileobj(src, tmp)
            tmp.flush()
            return ad.read_h5ad(tmp.name)
