"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import type { MovimentationPopulated } from "@/types/database.type";
import { MovimentationTableDropdownMenu } from "./MovimentationTableDropdownMenu";
import MovimentationStatusBadge from "../../custom/badges/MovimentationStatusBadge";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";
import { useRouter } from "next/navigation";

type MovimentationPageProps = {
  movimentations: MovimentationPopulated[];
  hideProductColumn?: boolean;
};

export default function MovimentationTable({
  movimentations,
  hideProductColumn,
}: MovimentationPageProps) {
  const router = useRouter();

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
      id: "productionFlow.nam",
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
        <MovimentationTableDropdownMenu movimentation={movimentation} />
      ),
    },
  ];

  const filteredColumns = hideProductColumn
    ? movimentationColumns.filter((column) => column.id != "product.name")
    : movimentationColumns;

  return (
    <DataTable
      filterPlaceholder="Procurar por movimentação ou produto"
      filterColumn={["id", "product.name"]}
      columns={filteredColumns}
      data={movimentations}
      onClickCell={({ column, row: { original } }) =>
        column.id != "action" && router.push(`/movimentations/${original.id}`)
      }
    />
  );
}
