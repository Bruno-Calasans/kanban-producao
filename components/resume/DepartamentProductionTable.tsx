"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
// import { ProductionTableDropdownMenu } from "./ProductionTableDropdownMenu";
import type {
  Departament,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductionStatusBadge from "@/components/custom/badges/ProductionStatusBadge";
import DeadlineStatusBadge from "../custom/badges/DeadlineStatusBadge";
import DepartamentDeadlineStatus from "../custom/DepartamentDeadlineStatus";
import ProductionDeadlineStatusBadge from "../custom/badges/ProductionDeadlineStatusBadge";

type DepartamentProductionTableProps = {
  departament: Departament;
  deadline?: ProductionDeadlinePopulated;
  productions: ProductionPopulated[];
  hideProductColumn?: boolean;
};

export default function DepartamentProductionTable({
  departament,
  productions,
  deadline,
  hideProductColumn,
}: DepartamentProductionTableProps) {
  const router = useRouter();

  const productionDepartamentColumns: ColumnDef<ProductionPopulated>[] = [
    {
      accessorKey: "op",
      header: ({ column }) => <DataTableColumnHeader column={column} title="OP" />,
    },
    {
      id: "product.ref",
      accessorKey: "product.ref",
      header: ({ column }) => <DataTableColumnHeader column={column} title="REF" />,
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
      cell({ row: { original: production } }) {
        return (
          <ProductionDeadlineStatusBadge
            deadline={deadline}
            status={"IN_PROGRESS"}
            expireDays={0}
            expireDaysAfterEnd={0}
          />
        );
      },
    },
    // {
    //   id: "action",
    //   cell: ({ row: { original: production } }) => (
    //     <ProductionTableDropdownMenu production={production} />
    //   ),
    // },
  ];
  return (
    <DataTable
      filterPlaceholder="Procurar por OP, ref ou produto"
      filterColumn={["op", "product.name", "product.ref"]}
      columns={productionDepartamentColumns}
      data={productions}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/productions/${original.id}`)
      }
    />
  );
}
