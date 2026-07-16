"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DeadlineStatusEnum } from "@/utils/calcDeadlineStatus";
import { DeadlineData } from "@/utils/groupDeadlineDataByProductionAndDepartament";
import type { Departament, DepartamentState, ProductionPopulated } from "@/types/database.type";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import ProductionDeadlineStatusBadge from "../custom/badges/ProductionDeadlineStatusBadge";
import ProductionDeadlineDatesInput from "../movimentation/inputs/ProductionDeadlineDatesInput";

type DepartamentProductionTableProps = {
  departament: Departament;
  productions: ProductionPopulated[];
  deadlineDataByProduction: Map<number, DeadlineData>;
  departamentStateDataByProduction: Map<number, DepartamentState>;
};

export default function DepartamentProductionTable({
  departament,
  productions,
  deadlineDataByProduction,
  departamentStateDataByProduction,
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
      id: "deadline",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Prazo" />,
      accessorFn: (production) => deadlineDataByProduction.get(production.id),
      sortingFn(rowA, rowB, columnId) {
        const { deadline: deadlineA } = rowA.getValue(columnId) as DeadlineData;
        const { deadline: deadlineB } = rowB.getValue(columnId) as DeadlineData;

        const dealineDateA =
          deadlineA && deadlineA.planned_end_at ? new Date(deadlineA.planned_end_at) : new Date();

        const deadlineDateB =
          deadlineB && deadlineB.planned_end_at ? new Date(deadlineB.planned_end_at) : new Date();

        dealineDateA.setHours(0, 0, 0, 0);
        deadlineDateB.setHours(0, 0, 0, 0);

        return dealineDateA.getTime() - deadlineDateB.getTime();
      },
      cell({ getValue, row: { original: production } }) {
        const { deadline, deadlineStatus } = getValue() as DeadlineData;

        const plannedEndAtDate =
          deadline && deadline.planned_end_at ? new Date(deadline.planned_end_at) : null;
        const departamentState = departamentStateDataByProduction.get(production.id)!;

        return (
          <div className="flex gap-1">
            <ProductionDeadlineDatesInput
              shortVersion
              departamentDeadlineState={{
                production,
                departament,
                departamentState,
                deadline,
                ...deadlineStatus,
              }}
            />
          </div>
        );
      },
    },
    {
      id: "deadline-status",
      accessorFn: (production) => deadlineDataByProduction.get(production.id),
      sortingFn(rowA, rowB, columnId) {
        const { deadlineStatus: statusA } = rowA.getValue(columnId) as DeadlineData;
        const { deadlineStatus: statusB } = rowB.getValue(columnId) as DeadlineData;
        return DeadlineStatusEnum[statusA?.status] - DeadlineStatusEnum[statusB?.status];
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell({ getValue }) {
        const { deadline, deadlineStatus } = getValue() as DeadlineData;
        return (
          <ProductionDeadlineStatusBadge deadline={deadline} deadlineStatus={deadlineStatus} />
        );
      },
    },
  ];
  return (
    <DataTable
      filterPlaceholder="Procurar por OP, ref ou produto"
      filterColumn={["op", "product.name", "product.ref"]}
      columns={productionDepartamentColumns}
      data={productions}
      defaultPageSize={20}
      defaultSorting={[
        {
          id: "deadline-status",
          desc: false,
        },
      ]}
      onClickCell={({ column, row: { original } }) =>
        !["deadline", "action"].includes(column.id) && router.push(`/productions/${original.id}`)
      }
    />
  );
}
