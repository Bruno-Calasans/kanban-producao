import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorItem = {
  id: number;
  label: string;
};

type SelectorProps = {
  selectedItem?: SelectorItem;
  items: SelectorItem[];
  placeholder?: string;
  noItemFoundMsg?: React.ReactNode;
  onChange: (item?: SelectorItem) => void;
};

export function SingleSelector({
  selectedItem,
  items,
  placeholder,
  noItemFoundMsg,
  onChange,
}: SelectorProps) {
  const valueChangeHandler = (itemId: string) => {
    const foundItem = items.find((item) => String(item.id) == itemId);
    onChange(foundItem);
  };

  if (items.length == 0) return noItemFoundMsg || <div>Nenhum item encontrado</div>;

  return (
    <Select value={selectedItem?.label} onValueChange={valueChangeHandler}>
      <SelectTrigger className="min-w-30 w-full">
        <SelectValue placeholder={placeholder || "Selecione um item"} />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        {items.length > 0 &&
          items.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
