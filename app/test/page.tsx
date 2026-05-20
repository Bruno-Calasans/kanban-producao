"use client";

import { SelectorItem, SingleSelector } from "@/components/custom/selectors/SingleSelector";
import { SingleSelectorWithGroup } from "@/components/custom/selectors/SingleSelectorWithGroup";
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments";
import { Departament } from "@/types/database.type";
import { useEffect, useState } from "react";

type DepartamentSelectorProps = {
  defaultDepartament?: Departament;
  onChange: (departament?: Departament) => void;
};

type DataTeste = {
  id: number;
  name: string;
};

export default function TestPage({ defaultDepartament, onChange }: DepartamentSelectorProps) {
  const data = [
    {
      id: 1,
      name: "PREPARAÇÃO",
    },
    {
      id: 2,
      name: "CORTE",
    },
  ];

  const [selected, setSelected] = useState<DataTeste>();

  const groups = {
    PCP: data,
  };

  return (
    <SingleSelectorWithGroup
      data={data}
      dataGroup={groups}
      labelSelector="name"
      onChange={setSelected}
      selectedData={selected}
    />
  );
}
