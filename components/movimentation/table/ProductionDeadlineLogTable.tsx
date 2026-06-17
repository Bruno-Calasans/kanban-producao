"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProductionDeadlineLogPopulated } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import DatesDiff from "../DatesDiff";

type ProductionDeadlineLogTableProps = {
  deadlineLogs: ProductionDeadlineLogPopulated[];
};

export default function ProductionDeadlineLogTable({
  deadlineLogs,
}: ProductionDeadlineLogTableProps) {
  const columns: ColumnDef<ProductionDeadlineLogPopulated>[] = [
    {
      id: "departament.name",
      accessorKey: "deadline.departament.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
    },
    {
      id: "planned-start",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Começa em" />,
      cell: ({
        row: {
          original: { old_planned_start_at, new_planned_start_at },
        },
      }) => <DatesDiff oldDate={old_planned_start_at} newDate={new_planned_start_at} />,
      enableSorting: false,
    },
    {
      id: "planned-end",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Termina em" />,
      cell: ({
        row: {
          original: { old_planned_end_at, new_planned_end_at },
        },
      }) => <DatesDiff oldDate={old_planned_end_at} newDate={new_planned_end_at} />,
      enableSorting: false,
    },
    {
      accessorKey: "reason",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Motivo" />,
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      filterPlaceholder="Procurar replanejamento por departamento"
      filterColumn="departament.name"
      columns={columns}
      data={deadlineLogs}
    />
  );
}
