"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import DepartamentStatusBadge from "@/components/production/badges/DepartamentStatusBadge";
import DepartamentActions from "@/components/production/DepartamentActions";
import DepartamentDeadlineStatus from "@/components/custom/DepartamentDeadlineStatus";

type DepartamentStateTableProps = {
  departamentStates: DepartamentState[];
  deadlines: ProductionDeadlinePopulated[];
};

export default function DepartamentStateTable({
  departamentStates,
  deadlines,
}: DepartamentStateTableProps) {
  const processColumns: ColumnDef<DepartamentState>[] = [
    // {
    //   id: "template.sequence",
    //   accessorKey: "template.sequence",
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Sequência" />,
    //   cell: ({ row: { original } }) => original.template.sequence + 1,
    //   enableSorting: false,
    // },
    {
      id: "departament.name",
      accessorKey: "departament.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
      cell: ({
        row: {
          original: { departament },
        },
      }) => <DepartamentDeadlineStatus departament={departament} deadlines={deadlines} />,
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
            deadlines={deadlines}
            departamentState={departamentState}
            departamentStates={departamentStates}
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
      hideSearch
    />
  );
}
