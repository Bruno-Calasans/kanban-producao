"use client";

import { DataTable } from "@/components/custom/data-table/DataTable";
import { ResponsibleWithDepartament } from "@/types/database.type";
import { ColumnDef } from "@tanstack/react-table";
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime";
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader";
import EditResponsibleDialog from "@/components/responsible/dialogs/EditResponsibleDialog";
import DeleteResponsibleDialog from "@/components/responsible/dialogs/DeleteResponsibleDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import stringDateTimeToDate from "@/utils/stringDateTimeToDate";

type ResponsiblePageProps = {
  responsibles: ResponsibleWithDepartament[];
};

const responsibleColumns: ColumnDef<ResponsibleWithDepartament>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Responsável" />,
  },
  {
    accessorKey: "departament.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
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
    cell: ({ row }) => {
      const responsible = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVerticalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <EditResponsibleDialog responsible={responsible}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit2Icon />
                Editar
              </DropdownMenuItem>
            </EditResponsibleDialog>

            <DeleteResponsibleDialog responsible={responsible}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash2Icon />
                Excluir
              </DropdownMenuItem>
            </DeleteResponsibleDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ResponsibleTable({ responsibles }: ResponsiblePageProps) {
  return (
    <DataTable
      filterPlaceholder="Procurar produto"
      filterColumn="name"
      columns={responsibleColumns}
      data={responsibles}
    />
  );
}
