import type { AnyModel } from "@/widgets/landmarks/helpers";

import fixture from "./fixture.json";

type Listener = () => void;

/** Minimal traitlets model for notebook-free dev and Impeccable live. */
export function createMockModel(
  initial: Record<string, unknown> = fixture as Record<string, unknown>,
): AnyModel {
  const state: Record<string, unknown> = { ...initial };
  const listeners = new Map<string, Set<Listener>>();
  const dirty = new Set<string>();

  return {
    get(key: string) {
      return state[key];
    },
    set(key: string, value: unknown) {
      state[key] = value;
      dirty.add(key);
    },
    save_changes() {
      for (const key of dirty) {
        listeners.get(`change:${key}`)?.forEach((cb) => cb());
      }
      dirty.clear();
    },
    on(event: string, callback: Listener) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(callback);
    },
    off(event: string, callback: Listener) {
      listeners.get(event)?.delete(callback);
    },
  };
}
