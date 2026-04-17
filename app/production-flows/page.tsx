"use client";

import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import CreateProductionFlowDialog from "@/components/production-flow/dialogs/CreateProductionFlowDialog";
import ProductionFlowTable from "@/components/production-flow/table/ProductionFlowTable";
import useGetAllFlowTemplates from "@/hooks/production-flow/useGetAllProductionFlow";

export default function ProductionFlowsPage() {
  const { data, isPending, error } = useGetAllFlowTemplates();
  const productionFlows = data?.data || [];

  if (isPending) {
    return <Loader title="Carregando Fluxos.." />;
  }

  if (error) {
    return (
      <PageMsg
        title="Erro ao carregar fluxos"
        content="Não foi possível carregar os fluxos de produção"
        backBtnLabel="Voltar à página de fluxos"
        backBtnUrl="/production-flows"
      />
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
