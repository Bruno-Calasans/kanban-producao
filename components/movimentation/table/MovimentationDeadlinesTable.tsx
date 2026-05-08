"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import MovimentationDeadlineStatusBadge from "@/components/custom/badges/MovimentationDeadlineStatus";
import MovimentationDeadlineInput from "../MovimentationDeadlineInput";
import useDepartamentState, {
  DepartamentState,
} from "@/hooks/departament-state/useDepartamentState";

type MovimentationDeadlineState = {
  processStates: ProcessState[];
  movimentationDeadlines: MovimentationDeadlinePopulated[];
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
        original: { deadline },
      },
    }) => (deadline?.started_at ? formatDateTimeCellValue(deadline.started_at) : null),
  },
  {
    accessorKey: "finished_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Terminou em" />,
    cell: ({
      row: {
        original: { deadline },
      },
    }) => (deadline?.finished_at ? formatDateTimeCellValue(deadline.finished_at) : null),
  },
  {
    accessorKey: "expected_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prazo" />,
    cell: ({
      row: {
        original: { deadline },
      },
    }) => <MovimentationDeadlineInput deadline={deadline} />,
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
  movimentationDeadlines,
  processStates,
}: MovimentationDeadlineState) {
  const { departamentStates } = useDepartamentState({
    movimentationDeadlines: movimentationDeadlines,
    movimentationProcessStates: processStates,
  });

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
