import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { sortBySequence } from "@/utils/sortBySequence";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type DepartamentItem = {
  label: string;
  value: number;
  sequence: number;
};

type DepartamentItemSelectorProps = {
  deadlines: MovimentationDeadlinePopulated[];
  isLoading?: boolean;
  onSelectDepartaments: (departamentIds: DepartamentItem[]) => void;
};

export default function DepartamentItemSelector({
  deadlines,
  isLoading,
  onSelectDepartaments,
}: DepartamentItemSelectorProps) {
  const [selectedDepartaments, setSelectedDepartaments] = useState<DepartamentItem[]>([]);

  const departamentItems = deadlines.map((deadline) => {
    const item = {
      label: deadline.departament.name,
      value: deadline.departament.id,
      sequence: deadline.departament.sequence,
    };
    return item;
  });

  const uniqueDepartamentItems = Array.from(
    new Map(departamentItems.map((item) => [item.value, item])).values(),
  ).sort(sortBySequence);

  const handleDepartamentSelect = (item: DepartamentItem) => {
    let selectedItems: DepartamentItem[] = [];
    if (selectedDepartaments.some((d) => d.value === item.value)) {
      selectedItems = selectedDepartaments.filter((d) => d.value !== item.value);
    } else {
      selectedItems = [...selectedDepartaments, item];
    }
    onSelectDepartaments(selectedItems);
    setSelectedDepartaments(selectedItems);
  };

  const isItemSelected = (item: DepartamentItem) => {
    return selectedDepartaments.some((d) => d.value === item.value);
  };

  useEffect(() => {
    if (isLoading) return;
    setSelectedDepartaments(uniqueDepartamentItems);
    onSelectDepartaments(uniqueDepartamentItems);
  }, [isLoading]);

  return (
    <div className="flex flex-wrap gap-3 p-2 mb-2">
      {uniqueDepartamentItems.map((item) => (
        <Badge
          key={item.value}
          className={cn(
            "cursor-pointer bg-slate-400 hover:bg-stone-600",
            isItemSelected(item) ? "bg-stone-800" : "bg-slate-400",
          )}
          onClick={() => handleDepartamentSelect(item)}
        >
          {item.label}
        </Badge>
      ))}
    </div>
  );
}
