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
    # GalleryWidget

    Selectable shadcn Item tiles (title, optional description, optional image).
    Synced selection is `selected_index` (`-1` when none).
    """)
    return


@app.cell
def _():
    from base64 import b64encode

    import marimo as mo
    from spatial_rx import GalleryWidget

    def _svg(label: str, fill: str) -> str:
        body = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">'
            f'<rect width="320" height="180" fill="{fill}"/>'
            f'<text x="160" y="98" text-anchor="middle" '
            f'font-family="system-ui,sans-serif" font-size="22" fill="#111">'
            f"{label}</text></svg>"
        ).encode("utf-8")
        return "data:image/svg+xml;base64," + b64encode(body).decode("ascii")

    items = [
        {
            "title": "Philosopher's Stone",
            "description": "Harry Potter and the Philosopher's Stone (2001)",
            "image": _svg("2001", "#c4e8d4"),
        },
        {
            "title": "Chamber of Secrets",
            "description": "Harry Potter and the Chamber of Secrets (2002)",
            "image": _svg("2002", "#d4e0f5"),
        },
        {
            "title": "Prisoner of Azkaban",
            "description": "Harry Potter and the Prisoner of Azkaban (2004)",
            "image": _svg("2004", "#f5dcc8"),
        },
        {
            "title": "Goblet of Fire",
            "description": "Harry Potter and the Goblet of Fire (2005)",
            "image": _svg("2005", "#e8d4f0"),
        },
        {
            "title": "Order of the Phoenix",
            "description": "Harry Potter and the Order of the Phoenix (2007)",
            "image": _svg("2007", "#f5e6c8"),
        },
        {
            "title": "Half-Blood Prince",
            "description": "Harry Potter and the Half-Blood Prince (2009)",
            "image": _svg("2009", "#c8e8f0"),
        },
        {
            "title": "Deathly Hallows – Part 1",
            "description": "Harry Potter and the Deathly Hallows – Part 1 (2010)",
            "image": _svg("2010", "#e8c8d4"),
        },
        {
            "title": "Deathly Hallows – Part 2",
            "description": "Harry Potter and the Deathly Hallows – Part 2 (2011)",
            "image": _svg("2011", "#d4f0c8"),
        },
    ]

    gallery = GalleryWidget(items=items, selected_index=0, columns=4)
    gallery_ui = mo.ui.anywidget(gallery)
    return gallery_ui, mo


@app.cell
def _(gallery_ui, mo):
    mo.vstack(
        [
            gallery_ui,
            mo.md(f"Selected index: **{gallery_ui.selected_index}**"),
        ],
        gap=1,
    )
    return


if __name__ == "__main__":
    app.run()
