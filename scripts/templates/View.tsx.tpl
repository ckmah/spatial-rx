import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

type {{ model_type_name }} = {
{{ ts_fields }}
};

export function {{ view_name }}({
  model,
  hostEl,
}: {
  hostEl: HTMLElement;
  model: {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    save_changes(): void;
    on(event: string, callback: () => void): void;
    off?(event: string, callback: () => void): void;
  };
}) {
  const dark = useNotebookTheme(hostEl.parentElement);
  const { {{ destructure_names }} } = useModel<{{ model_type_name }}>(model, [
{{ traitlet_keys_ts }}
  ]);

  return (
    <div className={cn("w-full", dark && "dark")}>
      {/* UI */}
    </div>
  );
}
