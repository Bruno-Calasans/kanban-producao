"use client"

import { DataTable } from "@/components/custom/DataTable"
import { Departament } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import EditDepartamentDialog from "./dialogs/EditDepartamentDialog"
import DeleteDepartamentDialog from "./dialogs/DeleteDepartamentDialog"

type DepartamentPageProps = {
    departaments: Departament[]
}


const DepartmentColumns: ColumnDef<Departament>[] = [
    {
        accessorKey: "created_at",
        header: "Data de criação",
        cell(props) {
            return formatDateTimeCellValue(props.getValue())
        },
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "order",
        header: "Ordem",
    },
    {
        accessorKey: "updated_at",
        header: "Última atualização",
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
    return (
        <DataTable columns={DepartmentColumns} data={departaments} />
    )
}