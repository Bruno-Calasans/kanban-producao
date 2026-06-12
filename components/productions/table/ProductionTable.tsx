"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ProductionTableDropdownMenu } from "./ProductionTableDropdownMenu";
import type { ProductionPopulated } from "@/types/database.type";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import ProductionStatusBadge from "@/components/custom/badges/ProductionStatusBadge";

type ProductionTableProps = {
  productions: ProductionPopulated[];
  hideProductColumn?: boolean;
};

export default function MovimentationTable({
  productions,
  hideProductColumn,
}: ProductionTableProps) {
  const router = useRouter();

  const movimentationColumns: ColumnDef<ProductionPopulated>[] = [
    {
      id: "product.ref",
      accessorKey: "product.ref",
      header: ({ column }) => <DataTableColumnHeader column={column} title="REF" />,
    },
    {
      accessorKey: "op",
      header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
    },
    {
      id: "product.name",
      accessorKey: "product.name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
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
        <ProductionTableDropdownMenu production={production} />
      ),
    },
  ];

  const filteredColumns = hideProductColumn
    ? movimentationColumns.filter((column) => column.id != "product.name")
    : movimentationColumns;

  return (
    <DataTable
      filterPlaceholder="Procurar por produto, OP ou Ref"
      filterColumn={["op", "product.ref"]}
      columns={filteredColumns}
      data={productions}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/productions/${original.id}`)
      }
    />
  );
}
