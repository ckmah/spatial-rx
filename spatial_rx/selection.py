"""Selection geometry helpers shared by landmark widgets."""

from __future__ import annotations

import math
from typing import Any


def selection_display_vertices(selection: dict) -> list[tuple[float, float]]:
    """Closed ring of selection vertices in data coordinates."""
    kind = selection.get("type")
    if kind in ("polygon", "lasso"):
        verts = selection.get("vertices") or []
        if len(verts) < 3:
            return []
        return [(float(v[0]), float(v[1])) for v in verts]

    if kind == "rectangle":
        cx = float(selection["cx"])
        cy = float(selection["cy"])
        w = float(selection["width"])
        h = float(selection["height"])
        angle = float(selection.get("angle") or 0.0)
        corners = [
            (cx - w / 2, cy - h / 2),
            (cx + w / 2, cy - h / 2),
            (cx + w / 2, cy + h / 2),
            (cx - w / 2, cy + h / 2),
        ]
        if abs(angle) < 1e-12:
            return corners
        cos_a, sin_a = math.cos(angle), math.sin(angle)
        out = []
        for x, y in corners:
            dx, dy = x - cx, y - cy
            out.append((cx + dx * cos_a - dy * sin_a, cy + dx * sin_a + dy * cos_a))
        return out

    if kind == "ellipse":
        cx = float(selection["cx"])
        cy = float(selection["cy"])
        rx = float(selection["rx"])
        ry = float(selection["ry"])
        angle = float(selection.get("angle") or 0.0)
        cos_a, sin_a = math.cos(angle), math.sin(angle)
        n = 64
        out = []
        for i in range(n):
            t = 2 * math.pi * i / n
            x = rx * math.cos(t)
            y = ry * math.sin(t)
            out.append((cx + x * cos_a - y * sin_a, cy + x * sin_a + y * cos_a))
        return out

    return []


def selection_by_id(selections: list[dict], selection_id: str) -> dict | None:
    for sel in selections:
        if str(sel.get("id")) == str(selection_id):
            return sel
    return None


def selection_mask(
    selections: list[dict],
    x_arr: Any,
    y_arr: Any,
    selection_id: str | None = "all",
    *,
    x_scale: str = "linear",
    y_scale: str = "linear",
) -> Any:
    """Boolean mask for points inside ``selection_id`` (all-True for ``\"all\"``/None)."""
    import numpy as np
    from matplotlib.path import Path as MplPath

    x_arr = np.asarray(x_arr, dtype=float)
    y_arr = np.asarray(y_arr, dtype=float)
    if selection_id is None or selection_id == "all":
        return np.ones(len(x_arr), dtype=bool)

    sel = selection_by_id(selections, selection_id)
    if sel is None:
        return np.zeros(len(x_arr), dtype=bool)

    verts = selection_display_vertices(sel)
    if len(verts) < 3:
        return np.zeros(len(x_arr), dtype=bool)

    x_d = np.log10(x_arr) if x_scale == "log" else x_arr
    y_d = np.log10(y_arr) if y_scale == "log" else y_arr
    path = MplPath(verts)
    return path.contains_points(np.column_stack([x_d, y_d]))


def neighborhood_expand(
    seed_mask: Any,
    x_arr: Any,
    y_arr: Any,
    method: str | None,
    *,
    radius: float = 0.0,
    k: int = 12,
    index: Any | None = None,
) -> Any:
    """Boolean mask of neighbors of ``seed_mask`` (seeds themselves are False).

    Prefer a precomputed ``NeighborhoodIndex`` (``index=``) so expand matches the
    widget. Without ``index``, falls back to brute-force distances.
    """
    if index is not None:
        return index.expand(seed_mask, method, radius=radius, k=k)

    import numpy as np

    seed = np.asarray(seed_mask, dtype=bool)
    x = np.asarray(x_arr, dtype=float).ravel()
    y = np.asarray(y_arr, dtype=float).ravel()
    n = int(x.shape[0])
    out = np.zeros(n, dtype=bool)
    if seed.shape[0] != n:
        raise ValueError("seed_mask length must match x/y")
    idx = np.flatnonzero(seed)
    kind = str(method or "off")
    if idx.size == 0 or kind in ("", "off"):
        return out
    if kind == "radius":
        r2 = float(radius) ** 2
        if r2 <= 0:
            return out
        sx = x[idx]
        sy = y[idx]
        chunk = 4096
        for start in range(0, n, chunk):
            sl = slice(start, min(start + chunk, n))
            dx = x[sl][:, None] - sx[None, :]
            dy = y[sl][:, None] - sy[None, :]
            out[sl] = ((dx * dx) + (dy * dy)).min(axis=1) <= r2
        out &= ~seed
        return out
    if kind == "knn":
        take = int(k)
        if take <= 0:
            return out
        for i in idx:
            d2 = (x - x[i]) ** 2 + (y - y[i]) ** 2
            d2[i] = np.inf
            nn = min(take, n - 1)
            if nn <= 0:
                continue
            out[np.argpartition(d2, nn - 1)[:nn]] = True
        out &= ~seed
        return out
    return out


def neighborhood_params(item: dict | None) -> tuple[str, float, int]:
    """Return ``(method, radius, k)`` with defaults."""
    if not item:
        return "off", 0.0, 12
    method = str(item.get("neighborhood") or "off")
    radius = float(item.get("neighborhood_radius") or 0.0)
    k = int(item.get("neighborhood_k") or 12)
    return method, radius, k
