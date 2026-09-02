import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type FsMode = "off" | "native" | "overlay";

/** Fullscreen with native API first; fixed overlay when the host blocks it. */
export function useWidgetFullscreen(
  rootRef: RefObject<HTMLElement | null>,
  onLayout: () => void,
) {
  const modeRef = useRef<FsMode>("off");
  const [mode, setMode] = useState<FsMode>("off");

  const syncLayout = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onLayout();
      });
    });
  }, [onLayout]);

  const finishExit = useCallback(() => {
    const node = rootRef.current;
    modeRef.current = "off";
    setMode("off");
    document.body.style.overflow = "";
    syncLayout();
    node?.scrollIntoView({ block: "nearest" });
  }, [rootRef, syncLayout]);

  useEffect(() => {
    const onChange = () => {
      const node = rootRef.current;
      const native = !!node && document.fullscreenElement === node;
      if (native) {
        modeRef.current = "native";
        setMode("native");
        document.body.style.overflow = "hidden";
        syncLayout();
        return;
      }
      if (modeRef.current === "native") {
        finishExit();
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [rootRef, finishExit, syncLayout]);

  useEffect(() => {
    if (mode !== "overlay") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, finishExit]);

  const leave = useCallback(() => {
    const node = rootRef.current;
    if (!node) return;
    if (document.fullscreenElement === node) {
      void document.exitFullscreen();
      return;
    }
    if (modeRef.current === "overlay") {
      finishExit();
    }
  }, [rootRef, finishExit]);

  const toggle = useCallback(async () => {
    const node = rootRef.current;
    if (!node) return;
    if (modeRef.current !== "off" || document.fullscreenElement === node) {
      leave();
      return;
    }
    try {
      await node.requestFullscreen();
    } catch {
      modeRef.current = "overlay";
      setMode("overlay");
      document.body.style.overflow = "hidden";
      syncLayout();
    }
  }, [rootRef, leave, syncLayout]);

  return {
    isFullscreen: mode !== "off",
    overlay: mode === "overlay",
    toggle,
    leave,
  };
}
