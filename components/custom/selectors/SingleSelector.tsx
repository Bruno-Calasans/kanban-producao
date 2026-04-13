import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "../Loader";
import { useEffect } from "react";

export type SelectorItem = {
  id: number;
  label: string;
};

type DataItem = {
  id: number;
}

type SelectorProps<T extends DataItem> = {
  data: T[]
  selectedData?: T;
  defaultData?: T
  placeholder?: React.ReactNode;
  noItemFoundMsg?: React.ReactNode;
  isLoading?: boolean
  loadingMsg?: string
  labelSelector: keyof T
  disabled?: boolean | "indeterminate"
  onChange: (data?: T) => void
  onChangeItem?: (item?: SelectorItem) => void;
};

export function SingleSelector<T extends DataItem>({
  data,
  selectedData,
  defaultData,
  placeholder,
  noItemFoundMsg,
  isLoading,
  loadingMsg,
  labelSelector,
  disabled,
  onChangeItem,
  onChange,
}: SelectorProps<T>) {

  const items: SelectorItem[] = data.map(dataItem => ({ id: dataItem.id, label: dataItem[labelSelector] as string }))
  const defaultItem = defaultData ? { id: defaultData.id, label: defaultData[labelSelector] } : undefined

  const getData = (item?: SelectorItem) => data.find(dpt => dpt.id == item?.id)

  const getValue = () => {
    if (selectedData) return String(selectedData.id)
    if (defaultItem) return String(defaultItem.id)
    return ""
  }

  const valueChangeHandler = (itemId: string) => {
    const foundItem = items.find((item) => String(item.id) == itemId);
    const foundData = getData(foundItem)
    onChange(foundData);
    onChangeItem && onChangeItem(foundItem);
  };

  useEffect(() => {
    if (defaultData) valueChangeHandler(String(defaultData.id))
  }, [defaultData])

  if (isLoading) return <Loader title={loadingMsg || "Carregando items"} horizontal />

  if (items.length == 0) return noItemFoundMsg || <div>Nenhum item encontrado</div>;

  return (
    <Select disabled={!!disabled} value={getValue()} onValueChange={valueChangeHandler}>
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
