"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ProcessWithDepartament } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import EditProcessDialog from "@/components/process/dialogs/EditProcessDialog"
import DeleteProcessDialog from "@/components/process/dialogs/DeleteProcessDialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "../ui/badge"


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
        accessorKey: "is_default",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Padrão" />
        ),
        sortingFn: (rowA, rowB) => {
            const a = rowA.original.is_default
            const b = rowB.original.is_default
            return Number(a) - Number(b)
        },
        cell: ({ row }) => {
            const { is_default } = row.original
            return is_default ?
                <Badge variant="default" className="bg-emerald-500 rounded-full">Sim</Badge> :
                <Badge variant="secondary" className="rounded-full">Não</Badge>
        }
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



export default function ProcessTable({ processes }: ProcessPageProps) {
    return <DataTable
        filterPlaceholder="Procurar processo"
        filterColumn="name"
        columns={processColumns} data={processes}
    />

}