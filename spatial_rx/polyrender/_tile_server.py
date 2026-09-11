import http.server
import socket
import threading
from pathlib import Path

_MIME = {".glb": "model/gltf-binary", ".json": "application/json"}
_singleton: "TileServer | None" = None


class _CORSHandler(http.server.SimpleHTTPRequestHandler):
    """Subclasses must set ``serve_root`` (absolute path to the tile shard)."""

    serve_root: str

    def __init__(self, *args, **kwargs):
        # HTTPServer only passes (request, client_address, server); directory=None
        # would otherwise default to os.getcwd(). A class attribute named
        # ``directory`` is NOT read by SimpleHTTPRequestHandler.__init__.
        super().__init__(*args, directory=type(self).serve_root, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def guess_type(self, path):
        ext = Path(path).suffix.lower()
        return _MIME.get(ext, super().guess_type(path))

    def log_message(self, fmt, *args):
        pass  # suppress access log


def _find_free_port(start: int = 8765, attempts: int = 20) -> int:
    for port in range(start, start + attempts):
        with socket.socket() as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError(f"No free port found in range {start}–{start + attempts - 1}")


class TileServer:
    """Daemon-thread HTTP file server with CORS headers for serving GLB tiles."""

    def __init__(self, serve_dir: Path):
        self._serve_dir = Path(serve_dir)
        self._port: int | None = None
        self._thread: threading.Thread | None = None
        self._server: http.server.HTTPServer | None = None

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        port = _find_free_port()
        root = str(self._serve_dir.resolve())
        handler = type(
            "_BoundHandler",
            (_CORSHandler,),
            {"serve_root": root},
        )
        self._server = http.server.HTTPServer(("127.0.0.1", port), handler)
        self._port = port
        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()

    def stop(self) -> None:
        if self._server:
            self._server.shutdown()

    @property
    def url(self) -> str:
        if self._port is None:
            raise RuntimeError("Server not started — call start() first")
        return f"http://127.0.0.1:{self._port}"

    @property
    def is_running(self) -> bool:
        return bool(self._thread and self._thread.is_alive())

    @property
    def serve_dir(self) -> Path:
        return self._serve_dir


def get_active_tile_server() -> TileServer | None:
    """Running singleton tile server, if any."""
    s = _singleton
    if s is None or not s.is_running:
        return None
    return s


def get_or_start(serve_dir: Path) -> TileServer:
    """Return the running module-level singleton, creating it if needed.

    Survives marimo cell re-runs without rebinding the port. If the directory
    changes, the previous server is stopped so its cache can be pruned safely.
    """
    global _singleton
    serve_dir = Path(serve_dir).resolve()
    prev = _singleton
    if (
        prev is not None
        and prev.is_running
        and prev.serve_dir.resolve() != serve_dir
    ):
        prev.stop()
    if prev is None or not prev.is_running or prev.serve_dir.resolve() != serve_dir:
        _singleton = TileServer(serve_dir)
        _singleton.start()
    return _singleton
