"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProductProduction } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductionStatusBadge from "@/components/custom/badges/ProductionStatusBadge";
import ProductionMoreDetails from "./MovimentationMoreDetails";
import Link from "next/link";
import ProductionDetails from "./ProductionDetails";
import classifyProductionStatus from "@/utils/classifyProductionStatus";

type ProductPageProps = {
  productProductions: ProductProduction[];
};

const productColumns: ColumnDef<ProductProduction>[] = [
  {
    id: "product.ref",
    accessorKey: "product.ref",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ref" />,
    cell: ({
      row: {
        original: { product },
      },
    }) => product.ref,
  },
  {
    id: "product.name",
    accessorKey: "product.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
    cell: ({
      row: {
        original: { product },
      },
    }) => (
      <Link className="hover:underline" href={`/products/${product.id}`}>
        {product.name}
      </Link>
    ),
  },
  {
    id: "productions",
    accessorFn: ({ productions }) => productions.length,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produções" />,
    cell({
      row: {
        original: { productions },
      },
    }) {
      return productions ? productions.length : 0;
    },
  },
  {
    id: "last-production",
    accessorFn: ({ productions }) =>
      productions.length > 0 ? productions[productions.length - 1].op : "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última produção" />,
    cell: ({
      row: {
        original: { productions },
      },
    }) => {
      const lastProduction =
        productions.length > 0 ? productions[productions.length - 1] : undefined;
      return (
        <Link
          className="flex gap-1 hover:underline items-center"
          href={`/productions/${lastProduction?.id}`}
        >
          {lastProduction && <ProductionDetails production={lastProduction} />}
          {lastProduction?.op}
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    id: "last-movimentation-status",
    accessorFn: ({ productions }) =>
      productions.length > 0 ? `${productions[productions.length - 1].status}` : undefined,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({
      row: {
        original: { productions },
      },
    }) =>
      productions.length > 0 ? (
        <ProductionStatusBadge production={productions[productions.length - 1]} />
      ) : null,
    sortingFn: ({ original: { productions } }) =>
      classifyProductionStatus(productions[productions.length - 1]),
  },
  {
    id: "details",
    header: "Detalhes",
    cell: ({
      row: {
        original: { productions },
      },
    }) => {
      const lastMovimentation =
        productions.length > 0 ? productions[productions.length - 1] : undefined;
      return lastMovimentation ? <ProductionMoreDetails production={lastMovimentation} /> : null;
    },
  },
];

export default function ResumeTable({ productProductions }: ProductPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar por produto, OP ou ref"
      filterColumn={["product.name", "product.ref", "last-production"]}
      columns={productColumns}
      data={productProductions}
    />
  );
}
