"use client";

import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import CreateProductionFlowDialog from "@/components/production-flow/dialogs/CreateProductionFlowDialog";
import ProductionFlowTable from "@/components/production-flow/table/ProductionFlowTable";
import useGetAllFlowTemplates from "@/hooks/production-flow/useGetAllProductionFlow";

export default function ProductionFlowsPage() {
  const { data, isLoading, error } = useGetAllFlowTemplates();
  const productionFlows = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <PageTitle>Fluxos de Produção</PageTitle>
        <Loader title="Carregando Fluxos.." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Fluxos de Produção</PageTitle>
        <p>Ocorreu um erro ao carregar os fluxos de produção</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Fluxos de Produção</PageTitle>
      <p>Defina como o produto vai transitar entre os departamentos e processos.</p>
      <div className="flex flex-col">
        <CreateProductionFlowDialog />
        <ProductionFlowTable productionFlows={productionFlows} />
      </div>
    </section>
  );
}
