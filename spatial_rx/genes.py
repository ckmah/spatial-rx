"""Gene expression columns for LandmarksWidget (packed like category codes)."""

from __future__ import annotations

import base64
import math
from typing import Any


def encode_gene_bundle(
    frame: Any,
    n_points: int,
) -> tuple[list[dict[str, Any]], str]:
    """Return ``({name, vmin, vmax}, ...)`` and column-major float32 [0, 1] values.

    Each numeric column is max-normalized with the same 99th-percentile cap as
    continuous ``color``. Codes are Fortran-order so JS reads
    ``values[gene * n + row]``.
    """
    import numpy as np

    from .categories import as_polars

    df = as_polars(frame)
    if df.height != n_points:
        raise ValueError(
            f"expr rows {df.height} != n_points {n_points}"
        )

    meta: list[dict[str, Any]] = []
    cols: list[Any] = []
    for name, dtype in df.schema.items():
        if not getattr(dtype, "is_numeric", lambda: False)():
            continue
        vals = df[name].to_numpy().astype(np.float64, copy=False)
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
        cols.append(norm)
        meta.append({"name": str(name), "vmin": vmin, "vmax": vmax})

    if not cols:
        return meta, ""
    mat = np.column_stack(cols).astype(np.float32, copy=False)
    values_b64 = base64.b64encode(np.asfortranarray(mat).tobytes(order="F")).decode(
        "ascii"
    )
    return meta, values_b64
