"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProcessState } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProcessStatusBadge from "@/components/process-execution/badges/ProcessExecutionStatusBadge";
import ProcessExecutionActions from "@/components/process-execution/ProcessExecutionActions";

type ProcessStateTableProps = {
  processStates: ProcessState[];
};

export default function ProcessStateTable({ processStates }: ProcessStateTableProps) {
  const processColumns: ColumnDef<ProcessState>[] = [
    {
      id: "template.sequence",
      accessorKey: "template.sequence",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
      enableSorting: false,
    },
    {
      id: "process.name",
      accessorKey: "process.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Processo" />,
      enableSorting: false,
    },
    {
      id: "process.departament.name",
      accessorKey: "process.departament.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
      enableSorting: false,
    },
    {
      accessorKey: "avaliableAmount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd. Disponível" />,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row: { original: processState } }) => (
        <ProcessStatusBadge processState={processState} />
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ações" />,
      cell: ({ row: { original: processState } }) => {
        return (
          <ProcessExecutionActions processStates={processStates} processState={processState} />
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      filterPlaceholder="Procurar processo"
      filterColumn="process.name"
      columns={processColumns}
      data={processStates}
      hidePagination
    />
  );
}
