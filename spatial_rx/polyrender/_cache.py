"""Deterministic cache keys for mesh exports."""

from __future__ import annotations

import hashlib
import re
import shutil
from pathlib import Path

# Bump when tile format / mesh pipeline changes invalidate old caches.
_CACHE_VERSION = b"polyrender_cache_v6\n"

# SHA256 hex directory names under the cache root.
_SHA256_DIR = re.compile(r"^[0-9a-f]{64}$")

# Keep the newest N complete exports; older shards are removed. Protected digests
# (current meshify + active tile server, if under this root) are never deleted.
_DEFAULT_MAX_CACHE_SHARDS = 64


def gdf_cache_key(gdf, smooth: bool) -> str:
    """Stable SHA256 hex digest from cell_id, ZIndex, geometry WKB, and smooth flag."""
    import shapely as _shp
    h = hashlib.sha256()
    h.update(_CACHE_VERSION)
    h.update(b"smooth=" + str(bool(smooth)).encode() + b"\n")
    df = gdf.sort_values(["cell_id", "ZIndex"], kind="mergesort")
    h.update(repr(df["cell_id"].tolist()).encode())
    h.update(repr(df["ZIndex"].tolist()).encode())
    geoms = df.geometry.values
    empty_mask = _shp.is_empty(geoms)
    wkbs = _shp.to_wkb(geoms)
    h.update(b"".join(b"empty\n" if bool(e) else w for e, w in zip(empty_mask, wkbs)))
    return h.hexdigest()


def _protected_digests(root: Path) -> set[str]:
    """Digests under ``root`` that must not be pruned (active HTTP tile server)."""
    out: set[str] = set()
    try:
        from spatial_rx.polyrender._tile_server import get_active_tile_server

        srv = get_active_tile_server()
        if srv is None:
            return out
        sdir = srv.serve_dir.resolve()
        root_r = root.resolve()
        if sdir.parent == root_r and _SHA256_DIR.match(sdir.name):
            out.add(sdir.name)
    except Exception:
        pass
    return out


def prune_stale_cache_shards(
    root: Path | str,
    *,
    keep_digest: str,
    max_entries: int = _DEFAULT_MAX_CACHE_SHARDS,
) -> int:
    """Delete incomplete or excess LRU cache directories under ``root``.

    Only subdirectories whose names are 64-character hex digests are considered.
    A *complete* shard contains ``tiles.json``. Shards without it (failed runs) are
    always removed unless ``keep_digest`` names that directory.

    Among complete shards, the ``keep_digest`` directory, all :func:`_protected_digests`,
    and the most recently used shards (by ``tiles.json`` mtime) up to ``max_entries``
    are kept; the rest are removed.

    Returns:
        Number of directories removed.
    """
    root = Path(root).expanduser().resolve()
    if not root.is_dir():
        return 0

    protected = _protected_digests(root) | {keep_digest}

    removed = 0
    complete: list[tuple[Path, float, str]] = []
    for child in root.iterdir():
        if not child.is_dir() or not _SHA256_DIR.match(child.name):
            continue
        tiles_json = child / "tiles.json"
        if tiles_json.is_file():
            complete.append((child, tiles_json.stat().st_mtime, child.name))
        elif child.name not in protected:
            shutil.rmtree(child, ignore_errors=True)
            removed += 1

    must_keep = {name for _, _, name in complete if name in protected}
    others = [(p, mt, n) for p, mt, n in complete if n not in must_keep]
    others.sort(key=lambda x: -x[1])
    budget = max(0, max_entries - len(must_keep))
    keep_others = {n for _, _, n in others[:budget]}
    survivors = must_keep | keep_others

    for path, _, name in complete:
        if name not in survivors:
            shutil.rmtree(path, ignore_errors=True)
            removed += 1

    return removed
