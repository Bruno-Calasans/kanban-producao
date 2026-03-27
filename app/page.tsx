"use client"

import { DataTable } from "@/components/custom/data-table/DataTable"
import PageTitle from "@/components/custom/PageTitle"
import { ColumnDef } from "@tanstack/react-table"
import type { ProductLog } from "@/types/database.type"


export const columns: ColumnDef<ProductLog>[] = [
  {
    accessorKey: "created_at",
    header: "Data",
  },
  {
    accessorKey: "product_id",
    header: "Produto",
  },
  {
    accessorKey: "process_id",
    header: "Processo",
  },
  {
    accessorKey: "departament_id",
    header: "Departamento",
  },
  {
    accessorKey: "amount",
    header: "Quantidade",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updated_at",
    header: "Última atualização",
  }
]

export default function Home() {


  return (
    <section>
      <PageTitle>Resumo</PageTitle>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa id reprehenderit, ratione incidunt eius libero. Reprehenderit ipsum deleniti commodi at, earum vitae facilis explicabo corporis voluptates! Ratione adipisci rem ad.
      </p>
      {/* <DataTable columns={columns} data={data} /> */}
    </section>

  )
}
