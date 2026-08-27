import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useNotebookTheme } from "@/hooks/use-notebook-theme";
import { useModel } from "@/hooks/use-model";
import { cn } from "@/lib/utils";

type GalleryItem = {
  title: string;
  description?: string;
  image?: string;
};

type GalleryModel = {
  items: GalleryItem[];
  selected_index: number;
  columns: number;
};

function Media({ item }: { item: GalleryItem }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        draggable={false}
        className="aspect-[16/10] w-full rounded-sm object-cover"
      />
    );
  }
  return <div className="aspect-[16/10] w-full rounded-sm bg-muted" />;
}

export function GalleryView({
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
  const { items, selected_index, columns } = useModel<GalleryModel>(model, [
    "items",
    "selected_index",
    "columns",
  ]);

  return (
    <div className={cn("w-full", dark && "dark")}>
      <div
        className="grid w-full gap-3"
        style={{ gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => {
          const selected = index === selected_index;
          return (
            <button
              key={`${item.title}-${index}`}
              type="button"
              aria-pressed={selected}
              className="w-full text-left"
              onClick={() => {
                model.set("selected_index", index);
                model.save_changes();
              }}
            >
              <Item
                variant={selected ? "muted" : "outline"}
                className={cn(
                  "h-full w-full flex-col items-stretch",
                  selected && "border-ring ring-[3px] ring-ring/35",
                )}
              >
                <ItemHeader>
                  <Media item={item} />
                </ItemHeader>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  {item.description ? (
                    <ItemDescription>{item.description}</ItemDescription>
                  ) : null}
                </ItemContent>
              </Item>
            </button>
          );
        })}
      </div>
    </div>
  );
}
