import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Fixed portal host in the widget shadow root so popups keep widget theme tokens. */
export function useWidgetPortalContainer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const widget = wrapRef.current?.closest(
      ".spatial-rx-widget",
    ) as HTMLElement | null;
    if (!widget) return;

    const root = widget.getRootNode();
    const parent =
      root instanceof ShadowRoot
        ? root
        : widget.ownerDocument?.body || document.body;
    let host = parent.querySelector(
      "[data-spatial-rx-portal]",
    ) as HTMLElement | null;
    if (!host) {
      host = widget.ownerDocument.createElement("div");
      host.setAttribute("data-spatial-rx-portal", "");
      parent.appendChild(host);
    }
    host.className = cn(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      widget.classList.contains("dark") && "dark",
    );
    setPortalEl(host);
  }, []);

  return [wrapRef, portalEl] as const;
}
