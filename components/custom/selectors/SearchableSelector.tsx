"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import Loader from "../Loader";
import { useEffect } from "react";

export type SelectorItem = {
  id: number;
  label: string;
};

type DataItem = {
  id: number;
};

type SelectorProps<T extends DataItem> = {
  data: T[];
  selectedData?: T;
  defaultData?: T;
  placeholder?: React.ReactNode;
  noItemFoundMsg?: React.ReactNode;
  isLoading?: boolean;
  loadingMsg?: string;
  labelSelector: keyof T;
  disabled?: boolean | "indeterminate";
  searchPlaceholder?: string;
  onChange: (data?: T) => void;
  onChangeItem?: (item?: SelectorItem) => void;
  customLabelSelector?: (item: T) => string;
};

export function SearchableSelector<T extends DataItem>({
  data,
  selectedData,
  defaultData,
  placeholder,
  noItemFoundMsg,
  isLoading,
  loadingMsg,
  labelSelector,
  disabled,
  searchPlaceholder,
  onChange,
  onChangeItem,
  customLabelSelector,
}: SelectorProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const items: SelectorItem[] = data.map((dataItem) => ({
    id: dataItem.id,
    label: customLabelSelector ? customLabelSelector(dataItem) : String(dataItem[labelSelector]),
  }));

  const selectedItem = items.find(
    (item) => item.id === selectedData?.id || item.id === defaultData?.id,
  );

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  const getData = (item?: SelectorItem) => data.find((d) => d.id === item?.id);

  const handleSelect = (item: SelectorItem) => {
    const foundData = getData(item);

    onChange(foundData);
    onChangeItem?.(item);

    setOpen(false);
    setSearch("");
  };

  useEffect(() => {
    if (defaultData && !isLoading) onChange(defaultData);
  }, [defaultData, isLoading]);

  if (isLoading) {
    return <Loader title={loadingMsg || "Carregando items"} horizontal />;
  }

  if (items.length === 0) {
    return noItemFoundMsg || <div>Nenhum item encontrado</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={!!disabled}
          className="w-full justify-between"
        >
          {selectedItem ? selectedItem.label : placeholder || "Selecione um item"}

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-2 w-[400px]">
        <Input
          placeholder={searchPlaceholder || "Pesquisar..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />

        <ScrollArea className="max-h-[250px] overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">Nenhum item encontrado</div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className={cn(
                  "flex w-full items-center rounded-sm px-2 py-2 text-sm hover:bg-accent",
                )}
              >
                <span>{item.label}</span>

                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedItem?.id === item.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
