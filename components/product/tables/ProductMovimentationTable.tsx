"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { MovimentationPopulated } from "@/types/database.type";
import MovimentationStatusBadge from "@/components/custom/badges/MovimentationStatusBadge";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import { useRouter } from "next/navigation";
import { ProductMovimentationDropdownMenu } from "./ProductMovimentationDropdownMenu";

type ProductMovimentationTableProps = {
  movimentations: MovimentationPopulated[];
};

const movimentationColumns: ColumnDef<MovimentationPopulated>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Movimentação" />,
    cell({ row: { original: movimentation } }) {
      return <p>#{movimentation.id}</p>;
    },
  },
  {
    id: "product.name",
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
    cell: (props) => stringDateTimeToDate(props.getValue()),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado em" />,
    cell: (props) => stringDateTimeToDate(props.getValue()),
  },
  {
    id: "action",
    cell: ({ row: { original: movimentation } }) => (
      <ProductMovimentationDropdownMenu movimentation={movimentation} />
    ),
  },
];

export default function ProductMovimentationTable({
  movimentations,
}: ProductMovimentationTableProps) {
  const router = useRouter();
  return (
    <DataTable
      filterPlaceholder="Procurar movimentação do produto"
      filterColumn="id"
      columns={movimentationColumns}
      data={movimentations}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/movimentations/${original.id}`)
      }
    />
  );
}
