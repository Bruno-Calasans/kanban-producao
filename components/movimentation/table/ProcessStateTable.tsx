"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProcessState } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProcessStateBadge from "../ProcessStateBadge";
import { Button } from "@/components/ui/button";

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
      <ProcessStateBadge processState={processState} />
    ),
  },

  {
    id: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ações" />,
    cell: ({ row }) => {
      const process = row.original;
      if (process.avaliableAmount == 0) return null;

      return (
        <div className="flex gap-1">
          <Button size="xs">Executar</Button>
          <Button size="xs">Reprocessar</Button>
          <Button size="xs">Ajustar</Button>
        </div>
      );
    },
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
