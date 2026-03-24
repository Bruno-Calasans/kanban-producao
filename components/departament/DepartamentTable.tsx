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
import CustomDialog from "../custom/CustomDialog"

type DepartamentPageProps = {
    departaments: Departament[]
    onEdit?: (departament: Departament) => void
    onDelete?: (departament: Departament) => void
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
]

function createActionColumn(
    onEdit?: (departament: Departament) => void,
    onDelete?: (departament: Departament) => void): ColumnDef<Departament> {
    return {
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
                        <CustomDialog
                            title="Editar departamento"
                            trigger={
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    onClick={() => onEdit && onEdit(departament)}>
                                    <Edit2Icon />
                                    Editar
                                </DropdownMenuItem>
                            }>
                            <p>Editar departamento: {departament.name}</p>
                        </CustomDialog>


                        <DropdownMenuItem
                            onClick={() => onDelete && onDelete(departament)}>
                            <Trash2Icon />
                            Excluir
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
}

export function DepartamentTable({ departaments, onEdit, onDelete }: DepartamentPageProps) {
    const columns = [...DepartmentColumns, createActionColumn(onEdit, onDelete)]
    return (
        <DataTable columns={columns} data={departaments} />
    )
}