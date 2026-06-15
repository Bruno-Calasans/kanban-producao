"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductionDeadlineStatusBadge from "@/components/custom/badges/ProductionDeadlineStatusBadge";
import ProductionDeadlineDatesInput from "../inputs/ProductionDeadlineDatesInput";

type ProductionDeadlineTableProps = {
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data de Início e Fim" />,
    enableSorting: false,
    cell: ({ row: { original: departamentState } }) => (
      <ProductionDeadlineDatesInput departamentState={departamentState} />
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
    }) => <ProductionDeadlineStatusBadge status={status} expiredDays={expiredDays} />,
  },
];

export default function ProductionDeadlineTable({
  departamentDeadlineStates,
  hideSearch,
}: ProductionDeadlineTableProps) {
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
