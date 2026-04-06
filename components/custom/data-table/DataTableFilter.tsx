import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTableFilterProps<TData> {
    table: Table<TData>
    column: string
    placeholder?: string
}

export default function DataTableFilter<TData>({ table, column, placeholder }: DataTableFilterProps<TData>) {

    return <div className="flex flex-1 items-center  py-4">
        <Input
            className="focus:border-blue-500"
            placeholder={placeholder || 'Pesquisar'}
            value={(table.getColumn(column as string)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(column as string)?.setFilterValue(event.target.value)
            }
        />
    </div>
}