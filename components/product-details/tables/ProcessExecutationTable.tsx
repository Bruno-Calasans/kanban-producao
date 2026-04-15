"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { ProcessExecutionPopulated } from "@/types/database.type";
import ProcessExecutionTypeBadge from "@/components/processs-execution/badges/ProcessExecutionTypeBadge";
import ProcessStatusBadge from "@/components/processs-execution/badges/ProcessExecutionStatusBadge";

type MovimentationPageProps = {
  processExecutions: ProcessExecutionPopulated[];
};

const processExecutationColumns: ColumnDef<ProcessExecutionPopulated>[] = [
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
    id: "responsible.name",
    accessorKey: "responsible.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Resp" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row: { original: processExecution } }) => (
      <ProcessExecutionTypeBadge processExecution={processExecution} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row: { original: processExecution } }) => (
      <ProcessStatusBadge status={processExecution.status} />
    ),
  },
  // {
  //     accessorKey: "created_at",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Criado em" />
  //     ),
  //     cell(props) {
  //         return formatDateTimeCellValue(props.getValue())
  //     },
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
