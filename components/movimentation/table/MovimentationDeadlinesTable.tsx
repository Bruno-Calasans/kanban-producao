"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import MovimentationDeadlineStatusBadge from "@/components/custom/badges/MovimentationDeadlineStatus";
import MovimentationDeadlineDatesInput from "../inputs/MovimentationDeadlineDatesInput";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";

type MovimentationDeadlineState = {
  departamentDeadlineStates: DepartamentDeadlineState[];
  hideSearch?: boolean;
};

const processColumns: ColumnDef<DepartamentDeadlineState>[] = [
  {
    id: "departament.name",
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
    enableSorting: false,
  },
  {
    id: "deadline-data",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de início e data de fim" />
    ),
    enableSorting: false,
    cell: ({ row: { original: departamentState } }) => (
      <MovimentationDeadlineDatesInput departamentState={departamentState} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    enableSorting: false,
    cell: ({
      row: {
        original: { status, expiredDays },
      },
    }) => <MovimentationDeadlineStatusBadge status={status} expiredDays={expiredDays} />,
  },
];

export default function MovimentationDeadlinesTable({
  departamentDeadlineStates,
  hideSearch,
}: MovimentationDeadlineState) {
  return (
    <DataTable
      filterPlaceholder="Procurar por departamento"
      filterColumn="departament.name"
      columns={processColumns}
      data={departamentDeadlineStates}
      hideSearch={hideSearch}
      hidePagination
    />
  );
}
