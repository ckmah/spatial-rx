# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo",
#     "matplotlib",
#     "numpy",
#     "pandas",
#     "tifffile",
#     "altair",
#     "geopandas",
#     "shapely",
#     "scipy",
#     "spatial-rx",
# ]
#
# [tool.uv.sources]
# spatial-rx = { path = "../", editable = true }
# ///

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Spatial Transcriptomics Playground

    This notebook walks through multimodal spatial data and interactive landmark measurements.

    We use two public datasets bundled under `demos/data/` as TIFF + CSV:

    1. **Cells / nuclei demo** — morphology + nucleus labels + transcripts from a 10x Xenium Prime FFPE Human Cervical Cancer subset [1].
    2. **Mouse ileum MERFISH** — SPF ileum cross-section from Xu *et al.* [2], cell coordinates + a 14-gene expression panel.

    Spatial transcriptomics combines microscopy with molecular readouts on tissue sections, yielding images plus spatially resolved RNA (and often protein) measurements.
    """)
    return


@app.cell(hide_code=True)
def _(mo):
    mo.vstack(
        [
            mo.md("### References"),
            mo.accordion(
                {
                    "[1] Cells / nuclei (Xenium cervical cancer subset)": mo.md(
                        r"""
                        Derived from
                        [10x Genomics Xenium Prime FFPE Human Cervical Cancer](https://www.10xgenomics.com/datasets/xenium-prime-ffpe-human-cervical-cancer)
                        (CC BY 4.0). Demo files: `demos/data/cells/*.tif` and `*.csv`.
                        """
                    ),
                    "[2] Mouse ileum MERFISH (Xu et al.)": mo.md(
                        r"""
                        Xu, R. J. *et al.* An image-based transcriptomics atlas reveals the regional and microbiota-dependent molecular, cellular, and spatial structure of the murine gut.
                        *Cell Host Microbe* **34**, 509–525.e13 (2026).
                        [doi:10.1016/j.chom.2026.01.018](https://doi.org/10.1016/j.chom.2026.01.018).
                        Demo files: `demos/data/ileum/cells.csv` and `expr.csv`.
                        """
                    ),
                    "[3] Mapping the transcriptome (Figure 1)": mo.md(
                        r"""
                        Zormpas, E., Queen, R., Comber, A. & Cockell, S. J. Mapping the transcriptome: Realizing the full potential of spatial data analysis.
                        *Cell* **186**, 5677–5689 (2023).
                        [doi:10.1016/j.cell.2023.11.003](https://doi.org/10.1016/j.cell.2023.11.003).
                        """
                    ),
                }
            ),
        ]
    )
    return


@app.cell
def _(DATA_DIR, mo):
    mo.callout(
        mo.vstack(
            [
                mo.md(
                    "Analogous analysis in geographical sciences ~ spatial transcriptomics [3]:"
                ),
                mo.image(str(DATA_DIR / "figure1_spatial_analogy.png")),
            ]
        ),
        title="Figure 1",
    )
    return


@app.cell
def _():
    from pathlib import Path

    import altair as alt
    import geopandas as gpd
    import marimo as mo
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd
    import tifffile
    from spatial_rx import GalleryWidget, LandmarksWidget

    alt.data_transformers.disable_max_rows()

    DATA_DIR = Path(__file__).resolve().parent / "data"
    return (
        DATA_DIR,
        GalleryWidget,
        LandmarksWidget,
        alt,
        gpd,
        matplotlib,
        mo,
        np,
        pd,
        plt,
        tifffile,
    )


@app.cell
def _(matplotlib, mo):
    theme = mo.app_meta().theme
    matplotlib.style.use("dark_background" if theme == "dark" else "default")
    return (theme,)


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Data layers

    Inspect morphology, segmentation, and transcripts under `demos/data/cells/` [1]:
    """)
    return


@app.cell
def _(DATA_DIR, pd, tifffile):
    _cells = DATA_DIR / "cells"
    image = tifffile.imread(_cells / "morphology_rgb.tif")
    masks = tifffile.imread(_cells / "nucleus_labels_rgb.tif")
    gene_totals = pd.read_csv(_cells / "gene_totals.csv")
    transcripts = pd.read_csv(_cells / "transcripts.csv")
    return gene_totals, image, masks, transcripts


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    ## Morphology | Segmentation masks

    Nuclear and cell segmentation labels over morphology for the Xenium-derived cervical cancer subset.
    """)
    return


@app.cell
def _(image, masks, mo):
    mo.image_compare(
        before_image=image[::-1, :],
        after_image=masks[::-1, :],
    )
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    ## RNA transcripts

    Each cell can express thousands of RNA species at different levels. This demo includes a small panel of imaged transcripts as points over the tissue.
    """)
    return


@app.cell
def _(alt, gene_totals, mo, transcripts):
    _tx_table = (
        transcripts[["x", "y", "z", "feature_name", "cell_id"]]
        .sample(frac=0.01, random_state=0)
        .reset_index(drop=True)
    )
    _gene_totals = gene_totals.head(20)
    _chart = (
        alt.Chart(_gene_totals)
        .mark_bar()
        .encode(
            x=alt.X("count:Q", title="total counts"),
            y=alt.Y("gene:N", sort="-x", title="gene"),
            tooltip=["gene:N", "count:Q"],
        )
        .properties(title="Top 20 genes", height=420)
    )
    mo.hstack(
        [
            _chart,
            mo.ui.table(_tx_table, page_size=11),
        ],
        widths="equal",
        align="start",
        gap=1,
    )
    return


@app.cell
def _(masks, plt, transcripts):
    fig, ax = plt.subplots()
    ax.imshow(masks)
    _scale_factor = 4.5
    ax.scatter(
        (transcripts["x"] - transcripts["x"].min()+5) * _scale_factor,
        (transcripts["y"] - transcripts["y"].min()+6) * _scale_factor,
        s=0.2,
        c="white"
    )
    ax.set_yinverted(False)
    ax
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # LandmarksWidget: draw → measure

    The widget enables quick spatial measurements by drawing landmarks e.g. points, lines, or shapes on the 2D spatial coordinates of cells. Here we are looking at a 2D cross section of mouse gut [2].

    Pick a **use case** card for a suggested measurement, then draw landmarks on the map.

    Coordinates and a 14-gene expression panel are loaded from `demos/data/ileum/`.
    """)
    return


@app.cell
def _(DATA_DIR):
    RECIPE_SPECS = [
        {
            "id": "Crypt-villus axis",
            "kind": "crypt_villus",
            "draw": "Spline from crypt base to villus tip",
            "measure": "Gradient (along)",
            "description": "Epithelial zonation along the villus: stem and bottom enterocytes at the crypt give way to mid- and tip populations toward the lumen. In ileum SPF tissue, T cells and macrophages enrich mid-to-upper villus.",
        },
        {
            "id": "Mucosal belt",
            "kind": "mucosal_belt",
            "draw": "Line along the crypt–villus junction",
            "measure": "Gradient (perpendicular)",
            "description": "Cell types stratify perpendicular to the mucosal surface: lumen-side absorptive and secretory cells versus deeper lamina propria immune and stromal layers toward muscle.",
        },
        {
            "id": "GALT niche",
            "kind": "galt",
            "draw": "Closed shape around a Peyer's patch",
            "measure": "Composition",
            "description": "Peyer's patches concentrate B cells, T cells, and antigen-presenting cells in follicles distinct from lamina propria. Composition quantifies that lymphoid microenvironment.",
        },
        {
            "id": "Spatial gene expression",
            "kind": "gene_along",
            "draw": "Spline from crypt base to villus tip",
            "measure": "Gene (along)",
            "description": "Villus-axis genes (Apob, Lgr5, chemokines, neuronal markers) change along crypt-to-tip polarity. Tests whether expression tracks anatomical position rather than cell-type averages alone.",
        },
    ]

    RECIPE_DRAWING_ROOT = DATA_DIR / "recipes"
    RECIPE_DRAWINGS = {
        spec["kind"]: RECIPE_DRAWING_ROOT / f"{spec['kind']}.svg"
        for spec in RECIPE_SPECS
    }
    return RECIPE_DRAWINGS, RECIPE_SPECS


@app.cell
def _(DATA_DIR, pd):
    _ileum = DATA_DIR / "ileum"
    gut_xy = pd.read_csv(_ileum / "cells.csv")
    gut_expr = pd.read_csv(_ileum / "expr.csv")
    gene_panel = list(gut_expr.columns)
    return gene_panel, gut_expr, gut_xy


@app.cell
def _(gpd, np, pd):
    # Plotting and spatial computation functions
    from shapely.geometry import LineString, Point, Polygon

    def cardinal_sample(vertices, tension=0.0, n_per_seg=20, closed=False):
        pts = [(float(x), float(y)) for x, y in vertices]
        if closed:
            if len(pts) >= 2 and pts[0] == pts[-1]:
                pts = pts[:-1]
            if len(pts) < 3:
                return pts
            n = len(pts)

            def at(i):
                return pts[i % n]

            n_seg = n
        else:
            if len(pts) < 2:
                return pts
            if len(pts) == 2:
                return pts
            n = len(pts)
            ext = [
                (2 * pts[0][0] - pts[1][0], 2 * pts[0][1] - pts[1][1]),
                *pts,
                (2 * pts[-1][0] - pts[-2][0], 2 * pts[-1][1] - pts[-2][1]),
            ]

            def at(i):
                return ext[i + 1]

            n_seg = n - 1

        s = (1.0 - max(0.0, min(1.0, float(tension)))) / 2.0
        out = []
        for i in range(n_seg):
            p0, p1, p2, p3 = at(i - 1), at(i), at(i + 1), at(i + 2)
            m1x = s * (p2[0] - p0[0])
            m1y = s * (p2[1] - p0[1])
            m2x = s * (p3[0] - p1[0])
            m2y = s * (p3[1] - p1[1])
            for j in range(n_per_seg):
                u = j / n_per_seg
                u2 = u * u
                u3 = u2 * u
                h00 = 2 * u3 - 3 * u2 + 1
                h10 = u3 - 2 * u2 + u
                h01 = -2 * u3 + 3 * u2
                h11 = u3 - u2
                out.append(
                    (
                        h00 * p1[0] + h10 * m1x + h01 * p2[0] + h11 * m2x,
                        h00 * p1[1] + h10 * m1y + h01 * p2[1] + h11 * m2y,
                    )
                )
        out.append(at(n_seg if closed else n - 1))
        return out

    def landmark_geoms(landmarks):
        geoms = {}
        for lm in landmarks:
            if lm.get("hidden"):
                continue
            kind = lm.get("type", "point")
            if kind == "gradient":
                kind = "spline"
            verts = lm.get("vertices") or []
            data_pts = [(float(v[0]), float(v[1])) for v in verts]
            lid = str(lm.get("id"))
            if kind == "point" and data_pts:
                geoms[lid] = ("point", Point(data_pts[0]))
            elif kind == "line" and len(data_pts) >= 2:
                geoms[lid] = ("line", LineString(data_pts))
            elif kind == "spline":
                sampled = cardinal_sample(
                    data_pts, float(lm.get("tension") or 0.0)
                )
                if len(sampled) >= 2:
                    geoms[lid] = ("spline", LineString(sampled))
            elif kind == "shape":
                sampled = cardinal_sample(
                    data_pts, float(lm.get("tension") or 0.0), closed=True
                )
                if len(sampled) >= 3:
                    ring = list(sampled)
                    if ring[0] != ring[-1]:
                        ring.append(ring[0])
                    geoms[lid] = ("shape", Polygon(ring))
        return geoms

    def _row_density(df):
        """Max-normalize counts within each landmark × cell type (peak = 1)."""
        if df.empty:
            out = df.copy()
            out["density"] = pd.Series(dtype=float)
            return out
        out = df.copy()
        maxima = out.groupby(["landmark_id", "group"], sort=False)[
            "count"
        ].transform("max")
        out["density"] = np.where(maxima > 0, out["count"] / maxima, np.nan)
        return out

    def buffer_polygon(lm, ltype, geom):
        """Band around a line/spline from landmark buffer_width / buffer_side."""
        if ltype not in ("line", "spline") or geom.geom_type != "LineString":
            return None
        width = float(lm.get("buffer_width") or 0)
        if width <= 0:
            return None
        line = geom
        side = lm.get("buffer_side") or "both"
        if side == "right":
            line = LineString(list(line.coords)[::-1])
            return line.buffer(width, single_sided=True)
        if side == "left":
            return line.buffer(width, single_sided=True)
        return line.buffer(width)


    def distances(x, y, groups, landmarks, indices):
        """Distance to landmark centerline; if buffer > 0, only cells inside the band."""
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        rows = []
        for lm in landmarks:
            geoms = landmark_geoms([lm])
            if not geoms:
                continue
            lid, (ltype, geom) = next(iter(geoms.items()))
            dist = points.distance(geom).to_numpy()
            poly = buffer_polygon(lm, ltype, geom)
            if poly is not None:
                inside = points.intersects(poly).to_numpy()
            else:
                inside = np.ones(len(points), dtype=bool)
            for i in indices:
                if not inside[i]:
                    continue
                rows.append(
                    {
                        "point_index": int(i),
                        "landmark_id": lid,
                        "landmark_type": ltype,
                        "group": groups[i],
                        "distance": float(dist[i]),
                    }
                )
        return pd.DataFrame(rows)

    def composition(x, y, groups, landmarks, indices):
        """Composition inside a shape, or inside a line/spline buffer band."""
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        rows = []
        for lm in landmarks:
            geoms = landmark_geoms([lm])
            if not geoms:
                continue
            lid, (ltype, geom) = next(iter(geoms.items()))
            if ltype == "shape":
                region = geom
            else:
                region = buffer_polygon(lm, ltype, geom)
                if region is None:
                    continue
            mask = cand & points.intersects(region).to_numpy()
            subset = groups[mask]
            n = int(mask.sum())
            if n == 0:
                continue
            values, counts = np.unique(subset, return_counts=True)
            for value, count in zip(values, counts, strict=True):
                rows.append(
                    {
                        "landmark_id": lid,
                        "group": value,
                        "count": int(count),
                        "proportion": float(count) / n,
                        "n_total": n,
                    }
                )
        return pd.DataFrame(rows)

    def profile(x, y, groups, landmarks, indices, n=40, radius=None):
        """Cell-type density along a line/spline (for Gradient-along heatmaps)."""
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        if radius is None:
            radius = 0.05 * max(
                float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0)
            )
        all_groups = [g for g in pd.unique(groups) if g is not None]
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            if (
                ltype not in ("line", "spline")
                or geom.geom_type != "LineString"
            ):
                continue
            for i in range(n):
                s = i / max(n - 1, 1)
                pt = geom.interpolate(s, normalized=True)
                neighborhood = (
                    points.distance(pt) <= radius
                ).to_numpy() & cand
                local_groups = groups[neighborhood]
                n_pts = int(neighborhood.sum())
                freq = {}
                if n_pts:
                    values, counts = np.unique(
                        local_groups, return_counts=True
                    )
                    freq = {
                        v: int(c) for v, c in zip(values, counts, strict=True)
                    }
                for g in all_groups:
                    rows.append(
                        {
                            "landmark_id": lid,
                            "landmark_type": ltype,
                            "s": s,
                            "s_label": f"{s:.2f}",
                            "x": float(pt.x),
                            "y": float(pt.y),
                            "n_points": n_pts,
                            "group": g,
                            "count": int(freq.get(g, 0)),
                        }
                    )
        return _row_density(pd.DataFrame(rows))

    def _nice_ceil(value):
        """Ceil to the next 1/2/5 × 10^k boundary."""
        value = float(value)
        if value <= 0:
            return 1.0
        exp = int(np.floor(np.log10(value)))
        base = 10.0**exp
        for m in (1, 2, 5, 10):
            if m * base >= value:
                return float(m * base)
        return float(10 * base)

    def _nice_step(limit, target_ticks=4):
        """Pick a 1/2/5 × 10^k tick step for ~target_ticks marks from 0..limit."""
        limit = float(limit)
        if limit <= 0:
            return 1.0
        raw = limit / max(target_ticks - 1, 1)
        exp = int(np.floor(np.log10(raw))) if raw > 0 else 0
        base = 10.0**exp
        for m in (1, 2, 5, 10):
            if m * base >= raw:
                return float(m * base)
        return float(10 * base)

    def distance_bands(
        x, y, groups, landmarks, indices, edges=None, n_bins=16
    ):
        """Cell-type density in distance bins away from a landmark (Gradient-perp)."""
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        if edges is None:
            span = max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
            hi = _nice_ceil(0.12 * span)
            edges = np.linspace(0.0, hi, n_bins + 1).tolist()
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        all_groups = [g for g in pd.unique(groups) if g is not None]
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            dist = points.distance(geom).to_numpy()
            for lo, hi in zip(edges[:-1], edges[1:], strict=True):
                band = cand & (dist >= lo) & (dist < hi)
                n = int(band.sum())
                mid = 0.5 * (lo + hi)
                label = f"{mid:g}"
                freq = {}
                if n:
                    subset = groups[band]
                    values, counts = np.unique(subset, return_counts=True)
                    freq = {
                        v: int(c) for v, c in zip(values, counts, strict=True)
                    }
                for g in all_groups:
                    rows.append(
                        {
                            "landmark_id": lid,
                            "landmark_type": ltype,
                            "band": label,
                            "band_lo": lo,
                            "band_hi": hi,
                            "band_mid": mid,
                            "group": g,
                            "count": int(freq.get(g, 0)),
                            "n_total": n,
                        }
                    )
        return _row_density(pd.DataFrame(rows))

    return buffer_polygon, composition, distances, landmark_geoms


@app.cell(hide_code=True)
def _(alt, buffer_polygon, gpd, gut_xy, landmark_geoms, np, pd):
    def altair_theme(chart, theme="dark"):
        if theme == "dark":
            return (
                chart.configure(background="#1e1e1e")
                .configure_axis(
                    labelColor="#e2e8f0",
                    titleColor="#f8fafc",
                    gridColor="#334155",
                    domainColor="#94a3b8",
                    tickColor="#94a3b8",
                )
                .configure_title(color="#f8fafc", fontSize=13)
                .configure_legend(labelColor="#e2e8f0", titleColor="#f8fafc")
                .configure_view(strokeWidth=0)
            )
        return chart.configure_view(strokeWidth=0)

    def sequential_range(theme="dark"):
        """Continuous heatmap/scatter scale: light grey→red (light), grey→red (dark)."""
        if theme == "dark":
            return ("#6b7280", "#f87171")
        return ("#e5e7eb", "#b91c1c")

    def along_positions(x, y, groups, landmarks, indices, radius=None):
        """Project cells onto line/spline; membership uses buffer when set."""
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        default_radius = (
            float(radius)
            if radius is not None
            else 0.05 * max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
        )
        rows = []
        for lm in landmarks:
            geoms = landmark_geoms([lm])
            if not geoms:
                continue
            lid, (ltype, geom) = next(iter(geoms.items()))
            if ltype not in ("line", "spline") or geom.geom_type != "LineString":
                continue
            dist = points.distance(geom).to_numpy()
            poly = buffer_polygon(lm, ltype, geom)
            if poly is not None:
                inside = points.intersects(poly).to_numpy()
            else:
                inside = dist <= default_radius
            for i in indices:
                if not inside[i]:
                    continue
                s = float(geom.project(points.iloc[i], normalized=True))
                rows.append(
                    {
                        "point_index": int(i),
                        "group": groups[i],
                        "s": s,
                        "distance": float(dist[i]),
                    }
                )
        return pd.DataFrame(rows)


    def buffer_composition(x, y, groups, landmarks, indices):
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        rows = []
        for lm in landmarks:
            geoms = landmark_geoms([lm])
            if not geoms:
                continue
            lid, (ltype, geom) = next(iter(geoms.items()))
            poly = buffer_polygon(lm, ltype, geom)
            if poly is None:
                continue
            mask = cand & points.intersects(poly).to_numpy()
            n = int(mask.sum())
            if n == 0:
                continue
            values, counts = np.unique(groups[mask], return_counts=True)
            for value, count in zip(values, counts, strict=True):
                rows.append(
                    {
                        "landmark_id": lid,
                        "group": value,
                        "count": int(count),
                        "proportion": float(count) / n,
                        "n_total": n,
                    }
                )
        return pd.DataFrame(rows)

    def paired_axis(x, y, groups, lm_base, lm_top, indices):
        g0 = landmark_geoms(lm_base)
        g1 = landmark_geoms(lm_top)
        if not g0 or not g1:
            return pd.DataFrame()
        _, geom0 = next(iter(g0.values()))
        _, geom1 = next(iter(g1.values()))
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        d0 = points.distance(geom0).to_numpy()
        d1 = points.distance(geom1).to_numpy()
        rows = []
        for i in indices:
            denom = d0[i] + d1[i]
            s = float(d0[i] / denom) if denom > 1e-9 else 0.5
            rows.append({"point_index": int(i), "group": groups[i], "s": s})
        return pd.DataFrame(rows)

    def ring_positions(x, y, groups, landmarks, indices, radius=None):
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        if radius is None:
            radius = 0.08 * max(
                float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0)
            )
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            if ltype == "shape" and geom.geom_type == "Polygon":
                ring = geom.exterior
            elif geom.geom_type == "LineString" and geom.is_ring:
                ring = geom
            else:
                continue
            dist = points.distance(ring).to_numpy()
            for i in indices:
                if dist[i] > radius:
                    continue
                s = float(ring.project(points.iloc[i], normalized=True))
                rows.append(
                    {
                        "point_index": int(i),
                        "group": groups[i],
                        "s": s,
                        "distance": float(dist[i]),
                    }
                )
        return pd.DataFrame(rows)

    def kde_row_heatmap(
        df,
        value_col,
        row_order,
        title,
        xlabel,
        x_min=0.0,
        x_max=None,
        n_bins=128,
        tick_step=None,
        theme="dark",
    ):
        """Max-normalized 1D KDE per row on a fine grid, KDE-smoothed along each row; no interpolation between rows."""
        from scipy.stats import gaussian_kde

        rows = []
        for group in row_order:
            values = df.loc[df["group"] == group, value_col].to_numpy(
                dtype=float
            )
            values = values[np.isfinite(values)]
            if values.size:
                rows.append((group, values))
        if not rows:
            return None

        x_min = float(x_min)
        data_max = max(float(values.max()) for _, values in rows)
        x_max = float(data_max if x_max is None else x_max)
        if x_max <= x_min:
            return None
        span = x_max - x_min
        grid = np.linspace(x_min, x_max, int(n_bins))

        mat = []
        shown = []
        for group, values in rows:
            if values.size == 1:
                sigma = max(0.025 * span, 1e-6)
                dens = np.exp(-0.5 * ((grid - values[0]) / sigma) ** 2)
            else:
                factor = max(float(values.size) ** (-0.2) * 0.9, 0.08)
                spread = float(np.std(values))
                if spread < 1e-9:
                    sigma = max(0.025 * span, 1e-6)
                    dens = np.exp(
                        -0.5 * ((grid - float(values[0])) / sigma) ** 2
                    )
                else:
                    jittered = values + np.random.default_rng(0).normal(
                        0.0, 1e-6 * span, size=values.size
                    )
                    kde = gaussian_kde(jittered, bw_method=factor)
                    dens = kde(grid)
            peak = float(np.nanmax(dens))
            if peak <= 0:
                continue
            mat.append(dens / peak)
            shown.append(group)
        if not mat:
            return None
        mat = np.vstack(mat)
        dx = float(grid[1] - grid[0]) if len(grid) > 1 else 1.0
        long_rows = []
        for i, group in enumerate(shown):
            for j, xv in enumerate(grid):
                long_rows.append(
                    {
                        "group": group,
                        "x": float(xv - 0.5 * dx),
                        "x2": float(xv + 0.5 * dx),
                        "density": float(mat[i, j]),
                    }
                )
        heat = pd.DataFrame(long_rows)
        _lo, _hi = sequential_range(theme)
        chart = (
            alt.Chart(heat)
            .mark_rect()
            .encode(
                x=alt.X(
                    "x:Q", title=xlabel, scale=alt.Scale(domain=[x_min, x_max])
                ),
                x2="x2:Q",
                y=alt.Y("group:N", sort=shown, title="cell type"),
                color=alt.Color(
                    "density:Q",
                    title="Density (Norm.)",
                    scale=alt.Scale(range=[_lo, _hi], domain=[0, 1]),
                    legend=alt.Legend(orient="right", values=[0, 0.5, 1]),
                ),
                tooltip=[
                    alt.Tooltip("group:N"),
                    alt.Tooltip("x:Q", format=".3f", title=xlabel),
                    alt.Tooltip("density:Q", format=".2f"),
                ],
            )
            .properties(
                title=title,
                width=420,
                height=max(140, 18 * len(shown)),
            )
        )
        return altair_theme(chart, theme)

    def kde_gene_heatmap(
        pos_df,
        value_col,
        expr_df,
        genes,
        title,
        xlabel,
        x_min,
        x_max,
        theme="dark",
        n_bins=128,
    ):
        """Kernel-smoothed mean expression per gene along one axis; no row blending."""
        if (
            pos_df is None
            or pos_df.empty
            or expr_df is None
            or expr_df.empty
            or not genes
        ):
            return None
        if (
            "point_index" not in pos_df.columns
            or value_col not in pos_df.columns
        ):
            return None
        pos = pos_df[value_col].to_numpy(dtype=float)
        idx = pos_df["point_index"].to_numpy(dtype=int)
        ok = np.isfinite(pos)
        pos = pos[ok]
        idx = idx[ok]
        if pos.size == 0:
            return None
        x_min = float(x_min)
        x_max = float(x_max)
        if x_max <= x_min:
            return None
        grid = np.linspace(x_min, x_max, int(n_bins))
        bw = max(0.03 * (x_max - x_min), 1e-6)
        shown = [g for g in genes if g in expr_df.columns]
        if not shown:
            return None
        mat = np.full((len(shown), int(n_bins)), np.nan)
        for gi, gene in enumerate(shown):
            expr = expr_df[gene].to_numpy(dtype=float)
            yp = expr[idx]
            finite = np.isfinite(yp)
            if finite.sum() < 2:
                continue
            xp = pos[finite]
            yy = yp[finite]
            d = (xp[:, None] - grid[None, :]) / bw
            w = np.exp(-0.5 * d * d)
            den = w.sum(axis=0)
            num = yy @ w
            with np.errstate(invalid="ignore"):
                mu = np.divide(
                    num,
                    den,
                    out=np.full(int(n_bins), np.nan),
                    where=den > 1e-9,
                )
            mat[gi] = mu
        if not np.isfinite(mat).any():
            return None
        dx = float(grid[1] - grid[0]) if len(grid) > 1 else 1.0
        long_rows = []
        for i, gene in enumerate(shown):
            for j, xv in enumerate(grid):
                val = mat[i, j]
                if not np.isfinite(val):
                    continue
                long_rows.append(
                    {
                        "gene": gene,
                        "x": float(xv - 0.5 * dx),
                        "x2": float(xv + 0.5 * dx),
                        "expression": float(val),
                    }
                )
        if not long_rows:
            return None
        heat = pd.DataFrame(long_rows)
        _lo, _hi = sequential_range(theme)
        chart = (
            alt.Chart(heat)
            .mark_rect()
            .encode(
                x=alt.X(
                    "x:Q", title=xlabel, scale=alt.Scale(domain=[x_min, x_max])
                ),
                x2="x2:Q",
                y=alt.Y("gene:N", sort=shown, title="gene"),
                color=alt.Color(
                    "expression:Q",
                    title="mean expression",
                    scale=alt.Scale(range=[_lo, _hi]),
                ),
                tooltip=[
                    alt.Tooltip("gene:N"),
                    alt.Tooltip("x:Q", format=".3f", title=xlabel),
                    alt.Tooltip("expression:Q", format=".3f"),
                ],
            )
            .properties(
                title=title,
                width=420,
                height=max(120, 20 * len(shown)),
            )
        )
        return altair_theme(chart, theme)

    def build_recipe_scenes(xy):
        from shapely.geometry import MultiPoint

        x = xy["x"].to_numpy(dtype=float)
        y = xy["y"].to_numpy(dtype=float)
        m = xy["mucosal_pseudospace"].to_numpy(dtype=float)
        layer = xy["anatomical_layer"].to_numpy()
        cls = xy["cell_class"].to_numpy()

        epi = (cls == "Epithelial") & (m >= 0)
        win = epi & (x >= 2797) & (x < 2938) & (y >= 300) & (y < 465)
        ws, wx, wy = m[win], x[win], y[win]
        edges = np.linspace(float(ws.min()), float(ws.max()), 7)
        cv = []
        for lo, hi in zip(edges[:-1], edges[1:], strict=True):
            band = (ws >= lo) & (ws < hi)
            if band.sum():
                cv.append(
                    [float(np.median(wx[band])), float(np.median(wy[band]))]
                )

        def spline(lid, verts):
            _buf = 0.05 * max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
            return {
                "id": lid,
                "type": "spline",
                "vertices": verts,
                "tension": 0.0,
                "buffer_width": _buf,
                "buffer_side": "both",
            }

        cv_spline = spline("crypt-villus", cv)

        galt = xy[xy["anatomical_layer"] == "GALT"]
        gx = np.round(galt["x"].to_numpy() / 80.0) * 80.0
        gy = np.round(galt["y"].to_numpy() / 80.0) * 80.0
        vc = pd.DataFrame({"gx": gx, "gy": gy}).value_counts()
        bx, by = vc.index[0]
        near = galt[
            (np.abs(galt["x"] - bx) < 180) & (np.abs(galt["y"] - by) < 180)
        ]
        hull = MultiPoint(near[["x", "y"]].to_numpy()).convex_hull.simplify(12)
        galt_verts = [
            [float(px), float(py)] for px, py in hull.exterior.coords[:-1]
        ]
        galt_shape = {
            "id": "GALT",
            "type": "shape",
            "vertices": galt_verts,
            "tension": 0.35,
        }

        base = xy[
            (xy["cell_class"] == "Epithelial")
            & (xy["mucosal_pseudospace"] >= 0)
            & (xy["mucosal_pseudospace"] < 0.35)
        ]
        bxy = base[["x", "y"]].to_numpy(dtype=float)
        b0 = bxy - bxy.mean(0)
        _, evecs = np.linalg.eigh(b0.T @ b0)
        proj = b0 @ evecs[:, -1]
        order = np.argsort(proj)
        belt = []
        for q in np.linspace(0.08, 0.92, 8):
            k = int(q * (len(order) - 1))
            sl = bxy[order[max(0, k - 50) : k + 50]]
            belt.append([float(sl[:, 0].mean()), float(sl[:, 1].mean())])
        belt_line = spline("mucosal belt", belt)

        def scene(landmarks, plot, mode, selections=None, selection_id="all"):
            return {
                "landmarks": landmarks,
                "selections": selections or [],
                "plot": plot,
                "mode": mode,
                "selection_id": selection_id,
            }

        return {
            "Crypt-villus axis": scene(
                [cv_spline], "Gradient (along)", "spline"
            ),
            "Mucosal belt": scene(
                [belt_line], "Gradient (perpendicular)", "spline"
            ),
            "GALT niche": scene([galt_shape], "Composition", "shape"),
            "Spatial gene expression": scene(
                [cv_spline], "Gene (along)", "spline"
            ),
        }

    RECIPE_SCENES = build_recipe_scenes(gut_xy)
    return (
        RECIPE_SCENES,
        along_positions,
        altair_theme,
        kde_gene_heatmap,
        kde_row_heatmap,
        sequential_range,
    )


@app.cell
def _(LandmarksWidget, gut_xy, matplotlib, np, plt, theme):
    CLASS_COLORS = {
        "Epithelial": "#4c78a8",
        "Immune": "#e45756",
        "Fibroblast": "#72b7b2",
        "Smooth Muscle": "#f58518",
        "Endothelial": "#54a24b",
        "ENS": "#b279a2",
        "Interstitial": "#9d755d",
    }
    # Empirically observed types (present in this slice), ordered for map + measures.
    _FOCUS_CANDIDATES = [
        # Crypt–villus epithelium
        "Stem",
        "Enterocyte (bottom)",
        "Enterocyte (mid)",
        "Enterocyte (top)",
        "Enterocyte (Scnn1g+)",
        "Goblet (bottom)",
        "Goblet (top)",
        "Paneth",
        "Tuft",
        # Lamina propria / submucosa stroma
        "Telocyte (bottom)",
        "Telocyte (mid)",
        "Telocyte (top)",
        "FB1b (lamina propria, bottom)",
        "FB1a (lamina propria, top)",
        "FB2a (submucosa, Grem1+)",
        "FB3 (muscularis externa)",
        "Pericyte",
        # Muscle / interstitial / ENS (main observed)
        "SMC (circular)",
        "SMC (longitudinal)",
        "SMC (muscularis mucosae)",
        "SMC (lamina propria)",
        "ICC (myenteric plexus)",
        "ICC (deep muscular plexus)",
        "Glia1 (Slc18a2+)",
        "Glia2 (Gfra3+)",
        "Neuron1 (excitatory motor)",
        # Vasculature
        "Endothelial (capillary)",
        "Endothelial (lymphatic)",
        # Immune (observed, drop ultra-rare)
        "B (plasma)",
        "B (cycling)",
        "B (follicular)",
        "T (Cd8+)",
        "T (Cd4+)",
        "T (memory)",
        "Treg",
        "Macrophage (Itgax+)",
        "Macrophage (Mrc1+)",
        "Macrophage (Lyve1+)",
        "ILC3",
        "ILC2",
        "cDC (Il22ra2+)",
        "cDC1",
        "cDC (Ccl22+)",
        "cDC2",
        "Monocyte",
        "NK",
        "FDC",
    ]
    _observed = set(gut_xy["cell_type"].astype(str))
    FOCUS_TYPES = [t for t in _FOCUS_CANDIDATES if t in _observed]
    _focus_set = set(FOCUS_TYPES)
    _rest = [
        t
        for t in gut_xy["cell_type"].astype(str).value_counts().index.tolist()
        if t not in _focus_set
    ]
    # Focus first (stable legend/chart order), then remaining for composition/GALT.
    _type_order = FOCUS_TYPES + _rest
    _cycle = plt.rcParams["axes.prop_cycle"].by_key()["color"]
    group_colors = {
        _ct: matplotlib.colors.to_hex(_cycle[_i % len(_cycle)])
        for _i, _ct in enumerate(_type_order)
    }

    _span = max(
        float(np.ptp(gut_xy["x"].to_numpy(dtype=float)) or 1.0),
        float(np.ptp(gut_xy["y"].to_numpy(dtype=float)) or 1.0),
    )
    DEFAULT_BUFFER = 0.05 * _span  # ~5% of extent; band used by measures

    landmarks = LandmarksWidget.from_points(
        gut_xy["x"],
        gut_xy["y"],
        color=gut_xy["cell_class"],
        color_map=CLASS_COLORS,
        legend_title="Cell class",
        width=1100,
        height=600,
        point_size=2.5,
        point_opacity=0.8,
        background="#0f172a" if theme == "dark" else "#ffffff",
        mode="select",
        stroke_width=4,
        default_buffer_width=DEFAULT_BUFFER,
    )
    return CLASS_COLORS, FOCUS_TYPES, group_colors, landmarks


@app.cell(hide_code=True)
def _(RECIPE_SPECS, recipe_gallery_ui):
    _idx = int(recipe_gallery_ui.value.get("selected_index", 0) or 0)
    if _idx < 0 or _idx >= len(RECIPE_SPECS):
        _idx = 0
    use_case = RECIPE_SPECS[_idx]["id"]
    return (use_case,)


@app.cell(hide_code=True)
def _(RECIPE_SCENES, use_case):
    recipe_scene = RECIPE_SCENES[use_case]
    # Use cases set the suggested measure only; landmarks are user-drawn.
    return (recipe_scene,)


@app.cell
def _(gene_panel, mo):
    _opts = ["Cell class", "Cell type"]
    if gene_panel:
        _opts = _opts + ["Expression"]
    color_by = mo.ui.radio(
        options=_opts, value="Cell class", label="Color cells by", inline=True
    )
    expr_gene = mo.ui.dropdown(
        options=gene_panel or ["(load gene panel)"],
        value=(gene_panel or ["(load gene panel)"])[0],
        label="Gene",
    )
    return color_by, expr_gene


@app.cell(hide_code=True)
def _(color_by, expr_gene, mo):
    _color_rows = [color_by]
    if color_by.value == "Expression":
        _color_rows.append(expr_gene)
    color_controls = mo.hstack(_color_rows, justify="start")
    return (color_controls,)


@app.cell(hide_code=True)
def _(
    CLASS_COLORS,
    FOCUS_TYPES,
    color_by,
    expr_gene,
    gene_panel,
    group_colors,
    gut_expr,
    gut_xy,
    landmarks,
    np,
    sequential_range,
    theme,
):
    _mode = color_by.value
    if (
        _mode == "Expression"
        and gene_panel
        and expr_gene.value in getattr(gut_expr, "columns", [])
    ):
        landmarks.set_color(
            gut_expr[expr_gene.value].to_numpy(dtype=float),
            legend_title=str(expr_gene.value),
            continuous_range=sequential_range(theme),
        )
    elif _mode == "Cell type":
        _types = gut_xy["cell_type"].astype(str).to_numpy()
        _focus = set(FOCUS_TYPES)
        _mapped = np.where(np.isin(_types, list(_focus)), _types, "Other")
        _cmap = {t: group_colors[t] for t in FOCUS_TYPES if t in group_colors}
        _cmap["Other"] = "#94a3b8"
        landmarks.set_color(
            _mapped,
            color_map=_cmap,
            legend_title="Cell type",
        )
        # Legend = focus only; non-focus stays grey on the map as "Other".
        landmarks.legend_labels = [
            t for t in FOCUS_TYPES if t in set(_mapped.tolist())
        ]
    else:
        landmarks.set_color(
            gut_xy["cell_class"].astype(str).to_numpy(),
            color_map=CLASS_COLORS,
            legend_title="Cell class",
        )
    return


@app.cell
def _(landmarks, mo):
    landmarks_ui = mo.ui.anywidget(landmarks)
    return (landmarks_ui,)


@app.cell
def _(mo):
    # State must live in its own cell — never call setters in the definition cell.
    get_lm_pick, set_lm_pick = mo.state(None)
    get_measure_pick, set_measure_pick = mo.state(
        {"use_case": None, "plot": None, "sel": "all"}
    )
    return get_lm_pick, get_measure_pick, set_lm_pick, set_measure_pick


@app.cell
def _(
    gene_panel,
    get_lm_pick,
    get_measure_pick,
    landmarks_ui,
    mo,
    recipe_scene,
    set_lm_pick,
    set_measure_pick,
    use_case,
):
    # Persist landmark/measure picks across landmarks_ui refreshes.
    # Never call mo.state setters in this cell body (runtime error); only via on_change.
    # Measure/selection follow the recipe when use_case changes.
    _lm_ids = [
        str(lm.get("id"))
        for lm in landmarks_ui.landmarks
        if not lm.get("hidden")
    ]
    _sel_ids = ["all"] + [str(s.get("id")) for s in landmarks_ui.selections]

    _lm = get_lm_pick()
    if _lm not in _lm_ids:
        _lm = _lm_ids[0] if _lm_ids else "(none)"

    _plot_opts = sorted(
        [
            "Distance",
            "Gradient (perpendicular)",
            "Composition",
            "Gradient (along)",
            "Gene (along)",
            "Gene (perpendicular)",
        ]
    )
    _scene_plot = recipe_scene.get("plot", "Gradient (along)")
    if _scene_plot == "Gene (away)":
        _scene_plot = "Gene (perpendicular)"
    if _scene_plot not in _plot_opts:
        _scene_plot = _plot_opts[0]

    _scene_sel = recipe_scene.get("selection_id", "all")
    if _scene_sel not in _sel_ids:
        _scene_sel = "all"

    _stored = get_measure_pick() or {}
    if _stored.get("use_case") != use_case:
        _plot = _scene_plot
        _sel = _scene_sel
    else:
        _plot = _stored.get("plot")
        if _plot not in _plot_opts:
            _plot = _scene_plot
        _sel = _stored.get("sel")
        if _sel not in _sel_ids:
            _sel = "all"

    def _on_measure_change(kind):
        def _handler(value):
            cur = dict(get_measure_pick() or {})
            cur["use_case"] = use_case
            if kind == "plot":
                cur["plot"] = value
            else:
                cur["sel"] = value
            if cur.get("plot") is None:
                cur["plot"] = _plot
            if cur.get("sel") is None:
                cur["sel"] = _sel
            set_measure_pick(cur)

        return _handler

    landmark_pick = mo.ui.dropdown(
        options=_lm_ids or ["(none)"],
        value=_lm,
        label="Landmark",
        on_change=set_lm_pick,
    )
    selection_pick = mo.ui.dropdown(
        options=_sel_ids,
        value=_sel,
        label="Selection",
        on_change=_on_measure_change("sel"),
    )
    plot_type = mo.ui.dropdown(
        options=_plot_opts,
        value=_plot,
        label="Measure",
        on_change=_on_measure_change("plot"),
    )
    _gene_default = [
        g
        for g in (
            "Apob",
            "Lgr5",
            "Itgax",
            "Cxcl16",
            "Scnn1g",
            "Ccl20",
            "Chat",
            "Nos1",
        )
        if g in gene_panel
    ]
    gene_pick = mo.ui.multiselect(
        options=gene_panel or ["(none)"],
        value=_gene_default,
        label="Genes",
        full_width=True,
    )
    return gene_pick, landmark_pick, plot_type, selection_pick


@app.cell(hide_code=True)
def _(gene_pick, landmark_pick, mo, plot_type, selection_pick):
    _gene_measures = {"Gene (along)", "Gene (perpendicular)"}
    _measure_rows = [landmark_pick, selection_pick, plot_type]
    if plot_type.value in _gene_measures:
        _measure_rows.append(gene_pick)
    measure_controls = mo.vstack(_measure_rows, gap=0.35)
    return (measure_controls,)


@app.cell
def _(
    FOCUS_TYPES,
    along_positions,
    alt,
    altair_theme,
    color_controls,
    composition,
    distances,
    gene_pick,
    group_colors,
    gut_expr,
    gut_xy,
    kde_gene_heatmap,
    kde_row_heatmap,
    landmark_pick,
    landmarks_ui,
    measure_controls,
    mo,
    np,
    plot_type,
    recipe_gallery_ui,
    selection_pick,
    theme,
    use_case,
):
    _x = gut_xy["x"].to_numpy()
    _y = gut_xy["y"].to_numpy()
    _groups = gut_xy["cell_type"].to_numpy()
    _sid = selection_pick.value
    _idx = landmarks_ui.get_indices(_x, _y, selection_id=_sid)
    _hue_order = list(group_colors.keys())
    _lid = landmark_pick.value
    _lms = [lm for lm in landmarks_ui.landmarks if str(lm.get("id")) == _lid]
    _focus = list(FOCUS_TYPES)
    _focus_set = set(_focus)

    def _nice_limit_and_step(limit, target_ticks=4):
        limit = float(max(limit, 0.0))
        if limit <= 0:
            return 1.0, 1.0
        exp = int(np.floor(np.log10(limit)))
        base = 10.0**exp
        nice_hi = next(
            (m * base for m in (1, 2, 5, 10) if m * base >= limit), 10 * base
        )
        raw = nice_hi / max(target_ticks - 1, 1)
        exp = int(np.floor(np.log10(raw))) if raw > 0 else 0
        base = 10.0**exp
        step = next(
            (m * base for m in (1, 2, 5, 10) if m * base >= raw), 10 * base
        )
        return nice_hi, step

    def _hist_heatmap(
        df,
        value_col,
        row_order,
        title,
        xlabel,
        x_max=None,
        x_min=0.0,
        n_bins=128,
    ):
        """Max-normalized row heatmap: 1D KDE on a fine grid."""
        if df.empty or not row_order:
            return None
        vals = df.loc[df["group"].isin(row_order), value_col]
        vals = vals.to_numpy(dtype=float)
        vals = vals[np.isfinite(vals)]
        if vals.size == 0:
            return None
        if x_max is None:
            x_max, step = _nice_limit_and_step(float(vals.max()))
        else:
            x_max = float(x_max)
            _, step = _nice_limit_and_step(max(x_max - x_min, 1e-9))
        return kde_row_heatmap(
            df,
            value_col,
            row_order,
            title,
            xlabel,
            x_min=x_min,
            x_max=x_max,
            n_bins=n_bins,
            tick_step=step,
            theme=theme,
        )

    def _along_positions(x, y, groups, landmarks, indices, radius=None):
        """Project selected cells onto line/spline landmarks → normalized path position s."""
        return along_positions(x, y, groups, landmarks, indices, radius=radius)

    if not _lms:
        chart = mo.md("_Add a landmark on the map to unlock measurements._")
    elif plot_type.value == "Distance":
        _d = distances(_x, _y, _groups, _lms, _idx)
        if not _d.empty:
            if use_case == "GALT niche":
                keep = set(_d["group"])
            else:
                keep = _focus_set
            _d = _d[_d["group"].isin(keep)]
        _order = [
            g for g in _focus if (not _d.empty and g in set(_d["group"]))
        ]
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        else:
            _domain = [g for g in _order if g in set(_d["group"])]
            _range = [group_colors.get(g, "#888888") for g in _domain]
            _base = alt.Chart(_d).encode(
                y=alt.Y(
                    "group:N",
                    title=None,
                    sort=_domain,
                    axis=alt.Axis(labelLimit=160),
                ),
                color=alt.Color(
                    "group:N",
                    scale=alt.Scale(domain=_domain, range=_range),
                    legend=None,
                ),
            )
            _box = _base.mark_boxplot(size=14, outliers=False).encode(
                x=alt.X("distance:Q", title="distance")
            )
            _pts = _base.mark_circle(size=18, opacity=0.28).encode(
                x="distance:Q",
                tooltip=["group:N", alt.Tooltip("distance:Q", format=".2f")],
            )
            chart = altair_theme(
                (_box + _pts).properties(
                    title=f"Distance · {_lid} · selection={_sid}",
                    # width=280,
                    height=max(180, 22 * len(_domain)),
                ),
                theme,
            )
    elif plot_type.value == "Gradient (perpendicular)":
        _d = distances(_x, _y, _groups, _lms, _idx)
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        else:
            _row_order = [g for g in _focus if g in set(_d["group"])]
            _hi, _ = _nice_limit_and_step(float(_d["distance"].quantile(0.98)))
            chart = _hist_heatmap(
                _d,
                "distance",
                _row_order,
                f"Gradient (perpendicular) · {_lid} · selection={_sid}",
                "distance from landmark",
                x_max=_hi,
            ) or mo.md(
                "_No cells in distance bins for this landmark / selection._"
            )
    elif plot_type.value == "Composition":
        _c = composition(_x, _y, _groups, _lms, _idx)
        if _c.empty:
            chart = mo.md("_Need a **shape** landmark that covers cells._")
        else:
            _domain = [g for g in _hue_order if g in set(_c["group"])]
            _range = [group_colors.get(g, "#888888") for g in _domain]
            _n = int(_c["n_total"].iloc[0]) if len(_c) else 0
            chart = altair_theme(
                alt.Chart(_c)
                .mark_bar()
                .encode(
                    y=alt.Y(
                        "group:N",
                        title=None,
                        sort=_domain,
                        axis=alt.Axis(labelLimit=160),
                    ),
                    x=alt.X("proportion:Q", title="proportion"),
                    color=alt.Color(
                        "group:N",
                        scale=alt.Scale(domain=_domain, range=_range),
                        legend=None,
                    ),
                    tooltip=[
                        "group:N",
                        alt.Tooltip("proportion:Q", format=".3f"),
                        alt.Tooltip("count:Q"),
                    ],
                )
                .properties(
                    title=f"Composition · {_lid} · n={_n} · selection={_sid}",
                    # width=280,
                    height=max(180, 22 * len(_domain)),
                ),
                theme,
            )

    elif plot_type.value == "Gene (along)":
        _genes = [
            g for g in gene_pick.value if g in getattr(gut_expr, "columns", [])
        ]
        _p = along_positions(_x, _y, _groups, _lms, _idx)
        if _p.empty:
            chart = mo.md(
                "_Need a **line** or **spline** near cells for Gene (along)._"
            )
        elif not _genes or gut_expr.empty:
            chart = mo.md("_Gene panel missing for this slice._")
        else:
            chart = kde_gene_heatmap(
                _p,
                "s",
                gut_expr,
                _genes,
                f"Gene (along) · {_lid} · selection={_sid}",
                "along path (start → end)",
                0.0,
                1.0,
                theme=theme,
            ) or mo.md("_No expression along this path._")
    elif plot_type.value == "Gene (perpendicular)":
        _genes = [
            g for g in gene_pick.value if g in getattr(gut_expr, "columns", [])
        ]
        _d = distances(_x, _y, _groups, _lms, _idx)
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        elif not _genes or gut_expr.empty:
            chart = mo.md("_Gene panel missing for this slice._")
        else:
            _hi, _ = _nice_limit_and_step(float(_d["distance"].quantile(0.98)))
            chart = kde_gene_heatmap(
                _d,
                "distance",
                gut_expr,
                _genes,
                f"Gene (perpendicular) · {_lid} · selection={_sid}",
                "distance from landmark",
                0.0,
                _hi,
                theme=theme,
            ) or mo.md("_No expression vs distance._")
    else:
        _p = _along_positions(_x, _y, _groups, _lms, _idx)
        if _p.empty:
            chart = mo.md(
                "_Need a **line** or **spline** landmark for Gradient (along)._"
            )
        else:
            _row_order = [g for g in _focus if g in set(_p["group"])]
            chart = _hist_heatmap(
                _p,
                "s",
                _row_order,
                f"Gradient (along) · {_lid} · selection={_sid}",
                "along path (start → end)",
                x_min=0.0,
                x_max=1.0,
            ) or mo.md("_No nearby cells in path bins._")

    _map_panel = mo.vstack(
        [color_controls, landmarks_ui],
        gap=0.5,
    )
    _gallery_col = mo.vstack(
        [
            mo.md("**Use cases**"),
            mo.md("Click a card for the suggested measure."),
            recipe_gallery_ui,
        ],
        gap=0.35,
    )
    _params_and_plot = mo.vstack(
        [measure_controls, chart],
        gap=0.5,
    )
    # align="start" keeps the params column content-height so the plot
    # sits under the controls instead of stretching to the gallery height.
    _measure_panel = mo.hstack(
        [_gallery_col, _params_and_plot],
        widths=[1, 3],
        align="start",
        gap=2,
    )

    mo.vstack(
        [
            mo.md("### Spatial measurements"),
            _map_panel,
            _measure_panel,
        ],
        gap=2,
    )
    return


@app.cell(hide_code=True)
def _(GalleryWidget, RECIPE_DRAWINGS, RECIPE_SPECS, mo):
    from base64 import b64encode as _b64encode

    _items = []
    for _spec in RECIPE_SPECS:
        _path = RECIPE_DRAWINGS[_spec["kind"]]
        _src = "data:image/svg+xml;base64," + _b64encode(
            _path.read_bytes()
        ).decode("ascii")
        _items.append(
            {
                "title": _spec["id"],
                "description": _spec["description"],
                "image": _src,
            }
        )

    recipe_gallery = GalleryWidget(items=_items, selected_index=0, columns=1)
    recipe_gallery_ui = mo.ui.anywidget(recipe_gallery)
    return (recipe_gallery_ui,)


if __name__ == "__main__":
    app.run()
