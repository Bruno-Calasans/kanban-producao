import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import useGetAllProcesses from "@/hooks/process/useGetAllProcesses";
import { Process } from "@/types/database.type";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import Loader from "./Loader";
import { sortBySequence } from "@/utils/sortBySequence";

type ComboItem = {
  id: string;
  label: string;
};

type GroupedItems = {
  value: string;
  items: ComboItem[];
};

type ProductionFlowProcessesFieldProps = {
  selectedProcesses?: Process[];
  defaultProcesses?: Process[];
  onSelect: (processes: Process[]) => void;
};

export default function ProcessSelector({
  defaultProcesses,
  selectedProcesses,
  onSelect,
}: ProductionFlowProcessesFieldProps) {
  const anchor = useComboboxAnchor();
  const { data, isPending } = useGetAllProcesses();
  const processes = data?.data || [];
  const [hasDefault, setHasDefault] = useState<boolean>(false);

  const groupItems = () => {
    const groups: GroupedItems[] = [];

    processes.forEach((process) => {
      const hasGroup = groups.find((group) => group.value === process.departament.name);

      if (hasGroup) {
        hasGroup.items.push({
          id: String(process.id),
          label: formatProcess(process),
        });
      } else {
        groups.push({
          value: process.departament.name,
          items: [
            {
              id: String(process.id),
              label: formatProcess(process),
            },
          ],
        });
      }
    });
    return groups;
  };

  const handleValueChange = (itemIds: string[]) => {
    const chosedProcesses = processes.filter((process) => itemIds.includes(String(process.id)));
    onSelect(chosedProcesses);
  };

  const formatProcess = (process: Process) => {
    return `(${process.sequence}) ${process.name}`;
  };

  useEffect(() => {
    if (defaultProcesses && defaultProcesses.length > 0 && !hasDefault) {
      onSelect(defaultProcesses);
      setHasDefault(true);
    }
  }, [defaultProcesses]);

  const groups = useMemo(() => groupItems(), [processes]);

  if (isPending) return <Loader title="Carregando processos..." />;

  return (
    <Combobox
      multiple
      items={groups}
      onValueChange={handleValueChange}
      value={selectedProcesses?.sort(sortBySequence).map((p) => String(p.id))}
    >
      {/* Só redenriza */}
      <ComboboxChips
        ref={anchor}
        style={{
          flexWrap: "wrap",
        }}
      >
        <ComboboxValue>
          {selectedProcesses?.map((item) => (
            <ComboboxChip key={item.id}>{formatProcess(item)}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Adicione processos" />
      </ComboboxChips>

      {/* Select em si */}
      <ComboboxContent side="bottom" anchor={anchor}>
        <ComboboxEmpty>Nenhum processo encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(group: GroupedItems, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>

              <ComboboxCollection>
                {(item: ComboItem) => (
                  <ComboboxItem key={item.id} value={item.id}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < groups.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
