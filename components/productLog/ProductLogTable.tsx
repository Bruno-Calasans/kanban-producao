"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import { ProductLogPopulated } from "@/types/database.type"
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
import { formatTimezToTime } from "@/utils/formatTimezToTime"
import { diffTimeZToTimeString } from "@/utils/diffTimeZToTimeString"
import StatusBadge from "../custom/badges/StatusBadge"
import DeleteProductLogDialog from "./dialogs/DeleteProductDialog"
import MoveNextProcessButton from "./actions/MoveNextProcessButton"
import MoveNextProcesDialog from "./dialogs/MoveNextProcessDepartamentDialog"
import MoveNextProcessDepartamentDialog from "./dialogs/MoveNextProcessDepartamentDialog"

type ProductLogTableProps = {
    productLogs: ProductLogPopulated[]
}

const productLogColumns: ColumnDef<ProductLogPopulated>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data" />
        ),
        cell({ row: { original: productLog } }) {
            return new Date(productLog.created_at).toLocaleDateString()
        },
    },
    {
        id: "product.name",
        accessorKey: "product.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Produto" />
        ),
    },
    {
        id: "process.name",
        accessorKey: "process.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Processo" />
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Qtd. Feita" />
        ),
    },
    {
        id: "product.max_amount",
        accessorKey: "product.max_amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Qtd. Total" />
        ),
    },
    {
        accessorKey: "remaining_amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Qtd. Rest" />
        ),
    },
    {
        accessorKey: "start_hour",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="H. Inicial" />
        ),
        cell({ row }) {
            const { start_hour } = row.original
            return <p>{formatTimezToTime(start_hour!)}</p>
        }
    },
    {
        accessorKey: "end_hour",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="H. Final" />
        ),
        cell({ row }) {
            const { end_hour } = row.original
            return <p>{formatTimezToTime(end_hour!)}</p>
        }
    },
    {
        id: "total-time",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="H. total" />
        ),
        cell({ row }) {
            const productLog = row.original
            const { start_hour, end_hour } = productLog
            return <p>{diffTimeZToTimeString(start_hour, end_hour)}</p>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell({ row }) {
            const { status } = row.original
            return <StatusBadge status={status} />
        },
    },
    {
        id: "action",
        cell: ({ row: { original: productLog } }) => {
            const canMoveNextProcess = productLog.status == "PROCESSADO"

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-fit" side="bottom" align="end">
                        {/* {canMoveNextProcess && (
                            
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <MoveNextProcessDepartamentDialog productLog={productLog} />
                            </DropdownMenuItem>
                        )} */}

                        <DeleteProductLogDialog productLog={productLog}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <Trash2Icon />
                                Excluir
                            </DropdownMenuItem>
                        </DeleteProductLogDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]


export default function ProductLogTable({ productLogs }: ProductLogTableProps) {
    return <DataTable
        filterPlaceholder="Procurar registro do produto"
        filterColumn="product.name"
        columns={productLogColumns}
        data={productLogs}
    // className="w-fit"
    />

}