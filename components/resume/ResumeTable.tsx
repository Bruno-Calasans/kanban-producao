"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProductMovimentation } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import MovimentationStatusBadge from "../custom/badges/MovimentationStatusBadge";
import MoreDetails from "./MoreDetails";
import Link from "next/link";

type ProductPageProps = {
  productMovimentations: ProductMovimentation[];
};

const productColumns: ColumnDef<ProductMovimentation>[] = [
  {
    accessorKey: "product.op",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
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
    id: "movimentations",
    accessorFn: ({ movimentations }) => movimentations.length,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Movimentações" />,
    cell({
      row: {
        original: { movimentations },
      },
    }) {
      return movimentations ? movimentations.length : 0;
    },
  },
  {
    id: "last-movimentation",
    accessorFn: ({ movimentations }) =>
      movimentations.length > 0 ? `#${movimentations[movimentations.length - 1].id}` : "",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última movimentação" />,
    cell: ({
      row: {
        original: { movimentations },
      },
    }) => {
      const lastMovimentation =
        movimentations.length > 0 ? movimentations[movimentations.length - 1] : undefined;
      return (
        <Link
          className="flex gap-1 hover:underline"
          href={`/movimentations/${lastMovimentation?.id}`}
        >
          #{lastMovimentation?.id}
        </Link>
      );
    },
  },
  {
    id: "last-movimentation-status",
    accessorFn: ({ movimentations }) =>
      movimentations.length > 0 ? `${movimentations[movimentations.length - 1].status}` : undefined,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({
      row: {
        original: { movimentations },
      },
    }) =>
      movimentations.length > 0 ? (
        <MovimentationStatusBadge movimentation={movimentations[movimentations.length - 1]} />
      ) : null,
  },
  {
    id: "details",
    header: "Detalhes",
    cell: ({
      row: {
        original: { movimentations },
      },
    }) => {
      const lastMovimentation =
        movimentations.length > 0 ? movimentations[movimentations.length - 1] : undefined;
      return lastMovimentation ? <MoreDetails movimentation={lastMovimentation} /> : null;
    },
  },
  // {
  //   id: "action",
  //   header: "",
  //   cell: ({ row }) => {
  //     const product = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <EllipsisVerticalIcon className="h-4 w-4" />
  //         </DropdownMenuTrigger>

  //         <DropdownMenuContent side="bottom" align="end" className="w-fit">
  //           <EditProductDialog product={product}>
  //             <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  //               <Edit2Icon />
  //               Editar
  //             </DropdownMenuItem>
  //           </EditProductDialog>

  //           <DeleteProductDialog product={product}>
  //             <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  //               <Trash2Icon />
  //               Excluir
  //             </DropdownMenuItem>
  //           </DeleteProductDialog>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default function ResumeTable({ productMovimentations }: ProductPageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar produto"
      filterColumn="product.name"
      columns={productColumns}
      data={productMovimentations}
    />
  );
}
