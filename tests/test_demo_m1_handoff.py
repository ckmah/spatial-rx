"""M1.7: demo path draw → GeoDataFrame commit → reload (API harness)."""

from __future__ import annotations

import pytest

pytest.importorskip("geopandas")

from spatial_rx import LandmarksWidget, geodataframe_to_landmarks, landmarks_to_geodataframe
from tests.helpers import adata_xy


def test_demo_landmarks_commit_reload():
    w = LandmarksWidget(
        adata_xy(
            [0.0, 1.0, 2.0, 3.0],
            [0.0, 0.0, 0.0, 0.0],
            color=["a", "a", "b", "b"],
        ),
        color="label",
    )

    w.landmarks = [
        {
            "id": "lm-demo",
            "type": "line",
            "vertices": [[0.0, 0.0], [2.0, 0.0]],
            "line_style": "dashed",
            "color": "#ff2d95",
            "buffer_width": 0.5,
            "buffer_side": "both",
        }
    ]
    gdf = landmarks_to_geodataframe(list(w.landmarks))
    w.clear_landmarks()
    assert list(w.landmarks) == []
    w.landmarks = geodataframe_to_landmarks(gdf)
    got = list(w.landmarks)
    assert len(got) == 1
    assert got[0]["id"] == "lm-demo"
    assert got[0].get("line_style") in (None, "dashed")  # optional durable field
    assert len(geodataframe_to_landmarks(gdf)) == 1
