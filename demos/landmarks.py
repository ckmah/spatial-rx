# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo",
#     "matplotlib",
#     "seaborn",
#     "numpy",
#     "pandas",
#     "shapely",
#     "geopandas",
#     "spatial-rx",
# ]
# ///

import marimo

__generated_with = "0.23.3"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd
    import seaborn as sns
    import geopandas as gpd
    from shapely.geometry import LineString, Point, Polygon
    from spatial_rx import LandmarksWidget

    return (
        LandmarksWidget,
        LineString,
        Point,
        Polygon,
        gpd,
        matplotlib,
        mo,
        np,
        pd,
        plt,
        sns,
    )


@app.cell
def _(matplotlib, mo):
    theme = mo.app_meta().theme
    matplotlib.style.use("dark_background" if theme == "dark" else "default")
    return (theme,)


@app.cell
def _(LineString, Point, Polygon, gpd, np, pd):
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
            if kind == "point":
                if data_pts:
                    geoms[lid] = ("point", Point(data_pts[0]))
            elif kind == "line":
                if len(data_pts) >= 2:
                    geoms[lid] = ("line", LineString(data_pts))
            elif kind == "spline":
                sampled = cardinal_sample(data_pts, float(lm.get("tension") or 0.0))
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

    def distances(x, y, groups, landmarks, indices):
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            dist = points.distance(geom).to_numpy()
            for i in indices:
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
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            if ltype != "shape":
                continue
            mask = cand & points.intersects(geom).to_numpy()
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
        x = np.asarray(x, dtype=float)
        y = np.asarray(y, dtype=float)
        groups = np.asarray(groups)
        indices = np.asarray(indices, dtype=int)
        points = gpd.GeoSeries(gpd.points_from_xy(x, y))
        cand = np.zeros(len(x), dtype=bool)
        cand[indices] = True
        if radius is None:
            radius = 0.05 * max(float(np.ptp(x) or 1.0), float(np.ptp(y) or 1.0))
        all_groups = [g for g in pd.unique(groups) if g is not None]
        rows = []
        for lid, (ltype, geom) in landmark_geoms(landmarks).items():
            if ltype not in ("line", "spline") or geom.geom_type != "LineString":
                continue
            for i in range(n):
                s = i / max(n - 1, 1)
                pt = geom.interpolate(s, normalized=True)
                neighborhood = (points.distance(pt) <= radius).to_numpy() & cand
                local_groups = groups[neighborhood]
                local_dist = points.distance(pt).to_numpy()[neighborhood]
                n_pts = int(neighborhood.sum())
                mean_dist = float(local_dist.mean()) if n_pts else float("nan")
                if n_pts == 0:
                    for g in all_groups:
                        rows.append(
                            {
                                "landmark_id": lid,
                                "landmark_type": ltype,
                                "s": s,
                                "x": float(pt.x),
                                "y": float(pt.y),
                                "n_points": 0,
                                "mean_dist": mean_dist,
                                "group": g,
                                "proportion": float("nan"),
                            }
                        )
                    continue
                values, counts = np.unique(local_groups, return_counts=True)
                freq = {v: c / n_pts for v, c in zip(values, counts, strict=True)}
                for g in all_groups:
                    rows.append(
                        {
                            "landmark_id": lid,
                            "landmark_type": ltype,
                            "s": s,
                            "x": float(pt.x),
                            "y": float(pt.y),
                            "n_points": n_pts,
                            "mean_dist": mean_dist,
                            "group": g,
                            "proportion": float(freq.get(g, 0.0)),
                        }
                    )
        return pd.DataFrame(rows)

    return composition, distances, profile


@app.cell(hide_code=True)
def _(mo):
    mo.md("""
    # LandmarksWidget Demo

    1. Place **landmarks** (point / line / spline / shape).
    2. Optionally draw **selections**. Downstream dropdowns pick landmark + selection
       (`get_indices(..., selection_id=…)`; ``all`` ⇒ every point).
    3. Notebook helpers compute Distance / Composition / Profile for seaborn plots.
    """)
    return


@app.cell
def _(np):
    rng = np.random.default_rng(7)
    centers = np.array([[-2.0, -1.5], [2.0, -1.0], [0.5, 2.0]])
    groups = np.array([f"g{g}" for g in rng.integers(0, 3, size=400)])
    x_data = centers[[int(g[1]) for g in groups], 0] + rng.normal(0, 0.7, size=400)
    y_data = centers[[int(g[1]) for g in groups], 1] + rng.normal(0, 0.7, size=400)
    pad = 1.0
    x_lo, x_hi = float(x_data.min() - pad), float(x_data.max() + pad)
    y_lo, y_hi = float(y_data.min() - pad), float(y_data.max() + pad)
    return groups, x_data, x_hi, x_lo, y_data, y_hi, y_lo


@app.cell
def _(
    LandmarksWidget,
    groups,
    np,
    plt,
    x_data,
    x_hi,
    x_lo,
    y_data,
    y_hi,
    y_lo,
):
    fig, ax = plt.subplots(figsize=(6, 6), dpi=110)
    _cycle = plt.rcParams["axes.prop_cycle"].by_key()["color"]
    group_colors = {}
    for _i, g in enumerate(np.unique(groups)):
        _color = _cycle[_i % len(_cycle)]
        group_colors[g] = _color
        m = groups == g
        ax.scatter(x_data[m], y_data[m], s=18, alpha=0.7, label=g, color=_color)
    ax.set_xlim(x_lo, x_hi)
    ax.set_ylim(y_lo, y_hi)
    ax.legend(fontsize=8)
    ax.grid(True, alpha=0.3)
    ax.set_title("Landmarks then selections")
    w = LandmarksWidget(fig, mode="select")
    return group_colors, w


@app.cell
def _(mo, w):
    widget = mo.ui.anywidget(w)
    widget
    return (widget,)


@app.cell
def _(mo, widget):
    _lm_ids = [str(lm.get("id")) for lm in widget.landmarks if not lm.get("hidden")]
    _sel_ids = ["all"] + [str(s.get("id")) for s in widget.selections]
    landmark_pick = mo.ui.dropdown(
        options=_lm_ids or ["(none)"],
        value=_lm_ids[0] if _lm_ids else "(none)",
        label="Landmark",
    )
    selection_pick = mo.ui.dropdown(
        options=_sel_ids,
        value="all",
        label="Selection",
    )
    plot_type = mo.ui.radio(
        options=["Distance", "Composition", "Profile"],
        value="Distance",
        label="Plot",
    )
    mo.hstack([landmark_pick, selection_pick, plot_type], gap=1)
    return landmark_pick, plot_type, selection_pick


@app.cell
def _(
    composition,
    distances,
    group_colors,
    groups,
    landmark_pick,
    matplotlib,
    mo,
    plot_type,
    plt,
    profile,
    selection_pick,
    sns,
    theme,
    widget,
    x_data,
    y_data,
):
    matplotlib.style.use("dark_background" if theme == "dark" else "default")
    _sid = selection_pick.value
    _idx = widget.get_indices(x_data, y_data, selection_id=_sid)
    _hue_order = list(group_colors.keys())
    _lid = landmark_pick.value
    _lms = [lm for lm in widget.landmarks if str(lm.get("id")) == _lid]
    if not _lms:
        out = mo.md("_Add a landmark to explore plots._")
    elif plot_type.value == "Distance":
        _d = distances(x_data, y_data, groups, _lms, _idx)
        if _d.empty:
            out = mo.md("_No distance rows._")
        else:
            _fig, _ax = plt.subplots(figsize=(6, 3.8))
            sns.boxplot(
                data=_d,
                x="group",
                y="distance",
                order=_hue_order,
                hue="group",
                hue_order=_hue_order,
                palette=group_colors,
                ax=_ax,
                legend=False,
            )
            sns.stripplot(
                data=_d,
                x="group",
                y="distance",
                order=_hue_order,
                hue="group",
                hue_order=_hue_order,
                palette=group_colors,
                ax=_ax,
                size=2.5,
                alpha=0.35,
                legend=False,
            )
            _ax.set_title(f"Distance · {_lid} · selection={_sid}")
            _fig.tight_layout()
            out = _fig
    elif plot_type.value == "Composition":
        _c = composition(x_data, y_data, groups, _lms, _idx)
        if _c.empty:
            out = mo.md("_No shape ∩ selection points (need a **shape** landmark)._")
        else:
            _fig, _ax = plt.subplots(figsize=(6, 3.8))
            sns.barplot(
                data=_c,
                x="group",
                y="proportion",
                order=_hue_order,
                hue="group",
                hue_order=_hue_order,
                palette=group_colors,
                ax=_ax,
                legend=False,
            )
            _ax.set_title(f"Composition · {_lid} · selection={_sid}")
            _fig.tight_layout()
            out = _fig
    else:
        _p = profile(x_data, y_data, groups, _lms, _idx, n=30)
        if _p.empty:
            out = mo.md("_No profile rows (need **line** / **spline** landmarks)._")
        else:
            _fig, _ax = plt.subplots(figsize=(6, 3.8))
            sns.lineplot(
                data=_p,
                x="s",
                y="proportion",
                hue="group",
                hue_order=_hue_order,
                palette=group_colors,
                ax=_ax,
            )
            _ax.set_xlabel("along path (s)")
            _ax.set_title(f"Profile · {_lid} · selection={_sid}")
            _fig.tight_layout()
            out = _fig
    out
    return


if __name__ == "__main__":
    app.run()
