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
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { sortBySequence } from "@/utils/sortBySequence";

type ComboItem = {
  label: string;
  value: string;
};

type GroupedItems = {
  value: string;
  items: ComboItem[];
};

type ProductionFlowProcessesFieldProps = {
  selectedProcesses?: Process[];
  onSelect: (processes: Process[]) => void;
};

export default function ProcessSelector({
  selectedProcesses,
  onSelect,
}: ProductionFlowProcessesFieldProps) {
  const anchor = useComboboxAnchor();
  const { data, isPending } = useGetAllProcesses();
  // const [selectedProcesses, setSelectedProcesses] = useState<Process[]>(defaultProcesses || []);
  const processes = data?.data || [];

  const groupItems = () => {
    const groups: GroupedItems[] = [];
    processes.forEach((process) => {
      const hasGroup = groups.find((group) => group.value === process.departament.name);
      if (hasGroup) {
        hasGroup.items.push({
          label: formatProcess(process),
          value: formatProcess(process),
        });
      } else {
        groups.push({
          value: process.departament.name,
          items: [
            {
              label: formatProcess(process),
              value: formatProcess(process),
            },
          ],
        });
      }
    });
    return groups;
  };

  const handleValueChange = (items: string[]) => {
    const processNames = items.map((item) => item.split(" ")[1]);
    const chosedProcesses = processes.filter((process) => processNames.includes(process.name));
    onSelect(chosedProcesses);
  };

  const formatProcess = (process: Process) => {
    return `(${process.sequence}) ${process.name}`;
  };

  //   useEffect(() => {
  //     if (defaultProcesses && defaultProcesses.length > 0) {
  //       onSelect(defaultProcesses);
  //     }
  //   }, [defaultProcesses, onSelect]);

  const groups = groupItems();

  if (isPending) return <Loader title="Carregando processos..." />;

  return (
    <Combobox
      multiple
      items={groups}
      onValueChange={handleValueChange}
      value={selectedProcesses?.sort(sortBySequence).map(formatProcess)}
    >
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

      <ComboboxContent side="bottom" anchor={anchor}>
        <ComboboxEmpty>Nenhum processo encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(group: GroupedItems, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: ComboItem) => (
                  <ComboboxItem key={item.label} value={item.value}>
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
