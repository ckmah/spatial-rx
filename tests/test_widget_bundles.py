from pathlib import Path

BUNDLED = Path(__file__).resolve().parents[1] / "spatial_rx" / "static" / "bundled"


def test_gallery_bundle_does_not_reference_process_env():
    """Browser ESM has no Node `process`; a bare `process.env` throws."""
    text = (BUNDLED / "gallery.mjs").read_text(encoding="utf-8")
    assert "process.env" not in text


def test_landmarks_bundle_does_not_reference_process_env():
    text = (BUNDLED / "landmarks.mjs").read_text(encoding="utf-8")
    assert "process.env" not in text
