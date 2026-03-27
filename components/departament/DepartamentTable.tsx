"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
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
import { DataTableColumnHeader } from "../custom/data-table/DataTableColumnHeader"

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
            <DataTableColumnHeader column={column} title="Nome" />
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

function getRandomIntegerInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function DepartamentTable({ departaments }: DepartamentPageProps) {

    var copies: Departament[] = []

    for (let index = 0; index < 10; index++) {
        const copy = { ...departaments[0] }
        copy.order = getRandomIntegerInclusive(1, 100)
        copies.push(copy)
    }

    return <DataTable
        filterPlaceholder="Procurar departamento"
        filterColumn="name"
        columns={DepartmentColumns} data={copies}
    />

}