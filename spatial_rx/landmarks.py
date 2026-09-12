"""LandmarksWidget: draw selections and landmarks on a deck.gl point scatter."""

from __future__ import annotations

import base64
import math
from typing import TYPE_CHECKING, Any

import traitlets
from anndata import AnnData
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm
from .categories import (
    as_polars,
    detect_category_columns,
    encode_category_bundle,
    DEFAULT_CATEGORICAL_PALETTE,
)
from .genes import (
    _column_vector,
    encode_gene_bundle,
    encode_genes_from_adata,
    expression_is_log_scaled,
    gene_catalog,
    gene_names_from_adata,
    genes_look_log_scaled,
)
from .neighbors import DEFAULT_K_MAX, NeighborhoodIndex
from .raster import (
    DEFAULT_WINDOW_RADIUS,
    aggregate_mean_window,
    assign_bins,
    build_grid,
    composition_hist_window,
    default_bin_size,
    default_window_radius,
    pack_bin_arrays,
    pack_features,
)
from .selection import (
    neighborhood_expand,
    neighborhood_params,
    next_numbered_id,
    selection_mask,
)

if TYPE_CHECKING:
    import numpy as np

_DEFAULT_PALETTE = DEFAULT_CATEGORICAL_PALETTE
_FALLBACK_POINT = "#00e5ff"
_SEQUENTIAL_LOW = "#f3e6d4"
_SEQUENTIAL_HIGH = "#ff0099"


def _sequential_palette(
    n: int = 256,
    low: str = _SEQUENTIAL_LOW,
    high: str = _SEQUENTIAL_HIGH,
) -> list[str]:
    """Sample a two-stop sequential colormap to hex colors (low → high)."""
    import matplotlib.colors as mcolors

    cmap = mcolors.LinearSegmentedColormap.from_list("seq", [low, high], N=max(n, 2))
    if n <= 1:
        return [mcolors.to_hex(cmap(0.5))]
    return [mcolors.to_hex(cmap(i / (n - 1))) for i in range(n)]


def _encode_f32(arr: "np.ndarray") -> str:
    import numpy as np

    return base64.b64encode(np.asarray(arr, dtype=np.float32).tobytes()).decode("ascii")


def _encode_colors(
    color: Any,
    color_map: dict[str, str] | None,
    n: int,
    *,
    continuous_range: tuple[str, str] | None = None,
) -> tuple[list[str], "np.ndarray", list[str], float | None, float | None]:
    """Return (palette_hex, valueA, legend_labels, vmin, vmax).

    Categorical: valueA is category index. When ``color_map`` is given, legend
    order follows ``color_map`` key order (then any unmapped labels).
    Continuous: valueA in [0, 1] with a sequential palette (default cream→magenta).
    """
    import numpy as np

    if color is None:
        return [_FALLBACK_POINT], np.zeros(n, dtype=np.float32), [], None, None

    if isinstance(color, str):
        return [color], np.zeros(n, dtype=np.float32), [], None, None

    color_arr = np.asarray(color)
    if color_arr.shape[0] != n:
        raise ValueError(f"color length {color_arr.shape[0]} != n_points {n}")

    if color_arr.dtype.kind in "UOS":
        seen = [str(c) for c in dict.fromkeys(color_arr.tolist())]
        if color_map:
            present = set(seen)
            cats = [str(c) for c in color_map.keys() if str(c) in present]
            cats.extend(c for c in seen if c not in cats)
            palette = [
                color_map.get(c, _DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)])
                for i, c in enumerate(cats)
            ]
        else:
            cats = seen
            palette = [_DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)] for i in range(len(cats))]
        cat_to_i = {c: float(i) for i, c in enumerate(cats)}
        idx = np.asarray(
            [cat_to_i[str(c)] for c in color_arr.tolist()], dtype=np.float32
        )
        return palette, idx, cats, None, None

    low, high = continuous_range or (_SEQUENTIAL_LOW, _SEQUENTIAL_HIGH)
    seq = _sequential_palette(256, low=low, high=high)
    vals = color_arr.astype(np.float64)
    finite = vals[np.isfinite(vals)]
    if finite.size == 0:
        return seq, np.zeros(n, dtype=np.float32), [], 0.0, 1.0
    vmin = float(np.nanmin(finite))
    vmax = float(np.nanpercentile(finite, 99))
    if not math.isfinite(vmax) or vmax <= vmin:
        vmax = float(np.nanmax(finite))
    if not math.isfinite(vmax) or vmax <= vmin:
        vmax = vmin + 1.0
    norm = ((vals - vmin) / (vmax - vmin)).astype(np.float32)
    norm = np.clip(np.nan_to_num(norm, nan=0.0), 0.0, 1.0)
    return seq, norm, [], vmin, vmax


def _obsp_key(key_added: str, kind: str) -> str:
    return f"{key_added}_{kind}"


def _color_maps_from_uns(adata: Any) -> dict[str, dict[str, str]]:
    """scanpy ``uns['<key>_colors']`` lists aligned to ``obs[key].cat.categories``."""
    maps: dict[str, dict[str, str]] = {}
    uns = getattr(adata, "uns", None) or {}
    obs = getattr(adata, "obs", None)
    if obs is None:
        return maps
    for col in obs.columns:
        colors = uns.get(f"{col}_colors")
        if colors is None:
            continue
        series = obs[col]
        cats = getattr(getattr(series, "cat", None), "categories", None)
        if cats is None:
            continue
        maps[str(col)] = {
            str(cat): str(colors[i])
            for i, cat in enumerate(cats)
            if i < len(colors)
        }
    return maps


def _expr_from_adata(adata: Any, genes: str | list[str] | None) -> Any:
    """Build a dense expression DataFrame (explicit ``set_expression`` path only)."""
    import numpy as np
    import pandas as pd

    wanted = gene_names_from_adata(adata, genes)
    if not wanted:
        return None
    X = adata[:, wanted].X
    if hasattr(X, "toarray"):
        X = X.toarray()
    return pd.DataFrame(np.asarray(X), columns=wanted)


def _index_for_method(widget: "LandmarksWidget", method: str) -> NeighborhoodIndex | None:
    if method == "knn":
        return getattr(widget, "_knn_index", None)
    if method == "radius":
        return getattr(widget, "_radius_index", None)
    return None


_NN_RADIUS_FRAC = 0.4


def _median_nn_distance(knn: NeighborhoodIndex | None) -> float | None:
    """Median first-neighbor distance from a distance-sorted k-NN CSR."""
    if knn is None or knn.n == 0 or int(knn.indptr[-1]) == 0:
        return None
    import numpy as np

    first: list[float] = []
    for i in range(int(knn.n)):
        start = int(knn.indptr[i])
        end = int(knn.indptr[i + 1])
        if end <= start:
            continue
        dist = float(knn.distances[start])
        if math.isfinite(dist) and dist > 0.0:
            first.append(dist)
    if not first:
        return None
    return float(np.median(np.asarray(first, dtype=np.float64)))


_SPATIAL_OBSM_SKIP = frozenset(
    {
        "spatial",
        "X_spatial",
        "spatial_compartments",
        "spatial_connectivities",
    }
)
_EMBEDDING_KEY_PREF = (
    "X_pca",
    "X_pca_harmony",
    "X_scVI",
    "X_scvi",
    "X_svd",
    "X_umap",
    "X_tsne",
)


def _discover_embedding_keys(adata: AnnData, *, spatial_key: str = "spatial") -> list[str]:
    """List 2d+ ``obsm`` keys suitable as raster embedding bases."""
    import numpy as np

    skip = set(_SPATIAL_OBSM_SKIP) | {spatial_key}
    keys: list[str] = []
    obsm = getattr(adata, "obsm", None)
    if obsm is None:
        return keys
    for key in obsm.keys():
        name = str(key)
        if name in skip:
            continue
        try:
            mat = np.asarray(obsm[key])
        except Exception:  # noqa: BLE001
            continue
        if mat.ndim == 1:
            mat = mat.reshape(-1, 1)
        if mat.ndim != 2 or mat.shape[0] != adata.n_obs or mat.shape[1] < 1:
            continue
        keys.append(name)
    # Prefer PCA/scVI-like keys first, then the rest alphabetically.
    rank = {k: i for i, k in enumerate(_EMBEDDING_KEY_PREF)}
    keys.sort(key=lambda k: (rank.get(k, len(rank)), k.lower()))
    return keys


def _pick_default_embedding_key(keys: list[str]) -> str:
    if not keys:
        return ""
    for pref in _EMBEDDING_KEY_PREF:
        if pref in keys:
            return pref
    return keys[0]


def _spatial_metrics(
    x_arr: "np.ndarray",
    y_arr: "np.ndarray",
    knn: NeighborhoodIndex | None = None,
):
    """Padded bounds, marker radius, and default landmark buffer from xy extent.

    Marker radius is ``0.4 * median`` nearest-neighbor distance so disks do not
    cover neighbors at fit zoom. Empty graphs fall back to ``0.01 * diagonal``.
    """
    xmin, xmax = float(x_arr.min()), float(x_arr.max())
    ymin, ymax = float(y_arr.min()), float(y_arr.max())
    if xmax <= xmin:
        xmax = xmin + 1.0
    if ymax <= ymin:
        ymax = ymin + 1.0
    diag = math.hypot(xmax - xmin, ymax - ymin)
    pad_x = 0.02 * (xmax - xmin)
    pad_y = 0.02 * (ymax - ymin)
    nn = _median_nn_distance(knn)
    point_size = _NN_RADIUS_FRAC * nn if nn is not None else 0.01 * diag
    return (
        xmin - pad_x,
        xmax + pad_x,
        ymin - pad_y,
        ymax + pad_y,
        float(point_size),
        0.0,
    )


class LandmarksWidget(AnyWidget):
    """Draw selections and landmarks on AnnData spatial coordinates.

    ``LandmarksWidget(adata, color=..., genes=...)`` is the only constructor.
    Put coordinates in ``obsm["spatial"]`` and k-max / radius-max graphs in
    ``obsp`` (``spatial_knn_*`` / ``spatial_radius_*``) before constructing.
    The widget keeps a reference to ``adata`` (no ``obs.copy()``, no full-``X``
    densify). ``genes=None`` (default) loads every ``var_name`` into the picker;
    pass a gene name or list to restrict. Expression values encode when
    ``active_genes`` is set. Chrome follows the notebook cell width;
    height starts at 550px and is resizable. Marker radius comes from median
    nearest-neighbor distance.

    Notebook API (synced): ``landmarks``, ``selections``, ``selected_kind``,
    ``selected_index``, ``active_category``, ``active_genes``. Persist hits with
    ``get_obs_names`` / ``assign_obs_mask``, not positional indices.
    """

    _esm = widget_esm("landmarks")
    _css = widget_css()

    # --- Public notebook API ---
    selections = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    landmarks = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    selected_kind = traitlets.Unicode("").tag(sync=True)
    selected_index = traitlets.Int(-1).tag(sync=True)
    active_category = traitlets.Unicode("").tag(sync=True)
    active_genes = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)

    # --- Internal plumbing (synced, not notebook API) ---
    mode = traitlets.Unicode("pointer").tag(sync=True)
    x_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    y_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    points_data = traitlets.Unicode("").tag(sync=True)  # base64 float32 Nx4
    point_palette = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    color_by = traitlets.Unicode("categorical").tag(sync=True)  # categorical | continuous
    legend_labels = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    legend_title = traitlets.Unicode("").tag(sync=True)
    color_vmin = traitlets.Float(0.0).tag(sync=True)
    color_vmax = traitlets.Float(1.0).tag(sync=True)
    point_size = traitlets.Float(2.0).tag(sync=True)
    default_buffer_width = traitlets.Float(0.0).tag(sync=True)
    type_neighborhoods = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    category_columns = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    category_codes = traitlets.Unicode("").tag(sync=True)  # base64 int32, col-major
    gene_columns = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    gene_values = traitlets.Unicode("").tag(sync=True)  # base64 float32, col-major [0, 1]
    # independent: each gene uses its own vmax; shared: all use max vmax among selected.
    gene_scale_mode = traitlets.Enum(
        ["independent", "shared"], default_value="independent"
    ).tag(sync=True)
    gene_log1p = traitlets.Bool(False).tag(sync=True)
    # True when input expression is already log-scaled (disables log1p toggle).
    gene_expression_logged = traitlets.Bool(False).tag(sync=True)

    # Precomputed k-NN graph (from adata.obsp) for client-side expand lookup.
    neighbor_indptr = traitlets.Unicode("").tag(sync=True)  # base64 int32
    neighbor_indices = traitlets.Unicode("").tag(sync=True)  # base64 int32
    neighbor_distances = traitlets.Unicode("").tag(sync=True)  # base64 float32
    neighbor_radius_max = traitlets.Float(0.0).tag(sync=True)
    neighbor_k_max = traitlets.Int(DEFAULT_K_MAX).tag(sync=True)
    # Precomputed radius graph (from adata.obsp).
    radius_indptr = traitlets.Unicode("").tag(sync=True)
    radius_indices = traitlets.Unicode("").tag(sync=True)
    radius_distances = traitlets.Unicode("").tag(sync=True)

    # Chrome bumps this to request promote_neighborhood_to_selection().
    promote_tick = traitlets.Int(0).tag(sync=True)

    # --- Raster bins + similarity query ---
    render_mode = traitlets.Unicode("points").tag(sync=True)  # points | raster
    raster_bin_size = traitlets.Float(0.0).tag(sync=True)
    # Aggregation window radius in world units (µm when spatial is µm).
    raster_window_radius = traitlets.Float(0.0).tag(sync=True)
    raster_basis = traitlets.Unicode("genes").tag(sync=True)  # genes | embedding | composition
    raster_embedding_key = traitlets.Unicode("").tag(sync=True)
    # Keys discovered from adata.obsm (excludes spatial); UI picks from this list.
    raster_embedding_keys = traitlets.List(traitlets.Unicode(), default_value=[]).tag(
        sync=True
    )
    # Empty = all dims. Client masks for cosine / RGB (empty = all).
    raster_embedding_dims = traitlets.List(traitlets.Int(), default_value=[]).tag(sync=True)
    # Reserved for pathway / score columns (slice A); unused in MVP.
    raster_obs_key = traitlets.Unicode("").tag(sync=True)
    raster_gene_mode = traitlets.Unicode("active").tag(sync=True)
    raster_origin_x = traitlets.Float(0.0).tag(sync=True)
    raster_origin_y = traitlets.Float(0.0).tag(sync=True)
    raster_n_cols = traitlets.Int(0).tag(sync=True)
    raster_n_rows = traitlets.Int(0).tag(sync=True)
    raster_n_bins = traitlets.Int(0).tag(sync=True)
    raster_bin_rows = traitlets.Unicode("").tag(sync=True)  # base64 int32
    raster_bin_cols = traitlets.Unicode("").tag(sync=True)
    raster_bin_counts = traitlets.Unicode("").tag(sync=True)
    raster_features = traitlets.Unicode("").tag(sync=True)  # base64 float32 row-major
    raster_feature_dim = traitlets.Int(0).tag(sync=True)
    raster_feature_labels = traitlets.List(traitlets.Unicode(), default_value=[]).tag(
        sync=True
    )
    raster_query_bin = traitlets.Int(-1).tag(sync=True)  # -1 = none (pin)
    raster_similarity_enabled = traitlets.Bool(True).tag(sync=True)
    raster_threshold = traitlets.Float(0.0).tag(sync=True)
    raster_status = traitlets.Unicode("").tag(sync=True)

    def __init__(
        self,
        adata: AnnData,
        *,
        spatial_key: str = "spatial",
        knn_key: str = "spatial_knn",
        radius_key: str = "spatial_radius",
        color: str | None = None,
        genes: str | list[str] | None = None,
    ) -> None:
        """Build from AnnData. Requires k-NN and radius graphs already in ``obsp``.

        Run ``squidpy.gr.spatial_neighbors`` twice first (k_max and r_max
        supersets; widget sliders subset)::

            sq.gr.spatial_neighbors(adata, coord_type="generic", n_neighs=64, key_added="spatial_knn")
            sq.gr.spatial_neighbors(adata, coord_type="generic", radius=r_max, key_added="spatial_radius")
            w = LandmarksWidget(adata, color="celltype_mapped_refined")  # all genes
            w = LandmarksWidget(adata, color="celltype_mapped_refined", genes=["GeneA"])
        """
        import numpy as np

        if not isinstance(adata, AnnData):
            raise TypeError("LandmarksWidget(adata) requires an AnnData")

        knn_conn = _obsp_key(knn_key, "connectivities")
        radius_conn = _obsp_key(radius_key, "connectivities")
        obsp = getattr(adata, "obsp", None)
        if obsp is None or knn_conn not in obsp or radius_conn not in obsp:
            raise ValueError(
                "LandmarksWidget requires "
                f"adata.obsp[{knn_conn!r}] and adata.obsp[{radius_conn!r}]; "
                "run squidpy.gr.spatial_neighbors for k-NN and radius first"
            )
        if spatial_key not in adata.obsm:
            raise ValueError(f"adata.obsm[{spatial_key!r}] is required")
        xy = np.asarray(adata.obsm[spatial_key], dtype=np.float64, copy=False)
        if xy.ndim != 2 or xy.shape[1] < 2:
            raise ValueError(f"adata.obsm[{spatial_key!r}] must be (n, 2)")
        if xy.shape[0] != adata.n_obs:
            raise ValueError("spatial coords length must match adata.n_obs")
        n = int(xy.shape[0])
        if n == 0:
            raise ValueError("adata must contain at least one observation")

        x_arr = np.asarray(xy[:, 0], dtype=np.float64, copy=False)
        y_arr = np.asarray(xy[:, 1], dtype=np.float64, copy=False)
        knn_dist = _obsp_key(knn_key, "distances")
        radius_dist = _obsp_key(radius_key, "distances")
        pts = np.column_stack([x_arr, y_arr])
        knn_idx = NeighborhoodIndex.from_sparse(
            obsp[knn_conn],
            obsp[knn_dist] if knn_dist in obsp else None,
            n=n,
            points=pts,
        )
        radius_idx = NeighborhoodIndex.from_sparse(
            obsp[radius_conn],
            obsp[radius_dist] if radius_dist in obsp else None,
            n=n,
            points=pts,
        )
        xmin, xmax, ymin, ymax, point_size, buffer_width = _spatial_metrics(
            x_arr, y_arr, knn=knn_idx
        )
        nx = (2.0 * (x_arr - xmin) / (xmax - xmin) - 1.0).astype(np.float32)
        ny = (2.0 * (y_arr - ymin) / (ymax - ymin) - 1.0).astype(np.float32)

        maps = _color_maps_from_uns(adata)
        # Reference obs — do not obs.copy() / attach synthetic x,y columns.
        df = as_polars(adata.obs)
        cat_names = detect_category_columns(df)
        cat_meta, cat_codes, cat_labels = encode_category_bundle(
            df, cat_names, color_maps=maps
        )

        gene_color = None
        var_names = {str(v) for v in adata.var_names}
        color_arg: Any = None
        cmap_arg: dict[str, str] | None = None
        legend = ""
        active = color or (cat_names[0] if cat_names else "")
        obs_cols = set(map(str, adata.obs.columns))
        if color and color not in obs_cols and color in var_names:
            active = ""
            X = adata[:, [color]].X
            if hasattr(X, "toarray"):
                X = X.toarray()
            gene_color = np.asarray(X, dtype=np.float64).ravel()
            color_arg = gene_color
            legend = str(color)
        elif active and active in cat_labels:
            color_arg = cat_labels[active]
            cmap_arg = maps.get(active)
            legend = active
        elif color and color in df.columns:
            color_arg = df[color].to_numpy()
            legend = color

        palette, value_a, labels, vmin, vmax = _encode_colors(
            color_arg, cmap_arg, n
        )
        color_mode = (
            "categorical"
            if color_arg is None
            or (
                gene_color is None
                and (
                    isinstance(color_arg, str)
                    or np.asarray(color_arg).dtype.kind in "UOS"
                )
            )
            else "continuous"
        )
        if gene_color is not None:
            color_mode = "continuous"
        points = np.column_stack([nx, ny, value_a, np.zeros(n, dtype=np.float32)])

        self._adata = adata
        self._expr_frame = None
        self._x_scale = "linear"
        self._y_scale = "linear"
        self._data_x = x_arr
        self._data_y = y_arr
        self._knn_index = knn_idx
        self._radius_index = radius_idx
        self._obs_names = adata.obs_names
        self._data_label_arrays = cat_labels
        self._median_nn = _median_nn_distance(knn_idx)
        self._raster_assignment = None
        self._raster_rebuild_depth = 0
        active_cat = ""
        if cat_meta and gene_color is None:
            active_cat = active if active in cat_labels else cat_meta[0]["name"]
            active_meta = next(
                (c for c in cat_meta if c["name"] == active_cat), cat_meta[0]
            )
            palette = list(active_meta["palette"])
            labels = list(active_meta["labels"])
            legend = active_cat
            color_mode = "categorical"
        self._data_labels = cat_labels.get(active_cat)

        gene_names = gene_names_from_adata(adata, genes)
        gene_meta = gene_catalog(gene_names)
        gene_logged = bool(expression_is_log_scaled(adata)) if gene_names else False
        init_bin_size = default_bin_size(self._median_nn, point_size)
        embedding_keys = _discover_embedding_keys(adata, spatial_key=spatial_key)
        embedding_key = _pick_default_embedding_key(embedding_keys)

        AnyWidget.__init__(
            self,
            mode="pointer",
            x_bounds=(xmin, xmax),
            y_bounds=(ymin, ymax),
            points_data=_encode_f32(points),
            point_palette=list(palette),
            color_by=color_mode,
            legend_labels=list(labels),
            legend_title=legend,
            color_vmin=float(vmin if vmin is not None else 0.0),
            color_vmax=float(vmax if vmax is not None else 1.0),
            point_size=float(point_size),
            default_buffer_width=float(buffer_width),
            category_columns=cat_meta,
            category_codes=cat_codes,
            active_category=active_cat,
            gene_columns=gene_meta,
            gene_values="",
            active_genes=[],
            gene_log1p=False,
            gene_expression_logged=gene_logged,
            render_mode="points",
            raster_bin_size=float(init_bin_size),
            raster_window_radius=float(DEFAULT_WINDOW_RADIUS),
            raster_basis="genes",
            raster_embedding_key=embedding_key,
            raster_embedding_keys=embedding_keys,
            raster_embedding_dims=[],
            raster_status="",
            **knn_idx.to_sync(prefix="neighbor"),
            **radius_idx.to_sync(prefix="radius"),
            neighbor_radius_max=float(radius_idx.radius_max),
        )
        if gene_color is not None:
            self.set_color(gene_color, legend_title=str(color))

    def set_neighbor_graphs(
        self,
        knn: Any,
        radius: Any,
        *,
        knn_distances: Any | None = None,
        radius_distances: Any | None = None,
    ) -> None:
        """Ingest k-NN and radius sparse connectivities (squidpy ``obsp``).

        Graphs should be k_max / r_max supersets. Widget sliders subset them.
        """
        import numpy as np

        n = int(getattr(self, "_data_x").shape[0])
        pts = np.column_stack(
            [np.asarray(self._data_x, dtype=np.float64), np.asarray(self._data_y, dtype=np.float64)]
        )
        knn_idx = NeighborhoodIndex.from_sparse(knn, knn_distances, n=n, points=pts)
        radius_idx = NeighborhoodIndex.from_sparse(
            radius, radius_distances, n=n, points=pts
        )
        self._knn_index = knn_idx
        self._radius_index = radius_idx
        for key, val in knn_idx.to_sync(prefix="neighbor").items():
            setattr(self, key, val)
        for key, val in radius_idx.to_sync(prefix="radius").items():
            setattr(self, key, val)
        self.neighbor_k_max = int(knn_idx.k_max)
        self.neighbor_radius_max = float(radius_idx.radius_max)

    def set_points(
        self,
        x: Any,
        y: Any,
        *,
        color: Any = None,
        color_map: dict[str, str] | None = None,
        legend_title: str | None = None,
        continuous_range: tuple[str, str] | None = None,
    ) -> None:
        """Replace scatter points/colors."""
        import numpy as np

        x_arr = np.asarray(x, dtype=np.float64).ravel()
        y_arr = np.asarray(y, dtype=np.float64).ravel()
        if x_arr.shape != y_arr.shape:
            raise ValueError("x and y must have the same shape")
        n = int(x_arr.shape[0])
        xmin, xmax = self.x_bounds
        ymin, ymax = self.y_bounds
        nx = (2.0 * (x_arr - xmin) / (xmax - xmin) - 1.0).astype(np.float32)
        ny = (2.0 * (y_arr - ymin) / (ymax - ymin) - 1.0).astype(np.float32)
        palette, value_a, labels, vmin, vmax = _encode_colors(
            color, color_map, n, continuous_range=continuous_range
        )
        color_mode = (
            "categorical"
            if color is None
            or isinstance(color, str)
            or np.asarray(color).dtype.kind in "UOS"
            else "continuous"
        )
        points = np.column_stack([nx, ny, value_a, np.zeros(n, dtype=np.float32)])
        self._data_x = x_arr
        self._data_y = y_arr
        self._data_labels = (
            np.asarray(color).astype(str).ravel()
            if color is not None
            and not isinstance(color, str)
            and np.asarray(color).dtype.kind in "UOS"
            else None
        )
        self.point_palette = list(palette)
        self.color_by = color_mode
        self.active_genes = []
        self.legend_labels = list(labels)
        if legend_title is not None:
            self.legend_title = legend_title
        self.color_vmin = float(vmin if vmin is not None else 0.0)
        self.color_vmax = float(vmax if vmax is not None else 1.0)
        self.points_data = _encode_f32(points)

    def set_expression(self, expr: Any) -> None:
        """Register a gene-expression table for the Layers Genes section.

        Catalog metadata syncs immediately; binary ``gene_values`` pack only
        for ``active_genes`` (lazy encode).
        """
        x = getattr(self, "_data_x", None)
        if x is None:
            raise RuntimeError("internal point cache missing")
        from .categories import as_polars

        frame = as_polars(expr)
        self._expr_frame = frame
        meta, _ = encode_gene_bundle(frame, int(x.shape[0]))
        # Store catalog with real vmin/vmax from the frame; values stay lazy.
        self.gene_columns = [
            {"name": m["name"], "vmin": m["vmin"], "vmax": m["vmax"]} for m in meta
        ]
        names = {g["name"] for g in meta}
        self.active_genes = [g for g in (self.active_genes or []) if g in names]
        # Prefer adata.uns marker; else probe first numeric column of the frame.
        logged = expression_is_log_scaled(getattr(self, "_adata", None))
        if not logged and meta:
            import numpy as np

            col0 = frame[meta[0]["name"]].to_numpy()
            logged = expression_is_log_scaled(sample=np.asarray(col0, dtype=np.float64))
        self.gene_expression_logged = bool(logged)
        if logged:
            self.gene_log1p = False
        self._pack_active_gene_values()

    def _pack_active_gene_values(self) -> None:
        """Encode ``gene_values`` for ``active_genes`` only (active-genes order)."""
        names = [str(g) for g in (self.active_genes or [])]
        n = int(getattr(self, "_data_x").shape[0])
        if not names:
            self.gene_values = ""
            return
        frame = getattr(self, "_expr_frame", None)
        if frame is not None:
            subset = frame.select(names)
            meta, values = encode_gene_bundle(subset, n)
        else:
            adata = getattr(self, "_adata", None)
            if adata is None:
                self.gene_values = ""
                return
            meta, values = encode_genes_from_adata(adata, names, n)
        by_name = {m["name"]: m for m in meta}
        cols = list(self.gene_columns or [])
        for i, row in enumerate(cols):
            upd = by_name.get(str(row.get("name")))
            if upd:
                cols[i] = {
                    "name": upd["name"],
                    "vmin": upd["vmin"],
                    "vmax": upd["vmax"],
                }
        self.gene_columns = cols
        self.gene_values = values
        # Re-probe active genes only when every sampled column looks logged.
        if names and not self.gene_expression_logged:
            if genes_look_log_scaled(getattr(self, "_adata", None), names):
                self.gene_expression_logged = True
                self.gene_log1p = False

    @traitlets.observe("active_genes")
    def _on_active_genes(self, change: dict) -> None:
        if change.get("new") == change.get("old"):
            return
        self._pack_active_gene_values()
        if self.render_mode == "raster" and self.raster_basis == "genes":
            self._rebuild_raster()

    def set_render_mode(self, mode: str) -> None:
        """Switch canvas between point scatter and spatial raster bins."""
        m = str(mode or "points").lower()
        if m not in ("points", "raster"):
            raise ValueError("render_mode must be 'points' or 'raster'")
        self.render_mode = m

    def set_raster_basis(
        self,
        *,
        genes: str | None = None,
        embedding: str | None = None,
        composition: str | None = None,
    ) -> None:
        """Select bin aggregation basis (genes / embedding / composition).

        Pathway / ``obs`` score columns are deferred (plan slice A); use
        ``raster_obs_key`` later via the same mean-into-bin path.
        """
        chosen = sum(x is not None for x in (genes, embedding, composition))
        if chosen != 1:
            raise ValueError("pass exactly one of genes=, embedding=, composition=")
        if genes is not None:
            self.raster_basis = "genes"
            self.raster_gene_mode = str(genes or "active")
        elif embedding is not None:
            self.raster_basis = "embedding"
            key = str(embedding)
            known = list(self.raster_embedding_keys or [])
            if key and known and key not in known:
                raise ValueError(
                    f"unknown embedding key {key!r}; choose from {known}"
                )
            self.raster_embedding_key = key or str(self.raster_embedding_key or "")
        else:
            self.raster_basis = "composition"
            if composition:
                self.active_category = str(composition)
        if self.render_mode == "raster":
            self._rebuild_raster()

    def clear_raster_query(self) -> None:
        """Clear the pinned similarity query bin."""
        self.raster_query_bin = -1

    def _clear_raster_sync(self, *, status: str = "") -> None:
        self.raster_origin_x = 0.0
        self.raster_origin_y = 0.0
        self.raster_n_cols = 0
        self.raster_n_rows = 0
        self.raster_n_bins = 0
        self.raster_bin_rows = ""
        self.raster_bin_cols = ""
        self.raster_bin_counts = ""
        self.raster_features = ""
        self.raster_feature_dim = 0
        self.raster_feature_labels = []
        self.raster_query_bin = -1
        self.raster_status = status
        self._raster_assignment = None

    def _gene_feature_matrix(self) -> tuple["np.ndarray", list[str]]:
        """Raw active-gene columns (not display-normalized) for bin means."""
        import numpy as np

        names = [str(g) for g in (self.active_genes or [])]
        n = int(self._data_x.shape[0])
        if not names:
            return np.zeros((n, 0), dtype=np.float64), []
        frame = getattr(self, "_expr_frame", None)
        cols: list[Any] = []
        used: list[str] = []
        if frame is not None:
            available = set(map(str, frame.columns))
            for name in names:
                if name not in available:
                    continue
                vals = np.asarray(frame[name].to_numpy(), dtype=np.float64).ravel()
                if vals.shape[0] != n:
                    raise ValueError(f"expr rows {vals.shape[0]} != n_points {n}")
                cols.append(vals)
                used.append(name)
        else:
            adata = getattr(self, "_adata", None)
            if adata is None:
                return np.zeros((n, 0), dtype=np.float64), []
            for name in names:
                try:
                    cols.append(_column_vector(adata, name))
                    used.append(name)
                except Exception:
                    continue
        if not cols:
            return np.zeros((n, 0), dtype=np.float64), []
        return np.column_stack(cols), used

    def _embedding_feature_matrix(self) -> tuple["np.ndarray", list[str]]:
        import numpy as np

        adata = getattr(self, "_adata", None)
        key = str(self.raster_embedding_key or "")
        n = int(self._data_x.shape[0])
        if adata is None or not key or key not in getattr(adata, "obsm", {}):
            return np.zeros((n, 0), dtype=np.float64), []
        mat = np.asarray(adata.obsm[key], dtype=np.float64)
        if mat.ndim == 1:
            mat = mat.reshape(-1, 1)
        if mat.shape[0] != n:
            raise ValueError(f"obsm[{key!r}] rows {mat.shape[0]} != n_obs {n}")
        # Pack all dims; the engine masks with ``raster_embedding_dims`` for
        # rest-state RGB and cosine (empty = all).
        labels = [f"{key}_{i}" for i in range(mat.shape[1])]
        return mat, labels

    def _composition_codes(self) -> tuple["np.ndarray", list[str]]:
        import numpy as np

        col = str(self.active_category or "")
        n = int(self._data_x.shape[0])
        meta = next(
            (c for c in (self.category_columns or []) if c.get("name") == col),
            None,
        )
        labels_arr = getattr(self, "_data_label_arrays", {}).get(col)
        if meta is None or labels_arr is None:
            return np.full(n, -1, dtype=np.int32), []
        label_list = [str(x) for x in (meta.get("labels") or [])]
        to_i = {lab: i for i, lab in enumerate(label_list)}
        codes = np.array(
            [to_i.get(str(v), -1) for v in np.asarray(labels_arr).tolist()],
            dtype=np.int32,
        )
        return codes, label_list

    def _rebuild_raster(self) -> None:
        """Assign bins and rebuild feature matrix ``B`` for the current basis."""
        import numpy as np

        if self._raster_rebuild_depth:
            return
        self._raster_rebuild_depth += 1
        try:
            if self.render_mode != "raster":
                self._clear_raster_sync(status="")
                return
            self.raster_status = "computing"
            self.raster_query_bin = -1
            xy = np.column_stack(
                [
                    np.asarray(self._data_x, dtype=np.float64),
                    np.asarray(self._data_y, dtype=np.float64),
                ]
            )
            size = float(self.raster_bin_size)
            if not np.isfinite(size) or size <= 0:
                size = default_bin_size(self._median_nn, float(self.point_size))
                self.raster_bin_size = float(size)
            grid = build_grid(xy, size)
            assignment = assign_bins(xy, grid)
            n_bins = int(assignment.counts.shape[0])
            # Soft neighborhood mean around each bin center (fixed µm default).
            window_radius = default_window_radius(size)
            if (
                float(self.raster_window_radius) > 0
                and np.isfinite(float(self.raster_window_radius))
            ):
                window_radius = float(self.raster_window_radius)
            self.raster_window_radius = float(window_radius)
            basis = str(self.raster_basis or "genes")
            labels: list[str] = []
            B = np.zeros((n_bins, 0), dtype=np.float32)
            try:
                if basis == "genes":
                    feats, labels = self._gene_feature_matrix()
                    if feats.shape[1]:
                        B = aggregate_mean_window(
                            xy, feats, assignment, window_radius=window_radius
                        )
                elif basis == "embedding":
                    feats, labels = self._embedding_feature_matrix()
                    if feats.shape[1]:
                        B = aggregate_mean_window(
                            xy, feats, assignment, window_radius=window_radius
                        )
                elif basis == "composition":
                    codes, labels = self._composition_codes()
                    if labels:
                        B = composition_hist_window(
                            xy,
                            codes,
                            assignment,
                            len(labels),
                            window_radius=window_radius,
                        )
                else:
                    self._clear_raster_sync(status=f"error:unknown basis {basis}")
                    return
            except Exception as exc:  # noqa: BLE001 — surface to chrome status
                self._clear_raster_sync(status=f"error:{exc}")
                return

            # Keep raw bin means for rest-state observation coloring; the engine
            # L2-normalizes rows when scoring cosine similarity.
            if B.shape[1] > 0:
                B = np.asarray(B, dtype=np.float32)

            packs = pack_bin_arrays(assignment.rows, assignment.cols, assignment.counts)
            self.raster_origin_x = float(grid.origin_x)
            self.raster_origin_y = float(grid.origin_y)
            self.raster_n_cols = int(grid.n_cols)
            self.raster_n_rows = int(grid.n_rows)
            self.raster_n_bins = n_bins
            self.raster_bin_rows = packs["raster_bin_rows"]
            self.raster_bin_cols = packs["raster_bin_cols"]
            self.raster_bin_counts = packs["raster_bin_counts"]
            self.raster_features = pack_features(B) if B.size else ""
            self.raster_feature_dim = int(B.shape[1])
            self.raster_feature_labels = list(labels)
            self._raster_assignment = assignment
            self.raster_status = "ready"
        finally:
            self._raster_rebuild_depth -= 1

    @traitlets.observe("render_mode")
    def _on_render_mode(self, change: dict) -> None:
        if change.get("new") == change.get("old"):
            return
        mode = str(change.get("new") or "points")
        if mode == "raster":
            self._rebuild_raster()
        else:
            self._clear_raster_sync(status="")

    @traitlets.observe(
        "raster_bin_size",
        "raster_window_radius",
        "raster_basis",
        "raster_embedding_key",
        "raster_gene_mode",
        "active_category",
    )
    def _on_raster_params(self, change: dict) -> None:
        if change.get("new") == change.get("old"):
            return
        if self.render_mode != "raster":
            return
        # active_category only affects composition basis
        if change.get("name") == "active_category" and self.raster_basis != "composition":
            return
        self._rebuild_raster()

    def set_color(
        self,
        color: Any,
        *,
        color_map: dict[str, str] | None = None,
        legend_title: str | None = None,
        continuous_range: tuple[str, str] | None = None,
    ) -> None:
        """Update point colors without changing x/y."""
        x = getattr(self, "_data_x", None)
        y = getattr(self, "_data_y", None)
        if x is None or y is None:
            raise RuntimeError("internal point cache missing; call set_points first")
        self.set_points(
            x,
            y,
            color=color,
            color_map=color_map,
            legend_title=legend_title,
            continuous_range=continuous_range,
        )

    def clear_selections(self) -> None:
        self.selections = []
        if self.selected_kind == "selection":
            self.selected_kind = ""
            self.selected_index = -1

    def clear_landmarks(self) -> None:
        self.landmarks = []
        if self.selected_kind == "landmark":
            self.selected_kind = ""
            self.selected_index = -1

    @traitlets.observe("promote_tick")
    def _on_promote_tick(self, change: dict) -> None:
        if change.get("new") == change.get("old"):
            return
        try:
            self.promote_neighborhood_to_selection()
        except ValueError:
            pass

    def promote_neighborhood_to_selection(self) -> str:
        """Freeze the active type/selection neighborhood into a new polygon selection.

        Membership is the exact neighborhood point set (``point_indices``), not a
        convex hull. Hull vertices are kept only as optional display geometry.
        The new selection has ``neighborhood: off``. Returns the new selection id.
        """
        import numpy as np

        x = getattr(self, "_data_x", None)
        y = getattr(self, "_data_y", None)
        if x is None or y is None:
            raise ValueError("widget has no spatial coordinates")

        kind = str(self.selected_kind or "")
        index = int(self.selected_index)
        if kind == "selection" and index >= 0 and index < len(self.selections):
            sel = dict(self.selections[index])
            method, _, _ = neighborhood_params(sel)
            if method == "off":
                raise ValueError("active selection neighborhood is off")
            sid = str(sel.get("id"))
            mask = self.get_mask(x, y, selection_id=sid, expand=True)
            label = sid
        elif kind == "type" and index >= 0 and index < len(self.legend_labels):
            type_label = str(self.legend_labels[index])
            col = str(self.active_category or "")
            row = next(
                (
                    item
                    for item in (self.type_neighborhoods or [])
                    if str(item.get("id")) == type_label
                    and (
                        not item.get("column")
                        or str(item.get("column")) == col
                    )
                ),
                None,
            )
            method, _, _ = neighborhood_params(row)
            if method == "off":
                raise ValueError("active type neighborhood is off")
            mask = self.get_type_mask(type_label, expand=True, column=col or None)
            label = type_label
        else:
            raise ValueError("select a type or selection with an active neighborhood")

        mask_arr = np.asarray(mask, dtype=bool).ravel()
        point_indices = [int(i) for i in np.flatnonzero(mask_arr)]
        if not point_indices:
            raise ValueError("neighborhood is empty")
        new_id = next_numbered_id("selection", list(self.selections))
        new_sel = {
            "id": new_id,
            "type": "points",
            "point_indices": point_indices,
            "neighborhood": "off",
            "label": f"neighborhood:{label}",
        }
        self.selections = list(self.selections) + [new_sel]
        self.selected_kind = "selection"
        self.selected_index = len(self.selections) - 1
        return new_id

    def clear(self) -> None:
        self.clear_selections()
        self.clear_landmarks()

    def _expand_index(self, method: str) -> NeighborhoodIndex | None:
        idx = _index_for_method(self, method)
        if idx is None or idx.n == 0 or int(idx.indptr[-1]) == 0:
            return None
        return idx

    def get_mask(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
        *,
        expand: bool = True,
    ) -> "np.ndarray":
        """Boolean mask for points inside ``selection_id`` (all-True for ``\"all\"``/None).

        When ``expand`` is true and the selection has ``neighborhood`` ``radius``
        or ``knn``, neighbors of the seed cells are included.
        """
        mask = selection_mask(
            list(self.selections),
            x_arr,
            y_arr,
            selection_id,
            x_scale=self._x_scale,
            y_scale=self._y_scale,
        )
        if not expand or selection_id is None or selection_id == "all":
            return mask
        from .selection import selection_by_id

        sel = selection_by_id(list(self.selections), str(selection_id))
        method, radius, k = neighborhood_params(sel)
        if method == "off":
            return mask
        index = self._expand_index(method)
        if index is None:
            return mask
        return mask | neighborhood_expand(
            mask,
            x_arr,
            y_arr,
            method,
            radius=radius,
            k=k,
            index=index,
        )

    def get_indices(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
        *,
        expand: bool = True,
    ) -> "np.ndarray":
        """Indices of points inside ``selection_id`` (all indices for ``\"all\"``/None)."""
        import numpy as np

        return np.where(
            self.get_mask(x_arr, y_arr, selection_id=selection_id, expand=expand)
        )[0]

    def get_type_mask(
        self,
        type_label: str,
        *,
        expand: bool = True,
        column: str | None = None,
    ) -> "np.ndarray":
        """Boolean mask for a categorical label (optional neighborhood)."""
        import numpy as np

        arrays = getattr(self, "_data_label_arrays", None) or {}
        col = column or self.active_category or ""
        labels = arrays.get(col)
        if labels is None:
            labels = getattr(self, "_data_labels", None)
        if labels is None:
            raise RuntimeError(
                "no categorical columns; pass color= an obs column when constructing"
            )
        seed = np.asarray(labels).astype(str) == str(type_label)
        if not expand:
            return seed
        row = next(
            (
                item
                for item in (self.type_neighborhoods or [])
                if str(item.get("id")) == str(type_label)
                and (
                    not item.get("column")
                    or str(item.get("column")) == str(col)
                )
            ),
            None,
        )
        method, radius, k = neighborhood_params(row)
        if method == "off":
            return seed
        x = getattr(self, "_data_x", None)
        y = getattr(self, "_data_y", None)
        if x is None or y is None:
            raise RuntimeError("internal point cache missing; call set_points first")
        index = self._expand_index(method)
        if index is None:
            return seed
        return seed | neighborhood_expand(
            seed,
            x,
            y,
            method,
            radius=radius,
            k=k,
            index=index,
        )

    def get_type_indices(
        self,
        type_label: str,
        *,
        expand: bool = True,
    ) -> "np.ndarray":
        """Indices for a categorical color label (optional neighborhood)."""
        import numpy as np

        return np.where(self.get_type_mask(type_label, expand=expand))[0]

    def get_obs_names(
        self,
        adata: Any,
        selection_id: str | None = "all",
        *,
        spatial_key: str = "spatial",
        expand: bool = True,
    ) -> "np.ndarray":
        """``obs_names`` of cells inside ``selection_id`` (durable join key)."""
        import numpy as np

        xy = np.asarray(adata.obsm[spatial_key], dtype=np.float64)
        cached = getattr(self, "_data_x", None)
        if cached is None or xy.shape[0] != int(cached.shape[0]):
            raise ValueError(
                "adata row count != widget points; rebuild the widget after filtering"
            )
        idx = self.get_indices(
            xy[:, 0], xy[:, 1], selection_id=selection_id, expand=expand
        )
        return np.asarray(adata.obs_names.astype(str))[idx]

    def assign_obs_mask(
        self,
        adata: Any,
        key: str,
        selection_id: str | None = "all",
        *,
        spatial_key: str = "spatial",
        expand: bool = True,
    ) -> None:
        """Write a boolean column on ``adata.obs`` for the current selection."""
        names = set(
            self.get_obs_names(
                adata, selection_id, spatial_key=spatial_key, expand=expand
            ).tolist()
        )
        adata.obs[key] = [str(n) in names for n in adata.obs_names.astype(str)]
