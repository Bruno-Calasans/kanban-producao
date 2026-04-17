"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProductWithProductionFlow } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductTableDropdownMenu from "./ProductTableDropdownMenu";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import { useRouter } from "next/navigation";
import ActiveBadge from "@/components/custom/badges/ActiveBadge";

type ProductPageProps = {
  products: ProductWithProductionFlow[];
};

const productColumns: ColumnDef<ProductWithProductionFlow>[] = [
  {
    accessorKey: "is_active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Situação" />,
    cell: (props) => <ActiveBadge isActive={!!props.getValue()} />,
  },
  {
    accessorKey: "op",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
  },
  {
    id: "production_flow.name",
    accessorKey: "production_flow.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fluxo" />,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
    cell: ({ row: { original: product } }) => stringDateTimeToDate(product.created_at),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado em" />,
    cell: ({ row: { original: product } }) => stringDateTimeToDate(product.updated_at),
  },
  {
    id: "action",
    cell: ({ row: { original: product } }) => <ProductTableDropdownMenu product={product} />,
  },
];

export default function ProductTable({ products }: ProductPageProps) {
  const router = useRouter();

  return (
    <DataTable
      filterPlaceholder="Procurar produto"
      filterColumn="name"
      columns={productColumns}
      data={products}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/products/${original.id}`)
      }
    />
  );
}
