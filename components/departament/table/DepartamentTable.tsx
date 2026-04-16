"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { Departament } from "@/types/database.type";
import DepartamentDropdownMenu from "./DepartamentDropdownMenu";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";

type DepartamentPageProps = {
  departaments: Departament[];
};

const DepartmentColumns: ColumnDef<Departament>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    accessorKey: "sequence",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
    cell: (props) => stringDateTimeToDate(props.getValue()),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado em" />,
    cell: (props) => stringDateTimeToDate(props.getValue()),
  },
  {
    id: "action",
    cell: ({ row }) => {
      const departament = row.original;
      return <DepartamentDropdownMenu departament={departament} />;
    },
  },
];

export function DepartamentTable({ departaments }: DepartamentPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar departamento"
      filterColumn="name"
      columns={DepartmentColumns}
      data={departaments}
    />
  );
}
