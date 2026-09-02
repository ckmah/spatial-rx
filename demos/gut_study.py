# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo>=0.23.3",
#     "matplotlib",
#     "numpy",
#     "pandas",
#     "altair",
#     "geopandas",
#     "shapely",
#     "scipy",
#     "anndata",
#     "squidpy",
#     "spatial-rx[demo]",
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
    # seqFISH landmarks

    Lohoff et al. mouse gastrulation seqFISH via `squidpy.datasets.seqfish()`.
    Spatial neighbors are computed **before** the widget (k-max and radius-max
    graphs). Sliders subset those graphs. Draw landmarks, then measure along a
    path, distance from a structure, or composition inside a shape. Results
    write back to `adata.obs` keyed by `obs_names`.
    """)
    return


@app.cell
def _():
    import altair as alt
    import marimo as mo
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd
    import squidpy as sq
    from spatial_rx import (
        GalleryWidget,
        LandmarksWidget,
        along_positions,
        composition,
        distances,
        write_obs,
    )

    alt.data_transformers.disable_max_rows()
    return (
        GalleryWidget,
        LandmarksWidget,
        along_positions,
        alt,
        composition,
        distances,
        matplotlib,
        mo,
        np,
        pd,
        plt,
        sq,
        write_obs,
    )


@app.cell
def _(matplotlib, mo):
    theme = mo.app_meta().theme
    matplotlib.style.use("dark_background" if theme == "dark" else "default")
    return (theme,)


@app.cell
def _(np, pd, plt, sq):
    import matplotlib.colors as mcolors

    CLUSTER = "celltype_mapped_refined"
    adata = sq.datasets.seqfish()
    adata.obs[CLUSTER] = pd.Categorical(adata.obs[CLUSTER].astype(str))
    _cycle = plt.rcParams["axes.prop_cycle"].by_key()["color"]
    _cats = list(adata.obs[CLUSTER].cat.categories)
    adata.uns[f"{CLUSTER}_colors"] = [
        mcolors.to_hex(_cycle[_i % len(_cycle)]) for _i in range(len(_cats))
    ]
    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    span = float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))
    radius = 0.05 * span
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", n_neighs=64, key_added="spatial_knn"
    )
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", radius=radius, key_added="spatial_radius"
    )
    gene_panel = [str(g) for g in adata.var_names[:12]]
    return CLUSTER, adata, gene_panel


@app.cell
def _():
    RECIPE_SPECS = [
        {
            "id": "Mesoderm axis",
            "kind": "crypt_villus",
            "draw": "Spline along a mesoderm domain",
            "measure": "Gradient (along)",
            "description": "Project cells onto a spline for a 0-1 spatial axis (zonation / pseudospace).",
        },
        {
            "id": "Tissue compartment",
            "kind": "galt",
            "draw": "Closed shape around a domain",
            "measure": "Composition",
            "description": "Cell-type composition inside an arbitrary polygon — the widget differentiator vs neighborhood enrichment.",
        },
        {
            "id": "Distance from structure",
            "kind": "mucosal_belt",
            "draw": "Line or spline along a boundary",
            "measure": "Gradient (perpendicular)",
            "description": "Distance-from-landmark as a continuous covariate for scanpy plotting.",
        },
        {
            "id": "Gene along a path",
            "kind": "gene_along",
            "draw": "Spline through tissue",
            "measure": "Gene (along)",
            "description": "Mean expression along the same 0-1 arc coordinate.",
        },
    ]
    RECIPE_SCENES = {
        spec["id"]: {
            "plot": spec["measure"],
            "mode": "shape" if spec["measure"] == "Composition" else "spline",
            "selection_id": "all",
        }
        for spec in RECIPE_SPECS
    }
    return RECIPE_SCENES, RECIPE_SPECS


@app.cell
def _(CLUSTER, LandmarksWidget, adata, gene_panel):
    landmarks = LandmarksWidget(adata, color=CLUSTER, genes=gene_panel)
    return (landmarks,)


@app.cell
def _(landmarks, mo):
    landmarks_ui = mo.ui.anywidget(landmarks)
    return (landmarks_ui,)


@app.cell
def _(mo):
    get_lm_pick, set_lm_pick = mo.state(None)
    get_measure_pick, set_measure_pick = mo.state(
        {"use_case": None, "plot": None, "sel": "all"}
    )
    return get_lm_pick, get_measure_pick, set_lm_pick, set_measure_pick


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
    return (recipe_scene,)


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
    if _scene_plot not in _plot_opts:
        _scene_plot = _plot_opts[0]
    _stored = get_measure_pick() or {}
    if _stored.get("use_case") != use_case:
        _plot = _scene_plot
        _sel = "all"
    else:
        _plot = _stored.get("plot") or _scene_plot
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
    gene_pick = mo.ui.multiselect(
        options=gene_panel,
        value=gene_panel[:4],
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
def _(alt, np, pd):
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
        if theme == "dark":
            return ("#6b7280", "#f87171")
        return ("#e5e7eb", "#b91c1c")

    def kde_row_heatmap(df, value_col, row_order, title, xlabel, x_min=0.0, x_max=None, n_bins=128, theme="dark"):
        from scipy.stats import gaussian_kde

        rows = []
        for group in row_order:
            values = df.loc[df["group"] == group, value_col].to_numpy(dtype=float)
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
            if values.size == 1 or float(np.std(values)) < 1e-9:
                sigma = max(0.025 * span, 1e-6)
                dens = np.exp(-0.5 * ((grid - float(values[0])) / sigma) ** 2)
            else:
                factor = max(float(values.size) ** (-0.2) * 0.9, 0.08)
                jittered = values + np.random.default_rng(0).normal(
                    0.0, 1e-6 * span, size=values.size
                )
                dens = gaussian_kde(jittered, bw_method=factor)(grid)
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
        return altair_theme(
            alt.Chart(heat)
            .mark_rect()
            .encode(
                x=alt.X("x:Q", title=xlabel, scale=alt.Scale(domain=[x_min, x_max])),
                x2="x2:Q",
                y=alt.Y("group:N", sort=shown, title="cell type"),
                color=alt.Color(
                    "density:Q",
                    title="Density (Norm.)",
                    scale=alt.Scale(range=[_lo, _hi], domain=[0, 1]),
                ),
            )
            .properties(title=title, width=420, height=max(140, 18 * len(shown))),
            theme,
        )

    def kde_gene_heatmap(pos_df, value_col, adata, genes, title, xlabel, x_min, x_max, theme="dark", n_bins=128):
        if pos_df is None or pos_df.empty or not genes:
            return None
        if "obs_name" not in pos_df.columns or value_col not in pos_df.columns:
            return None
        pos = pos_df[value_col].to_numpy(dtype=float)
        names = pos_df["obs_name"].astype(str).to_numpy()
        ok = np.isfinite(pos)
        pos, names = pos[ok], names[ok]
        if pos.size == 0:
            return None
        x_min, x_max = float(x_min), float(x_max)
        if x_max <= x_min:
            return None
        grid = np.linspace(x_min, x_max, int(n_bins))
        bw = max(0.03 * (x_max - x_min), 1e-6)
        shown = [g for g in genes if g in set(map(str, adata.var_names))]
        if not shown:
            return None
        sub = adata[names, shown]
        X = sub.X
        if hasattr(X, "toarray"):
            X = X.toarray()
        X = np.asarray(X, dtype=float)
        mat = np.full((len(shown), int(n_bins)), np.nan)
        for gi in range(len(shown)):
            yp = X[:, gi]
            finite = np.isfinite(yp)
            if finite.sum() < 2:
                continue
            xp, yy = pos[finite], yp[finite]
            d = (xp[:, None] - grid[None, :]) / bw
            w = np.exp(-0.5 * d * d)
            den = w.sum(axis=0)
            num = yy @ w
            with np.errstate(invalid="ignore"):
                mat[gi] = np.divide(
                    num, den, out=np.full(int(n_bins), np.nan), where=den > 1e-9
                )
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
        return altair_theme(
            alt.Chart(heat)
            .mark_rect()
            .encode(
                x=alt.X("x:Q", title=xlabel, scale=alt.Scale(domain=[x_min, x_max])),
                x2="x2:Q",
                y=alt.Y("gene:N", sort=shown, title="gene"),
                color=alt.Color(
                    "expression:Q",
                    title="mean expression",
                    scale=alt.Scale(range=[_lo, _hi]),
                ),
            )
            .properties(title=title, width=420, height=max(120, 20 * len(shown))),
            theme,
        )

    return altair_theme, kde_gene_heatmap, kde_row_heatmap


@app.cell
def _(
    CLUSTER,
    adata,
    along_positions,
    alt,
    altair_theme,
    composition,
    distances,
    gene_pick,
    kde_gene_heatmap,
    kde_row_heatmap,
    landmark_pick,
    landmarks_ui,
    mo,
    plot_type,
    selection_pick,
    theme,
    write_obs,
):
    _sid = selection_pick.value
    _names = landmarks_ui.get_obs_names(adata, selection_id=_sid)
    landmarks_ui.assign_obs_mask(adata, "in_sel", selection_id=_sid)
    _lid = landmark_pick.value
    _lms = [lm for lm in landmarks_ui.landmarks if str(lm.get("id")) == _lid]
    _groups = list(adata.obs[CLUSTER].astype(str).unique())

    if not _lms:
        chart = mo.md("_Add a landmark on the map to unlock measurements._")
    elif plot_type.value == "Distance":
        _d = distances(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        else:
            write_obs(adata, _d, f"dist_{_lid}", "distance")
            _domain = [g for g in _groups if g in set(_d["group"])]
            chart = altair_theme(
                alt.Chart(_d)
                .mark_boxplot(outliers=False)
                .encode(
                    y=alt.Y("group:N", sort=_domain, title=None),
                    x=alt.X("distance:Q"),
                    color=alt.Color("group:N", legend=None),
                )
                .properties(
                    title=f"Distance · {_lid}",
                    height=max(180, 16 * len(_domain)),
                ),
                theme,
            )
    elif plot_type.value == "Gradient (perpendicular)":
        _d = distances(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        else:
            write_obs(adata, _d, f"dist_{_lid}", "distance")
            _row_order = [g for g in _groups if g in set(_d["group"])]
            _hi = float(_d["distance"].quantile(0.98))
            chart = kde_row_heatmap(
                _d,
                "distance",
                _row_order,
                f"Gradient (perpendicular) · {_lid}",
                "distance from landmark",
                x_max=_hi,
                theme=theme,
            ) or mo.md("_No cells in distance bins._")
    elif plot_type.value == "Composition":
        _c = composition(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _c.empty:
            chart = mo.md("_Need a **shape** landmark that covers cells._")
        else:
            _domain = [g for g in _groups if g in set(_c["group"])]
            chart = altair_theme(
                alt.Chart(_c)
                .mark_bar()
                .encode(
                    y=alt.Y("group:N", sort=_domain, title=None),
                    x=alt.X("proportion:Q"),
                    color=alt.Color("group:N", legend=None),
                )
                .properties(title=f"Composition · {_lid}", height=max(180, 16 * len(_domain))),
                theme,
            )
    elif plot_type.value == "Gene (along)":
        _p = along_positions(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _p.empty:
            chart = mo.md("_Need a **line** or **spline** near cells for Gene (along)._")
        else:
            write_obs(adata, _p, "path_s", "s")
            chart = kde_gene_heatmap(
                _p,
                "s",
                adata,
                list(gene_pick.value),
                f"Gene (along) · {_lid}",
                "along path (start → end)",
                0.0,
                1.0,
                theme=theme,
            ) or mo.md("_No expression along this path._")
    elif plot_type.value == "Gene (perpendicular)":
        _d = distances(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _d.empty:
            chart = mo.md("_No distance rows for this landmark / selection._")
        else:
            write_obs(adata, _d, f"dist_{_lid}", "distance")
            _hi = float(_d["distance"].quantile(0.98))
            chart = kde_gene_heatmap(
                _d,
                "distance",
                adata,
                list(gene_pick.value),
                f"Gene (perpendicular) · {_lid}",
                "distance from landmark",
                0.0,
                _hi,
                theme=theme,
            ) or mo.md("_No expression vs distance._")
    else:
        _p = along_positions(adata, _lms, obs_key=CLUSTER, obs_names=_names)
        if _p.empty:
            chart = mo.md("_Need a **line** or **spline** landmark for Gradient (along)._")
        else:
            write_obs(adata, _p, "path_s", "s")
            _row_order = [g for g in _groups if g in set(_p["group"])]
            chart = kde_row_heatmap(
                _p,
                "s",
                _row_order,
                f"Gradient (along) · {_lid}",
                "along path (start → end)",
                x_min=0.0,
                x_max=1.0,
                theme=theme,
            ) or mo.md("_No nearby cells in path bins._")

    mo.vstack(
        [mo.md("### Spatial measurements"), landmarks_ui],
        gap=0.5,
    )
    return (chart,)


@app.cell
def _(GalleryWidget, RECIPE_SPECS, mo):
    _items = [
        {"title": spec["id"], "description": spec["description"]}
        for spec in RECIPE_SPECS
    ]
    recipe_gallery = GalleryWidget(items=_items, selected_index=0, columns=4)
    recipe_gallery_ui = mo.ui.anywidget(recipe_gallery)
    return (recipe_gallery_ui,)


@app.cell(hide_code=True)
def _(chart, measure_controls, mo, recipe_gallery_ui):
    mo.vstack(
        [
            mo.vstack(
                [
                    mo.md("**Use cases**"),
                    mo.md("Click a card for the suggested measure, then draw the landmark."),
                    recipe_gallery_ui,
                ],
                gap=0.35,
            ),
            mo.vstack([measure_controls, chart], gap=0.5),
        ]
    )
    return


if __name__ == "__main__":
    app.run()
