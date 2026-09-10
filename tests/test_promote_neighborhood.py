"""M1.3: promote active neighborhood → selection (TDD)."""

from __future__ import annotations

import numpy as np
import pytest

from tests.helpers import adata_xy, graph


def _widget_with_knn():
    from spatial_rx import LandmarksWidget

    # 0--1--2--3 on a line; knn connects consecutive
    x = np.array([0.0, 1.0, 2.0, 3.0])
    y = np.zeros(4)
    knn = graph(
        4,
        [
            (0, 1, 1.0),
            (1, 0, 1.0),
            (1, 2, 1.0),
            (2, 1, 1.0),
            (2, 3, 1.0),
            (3, 2, 1.0),
        ],
    )
    color = np.array(["a", "a", "b", "b"])
    w = LandmarksWidget(adata_xy(x, y, color=color, knn=knn), color="label")
    return w, x, y


def test_promote_type_neighborhood_to_selection():
    w, x, y = _widget_with_knn()
    w.type_neighborhoods = [
        {"id": "a", "column": "label", "neighborhood": "knn", "neighborhood_k": 2}
    ]
    w.active_category = "label"
    # Select type "a" via legend index
    labels = list(w.legend_labels)
    assert "a" in labels
    w.selected_kind = "type"
    w.selected_index = labels.index("a")

    sid = w.promote_neighborhood_to_selection()
    assert sid
    sel = next(s for s in w.selections if str(s.get("id")) == sid)
    assert "point_indices" in sel
    idx = set(w.get_indices(x, y, selection_id=sid).tolist())
    # type a = {0,1}; k=2 from 1 reaches 2 — exact set, no hull extras
    assert idx == {0, 1, 2}
    assert set(int(i) for i in sel["point_indices"]) == idx


def test_promote_selection_neighborhood_to_selection():
    w, x, y = _widget_with_knn()
    w.selections = [
        {
            "id": "seed",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
            "neighborhood": "knn",
            "neighborhood_k": 1,
        }
    ]
    w.selected_kind = "selection"
    w.selected_index = 0
    sid = w.promote_neighborhood_to_selection()
    assert sid != "seed"
    idx = set(w.get_indices(x, y, selection_id=sid).tolist())
    # seed point 0 + knn neighbor 1 — not a hull that swallows 2/3
    assert idx == {0, 1}


def test_selection_mask_prefers_point_indices_over_hull():
    """Polygon may cover extras; point_indices define membership."""
    from spatial_rx.selection import selection_mask

    x = np.array([0.0, 1.0, 2.0])
    y = np.zeros(3)
    sels = [
        {
            "id": "s",
            "type": "polygon",
            # Axis-aligned box covering all three points.
            "vertices": [[-0.5, -1.0], [2.5, -1.0], [2.5, 1.0], [-0.5, 1.0]],
            "point_indices": [0, 2],
            "neighborhood": "off",
        }
    ]
    mask = selection_mask(sels, x, y, "s")
    assert mask.tolist() == [True, False, True]


def test_promote_requires_active_neighborhood():
    w, _, _ = _widget_with_knn()
    w.selected_kind = ""
    w.selected_index = -1
    with pytest.raises(ValueError, match="neighborhood"):
        w.promote_neighborhood_to_selection()

    w.selections = [
        {
            "id": "seed",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
            "neighborhood": "off",
        }
    ]
    w.selected_kind = "selection"
    w.selected_index = 0
    with pytest.raises(ValueError, match="off|neighborhood"):
        w.promote_neighborhood_to_selection()


def test_promote_tick_trait_invokes_python():
    w, x, y = _widget_with_knn()
    w.type_neighborhoods = [
        {"id": "a", "column": "label", "neighborhood": "knn", "neighborhood_k": 2}
    ]
    w.selected_kind = "type"
    w.selected_index = list(w.legend_labels).index("a")
    n_before = len(w.selections)
    w.promote_tick = int(w.promote_tick) + 1
    assert len(w.selections) == n_before + 1
