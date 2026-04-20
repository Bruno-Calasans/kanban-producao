"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { ProcessExecutionPopulated } from "@/types/database.type";
import ProcessExecutionTypeBadge from "@/components/process-execution/badges/ProcessExecutionTypeBadge";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";

type MovimentationPageProps = {
  processExecutions: ProcessExecutionPopulated[];
  hideMovimentationColumn?: boolean;
};

const processExecutationColumns: ColumnDef<ProcessExecutionPopulated>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row: { original: processExecution } }) =>
      stringDateTimeToDate(processExecution.created_at),
  },
  {
    id: "movimentation.id",
    accessorKey: "movimentation.id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Movimentação" />,
    cell: (props) => `#${props.getValue()}`,
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
    id: "responsible.name",
    accessorFn: ({ responsible }) => responsible?.name || "",
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
];

export default function ProcessExecutationTable({
  processExecutions,
  hideMovimentationColumn,
}: MovimentationPageProps) {
  const filteredColumns = hideMovimentationColumn
    ? processExecutationColumns.filter((column) => column.id != "movimentation.id")
    : processExecutationColumns;

  return (
    <DataTable
      filterPlaceholder="Procurar Execução de processos"
      filterColumn="process.name"
      columns={filteredColumns}
      data={processExecutions}
    />
  );
}
