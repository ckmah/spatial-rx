"""Lock M1.1 SpatialData contract doc presence and required sections."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "docs" / "landmarks-spatialdata-contract.md"


def test_landmarks_spatialdata_contract_exists():
    assert CONTRACT.is_file(), "missing docs/landmarks-spatialdata-contract.md"


def test_landmarks_spatialdata_contract_sections():
    text = CONTRACT.read_text(encoding="utf-8")
    for needle in (
        "## Scope",
        "## Coordinate system",
        "## Required columns (properties)",
        "## Geometry mapping (widget → GeoDataFrame)",
        "## Round-trip invariants",
        "## Public API",
        "`point`",
        "`line`",
        "`spline`",
        "`shape`",
        'obsm["spatial"]',
        "landmarks",
        "selections",
        "landmarks_to_geodataframe",
        "geodataframe_to_landmarks",
    ):
        assert needle in text, f"contract missing {needle!r}"


def test_context_landmark_selection_vocab():
    text = (ROOT / "CONTEXT.md").read_text(encoding="utf-8")
    assert "durable annotation" in text.lower() or "SpatialData shapes" in text
    assert "obs_names" in text
    assert "**Landmark**:" in text
    assert "**Selection**:" in text
