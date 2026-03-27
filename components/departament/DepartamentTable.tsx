"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import EditDepartamentDialog from "@/components/departament/dialogs/EditDepartamentDialog"
import DeleteDepartamentDialog from "@/components/departament/dialogs/DeleteDepartamentDialog"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import type { Departament } from "@/types/database.type"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type DepartamentPageProps = {
    departaments: Departament[]
}


const DepartmentColumns: ColumnDef<Departament>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data de criação" />
        ),
        cell(props) {
            return formatDateTimeCellValue(props.getValue())
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Departamento" />
        ),
    },
    {
        accessorKey: "order",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ordem" />
        ),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Última atualização" />
        ),
        cell: (props) => {
            return formatDateTimeCellValue(props.getValue())
        },
    },
    {
        id: "action",
        header: "",
        cell: ({ row }) => {
            const departament = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="end">
                        <EditDepartamentDialog departament={departament}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Edit2Icon />
                                Editar
                            </DropdownMenuItem>
                        </EditDepartamentDialog>

                        <DeleteDepartamentDialog departament={departament}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Trash2Icon />
                                Excluir
                            </DropdownMenuItem>
                        </DeleteDepartamentDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export function DepartamentTable({ departaments }: DepartamentPageProps) {
    return <DataTable
        filterPlaceholder="Procurar departamento"
        filterColumn="name"
        columns={DepartmentColumns} data={departaments}
    />

}