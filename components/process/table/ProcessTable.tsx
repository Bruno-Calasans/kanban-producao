"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProcessWithDepartament } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProcessDropdownMenu from "@/components/process/table/ProcessDropdownMenu";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";

type ProcessPageProps = {
  processes: ProcessWithDepartament[];
};

const processColumns: ColumnDef<ProcessWithDepartament>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Processo" />,
  },
  {
    accessorKey: "sequence",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
  },
  {
    id: "departament.name",
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
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
      const process = row.original;
      return <ProcessDropdownMenu process={process} />;
    },
  },
];

export default function ProcessTable({ processes }: ProcessPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar processo"
      filterColumn="name"
      columns={processColumns}
      data={processes}
    />
  );
}
