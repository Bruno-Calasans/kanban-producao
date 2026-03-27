"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ProcessWithDepartament } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import { DataTableColumnHeader } from "../custom/data-table/DataTableColumnHeader"
import EditProcessDialog from "./dialogs/EditProcessDialog"
import DeleteProcessDialog from "./dialogs/DeleteProcessDialog"

type ProcessPageProps = {
    processes: ProcessWithDepartament[]
}


const processColumns: ColumnDef<ProcessWithDepartament>[] = [
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
            <DataTableColumnHeader column={column} title="Processo" />
        ),
    },
    {
        accessorKey: "departament.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Departamento" />
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
            const process = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="end">
                        <EditProcessDialog process={process}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Edit2Icon />
                                Editar
                            </DropdownMenuItem>
                        </EditProcessDialog>

                        <DeleteProcessDialog process={process}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Trash2Icon />
                                Excluir
                            </DropdownMenuItem>
                        </DeleteProcessDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]



export function ProcessTable({ processes }: ProcessPageProps) {
    return <DataTable
        filterPlaceholder="Procurar processo"
        filterColumn="name"
        columns={processColumns} data={processes}
    />

}