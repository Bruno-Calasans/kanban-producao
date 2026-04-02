"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import type { Departament } from "@/types/database.type"
import { Badge } from "@/components/ui/badge"
import DepartamentDropdownMenu from "./table/DepartamentDropdownMenu"


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
        accessorKey: "isDefault",
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
            return <DepartamentDropdownMenu departament={departament} />
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