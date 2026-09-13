import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import "@/widgets/polyrender/polyrender.css";

import { HarnessShell } from "./HarnessShell";

const rootEl = document.getElementById("harness-root");
if (!rootEl) {
  throw new Error("Polyrender dev harness: missing #harness-root");
}

createRoot(rootEl).render(<HarnessShell />);
