"""Gene expression columns for LandmarksWidget (packed like category codes)."""

from __future__ import annotations

import base64
import math
from typing import Any


def gene_names_from_adata(
    adata: Any, genes: str | list[str] | None
) -> list[str]:
    """Resolve constructor ``genes`` to an ordered catalog of var names.

    ``None`` → all ``var_names``. A string → that gene if present in ``var``.
    A sequence → intersection preserving var order.
    """
    var_names = [str(v) for v in adata.var_names]
    if genes is None:
        return var_names
    if isinstance(genes, str):
        return [genes] if genes in set(var_names) else []
    wanted = {str(g) for g in genes}
    return [g for g in var_names if g in wanted]


def gene_catalog(names: list[str]) -> list[dict[str, Any]]:
    """Cheap gene picker metadata (vmin/vmax filled when values are packed)."""
    return [{"name": str(n), "vmin": 0.0, "vmax": 1.0} for n in names]


def _values_look_logged(vals: "np.ndarray") -> bool:
    """Heuristic: fractional values with modest max are likely already log-scaled."""
    import numpy as np

    finite = np.asarray(vals, dtype=np.float64).ravel()
    finite = finite[np.isfinite(finite)]
    if finite.size == 0:
        return False
    mx = float(np.nanmax(finite))
    # Raw UMI / counts typically exceed this; log1p(expression) rarely does.
    if mx > 30.0:
        return False
    # Integer-only matrices are almost always counts (or already rounded).
    near_int = np.isclose(finite, np.round(finite), rtol=0.0, atol=1e-5)
    frac_frac = float(np.mean(~near_int))
    if mx <= 12.0 and frac_frac > 0.05:
        return True
    if mx <= 20.0 and frac_frac > 0.15:
        return True
    return False


def expression_is_log_scaled(
    adata: Any | None = None,
    *,
    sample: Any | None = None,
) -> bool:
    """Detect whether expression is already log-scaled.

    Prefer Scanpy markers in ``adata.uns``; otherwise fall back to a value
    heuristic on ``sample`` or a thin multi-gene probe of ``adata.X``.
    """
    import numpy as np

    if adata is not None:
        uns = getattr(adata, "uns", None)
        if uns is not None:
            for key in ("log1p", "log", "logged"):
                if key in uns:
                    return True
    if sample is not None:
        return _values_look_logged(np.asarray(sample, dtype=np.float64))
    if adata is None:
        return False
    X = getattr(adata, "X", None)
    if X is None or adata.n_obs == 0 or adata.n_vars == 0:
        return False
    n_probe = min(8, int(adata.n_vars))
    votes = 0
    checked = 0
    for i in range(n_probe):
        try:
            col = _column_vector(adata, str(adata.var_names[i]))
        except Exception:
            continue
        checked += 1
        if _values_look_logged(col):
            votes += 1
    if checked == 0:
        return False
    return votes * 2 > checked


def genes_look_log_scaled(adata: Any, names: list[str]) -> bool:
    """True when every listed gene column looks already log-scaled."""
    if adata is None or not names:
        return False
    probes: list[bool] = []
    for name in names[:8]:
        try:
            probes.append(_values_look_logged(_column_vector(adata, str(name))))
        except Exception:
            continue
    return bool(probes) and all(probes)


def _var_index(adata: Any, name: str) -> int:
    """Column index for ``name`` without building an AnnData view."""
    import numpy as np

    var_names = adata.var_names
    if hasattr(var_names, "get_loc"):
        loc = var_names.get_loc(name)
        if not isinstance(loc, (int, np.integer)):
            raise KeyError(name)
        return int(loc)
    return [str(v) for v in var_names].index(str(name))


def _column_vector(adata: Any, name: str) -> "np.ndarray":
    """One expression column as float64, densifying at most that column.

    Indexes ``adata.X`` directly so AnnData views (and their ``obs`` copies)
    are not created during construct-time probes or gene packing.
    """
    import numpy as np

    idx = _var_index(adata, name)
    X = adata.X
    if hasattr(X, "getcol"):
        col = X.getcol(idx)
        if hasattr(col, "toarray"):
            col = col.toarray()
        return np.asarray(col, dtype=np.float64).ravel()
    col = X[:, idx]
    if hasattr(col, "toarray"):
        col = col.toarray()
    return np.asarray(col, dtype=np.float64).ravel()


def _normalize_column(vals: "np.ndarray") -> tuple["np.ndarray", float, float]:
    import numpy as np

    finite = vals[np.isfinite(vals)]
    if finite.size == 0:
        vmin, vmax = 0.0, 1.0
    else:
        vmin = float(np.nanmin(finite))
        vmax = float(np.nanpercentile(finite, 99))
        if not math.isfinite(vmax) or vmax <= vmin:
            vmax = float(np.nanmax(finite))
        if not math.isfinite(vmax) or vmax <= vmin:
            vmax = vmin + 1.0
    norm = ((vals - vmin) / (vmax - vmin)).astype(np.float32)
    norm = np.clip(np.nan_to_num(norm, nan=0.0), 0.0, 1.0)
    return norm, vmin, vmax


def encode_genes_from_adata(
    adata: Any,
    names: list[str],
    n_points: int,
) -> tuple[list[dict[str, Any]], str]:
    """Pack selected genes column-major float32 [0, 1] (active-genes order)."""
    import numpy as np

    if not names:
        return [], ""
    meta: list[dict[str, Any]] = []
    cols: list[Any] = []
    for name in names:
        vals = _column_vector(adata, name)
        if vals.shape[0] != n_points:
            raise ValueError(f"expr rows {vals.shape[0]} != n_points {n_points}")
        norm, vmin, vmax = _normalize_column(vals)
        meta.append({"name": str(name), "vmin": vmin, "vmax": vmax})
        cols.append(norm)
    packed = np.column_stack(cols).ravel(order="F")
    return meta, base64.b64encode(packed.tobytes()).decode("ascii")


def encode_gene_bundle(
    frame: Any,
    n_points: int,
) -> tuple[list[dict[str, Any]], str]:
    """Pack a polars/pandas-like expression frame column-major float32 [0, 1]."""
    import numpy as np

    names = [str(c) for c in frame.columns]
    if not names:
        return [], ""
    meta: list[dict[str, Any]] = []
    cols: list[Any] = []
    for name in names:
        vals = np.asarray(frame[name].to_numpy(), dtype=np.float64).ravel()
        if vals.shape[0] != n_points:
            raise ValueError(f"expr rows {vals.shape[0]} != n_points {n_points}")
        norm, vmin, vmax = _normalize_column(vals)
        meta.append({"name": name, "vmin": vmin, "vmax": vmax})
        cols.append(norm)
    packed = np.column_stack(cols).ravel(order="F")
    return meta, base64.b64encode(packed.tobytes()).decode("ascii")
