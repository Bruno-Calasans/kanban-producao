"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import CreateProductionDialog from "@/components/productions/dialogs/CreateProductionDialog";
import ProductionTable from "@/components/productions/table/ProductionTable";
import PageMsg from "@/components/custom/msgs/PageMsg";

export default function ProductionPage() {
  const { data, isPending, error } = useGetAllProductions();
  const productions = data?.data || [];

  if (isPending) return <Loader title="Carregando produções..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produções"
        backBtnLabel="Voltar às produções"
        backBtnUrl="/productions"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar as produções</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  return (
    <section>
      <PageTitle>Produções</PageTitle>
      <div className="flex flex-col">
        <CreateProductionDialog />
        <ProductionTable productions={productions} />
      </div>
    </section>
  );
}
