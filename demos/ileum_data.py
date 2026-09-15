"""Shared demo-data helpers (local file or GitHub via fsspec)."""

from __future__ import annotations

import shutil
import tempfile
from pathlib import Path

import anndata as ad
import fsspec

DEMO_DIR = Path(__file__).resolve().parent
DEMO_DATA_DIR = DEMO_DIR / "data"
ILEUM_H5AD_NAME = "ileum.h5ad"
GITHUB_DATA_BASE = (
    "https://raw.githubusercontent.com/ckmah/spatial-rx/main/demos/data"
)


def read_demo_bytes(rel: str) -> bytes:
    """Read a file under ``demos/data/``, preferring the local checkout."""
    local = DEMO_DATA_DIR / rel
    if local.is_file():
        return local.read_bytes()
    with fsspec.open(f"{GITHUB_DATA_BASE}/{rel}", "rb") as f:
        return f.read()


def demo_asset_src(rel: str) -> str:
    """Path or raw GitHub URL for ``mo.image`` / similar."""
    local = DEMO_DATA_DIR / rel
    if local.is_file():
        return str(local)
    return f"{GITHUB_DATA_BASE}/{rel}"


def load_ileum_adata() -> ad.AnnData:
    """Load SPF ileum panel AnnData (local ``ileum.h5ad``, else GitHub raw)."""
    local = DEMO_DATA_DIR / ILEUM_H5AD_NAME
    if local.is_file():
        return ad.read_h5ad(local)
    return _read_h5ad_fsspec(f"{GITHUB_DATA_BASE}/{ILEUM_H5AD_NAME}")


def _read_h5ad_fsspec(url: str) -> ad.AnnData:
    with fsspec.open(url, "rb") as src:
        with tempfile.NamedTemporaryFile(suffix=".h5ad") as tmp:
            shutil.copyfileobj(src, tmp)
            tmp.flush()
            return ad.read_h5ad(tmp.name)
