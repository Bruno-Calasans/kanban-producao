"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { MovimentationPopulated } from "@/types/database.type";
import MovimentationTypeBadge from "@/components/production/badges/MovimentationTypeBadge";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";

type MovimentationTableProps = {
  movimentations: MovimentationPopulated[];
  hideMovimentationColumn?: boolean;
};

const movimentationColumns: ColumnDef<MovimentationPopulated>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row: { original: movimentation } }) => (
      <MovimentationTypeBadge movimentation={movimentation} />
    ),
  },
  {
    id: "movimentation.id",
    accessorKey: "movimentation.id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Movimentação" />,
    cell: (props) => `#${props.getValue()}`,
  },
  {
    id: "from_departament.name",
    accessorKey: "from_departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="De" />,
  },
  {
    id: "departament.name",
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Para" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd." />,
  },
  {
    id: "responsible.name",
    accessorFn: ({ responsible }) => responsible?.name || "",
    accessorKey: "responsible.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Resp" />,
  },
  {
    accessorKey: "started_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data: Início" />,
    cell: ({ row: { original: movimentation } }) =>
      movimentation.started_at ? formatDateTimeCellValue(movimentation.started_at) : null,
  },
  {
    accessorKey: "finished_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data:Término" />,
    cell: ({ row: { original: movimentation } }) =>
      movimentation.finished_at ? formatDateTimeCellValue(movimentation.finished_at) : null,
  },
];

export default function MovimentationTable({
  movimentations,
  hideMovimentationColumn,
}: MovimentationTableProps) {
  const filteredColumns = hideMovimentationColumn
    ? movimentationColumns.filter((column) => column.id != "movimentation.id")
    : movimentationColumns;

  return (
    <DataTable
      filterPlaceholder="Procurar por departamento ou responsável"
      filterColumn={["departament.name", "from_departament.name", "responsible.name"]}
      columns={filteredColumns}
      data={movimentations}
    />
  );
}
