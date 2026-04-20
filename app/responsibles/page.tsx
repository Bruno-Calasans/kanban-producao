"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllResponsibles from "@/hooks/responsible/useGetAllResponsibles";
import CreateResponsibleDialog from "@/components/responsibles/dialogs/CreateResponsibleDialog";
import ResponsibleTable from "@/components/responsibles/table/ResponsibleTable";
import PageMsg from "@/components/custom/msgs/PageMsg";

export default function ResponsiblePage() {
  const { data, isLoading, error } = useGetAllResponsibles();
  const responsibles = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <Loader title="Carregando Responsáveis..." />
      </section>
    );
  }

  if (error) {
    return (
      <PageMsg
        title="Erro ao carregar responsáveis"
        content="Não foi possível carregar os responsáveis. Tente novamente."
        backBtnLabel="Voltar à página inical"
        backBtnUrl="/"
      />
    );
  }

  return (
    <section>
      <PageTitle>Responsáveis</PageTitle>
      <div className="flex flex-col">
        <CreateResponsibleDialog />
        <ResponsibleTable responsibles={responsibles} />
      </div>
    </section>
  );
}
