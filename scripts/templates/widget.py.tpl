"""{{ class_name }}: {{ docstring }}."""

from __future__ import annotations

from typing import Any

import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm


class {{ class_name }}(AnyWidget):
    """{{ docstring }}."""

    _esm = widget_esm("{{ kebab_name }}")
    _css = widget_css()

{{ traitlet_declarations }}

    def __init__(
        self,
{{ init_signature }}
        **kwargs: Any,
    ) -> None:
        super().__init__(
{{ init_super_kwargs }}
            **kwargs,
        )
