"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import MovimentationDeadlineStatusBadge from "@/components/custom/badges/MovimentationDeadlineStatus";
import MovimentationDeadlineInput from "../inputs/MovimentationDeadlineInput";
import { DepartamentState } from "@/hooks/departament-state/useDepartamentState";
import MovimentationDeadlineStartsAtInput from "../inputs/MovimentationDeadlineStartsAtInput";
import MovimentationDeadlineEndsAtInput from "../inputs/MovimentationDeadlineEndsAtInput";
import { de } from "date-fns/locale";

type MovimentationDeadlineState = {
  departamentStates: DepartamentState[];
};

const processColumns: ColumnDef<DepartamentState>[] = [
  {
    id: "departament.name",
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    accessorKey: "deadline.started_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Começou em" />,
    cell: ({
      row: {
        original: { movimentation, departament, deadline, status },
      },
    }) => (
      <MovimentationDeadlineStartsAtInput
        movimentation={movimentation}
        departament={departament}
        deadline={deadline}
        disabled={status == "COMPLETED"}
      />
    ),
  },
  {
    accessorKey: "finished_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Terminou em" />,
    cell: ({
      row: {
        original: { movimentation, departament, deadline, status },
      },
    }) => (
      <MovimentationDeadlineEndsAtInput
        movimentation={movimentation}
        departament={departament}
        deadline={deadline}
        disabled={status != "COMPLETED" || !deadline?.started_at}
      />
    ),
  },
  {
    accessorKey: "expected_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prazo" />,
    cell: ({
      row: {
        original: { movimentation, departament, deadline, status },
      },
    }) => (
      <MovimentationDeadlineInput
        movimentation={movimentation}
        departament={departament}
        deadline={deadline}
        disabled={status == "COMPLETED" || !deadline?.started_at}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({
      row: {
        original: { status, expiredDays },
      },
    }) => <MovimentationDeadlineStatusBadge status={status} expiredDays={expiredDays} />,
  },
];

export default function MovimentationDeadlinesTable({
  departamentStates,
}: MovimentationDeadlineState) {
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
