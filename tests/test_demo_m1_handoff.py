"""M1.7: demo path draw → GeoDataFrame commit → reload + promote (API harness)."""

from __future__ import annotations

import numpy as np
import pytest

pytest.importorskip("geopandas")

from spatial_rx import LandmarksWidget, geodataframe_to_landmarks, landmarks_to_geodataframe
from tests.helpers import adata_xy, graph


def test_demo_landmarks_commit_reload_and_promote():
    knn = graph(
        4,
        [
            (0, 1, 1.0),
            (1, 0, 1.0),
            (1, 2, 1.0),
            (2, 1, 1.0),
        ],
    )
    w = LandmarksWidget(
        adata_xy(
            [0.0, 1.0, 2.0, 3.0],
            [0.0, 0.0, 0.0, 0.0],
            color=["a", "a", "b", "b"],
            knn=knn,
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

    # Promote path (M1.3) still works for demo handoff.
    w.type_neighborhoods = [
        {"id": "a", "column": "label", "neighborhood": "knn", "neighborhood_k": 2}
    ]
    w.selected_kind = "type"
    w.selected_index = list(w.legend_labels).index("a")
    sid = w.promote_neighborhood_to_selection()
    assert any(str(s.get("id")) == sid for s in w.selections)

    # GeoDataFrame still holds landmarks after promote.
    assert len(geodataframe_to_landmarks(gdf)) == 1
