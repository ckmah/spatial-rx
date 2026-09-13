import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import "@/widgets/landmarks/landmarks.css";

import { SoftFloatTabsLab } from "./SoftFloatTabsLab";

const rootEl = document.getElementById("tabs-lab-root");
if (!rootEl) {
  throw new Error("Soft Float tabs lab: missing #tabs-lab-root");
}

createRoot(rootEl).render(<SoftFloatTabsLab />);
