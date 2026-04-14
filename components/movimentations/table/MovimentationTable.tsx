"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import DeleteMovimentationDialog from "@/components/movimentations/dialogs/DeleteMovimentationDialog";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { Movimentation, MovimentationPopulated } from "@/types/database.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MovimentationTableDropdownMenu } from "./MovimentationTableDropdownMenu";
import MovimentationStatusBadge from "./MovimentationStatusBadge";

type MovimentationPageProps = {
  movimentations: MovimentationPopulated[];
};

const movimentationColumns: ColumnDef<MovimentationPopulated>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell({ row: { original: movimentation } }) {
      return <p>#{movimentation.id}</p>;
    },
  },

  {
    id: "productName",
    accessorKey: "product.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd." />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell({ row: { original: movimentation } }) {
      return <MovimentationStatusBadge movimentation={movimentation} />;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
    cell(props) {
      return formatDateTimeCellValue(props.getValue());
    },
  },

  {
    id: "action",
    header: "",
    cell: ({ row: { original: movimentation } }) => (
      <MovimentationTableDropdownMenu movimentation={movimentation} />
    ),
  },
];

export default function MovimentationTable({ movimentations }: MovimentationPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar movimentação"
      filterColumn="productName"
      columns={movimentationColumns}
      data={movimentations}
    />
  );
}
