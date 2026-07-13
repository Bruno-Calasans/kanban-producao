import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { CheckIcon, XIcon } from "lucide-react";

export type FilterItem = {
  label: string;
  value: number;
};

type FilterItemsProps<T> = {
  data: T[];
  selectedItems: FilterItem[];
  labelAcessorKey: keyof T | ((item: T) => string);
  valueAcessorKey: keyof T | ((item: T) => number);
  filterLabel?: string;
  singleSelect?: boolean;
  selectedClassname?: string;
  nonSelectedClassname?: string;
  onSelectItem: (items: FilterItem[]) => void;
};

export default function FilterItems<T>({
  data,
  labelAcessorKey,
  valueAcessorKey,
  filterLabel,
  selectedItems,
  singleSelect,
  selectedClassname,
  nonSelectedClassname,
  onSelectItem,
}: FilterItemsProps<T>) {
  const items = data.map((item) => {
    return {
      label:
        typeof labelAcessorKey === "function"
          ? labelAcessorKey(item)
          : (item[labelAcessorKey] as string),
      value:
        typeof valueAcessorKey === "function"
          ? valueAcessorKey(item)
          : (item[valueAcessorKey] as number),

      selectedClassname: selectedClassname || "bg-slate-900 hover:bg-stone-600",
      nonSelectedClassname: nonSelectedClassname || "bg-slate-400",
    };
  });

  const uniqueItems = Array.from(new Map(items.map((item) => [item.value, item])).values());

  const selectItemHandler = (item: FilterItem) => {
    let currSelectedItems: FilterItem[] = [];

    // Seleciona apenas um item caso singleSelect seja true
    if (singleSelect) {
      currSelectedItems = [item];
      onSelectItem(currSelectedItems);
      return;
    }

    const inTheList = selectedItems.some((d) => d.value === item.value);

    // Remove da lista de itens selecionados caso já esteja presente
    if (inTheList) {
      currSelectedItems = selectedItems.filter((d) => d.value !== item.value);

      // Adiciona à lista de itens selecionados caso não esteja presente
    } else {
      currSelectedItems = [...selectedItems, item];
    }

    onSelectItem(currSelectedItems);
  };

  const isItemSelected = (item: FilterItem) => {
    return selectedItems.some((d) => d.value === item.value);
  };

  const clearFilter = () => {
    onSelectItem([]);
  };

  const selectAllItems = () => {
    onSelectItem(uniqueItems);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    onSelectItem(uniqueItems);
  }, [data]);

  return (
    <div className="flex flex-col flex-wrap gap-4 p-2 mb-2">
      <div className="flex justify-between gap-1">
        <p className="text-sm text-muted-foreground">{filterLabel || "Filtros:"}</p>

        <div className="flex gap-2">
          {uniqueItems.length > selectedItems.length && (
            <button
              title="Selecionar todos"
              onClick={selectAllItems}
              className="text-xs text-blue-500 hover:underline"
            >
              <CheckIcon size={18} />
            </button>
          )}
          {uniqueItems.length > 0 && (
            <button
              title="Limpar filtro"
              onClick={clearFilter}
              className="text-xs text-red-500 hover:underline"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-80">
        {uniqueItems.map((item) => (
          <Badge
            key={item.value}
            onClick={() => selectItemHandler(item)}
            className={cn(
              "cursor-pointer",
              isItemSelected(item) ? item.selectedClassname : item.nonSelectedClassname,
            )}
          >
            {item.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
