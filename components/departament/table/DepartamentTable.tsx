"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { Departament } from "@/types/database.type";
import DepartamentDropdownMenu from "./DepartamentDropdownMenu";
import sortByDefault from "@/utils/sortByDefault";
import DefaultBadge from "@/components/custom/DefaultBadge";

type DepartamentPageProps = {
  departaments: Departament[];
};

const DepartmentColumns: ColumnDef<Departament>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data de criação" />,
    cell(props) {
      return formatDateTimeCellValue(props.getValue());
    },
  },
  {
    accessorKey: "isDefault",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Padrão" />,
    sortingFn: (rowA, rowB) => sortByDefault(rowA.original, rowB.original),
    cell: ({
      row: {
        original: { is_default },
      },
    }) => <DefaultBadge isDefault={is_default} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    accessorKey: "sequence",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última atualização" />,
    cell: (props) => {
      return formatDateTimeCellValue(props.getValue());
    },
  },
  {
    id: "action",
    header: "",
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
