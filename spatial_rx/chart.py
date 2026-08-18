"""Matplotlib figure helpers for overlay widgets."""

from __future__ import annotations

import base64
from io import BytesIO


def fig_to_base64(fig) -> str:
    """Render a matplotlib figure to a base64 PNG data URL."""
    buf = BytesIO()
    fig.savefig(buf, format="png", dpi=fig.dpi)
    buf.seek(0)
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"


def extract_axes_info(fig):
    """Extract axes bounds and pixel position from a matplotlib figure.

    Returns:
        tuple: (x_bounds, y_bounds, axes_pixel_bounds, width_px, height_px, x_scale, y_scale)
    """
    fig.canvas.draw()
    ax = fig.axes[0]

    x_bounds = ax.get_xlim()
    y_bounds = ax.get_ylim()
    x_scale = ax.get_xscale()
    y_scale = ax.get_yscale()

    bbox = ax.get_position()
    width_px = int(fig.get_figwidth() * fig.dpi)
    height_px = int(fig.get_figheight() * fig.dpi)

    left = bbox.x0 * width_px
    right = (bbox.x0 + bbox.width) * width_px
    top = (1 - bbox.y0 - bbox.height) * height_px
    bottom = (1 - bbox.y0) * height_px

    return x_bounds, y_bounds, (left, top, right, bottom), width_px, height_px, x_scale, y_scale
