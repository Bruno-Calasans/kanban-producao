"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ProcessWithDepartament } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import { Badge } from "@/components/ui/badge"
import ProcessDropdownMenu from "@/components/process/table/ProcessDropdownMenu"
import sortByDefault from "@/utils/sortByDefault"


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
        sortingFn: (rowA, rowB) => sortByDefault(rowA.original, rowB.original),
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
        accessorKey: "sequence",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sequência" />
        ),
    },
    {
        id: "departament.name",
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
        cell: ({ row }) => {
            const process = row.original
            return <ProcessDropdownMenu process={process} />
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