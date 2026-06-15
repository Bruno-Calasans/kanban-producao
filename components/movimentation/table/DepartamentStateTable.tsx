"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { DepartamentState } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import DepartamentStatusBadge from "@/components/production/badges/DepartamentStatusBadge";
import DepartamentActions from "@/components/production/DepartamentActions";

type DepartamentStateTableProps = {
  departamentStates: DepartamentState[];
};

export default function DepartamentStateTable({ departamentStates }: DepartamentStateTableProps) {
  const processColumns: ColumnDef<DepartamentState>[] = [
    {
      id: "template.sequence",
      accessorKey: "template.sequence",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
      enableSorting: false,
    },
    {
      id: "departament.name",
      accessorKey: "departament.name",
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
      cell: ({ row: { original: departamentState } }) => (
        <DepartamentStatusBadge departamentState={departamentState} />
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ações" />,
      cell: ({ row: { original: departamentState } }) => {
        return (
          <DepartamentActions
            departamentStates={departamentStates}
            departamentState={departamentState}
          />
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      filterPlaceholder="Procurar departamento"
      filterColumn="departament.name"
      columns={processColumns}
      data={departamentStates}
      hidePagination
    />
  );
}
