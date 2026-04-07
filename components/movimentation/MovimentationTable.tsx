"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import DeleteMovimentationDialog from "@/components/movimentation/dialogs/DeleteMovimentationDialog"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import type { MovimentationPopulated } from "@/types/database.type"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type MovimentationPageProps = {
    movimentations: MovimentationPopulated[]
}


const movimentationColumns: ColumnDef<MovimentationPopulated>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data" />
        ),
        cell(props) {
            return formatDateTimeCellValue(props.getValue())
        },
    },
    {
        id: "productName",
        accessorKey: "product.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Produto" />
        ),
    },
    {
        accessorKey: "product.max_amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Qtd." />
        ),
    },
    {
        accessorKey: "departamentOrigin.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dpt: origem" />
        ),
    },
    {
        accessorKey: "departamentDestination.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dpt: destino" />
        ),
    },
    {
        accessorKey: "processOrigin.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Processo: origem" />
        ),
    },
    {
        accessorKey: "processDestination.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Processo: destino" />
        ),
    }, ,
    {
        id: "action",
        header: "",
        cell: ({ row }) => {
            const movimentation = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="end">
                        {/* <EditMovimentationDialog movimentation={movimentation}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Edit2Icon />
                                Editar
                            </DropdownMenuItem>
                        </EditMovimentationDialog> */}

                        <DeleteMovimentationDialog movimentation={movimentation}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Trash2Icon />
                                Excluir
                            </DropdownMenuItem>
                        </DeleteMovimentationDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export default function MovimentationTable({ movimentations }: MovimentationPageProps) {

    return <DataTable
        filterPlaceholder="Procurar movimentação"
        filterColumn="productName"
        columns={movimentationColumns}
        data={movimentations}
        className="w-fit"
    />

}