"use client";

import PageTitle from "@/components/custom/PageTitle";
import { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/database.type";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import Loader from "@/components/custom/Loader";
import ResumeTable from "@/components/resume/ResumeTable";

export const columns: ColumnDef<Product>[] = [
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
  },
];

export default function Home() {
  const { data, isLoading, error } = useGetAllProducts();
  const products = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <PageTitle>Produtos</PageTitle>
        <Loader title="Carregando produtos..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Produtos</PageTitle>
        <p>Ocorreu um erro ao carregar os produtos.</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Resumo</PageTitle>
      <p>Aqui está um resumo dos produtos cadastrados.</p>
      <ResumeTable products={products} />
    </section>
  );
}
