import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import "@/widgets/landmarks/landmarks.css";

import { SoftFloatViewCtaLab } from "./SoftFloatViewCtaLab";

const rootEl = document.getElementById("view-cta-lab-root");
if (!rootEl) {
  throw new Error("Soft Float View CTA lab: missing #view-cta-lab-root");
}

createRoot(rootEl).render(<SoftFloatViewCtaLab />);
