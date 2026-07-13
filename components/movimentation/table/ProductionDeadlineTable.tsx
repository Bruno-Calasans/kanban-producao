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

const columns: ColumnDef<DepartamentDeadlineState>[] = [
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
    cell: ({ row: { original: departamentDeadlineState } }) => (
      <ProductionDeadlineDatesInput departamentDeadlineState={departamentDeadlineState} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    enableSorting: false,
    cell: ({
      row: {
        original: { deadline, status, expireDays, expireDaysAfterEnd },
      },
    }) =>
      deadline && (
        <ProductionDeadlineStatusBadge
          deadline={deadline}
          status={status}
          expireDays={expireDays}
          expireDaysAfterEnd={expireDaysAfterEnd}
        />
      ),
  },
];

export default function ProductionDeadlineTable({
  departamentDeadlineStates,
  hideSearch,
}: ProductionDeadlineTableProps) {
  // Remove o departamento final
  const filteredDeadlineStates = departamentDeadlineStates.filter(
    (deadline) => !deadline.departament.is_final,
  );

  return (
    <DataTable
      filterPlaceholder="Procurar por departamento"
      filterColumn="departament.name"
      columns={columns}
      data={filteredDeadlineStates}
      hideSearch={hideSearch}
      hidePagination
    />
  );
}
