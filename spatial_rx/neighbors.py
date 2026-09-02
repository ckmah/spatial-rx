"""Precomputed neighbor graph (CSR) for cell-set neighborhood expand."""

from __future__ import annotations

import base64
from dataclasses import dataclass
from typing import Any

import numpy as np

DEFAULT_K_MAX = 64


def _encode_i32(arr: np.ndarray) -> str:
    return base64.b64encode(np.asarray(arr, dtype=np.int32).tobytes()).decode("ascii")


def _encode_f32(arr: np.ndarray) -> str:
    return base64.b64encode(np.asarray(arr, dtype=np.float32).tobytes()).decode("ascii")


def _decode_i32(b64: str) -> np.ndarray:
    if not b64:
        return np.zeros(0, dtype=np.int32)
    return np.frombuffer(base64.b64decode(b64), dtype=np.int32).copy()


def _decode_f32(b64: str) -> np.ndarray:
    if not b64:
        return np.zeros(0, dtype=np.float32)
    return np.frombuffer(base64.b64decode(b64), dtype=np.float32).copy()


def default_radius_max(x: np.ndarray, y: np.ndarray) -> float:
    """Heuristic slider clamp: 5% of the data diagonal."""
    dx = float(np.max(x) - np.min(x)) if x.size else 0.0
    dy = float(np.max(y) - np.min(y)) if y.size else 0.0
    diag = float(np.hypot(dx, dy))
    if not np.isfinite(diag) or diag <= 0:
        return 1.0
    return 0.05 * diag


@dataclass(frozen=True)
class NeighborhoodIndex:
    """kNN CSR for knn expand; ``points`` for independent radius-ball expand."""

    indptr: np.ndarray
    indices: np.ndarray
    distances: np.ndarray
    k_max: int
    radius_max: float
    points: np.ndarray  # (n, 2) float64

    @property
    def n(self) -> int:
        return int(self.indptr.shape[0] - 1)

    @classmethod
    def build(
        cls,
        x: Any,
        y: Any,
        *,
        k_max: int = DEFAULT_K_MAX,
        radius_max: float | None = None,
    ) -> "NeighborhoodIndex":
        """Build an approximate kNN graph with pynndescent, stored as sorted CSR."""
        from pynndescent import NNDescent

        x_arr = np.asarray(x, dtype=np.float64).ravel()
        y_arr = np.asarray(y, dtype=np.float64).ravel()
        if x_arr.shape != y_arr.shape:
            raise ValueError("x and y must have the same shape")
        n = int(x_arr.shape[0])
        if n == 0:
            raise ValueError("x and y must be non-empty")

        k_max = max(1, int(k_max))
        r_max = float(radius_max) if radius_max is not None else default_radius_max(x_arr, y_arr)
        if not np.isfinite(r_max) or r_max < 0:
            r_max = 0.0
        points = np.column_stack([x_arr, y_arr])

        if n == 1:
            return cls(
                indptr=np.array([0, 0], dtype=np.int32),
                indices=np.zeros(0, dtype=np.int32),
                distances=np.zeros(0, dtype=np.float32),
                k_max=k_max,
                radius_max=r_max,
                points=points,
            )

        n_neighbors = min(k_max + 1, n)  # +1: self is usually returned
        xy = points.astype(np.float32, copy=False)
        index = NNDescent(xy, n_neighbors=n_neighbors, metric="euclidean")
        nn_idx, nn_dist = index.neighbor_graph

        indptr = np.zeros(n + 1, dtype=np.int32)
        idx_chunks: list[np.ndarray] = []
        dist_chunks: list[np.ndarray] = []
        nnz = 0
        for i in range(n):
            row_i = np.asarray(nn_idx[i], dtype=np.int32)
            row_d = np.asarray(nn_dist[i], dtype=np.float32)
            # CSR is knn-only; radius_max is a separate UI clamp for radius mode.
            keep = (row_i != i) & np.isfinite(row_d) & (row_d >= 0)
            row_i = row_i[keep]
            row_d = row_d[keep]
            if row_i.size:
                order = np.argsort(row_d, kind="mergesort")
                row_i = row_i[order][:k_max]
                row_d = row_d[order][:k_max]
            indptr[i] = nnz
            nnz += int(row_i.size)
            idx_chunks.append(row_i)
            dist_chunks.append(row_d)
        indptr[n] = nnz
        indices = (
            np.concatenate(idx_chunks).astype(np.int32, copy=False)
            if idx_chunks
            else np.zeros(0, dtype=np.int32)
        )
        distances = (
            np.concatenate(dist_chunks).astype(np.float32, copy=False)
            if dist_chunks
            else np.zeros(0, dtype=np.float32)
        )
        return cls(
            indptr=indptr,
            indices=indices,
            distances=distances,
            k_max=k_max,
            radius_max=r_max,
            points=points,
        )

    def expand(
        self,
        seed_mask: Any,
        method: str | None,
        *,
        radius: float = 0.0,
        k: int = 12,
    ) -> np.ndarray:
        """Boolean mask of neighbors of ``seed_mask`` (seeds themselves are False)."""
        seed = np.asarray(seed_mask, dtype=bool).ravel()
        if seed.shape[0] != self.n:
            raise ValueError("seed_mask length must match neighbor graph")
        out = np.zeros(self.n, dtype=bool)
        kind = str(method or "off")
        seeds = np.flatnonzero(seed)
        if seeds.size == 0 or kind in ("", "off"):
            return out
        if kind == "radius":
            r = float(radius)
            if r <= 0:
                return out
            # True Euclidean ball — independent of k_max / CSR horizon.
            from scipy.spatial import cKDTree

            tree = cKDTree(self.points)
            for hits in tree.query_ball_point(self.points[seeds], r):
                out[hits] = True
            out &= ~seed
            return out
        if kind == "knn":
            take = max(0, int(k))
            if take <= 0:
                return out
            for i in seeds:
                start = int(self.indptr[i])
                end = min(int(self.indptr[i + 1]), start + take)
                if end > start:
                    out[self.indices[start:end]] = True
            out &= ~seed
            return out
        return out

    def to_sync(self) -> dict[str, Any]:
        """Arrays/metadata for LandmarksWidget traitlets."""
        return {
            "neighbor_indptr": _encode_i32(self.indptr),
            "neighbor_indices": _encode_i32(self.indices),
            "neighbor_distances": _encode_f32(self.distances),
            "neighbor_radius_max": float(self.radius_max),
            "neighbor_k_max": int(self.k_max),
        }

    @classmethod
    def from_sync(
        cls,
        *,
        neighbor_indptr: str,
        neighbor_indices: str,
        neighbor_distances: str,
        neighbor_radius_max: float = 0.0,
        neighbor_k_max: int = DEFAULT_K_MAX,
        points: Any | None = None,
    ) -> "NeighborhoodIndex":
        indptr = _decode_i32(neighbor_indptr)
        indices = _decode_i32(neighbor_indices)
        distances = _decode_f32(neighbor_distances)
        if indptr.size == 0:
            indptr = np.array([0], dtype=np.int32)
        n = max(0, int(indptr.shape[0] - 1))
        if points is None:
            pts = np.zeros((n, 2), dtype=np.float64)
        else:
            pts = np.asarray(points, dtype=np.float64).reshape(n, 2)
        return cls(
            indptr=indptr,
            indices=indices,
            distances=distances,
            k_max=int(neighbor_k_max),
            radius_max=float(neighbor_radius_max),
            points=pts,
        )
