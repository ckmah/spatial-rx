import { useEffect, useReducer, useRef, useSyncExternalStore } from "react";

type AnyModel = {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  save_changes(): void;
  on(event: string, callback: () => void): void;
  off?(event: string, callback: () => void): void;
};

/** Subscribe to one or more traitlets-backed model keys. */
export function useModel<T extends Record<string, unknown>>(
  model: AnyModel,
  keys: (keyof T)[],
): T {
  const keysRef = useRef(keys);
  keysRef.current = keys;

  const subscribe = (onStoreChange: () => void) => {
    const handlers = keysRef.current.map((key) => {
      const event = `change:${String(key)}`;
      const handler = () => onStoreChange();
      model.on(event, handler);
      return { event, handler };
    });
    return () => {
      for (const { event, handler } of handlers) {
        model.off?.(event, handler);
      }
    };
  };

  const getSnapshot = () => {
    const snapshot: Record<string, unknown> = {};
    for (const key of keysRef.current) {
      snapshot[String(key)] = model.get(String(key));
    }
    return JSON.stringify(snapshot);
  };

  const serialized = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return JSON.parse(serialized) as T;
}

/** Force re-render when any listed model key changes (for imperative model handles). */
export function useModelVersion(model: AnyModel, keys: string[]) {
  const [, bump] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const handlers = keys.map((key) => {
      const event = `change:${key}`;
      const handler = () => bump();
      model.on(event, handler);
      return { event, handler };
    });
    return () => {
      for (const { event, handler } of handlers) {
        model.off?.(event, handler);
      }
    };
  }, [model, keys.join(",")]);
}
