/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
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
import { Departament } from "@/types/database.type";
import { useEffect, useMemo, useState } from "react";
import useGetAllActiveDepartaments from "@/hooks/departament/useGetAllActiveDepartaments";
import Loader from "./Loader";
import { Button } from "../ui/button";
import Link from "next/link";
import useGetAllActiveInternalDepartaments from "@/hooks/departament/useGetAllActiveInternalDepartaments";

type ComboItem = {
  id: string;
  label: string;
};

type GroupedItems = {
  value: string;
  items: ComboItem[];
};

type MultiDepartamentSelectorProps = {
  selectedDepartaments?: Departament[];
  defaultDepartaments?: Departament[];
  onSelect: (departaments: Departament[]) => void;
  formatter?: (departament: Departament) => string;
};

export default function MultiDepartamentSelector({
  defaultDepartaments,
  selectedDepartaments,
  onSelect,
  formatter,
}: MultiDepartamentSelectorProps) {
  const anchor = useComboboxAnchor();
  const [hasDefault, setHasDefault] = useState<boolean>(false);
  const { data, isPending } = useGetAllActiveInternalDepartaments();

  const departaments = data?.data || [];

  // Se for usar grupo
  // const groupItems = () => {
  //   const groups: GroupedItems[] = [];

  //   departaments.forEach((departament) => {
  //     const hasGroup = groups.find((group) => group.value === departament.name);

  //     if (hasGroup) {
  //       hasGroup.items.push({
  //         id: String(departament.id),
  //         label: formatter ? formatter(departament) : formatDepartament(departament),
  //       });
  //     } else {
  //       groups.push({
  //         value: departament.name,
  //         items: [
  //           {
  //             id: String(departament.id),
  //             label: formatter ? formatter(departament) : formatDepartament(departament),
  //           },
  //         ],
  //       });
  //     }
  //   });
  //   return groups;
  // };

  const handleValueChange = (itemIds: string[]) => {
    const chosedDepartaments = departaments.filter((departament) =>
      itemIds.includes(String(departament.id)),
    );
    onSelect(chosedDepartaments);
  };

  const formatDepartament = (departament: Departament) => {
    return `${departament.name}`;
  };

  useEffect(() => {
    if (defaultDepartaments && defaultDepartaments.length > 0 && !hasDefault) {
      onSelect(defaultDepartaments);
      setHasDefault(true);
    }
  }, [defaultDepartaments]);

  const createItems = () => {
    return departaments.map((departament) => ({
      id: String(departament.id),
      label: formatter ? formatter(departament) : formatDepartament(departament),
    }));
  };

  // const groups = useMemo(() => groupItems(), [departaments]);
  const items = useMemo(() => createItems(), [departaments]);

  if (isPending) return <Loader title="Carregando departamentos..." />;

  return (
    <Combobox
      multiple
      items={items}
      onValueChange={handleValueChange}
      value={selectedDepartaments?.map((p) => String(p.id))}
    >
      {/* Só redenriza */}
      <ComboboxChips
        ref={anchor}
        style={{
          flexWrap: "wrap",
        }}
      >
        <ComboboxValue>
          {selectedDepartaments?.map((item) => (
            <ComboboxChip key={item.id}>
              {formatter ? formatter(item) : formatDepartament(item)}
            </ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Adicione departamentos" />
      </ComboboxChips>

      {/* Select em si */}
      <ComboboxContent side="bottom" anchor={anchor}>
        <ComboboxEmpty className="flex flex-col">
          <p>Nenhum departamento encontrado.</p>
          <p>
            Cadastre um novo departamento em{" "}
            <Link href="/departaments">
              <Button className="m-0 p-0" variant="link">
                departamentos
              </Button>
            </Link>
          </p>
        </ComboboxEmpty>
        <ComboboxList>
          {/* {(group: GroupedItems, index) => (
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
          )} */}
          {(item: ComboItem) => (
            <ComboboxItem key={item.id} value={item.id}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
