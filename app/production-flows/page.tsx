"use client";

import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import CreateProductionFlowDialog from "@/components/production-flow/dialogs/CreateProductionFlowDialog";
import ProductionFlowTable from "@/components/production-flow/table/ProductionFlowTable";
import useGetAllProductionFlow from "@/hooks/production-flow/useGetAllProductionFlow";

export default function ProductionFlowsPage() {
  const { data, isPending, error } = useGetAllProductionFlow();
  const productionFlows = data?.data || [];

  if (isPending) {
    return <Loader title="Carregando Fluxos.." />;
  }

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar fluxos de prdoução"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar os fluxos de produção</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  return (
    <section>
      <PageTitle>Fluxos de Produção</PageTitle>
      <p>Defina a sequência que o produto vai se mover entre os departamentos.</p>
      <div className="flex flex-col">
        <CreateProductionFlowDialog />
        <ProductionFlowTable productionFlows={productionFlows} />
      </div>
    </section>
  );
}
