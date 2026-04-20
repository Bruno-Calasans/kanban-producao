"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ResponsibleWithDepartament } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import ResponsibleDropdownMenu from "./ResponsibleTableDropdownMenu";
import ActiveBadge from "@/components/custom/badges/ActiveBadge";

type ResponsiblePageProps = {
  responsibles: ResponsibleWithDepartament[];
};

const responsibleColumns: ColumnDef<ResponsibleWithDepartament>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Responsável" />,
  },
  {
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ativo" />,
    cell: ({
      row: {
        original: { is_active },
      },
    }) => <ActiveBadge isActive={is_active} />,
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
    cell: ({ row: { original: responsible } }) => (
      <ResponsibleDropdownMenu responsible={responsible} />
    ),
  },
];

export default function ResponsibleTable({ responsibles }: ResponsiblePageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar responsável"
      filterColumn="name"
      columns={responsibleColumns}
      data={responsibles}
    />
  );
}
