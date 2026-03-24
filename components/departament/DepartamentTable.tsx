"use client"

import { DataTable } from "@/components/custom/DataTable"
import { Departament } from "@/types/database.type"
import { ColumnDef } from "@tanstack/react-table"


type DepartamentPageProps = {
    departaments: Departament[]
}

const DepartmentColumns: ColumnDef<Departament>[] = [
    {
        accessorKey: "created_at",
        header: "Data de criação",
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
    }
]

export function DepartamentTable({ departaments }: DepartamentPageProps) {
    return (
        <DataTable columns={DepartmentColumns} data={departaments} />
    )
}