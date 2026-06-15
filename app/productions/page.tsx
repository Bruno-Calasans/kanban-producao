"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import CreateMovimentationDialog from "@/components/productions/dialogs/CreateMovimentationDialog";
import ProductionTable from "@/components/productions/table/ProductionTable";

export default function ProductionPage() {
  const { data, isLoading, error } = useGetAllProductions();
  const productions = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <PageTitle>Produção</PageTitle>
        <Loader title="Carregando produções..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Produção</PageTitle>
        <p>Ocorreu um erro ao carregar as produções.</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Produções</PageTitle>
      <div className="flex flex-col">
        <CreateMovimentationDialog />
        <ProductionTable productions={productions} />
      </div>
    </section>
  );
}
