"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProcessState } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProcessStatusBadge from "@/components/processs-execution/badges/ProcessExecutionStatusBadge";
import ProcessExecutionActions from "@/components/processs-execution/ProcessExecutionActions";

type ProcessStateTableProps = {
  processStates: ProcessState[];
};

const processColumns: ColumnDef<ProcessState>[] = [
  {
    id: "process.name",
    accessorKey: "process.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Processo" />,
  },
  {
    accessorKey: "avaliableAmount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd. Disponível" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row: { original: processState } }) => (
      <ProcessStatusBadge status={processState.status} />
    ),
  },

  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ações" />,
    cell: ({ row: { original: processState } }) => (
      <ProcessExecutionActions processState={processState} />
    ),
  },
];

export default function ProcessStateTable({ processStates }: ProcessStateTableProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar processo"
      filterColumn="process.name"
      columns={processColumns}
      data={processStates}
    />
  );
}
