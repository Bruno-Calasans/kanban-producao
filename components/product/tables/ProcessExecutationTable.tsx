"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { ProcessExecutionPopulated } from "@/types/database.type";
import ProcessExecutionTypeBadge from "@/components/process-execution/badges/ProcessExecutionTypeBadge";
import ProcessStatusBadge from "@/components/process-execution/badges/ProcessExecutionStatusBadge";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";

type MovimentationPageProps = {
  processExecutions: ProcessExecutionPopulated[];
};

const processExecutationColumns: ColumnDef<ProcessExecutionPopulated>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row: { original: processExecution } }) =>
      stringDateTimeToDate(processExecution.created_at),
  },
  {
    id: "from_process.name",
    accessorKey: "from_process.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="De: processo" />,
  },
  {
    id: "process.name",
    accessorKey: "process.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Para: Processo" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd." />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row: { original: processExecution } }) => (
      <ProcessExecutionTypeBadge processExecution={processExecution} />
    ),
  },
  {
    id: "responsible.name",
    accessorKey: "responsible.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Resp" />,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  //   cell: ({ row: { original: processExecution } }) => (
  //     <ProcessStatusBadge status={processExecution.status} />
  //   ),
  // },
];

export default function ProcessExecutationTable({ processExecutions }: MovimentationPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar Execução de processos"
      filterColumn="process.name"
      columns={processExecutationColumns}
      data={processExecutions}
    />
  );
}
