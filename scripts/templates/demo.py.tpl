# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo",
#     "spatial-rx",
# ]
# ///

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # {{ class_name }}

    Scaffold demo — replace with a real example.
    """)
    return


@app.cell
def _():
    import marimo as mo
    from spatial_rx import {{ class_name }}

    widget = {{ class_name }}(
{{ demo_ctor_kwargs }}
    )
    widget_ui = mo.ui.anywidget(widget)
    return mo, widget, widget_ui


@app.cell
def _(mo, widget, widget_ui):
    mo.vstack(
        [
            widget_ui,
            mo.md("Synced traitlets:"),
            mo.md(
                "\n".join(
                    f"- `{name}`: `{getattr(widget, name)!r}`"
                    for name in [{{ traitlet_names_py }}]
                )
            ),
        ],
        gap=1,
    )
    return


if __name__ == "__main__":
    app.run()
