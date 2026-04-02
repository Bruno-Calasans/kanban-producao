"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ProductPopulated } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"
import formatDateTimeCellValue from "@/utils/formatCelltoDataTime"
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import DataTableColumnHeader from "@/components/custom/data-table/DataTableColumnHeader"
import EditProductDialog from "@/components/product/dialogs/EditProductDialog"
import DeleteProductDialog from "@/components/product/dialogs/DeleteProductDialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type ProductPageProps = {
    products: ProductPopulated[]
}


const productColumns: ColumnDef<ProductPopulated>[] = [
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
        accessorKey: "op",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="OP" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Produto" />
        ),
    },
    {
        accessorKey: "max_amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Qtd. Máxima" />
        ),
    },
    {
        accessorKey: "departament.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Departamento" />
        ),
    },
    {
        accessorKey: "process.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Processo" />
        ),

    },
    {
        accessorKey: "responsible.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Responsável" />
        ),
    },
    {
        id: "action",
        header: "",
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="end" className="w-fit">
                        <EditProductDialog product={product}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Edit2Icon />
                                Editar
                            </DropdownMenuItem>
                        </EditProductDialog>

                        <DeleteProductDialog product={product}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Trash2Icon />
                                Excluir
                            </DropdownMenuItem>
                        </DeleteProductDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]


export default function ResumeTable({ products }: ProductPageProps) {
    return <DataTable
        filterPlaceholder="Procurar produto"
        filterColumn="name"
        columns={productColumns}
        data={products}
    />

}