"""GalleryWidget: Notion-style selectable image cards."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import traitlets
from anywidget import AnyWidget


class GalleryWidget(AnyWidget):
    """Selectable gallery of cards (title required; description and image optional).

    Each item is a dict with:
    - ``title`` (required)
    - ``description`` (optional)
    - ``image`` (optional data URL or http(s) URL)

    Synced selection is ``selected_index`` (``-1`` when none).
    """

    _esm = Path(__file__).parent / "static" / "gallery.js"
    _css = Path(__file__).parent / "static" / "gallery.css"

    items = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    selected_index = traitlets.Int(-1).tag(sync=True)
    columns = traitlets.Int(4).tag(sync=True)

    def __init__(
        self,
        items: list[dict[str, Any]] | None = None,
        *,
        selected_index: int = -1,
        columns: int = 4,
        **kwargs: Any,
    ) -> None:
        cleaned: list[dict[str, Any]] = []
        for item in items or []:
            title = str(item.get("title") or "").strip()
            if not title:
                raise ValueError("Each gallery item requires a non-empty title")
            entry: dict[str, Any] = {"title": title}
            description = item.get("description")
            if description is not None and str(description).strip():
                entry["description"] = str(description)
            image = item.get("image")
            if image is not None and str(image).strip():
                entry["image"] = str(image)
            cleaned.append(entry)

        if selected_index >= len(cleaned):
            selected_index = -1

        super().__init__(
            items=cleaned,
            selected_index=selected_index,
            columns=max(1, int(columns)),
            **kwargs,
        )
