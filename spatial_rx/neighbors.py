"""Precomputed neighbor graphs (CSR) ingested from AnnData ``obsp``."""

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


def empty_graph(n: int) -> "NeighborhoodIndex":
    """CSR with no edges for ``n`` points."""
    n = max(0, int(n))
    return NeighborhoodIndex(
        indptr=np.zeros(n + 1, dtype=np.int32),
        indices=np.zeros(0, dtype=np.int32),
        distances=np.zeros(0, dtype=np.float32),
        k_max=0,
        radius_max=0.0,
        points=np.zeros((n, 2), dtype=np.float64),
    )


@dataclass(frozen=True)
class NeighborhoodIndex:
    """CSR neighbor graph for expand lookup (k-NN or radius, already computed)."""

    indptr: np.ndarray
    indices: np.ndarray
    distances: np.ndarray
    k_max: int
    radius_max: float
    points: np.ndarray  # (n, 2) float64; unused for expand

    @property
    def n(self) -> int:
        return max(0, int(self.indptr.shape[0] - 1))

    @classmethod
    def from_sparse(
        cls,
        connectivities: Any,
        distances: Any | None = None,
        *,
        n: int | None = None,
    ) -> "NeighborhoodIndex":
        """Build from a scipy sparse matrix (squidpy ``obsp`` connectivities)."""
        from scipy.sparse import csr_matrix, issparse

        if not issparse(connectivities):
            conn = csr_matrix(connectivities)
        else:
            conn = connectivities.tocsr()
        conn = conn.astype(np.float32, copy=False)
        conn.setdiag(0)
        conn.eliminate_zeros()
        if n is not None and int(conn.shape[0]) != int(n):
            raise ValueError(
                f"connectivities n={conn.shape[0]} != expected n={n}"
            )
        indptr = np.asarray(conn.indptr, dtype=np.int32)
        indices = np.asarray(conn.indices, dtype=np.int32)
        dist_data = np.asarray(conn.data, dtype=np.float32)
        if distances is not None:
            if not issparse(distances):
                dist = csr_matrix(distances)
            else:
                dist = distances.tocsr()
            dist = dist.astype(np.float32, copy=False)
            dist.setdiag(0)
            dist.eliminate_zeros()
            if (
                dist.nnz == conn.nnz
                and np.array_equal(np.asarray(dist.indptr, dtype=np.int32), indptr)
                and np.array_equal(np.asarray(dist.indices, dtype=np.int32), indices)
            ):
                dist_data = np.asarray(dist.data, dtype=np.float32)
        n_pts = int(conn.shape[0])
        row_nnz = np.diff(indptr)
        k_max = int(row_nnz.max()) if row_nnz.size else 0
        return cls(
            indptr=indptr,
            indices=indices,
            distances=dist_data,
            k_max=k_max,
            radius_max=0.0,
            points=np.zeros((n_pts, 2), dtype=np.float64),
        )

    def expand(
        self,
        seed_mask: Any,
        method: str | None = None,
        *,
        radius: float = 0.0,
        k: int = 12,
    ) -> np.ndarray:
        """Boolean mask of neighbors of ``seed_mask`` (seeds themselves are False).

        Uses every stored CSR neighbor. ``radius`` / ``k`` are ignored — the graph
        was computed before the widget.
        """
        del radius, k
        seed = np.asarray(seed_mask, dtype=bool).ravel()
        if seed.shape[0] != self.n:
            raise ValueError("seed_mask length must match neighbor graph")
        out = np.zeros(self.n, dtype=bool)
        kind = str(method or "off")
        if kind in ("", "off"):
            return out
        seeds = np.flatnonzero(seed)
        if seeds.size == 0:
            return out
        for i in seeds:
            start = int(self.indptr[i])
            end = int(self.indptr[i + 1])
            if end > start:
                out[self.indices[start:end]] = True
        out &= ~seed
        return out

    def to_sync(self, *, prefix: str = "neighbor") -> dict[str, Any]:
        """Arrays for LandmarksWidget traitlets (``neighbor_*`` or ``radius_*``)."""
        out: dict[str, Any] = {
            f"{prefix}_indptr": _encode_i32(self.indptr),
            f"{prefix}_indices": _encode_i32(self.indices),
            f"{prefix}_distances": _encode_f32(self.distances),
        }
        if prefix == "neighbor":
            out["neighbor_radius_max"] = float(self.radius_max)
            out["neighbor_k_max"] = int(self.k_max)
        return out

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
        **_ignored: Any,
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
