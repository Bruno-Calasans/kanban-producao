"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import type { MovimentationPopulated, MovimentationType } from "@/types/database.type";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import MovimentationTypeBadge from "@/components/production/badges/MovimentationTypeBadge";
import formatStringToDate from "@/utils/formatStringToDate";
import classifyMovimentationType from "@/utils/classifyMovimentationType";

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
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue<MovimentationType>(columnId);
      const b = rowB.getValue<MovimentationType>(columnId);
      return classifyMovimentationType(a) - classifyMovimentationType(b);
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd." />,
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
    id: "responsible.name",
    accessorFn: ({ responsible }) => responsible?.name || "",
    accessorKey: "responsible.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Resp" />,
  },
  {
    accessorKey: "started_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data: Início" />,
    cell: ({ row: { original: movimentation } }) =>
      movimentation.started_at ? formatStringToDate(movimentation.started_at) : null,
  },
  {
    accessorKey: "finished_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data:Término" />,
    cell: ({ row: { original: movimentation } }) =>
      movimentation.finished_at ? formatStringToDate(movimentation.finished_at) : null,
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
