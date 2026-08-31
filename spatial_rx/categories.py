"""Categorical columns for LandmarksWidget (polars / Arrow-backed)."""

from __future__ import annotations

import base64
from typing import Any

_DEFAULT_PALETTE = [
    "#00e5ff",
    "#ff2d95",
    "#b8ff00",
    "#ffb000",
    "#7c4dff",
    "#00ffa3",
    "#38bdf8",
    "#f472b6",
    "#a3e635",
    "#fb923c",
]

_MAX_LEVELS = 64


def as_polars(frame: Any) -> Any:
    """Coerce pandas / polars / mapping to a polars DataFrame."""
    import polars as pl

    if isinstance(frame, pl.DataFrame):
        return frame
    if hasattr(frame, "__dataframe__") or type(frame).__module__.startswith("pandas"):
        return pl.from_pandas(frame)
    if isinstance(frame, dict):
        return pl.DataFrame(frame)
    raise TypeError(f"unsupported frame type: {type(frame)!r}")


def detect_category_columns(df: Any, *, skip: set[str] | None = None) -> list[str]:
    """Return Utf8 / Categorical / Enum / Boolean column names (low cardinality)."""
    import polars as pl

    skip = skip or set()
    out: list[str] = []
    for name, dtype in df.schema.items():
        if name in skip:
            continue
        ok = dtype in (pl.Utf8, pl.String, pl.Categorical, pl.Boolean) or isinstance(
            dtype, pl.Enum
        )
        if not ok:
            continue
        nuniq = int(df[name].n_unique())
        if 1 < nuniq <= _MAX_LEVELS:
            out.append(name)
    return out


def encode_category_bundle(
    df: Any,
    columns: list[str],
    *,
    color_maps: dict[str, dict[str, str]] | None = None,
) -> tuple[list[dict[str, Any]], str, dict[str, Any]]:
    """Return (meta, codes_b64, label_arrays).

    Codes are column-major Int32 (Arrow-backed polars → contiguous buffer),
    base64-encoded for the widget traitlet. ``meta`` items are
    ``{name, labels, palette}``.
    """
    import numpy as np
    import polars as pl

    color_maps = color_maps or {}
    meta: list[dict[str, Any]] = []
    code_arrays: list[Any] = []
    label_arrays: dict[str, Any] = {}

    for name in columns:
        series = df[name].cast(pl.Utf8)
        labels = [str(v) for v in series.unique(maintain_order=True).to_list()]
        cmap = color_maps.get(name) or {}
        if cmap:
            present = set(labels)
            ordered = [str(k) for k in cmap.keys() if str(k) in present]
            ordered.extend(lab for lab in labels if lab not in ordered)
            labels = ordered
            palette = [
                cmap.get(lab, _DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)])
                for i, lab in enumerate(labels)
            ]
        else:
            palette = [
                _DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)] for i in range(len(labels))
            ]
        codes = (
            series.replace_strict(
                old=labels,
                new=list(range(len(labels))),
                default=0,
                return_dtype=pl.Int32,
            )
            .to_numpy()
            .astype(np.int32, copy=False)
        )
        code_arrays.append(codes)
        label_arrays[name] = np.asarray(series.to_list(), dtype=str)
        meta.append({"name": name, "labels": labels, "palette": palette})

    if not code_arrays:
        return meta, "", label_arrays
    mat = np.column_stack(code_arrays).astype(np.int32, copy=False)
    # column-major for JS: codes[col * n + row]
    codes_b64 = base64.b64encode(np.asfortranarray(mat).tobytes(order="F")).decode(
        "ascii"
    )
    return meta, codes_b64, label_arrays


def encode_single_category(
    values: Any,
    *,
    name: str = "category",
    color_map: dict[str, str] | None = None,
) -> tuple[list[dict[str, Any]], str, dict[str, Any]]:
    """Bundle one categorical series (for ``from_points(color=...)``)."""
    import polars as pl

    df = pl.DataFrame({name: pl.Series(name, values).cast(pl.Utf8)})
    maps = {name: color_map} if color_map else None
    return encode_category_bundle(df, [name], color_maps=maps)
