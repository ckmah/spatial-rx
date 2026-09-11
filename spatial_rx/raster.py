"""Spatial bin assignment and feature aggregation for raster similarity."""

from __future__ import annotations

import base64
from dataclasses import dataclass
from typing import Any

import numpy as np

# Default bin edge ≈ this multiple of median nearest-neighbor distance.
DEFAULT_BIN_SIZE_NN_MULT = 8.0


def _encode_i32(arr: np.ndarray) -> str:
    return base64.b64encode(np.asarray(arr, dtype=np.int32).tobytes()).decode("ascii")


def _encode_f32(arr: np.ndarray) -> str:
    return base64.b64encode(np.asarray(arr, dtype=np.float32).tobytes()).decode("ascii")


def decode_f32(b64: str) -> np.ndarray:
    if not b64:
        return np.zeros(0, dtype=np.float32)
    return np.frombuffer(base64.b64decode(b64), dtype=np.float32).copy()


def decode_i32(b64: str) -> np.ndarray:
    if not b64:
        return np.zeros(0, dtype=np.int32)
    return np.frombuffer(base64.b64decode(b64), dtype=np.int32).copy()


@dataclass(frozen=True)
class BinGrid:
    """Axis-aligned square bin grid over world xy."""

    origin_x: float
    origin_y: float
    bin_size: float
    n_cols: int
    n_rows: int

    @property
    def n_flat(self) -> int:
        return int(self.n_cols) * int(self.n_rows)

    def bounds(self) -> tuple[float, float, float, float]:
        """World AABB of the full grid (including empty cells): xmin,xmax,ymin,ymax."""
        return (
            float(self.origin_x),
            float(self.origin_x + self.n_cols * self.bin_size),
            float(self.origin_y),
            float(self.origin_y + self.n_rows * self.bin_size),
        )


@dataclass(frozen=True)
class BinAssignment:
    """Per-obs flat bin ids plus compact non-empty indexing."""

    grid: BinGrid
    # Length n_obs; -1 if outside grid (should not happen when built from same xy).
    flat_ids: np.ndarray
    # Compact index per obs (-1 if empty/outside); length n_obs.
    compact_ids: np.ndarray
    # Flat id for each compact bin; length n_bins.
    compact_to_flat: np.ndarray
    rows: np.ndarray
    cols: np.ndarray
    counts: np.ndarray


def default_bin_size(median_nn: float | None, point_size: float | None = None) -> float:
    """Pick an initial square bin edge from spatial scale."""
    if median_nn is not None and median_nn > 0 and np.isfinite(median_nn):
        return float(median_nn * DEFAULT_BIN_SIZE_NN_MULT)
    if point_size is not None and point_size > 0 and np.isfinite(point_size):
        return float(point_size * 20.0)
    return 1.0


def build_grid(
    xy: np.ndarray,
    bin_size: float,
    *,
    pad: float = 0.0,
) -> BinGrid:
    """Build a square grid covering ``xy`` with optional pad in world units."""
    xy = np.asarray(xy, dtype=np.float64)
    if xy.ndim != 2 or xy.shape[1] < 2:
        raise ValueError("xy must be (n, 2)")
    size = float(bin_size)
    if not np.isfinite(size) or size <= 0:
        raise ValueError("bin_size must be a positive finite number")
    xmin = float(np.min(xy[:, 0]) - pad)
    xmax = float(np.max(xy[:, 0]) + pad)
    ymin = float(np.min(xy[:, 1]) - pad)
    ymax = float(np.max(xy[:, 1]) + pad)
    # Snap origin so cells align; include max edge.
    n_cols = max(1, int(np.ceil((xmax - xmin) / size)))
    n_rows = max(1, int(np.ceil((ymax - ymin) / size)))
    # If max lands exactly on a boundary, ceil can under-count by 0 — ensure coverage.
    if xmin + n_cols * size <= xmax:
        n_cols += 1
    if ymin + n_rows * size <= ymax:
        n_rows += 1
    return BinGrid(
        origin_x=xmin,
        origin_y=ymin,
        bin_size=size,
        n_cols=int(n_cols),
        n_rows=int(n_rows),
    )


def assign_bins(xy: np.ndarray, grid: BinGrid) -> BinAssignment:
    """Digitize points into compact non-empty bins (empty cells omitted)."""
    xy = np.asarray(xy, dtype=np.float64)
    n = int(xy.shape[0])
    size = float(grid.bin_size)
    cols = np.floor((xy[:, 0] - grid.origin_x) / size).astype(np.int32)
    rows = np.floor((xy[:, 1] - grid.origin_y) / size).astype(np.int32)
    inside = (
        (cols >= 0)
        & (cols < grid.n_cols)
        & (rows >= 0)
        & (rows < grid.n_rows)
    )
    flat = np.full(n, -1, dtype=np.int32)
    flat[inside] = cols[inside] + grid.n_cols * rows[inside]

    # Compact non-empty: stable order by flat id.
    valid = flat >= 0
    if not np.any(valid):
        empty_i32 = np.zeros(0, dtype=np.int32)
        return BinAssignment(
            grid=grid,
            flat_ids=flat,
            compact_ids=np.full(n, -1, dtype=np.int32),
            compact_to_flat=empty_i32,
            rows=empty_i32,
            cols=empty_i32,
            counts=empty_i32,
        )

    unique_flat, inverse, counts = np.unique(
        flat[valid], return_inverse=True, return_counts=True
    )
    compact_ids = np.full(n, -1, dtype=np.int32)
    compact_ids[valid] = inverse.astype(np.int32)
    unique_flat = unique_flat.astype(np.int32)
    bin_cols = unique_flat % grid.n_cols
    bin_rows = unique_flat // grid.n_cols
    return BinAssignment(
        grid=grid,
        flat_ids=flat,
        compact_ids=compact_ids,
        compact_to_flat=unique_flat,
        rows=bin_rows.astype(np.int32),
        cols=bin_cols.astype(np.int32),
        counts=counts.astype(np.int32),
    )


def aggregate_mean(
    features: np.ndarray,
    compact_ids: np.ndarray,
    n_bins: int,
) -> np.ndarray:
    """Mean-aggregate cell feature rows into bins. Shape ``(n_bins, d)`` float32."""
    feats = np.asarray(features, dtype=np.float64)
    if feats.ndim == 1:
        feats = feats.reshape(-1, 1)
    if feats.ndim != 2:
        raise ValueError("features must be (n_obs, d)")
    n_obs, d = feats.shape
    ids = np.asarray(compact_ids, dtype=np.int32)
    if ids.shape[0] != n_obs:
        raise ValueError("compact_ids length must match features rows")
    out = np.zeros((n_bins, d), dtype=np.float64)
    valid = ids >= 0
    if n_bins == 0 or not np.any(valid):
        return out.astype(np.float32)
    flat_ids = ids[valid]
    counts = np.bincount(flat_ids, minlength=n_bins)[:n_bins].astype(np.float64)
    for j in range(d):
        col = np.nan_to_num(feats[valid, j], nan=0.0, posinf=0.0, neginf=0.0)
        out[:, j] = np.bincount(flat_ids, weights=col, minlength=n_bins)[:n_bins]
    nonzero = counts > 0
    out[nonzero] /= counts[nonzero, None]
    return out.astype(np.float32)


def composition_hist(
    codes: np.ndarray,
    compact_ids: np.ndarray,
    n_cats: int,
    n_bins: int,
) -> np.ndarray:
    """Per-bin category fraction histogram. Shape ``(n_bins, n_cats)`` float32."""
    codes = np.asarray(codes, dtype=np.int32).ravel()
    ids = np.asarray(compact_ids, dtype=np.int32).ravel()
    if codes.shape[0] != ids.shape[0]:
        raise ValueError("codes and compact_ids length mismatch")
    n_cats = int(n_cats)
    out = np.zeros((n_bins, max(n_cats, 0)), dtype=np.float64)
    if n_bins == 0 or n_cats <= 0:
        return out.astype(np.float32)
    valid = (ids >= 0) & (codes >= 0) & (codes < n_cats)
    if not np.any(valid):
        return out.astype(np.float32)
    # Linear index: bin * n_cats + code
    lin = ids[valid].astype(np.int64) * n_cats + codes[valid].astype(np.int64)
    counts = np.bincount(lin, minlength=n_bins * n_cats)
    out = counts.reshape(n_bins, n_cats).astype(np.float64)
    row_sums = out.sum(axis=1, keepdims=True)
    nonzero = row_sums[:, 0] > 0
    out[nonzero] /= row_sums[nonzero]
    return out.astype(np.float32)


def l2_normalize_rows(mat: np.ndarray) -> np.ndarray:
    """Row-wise L2 normalize; zero rows stay zero. Returns float32."""
    m = np.asarray(mat, dtype=np.float32)
    if m.ndim != 2:
        raise ValueError("mat must be 2-D")
    norms = np.linalg.norm(m, axis=1, keepdims=True)
    norms = np.maximum(norms, 1e-12)
    out = m / norms
    zero = np.linalg.norm(m, axis=1) < 1e-12
    out[zero] = 0.0
    return out.astype(np.float32)


def pack_bin_arrays(
    rows: np.ndarray,
    cols: np.ndarray,
    counts: np.ndarray,
) -> dict[str, str]:
    """Base64 int32 packs for compact non-empty bins."""
    return {
        "raster_bin_rows": _encode_i32(rows),
        "raster_bin_cols": _encode_i32(cols),
        "raster_bin_counts": _encode_i32(counts),
    }


def pack_features(mat: np.ndarray) -> str:
    """Row-major float32 ``(n_bins, d)`` → base64."""
    m = np.ascontiguousarray(np.asarray(mat, dtype=np.float32))
    return _encode_f32(m.ravel(order="C"))


def build_raster_payload(
    xy: np.ndarray,
    bin_size: float,
    features: np.ndarray | None,
    *,
    feature_labels: list[str] | None = None,
    normalize: bool = True,
) -> dict[str, Any]:
    """Assign bins and optionally aggregate + pack a feature matrix."""
    grid = build_grid(xy, bin_size)
    assignment = assign_bins(xy, grid)
    n_bins = int(assignment.counts.shape[0])
    payload: dict[str, Any] = {
        "raster_origin_x": float(grid.origin_x),
        "raster_origin_y": float(grid.origin_y),
        "raster_bin_size": float(grid.bin_size),
        "raster_n_cols": int(grid.n_cols),
        "raster_n_rows": int(grid.n_rows),
        "raster_n_bins": n_bins,
        **pack_bin_arrays(assignment.rows, assignment.cols, assignment.counts),
        "assignment": assignment,
    }
    if features is None:
        payload["raster_features"] = ""
        payload["raster_feature_dim"] = 0
        payload["raster_feature_labels"] = []
        payload["B"] = np.zeros((n_bins, 0), dtype=np.float32)
        return payload

    B = aggregate_mean(features, assignment.compact_ids, n_bins)
    if normalize and B.shape[1] > 0:
        B = l2_normalize_rows(B)
    labels = list(feature_labels or [])
    if len(labels) < B.shape[1]:
        labels = labels + [f"f{i}" for i in range(len(labels), B.shape[1])]
    elif len(labels) > B.shape[1]:
        labels = labels[: B.shape[1]]
    payload["B"] = B
    payload["raster_features"] = pack_features(B)
    payload["raster_feature_dim"] = int(B.shape[1])
    payload["raster_feature_labels"] = labels
    return payload
