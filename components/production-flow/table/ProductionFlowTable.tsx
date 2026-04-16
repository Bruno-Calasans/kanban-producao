"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ProductionFlow } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import sortByDefault from "@/utils/sortByDefault";
import DefaultBadge from "@/components/custom/badges/DefaultBadge";
import ProductionFlowDropdownMenu from "./ProductionFlowDropdownMenu";
import { Badge } from "@/components/ui/badge";
import ProductionFlowProcesses from "./ProductionFlowProcesses";

type FlowTemplatePageProps = {
  productionFlows: ProductionFlow[];
};

const productionFlowColumns: ColumnDef<ProductionFlow>[] = [
  {
    accessorKey: "is_default",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Padrão" />,
    sortingFn: (rowA, rowB) => sortByDefault(rowA.original, rowB.original),
    cell: ({
      row: {
        original: { is_default },
      },
    }) => <DefaultBadge isDefault={is_default} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
  },
  {
    accessorKey: "desc",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Desc" />,
  },
  {
    id: "processes",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Processos " />,
    cell: ({ row: { original } }) => {
      return <ProductionFlowProcesses productionFlow={original} />;
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
    accessorKey: "updated_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado em" />,
    cell: (props) => {
      return formatDateTimeCellValue(props.getValue());
    },
  },
  {
    id: "action",
    cell: ({ row: { original: productionFlow } }) => {
      return <ProductionFlowDropdownMenu productionFlow={productionFlow} />;
    },
  },
];

export default function ProductionFlowTable({ productionFlows }: FlowTemplatePageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar fluxos"
      filterColumn="name"
      columns={productionFlowColumns}
      data={productionFlows}
    />
  );
}
