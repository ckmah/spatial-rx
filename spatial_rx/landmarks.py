"""LandmarksWidget: draw selections and landmarks on a deck.gl point scatter."""

from __future__ import annotations

import base64
import math
from typing import TYPE_CHECKING, Any

import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm
from .categories import (
    as_polars,
    detect_category_columns,
    encode_category_bundle,
    encode_single_category,
)
from .genes import encode_gene_bundle
from .neighbors import DEFAULT_K_MAX, NeighborhoodIndex, empty_graph
from .selection import neighborhood_expand, neighborhood_params, selection_mask

if TYPE_CHECKING:
    import numpy as np

_DEFAULT_MODES = [
    "select",
    "lasso",
    "point",
    "line",
    "spline",
    "shape",
]

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


def _sequential_palette(
    n: int = 256,
    low: str = "#e5e7eb",
    high: str = "#b91c1c",
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
    Continuous: valueA in [0, 1] with a sequential palette (default light grey→red).
    """
    import numpy as np

    if color is None:
        return ["#60a5fa"], np.zeros(n, dtype=np.float32), [], None, None

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

    low, high = continuous_range or ("#e5e7eb", "#b91c1c")
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


def _expr_from_adata(adata: Any, genes: Any) -> Any:
    import numpy as np
    import pandas as pd

    if genes is None:
        return None
    var_names = [str(v) for v in adata.var_names]
    if genes is True:
        wanted = var_names
    else:
        wanted_set = {str(g) for g in genes}
        wanted = [g for g in var_names if g in wanted_set]
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


class LandmarksWidget(AnyWidget):
    """Draw selections and landmarks as deck.gl layers on an orthographic scatter.

    ``LandmarksWidget.from_points(x, y, color=...)`` builds a pan/zoom scatter
    in cartesian tissue coordinates; landmarks and selections are deck.gl layers.

    Synced state includes UI geometry (``landmarks``, ``selections``,
    ``type_neighborhoods``) and two neighbor graphs ingested from AnnData
    ``obsp`` (k-NN as ``neighbor_*``, radius as ``radius_*``).
    Categorical ``color`` labels are intrinsic type layers — they are not
    created by clicking. Pass ``expr`` (numeric gene columns, same row order)
    to list genes under Layers; clicking a gene colors the scatter continuously.
    A spatial selection or type layer can expand with
    ``neighborhood`` ``off`` / ``radius`` / ``knn`` using those precomputed
    graphs. k and radius sliders subset the ingested k_max / r_max CSRs;
    they cannot exceed stored neighbors.

    Use ``get_mask`` / ``get_indices`` / ``get_obs_names`` with an explicit
    ``selection_id`` (or ``\"all\"`` for every point). ``get_type_mask`` /
    ``get_type_indices`` cover a categorical label. Measurement tables belong
    in the notebook. Persist selections as ``obs_names``, not positions.

    Line and spline landmarks carry ``buffer_width`` (data units, ``0`` = off)
    and ``buffer_side`` (``\"left\"``/``\"both\"``/``\"right\"``, relative to the
    drawing direction) so notebooks can rebuild the band with
    ``shapely.LineString(...).buffer(width, single_sided=True)``.
    """

    _esm = widget_esm("landmarks")
    _css = widget_css()

    mode = traitlets.Unicode("select").tag(sync=True)
    modes = traitlets.List(traitlets.Unicode(), default_value=list(_DEFAULT_MODES)).tag(
        sync=True
    )

    selections = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    landmarks = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    selected_kind = traitlets.Unicode("").tag(sync=True)
    selected_index = traitlets.Int(-1).tag(sync=True)

    x_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    y_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    axes_pixel_bounds = traitlets.Tuple(
        traitlets.Float(),
        traitlets.Float(),
        traitlets.Float(),
        traitlets.Float(),
        default_value=(0.0, 0.0, 100.0, 100.0),
    ).tag(sync=True)

    width = traitlets.Int(400).tag(sync=True)
    height = traitlets.Int(400).tag(sync=True)

    points_data = traitlets.Unicode("").tag(sync=True)  # base64 float32 Nx4
    point_palette = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    color_by = traitlets.Unicode("categorical").tag(sync=True)  # categorical | continuous
    legend_labels = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    legend_title = traitlets.Unicode("").tag(sync=True)
    color_vmin = traitlets.Float(0.0).tag(sync=True)
    color_vmax = traitlets.Float(1.0).tag(sync=True)
    point_size = traitlets.Float(2.0).tag(sync=True)
    point_opacity = traitlets.Float(0.75).tag(sync=True)
    plot_background = traitlets.Unicode("").tag(sync=True)

    landmark_opacity = traitlets.Float(0.28).tag(sync=True)
    stroke_width = traitlets.Int(2).tag(sync=True)
    default_tension = traitlets.Float(0.0).tag(sync=True)
    default_buffer_width = traitlets.Float(0.0).tag(sync=True)
    default_buffer_side = traitlets.Enum(
        ["left", "both", "right"], default_value="both"
    ).tag(sync=True)
    type_neighborhoods = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    category_columns = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    category_codes = traitlets.Unicode("").tag(sync=True)  # base64 int32, col-major
    active_category = traitlets.Unicode("").tag(sync=True)

    gene_columns = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    gene_values = traitlets.Unicode("").tag(sync=True)  # base64 float32, col-major [0, 1]
    active_genes = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    # independent: each gene uses its own vmax; shared: all use max vmax among selected.
    gene_scale_mode = traitlets.Enum(
        ["independent", "shared"], default_value="independent"
    ).tag(sync=True)
    gene_log1p = traitlets.Bool(False).tag(sync=True)
    continuous_palette = traitlets.List(traitlets.Unicode(), default_value=[]).tag(
        sync=True
    )

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

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        raise TypeError(
            "Use LandmarksWidget.from_anndata(...), from_points(...), or from_frame(...)"
        )

    @classmethod
    def from_points(
        cls,
        x: Any,
        y: Any,
        *,
        color: Any = None,
        color_map: dict[str, str] | None = None,
        continuous_range: tuple[str, str] | None = None,
        width: int = 900,
        height: int = 900,
        point_size: float = 2.0,
        point_opacity: float = 0.75,
        background: str | None = None,
        legend_title: str = "",
        mode: str = "select",
        modes: list[str] | None = None,
        landmark_opacity: float = 0.28,
        stroke_width: int = 2,
        default_tension: float = 0.0,
        default_buffer_width: float = 0.0,
        default_buffer_side: str = "both",
        k_max: int = DEFAULT_K_MAX,
        neighbor_radius_max: float | None = None,
        expr: Any = None,
        **kwargs: Any,
    ) -> "LandmarksWidget":
        """Build a pan/zoom deck.gl scatter with landmark and selection layers.

        ``width`` / ``height`` size the widget shell in CSS pixels. The figure
        panel expands to fill the remaining viewport beside the sidebar (not
        forced square); canvases sync to that laid-out size. ``background``
        defaults to the widget chrome color so the scatter matches the rest of
        the UI. ``point_size`` is marker radius in the same units as ``x`` /
        ``y`` (e.g. 2.0 for a 2 µm radius on micron coordinates); screen size
        scales with zoom and is not clamped to a minimum pixel size.

        ``expr`` is an optional table of numeric gene columns (same row order
        as ``x`` / ``y``). Packed values appear as a Genes section under Layers.

        Neighbor graphs are not built here. Pass them with ``set_neighbor_graphs``
        or use ``from_anndata`` after ``squidpy.gr.spatial_neighbors``.
        ``k_max`` / ``neighbor_radius_max`` are accepted for compatibility and ignored.
        """
        import numpy as np

        del k_max, neighbor_radius_max

        x_arr = np.asarray(x, dtype=np.float64).ravel()
        y_arr = np.asarray(y, dtype=np.float64).ravel()
        if x_arr.shape != y_arr.shape:
            raise ValueError("x and y must have the same shape")
        n = int(x_arr.shape[0])
        if n == 0:
            raise ValueError("x and y must be non-empty")

        xmin, xmax = float(x_arr.min()), float(x_arr.max())
        ymin, ymax = float(y_arr.min()), float(y_arr.max())
        if xmax <= xmin:
            xmax = xmin + 1.0
        if ymax <= ymin:
            ymax = ymin + 1.0
        pad_x = 0.02 * (xmax - xmin)
        pad_y = 0.02 * (ymax - ymin)
        xmin, xmax = xmin - pad_x, xmax + pad_x
        ymin, ymax = ymin - pad_y, ymax + pad_y

        nx = (2.0 * (x_arr - xmin) / (xmax - xmin) - 1.0).astype(np.float32)
        ny = (2.0 * (y_arr - ymin) / (ymax - ymin) - 1.0).astype(np.float32)
        palette, value_a, labels, vmin, vmax = _encode_colors(
            color, color_map, n, continuous_range=continuous_range
        )
        seq_low, seq_high = continuous_range or ("#e5e7eb", "#b91c1c")
        seq_palette = _sequential_palette(256, low=seq_low, high=seq_high)
        color_mode = (
            "categorical"
            if color is None
            or isinstance(color, str)
            or np.asarray(color).dtype.kind in "UOS"
            else "continuous"
        )
        points = np.column_stack(
            [nx, ny, value_a, np.zeros(n, dtype=np.float32)]
        )

        if modes is None:
            modes = list(_DEFAULT_MODES)

        knn = empty_graph(n)
        radius = empty_graph(n)

        self = cls.__new__(cls)
        self._x_scale = "linear"
        self._y_scale = "linear"
        self._data_x = x_arr
        self._data_y = y_arr
        self._knn_index = knn
        self._radius_index = radius
        self._obs_names = None
        cat_meta: list[dict] = []
        cat_codes = ""
        cat_labels: dict[str, Any] = {}
        active_cat = ""
        if color_mode == "categorical" and labels:
            cat_name = legend_title or "category"
            cat_meta, cat_codes, cat_labels = encode_single_category(
                color,
                name=cat_name,
                color_map=color_map,
            )
            active_cat = cat_name
        self._data_label_arrays = cat_labels
        self._data_labels = cat_labels.get(active_cat)
        AnyWidget.__init__(
            self,
            mode=mode,
            modes=modes,
            x_bounds=(xmin, xmax),
            y_bounds=(ymin, ymax),
            axes_pixel_bounds=(0.0, 0.0, float(width), float(height)),
            width=int(width),
            height=int(height),
            points_data=_encode_f32(points),
            point_palette=list(palette),
            color_by=color_mode,
            legend_labels=list(labels),
            legend_title=legend_title,
            color_vmin=float(vmin if vmin is not None else 0.0),
            color_vmax=float(vmax if vmax is not None else 1.0),
            point_size=float(point_size),
            point_opacity=float(point_opacity),
            plot_background=background or "",
            landmark_opacity=landmark_opacity,
            stroke_width=stroke_width,
            default_tension=default_tension,
            default_buffer_width=default_buffer_width,
            default_buffer_side=default_buffer_side,
            category_columns=cat_meta,
            category_codes=cat_codes,
            active_category=active_cat,
            continuous_palette=list(seq_palette),
            **knn.to_sync(prefix="neighbor"),
            **radius.to_sync(prefix="radius"),
            **kwargs,
        )
        if expr is not None:
            self.set_expression(expr)
        return self

    @classmethod
    def from_frame(
        cls,
        frame: Any,
        *,
        x: str = "x",
        y: str = "y",
        color: str | None = None,
        color_maps: dict[str, dict[str, str]] | None = None,
        continuous_range: tuple[str, str] | None = None,
        width: int = 900,
        height: int = 900,
        point_size: float = 2.0,
        point_opacity: float = 0.75,
        background: str | None = None,
        mode: str = "select",
        modes: list[str] | None = None,
        landmark_opacity: float = 0.28,
        stroke_width: int = 2,
        default_tension: float = 0.0,
        default_buffer_width: float = 0.0,
        default_buffer_side: str = "both",
        k_max: int = DEFAULT_K_MAX,
        neighbor_radius_max: float | None = None,
        expr: Any = None,
        **kwargs: Any,
    ) -> "LandmarksWidget":
        """Build from a polars/pandas table; auto-detect categorical columns.

        ``color`` selects the active category column (default: first detected, or
        a continuous numeric column name). Category codes are packed from
        Arrow-backed polars columns for the browser.

        ``expr`` is an optional table of numeric gene columns (same row order as
        ``frame``). Click a gene under Layers to color by expression.
        """
        import numpy as np

        df = as_polars(frame)
        if x not in df.columns or y not in df.columns:
            raise ValueError(f"frame must contain columns {x!r} and {y!r}")
        x_arr = df[x].to_numpy().astype(np.float64, copy=False)
        y_arr = df[y].to_numpy().astype(np.float64, copy=False)
        cat_names = detect_category_columns(df, skip={x, y})
        color_maps = color_maps or {}
        cat_meta, cat_codes, cat_labels = encode_category_bundle(
            df, cat_names, color_maps=color_maps
        )

        active = color or (cat_names[0] if cat_names else "")
        color_arg: Any = None
        cmap_arg: dict[str, str] | None = None
        legend = ""
        if active and active in cat_labels:
            color_arg = cat_labels[active]
            cmap_arg = color_maps.get(active)
            legend = active
        elif color and color in df.columns:
            color_arg = df[color].to_numpy()
            legend = color

        w = cls.from_points(
            x_arr,
            y_arr,
            color=color_arg,
            color_map=cmap_arg,
            continuous_range=continuous_range,
            width=width,
            height=height,
            point_size=point_size,
            point_opacity=point_opacity,
            background=background,
            legend_title=legend,
            mode=mode,
            modes=modes,
            landmark_opacity=landmark_opacity,
            stroke_width=stroke_width,
            default_tension=default_tension,
            default_buffer_width=default_buffer_width,
            default_buffer_side=default_buffer_side,
            k_max=k_max,
            neighbor_radius_max=neighbor_radius_max,
            expr=expr,
            **kwargs,
        )
        if cat_meta:
            w.category_columns = cat_meta
            w.category_codes = cat_codes
            w.active_category = active if active in cat_labels else cat_meta[0]["name"]
            w._data_label_arrays = cat_labels
            w._data_labels = cat_labels.get(w.active_category)
            active_meta = next(
                (c for c in cat_meta if c["name"] == w.active_category), cat_meta[0]
            )
            w.point_palette = list(active_meta["palette"])
            w.legend_labels = list(active_meta["labels"])
            w.color_by = "categorical"
            w.legend_title = w.active_category
        return w

    @classmethod
    def from_anndata(
        cls,
        adata: Any,
        *,
        spatial_key: str = "spatial",
        knn_key: str = "spatial_knn",
        radius_key: str = "spatial_radius",
        color: str | None = None,
        genes: Any = None,
        color_maps: dict[str, dict[str, str]] | None = None,
        continuous_range: tuple[str, str] | None = None,
        width: int = 900,
        height: int = 900,
        point_size: float = 2.0,
        point_opacity: float = 0.75,
        background: str | None = None,
        mode: str = "select",
        modes: list[str] | None = None,
        landmark_opacity: float = 0.28,
        stroke_width: int = 2,
        default_tension: float = 0.0,
        default_buffer_width: float = 0.0,
        default_buffer_side: str = "both",
        **kwargs: Any,
    ) -> "LandmarksWidget":
        """Build from AnnData. Requires k-NN and radius graphs already in ``obsp``.

        Run ``squidpy.gr.spatial_neighbors`` twice first (k_max and r_max
        supersets; widget sliders subset)::

            sq.gr.spatial_neighbors(adata, coord_type="generic", n_neighs=64, key_added="spatial_knn")
            sq.gr.spatial_neighbors(adata, coord_type="generic", radius=r_max, key_added="spatial_radius")
        """
        import numpy as np

        knn_conn = _obsp_key(knn_key, "connectivities")
        radius_conn = _obsp_key(radius_key, "connectivities")
        obsp = getattr(adata, "obsp", None)
        if obsp is None or knn_conn not in obsp or radius_conn not in obsp:
            raise ValueError(
                "from_anndata requires "
                f"adata.obsp[{knn_conn!r}] and adata.obsp[{radius_conn!r}]; "
                "run squidpy.gr.spatial_neighbors for k-NN and radius first"
            )
        if spatial_key not in adata.obsm:
            raise ValueError(f"adata.obsm[{spatial_key!r}] is required")
        xy = np.asarray(adata.obsm[spatial_key], dtype=np.float64)
        if xy.ndim != 2 or xy.shape[1] < 2:
            raise ValueError(f"adata.obsm[{spatial_key!r}] must be (n, 2)")
        if xy.shape[0] != adata.n_obs:
            raise ValueError("spatial coords length must match adata.n_obs")

        maps = _color_maps_from_uns(adata)
        if color_maps:
            maps.update(color_maps)

        obs = adata.obs.copy()
        obs["x"] = xy[:, 0]
        obs["y"] = xy[:, 1]

        color_arg = color
        gene_color = None
        var_names = {str(v) for v in adata.var_names}
        if color and color not in obs.columns and color in var_names:
            color_arg = None
            X = adata[:, [color]].X
            if hasattr(X, "toarray"):
                X = X.toarray()
            gene_color = np.asarray(X, dtype=np.float64).ravel()

        expr = _expr_from_adata(adata, genes)
        w = cls.from_frame(
            obs,
            x="x",
            y="y",
            color=color_arg,
            color_maps=maps or None,
            continuous_range=continuous_range,
            width=width,
            height=height,
            point_size=point_size,
            point_opacity=point_opacity,
            background=background,
            mode=mode,
            modes=modes,
            landmark_opacity=landmark_opacity,
            stroke_width=stroke_width,
            default_tension=default_tension,
            default_buffer_width=default_buffer_width,
            default_buffer_side=default_buffer_side,
            expr=expr,
            **kwargs,
        )
        if gene_color is not None:
            w.set_color(
                gene_color,
                legend_title=str(color),
                continuous_range=continuous_range,
            )
        knn_dist = _obsp_key(knn_key, "distances")
        radius_dist = _obsp_key(radius_key, "distances")
        w.set_neighbor_graphs(
            obsp[knn_conn],
            obsp[radius_conn],
            knn_distances=obsp[knn_dist] if knn_dist in obsp else None,
            radius_distances=obsp[radius_dist] if radius_dist in obsp else None,
        )
        w._obs_names = np.asarray(adata.obs_names.astype(str))
        return w

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
        if continuous_range is not None:
            seq_low, seq_high = continuous_range
            self.continuous_palette = _sequential_palette(
                256, low=seq_low, high=seq_high
            )
        self.points_data = _encode_f32(points)

    def set_expression(self, expr: Any) -> None:
        """Pack a gene-expression table for the Layers Genes section."""
        x = getattr(self, "_data_x", None)
        if x is None:
            raise RuntimeError("internal point cache missing; call from_points first")
        meta, values = encode_gene_bundle(expr, int(x.shape[0]))
        self.gene_columns = meta
        self.gene_values = values
        names = {g["name"] for g in meta}
        self.active_genes = [g for g in (self.active_genes or []) if g in names]

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
                "no categorical columns; call from_frame or from_points with labels"
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
