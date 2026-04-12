"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { Product, ProductWithProductionFlow } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductTableDropdownMenu from "./ProductTableDropdownMenu";

type ProductPageProps = {
  products: ProductWithProductionFlow[];
};

const productColumns: ColumnDef<ProductWithProductionFlow>[] = [
  {
    accessorKey: "op",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
  },
  {
    accessorKey: "max_amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd. Máxima" />,
  },
  {
    id: "production_flow.name",
    accessorKey: "production_flow.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fluxo" />,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
    cell(props) {
      return formatDateTimeCellValue(props.getValue());
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado em" />,
    cell: (props) => {
      return formatDateTimeCellValue(props.getValue());
    },
  },
  {
    id: "action",
    cell: ({ row: { original: product } }) => <ProductTableDropdownMenu product={product} />,
  },
];

export default function ProductTable({ products }: ProductPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar produto"
      filterColumn="name"
      columns={productColumns}
      data={products}
    />
  );
}
