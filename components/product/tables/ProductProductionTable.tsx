"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ProductProductionDropdownMenu } from "./ProductMovimentationDropdownMenu";
import type { ProductionPopulated } from "@/types/database.type";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import ProductionStatusBadge from "@/components/custom/badges/ProductionStatusBadge";

type ProductionProductionTableProps = {
  productions: ProductionPopulated[];
};

const movimentationColumns: ColumnDef<ProductionPopulated>[] = [
  {
    accessorKey: "op",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
  },
  {
    id: "productionFlow.name",
    accessorKey: "productionFlow.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fluxo" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd." />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell({ row: { original: production } }) {
      return <ProductionStatusBadge production={production} />;
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
    cell: ({ row: { original: production } }) => (
      <ProductProductionDropdownMenu production={production} />
    ),
  },
];

export default function ProductProductionTable({ productions }: ProductionProductionTableProps) {
  const router = useRouter();
  return (
    <DataTable
      filterPlaceholder="Procurar produção por OP"
      filterColumn="op"
      columns={movimentationColumns}
      data={productions}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/productions/${original.id}`)
      }
    />
  );
}
