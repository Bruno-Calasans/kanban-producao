"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllMovimentations from "@/hooks/movimentation/useGetAllMovimentation";
import CreateMovimentationDialog from "@/components/movimentations/dialogs/CreateMovimentationDialog";
import MovimentationTable from "@/components/movimentations/table/MovimentationTable";

export default function MovimentationPage() {
  const { data, isLoading, error } = useGetAllMovimentations();
  const movimentations = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <PageTitle>Movimentações</PageTitle>
        <Loader title="Carregando Movimentações..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Movimentações</PageTitle>
        <p>Ocorreu um erro ao carregar as Movimentações.</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Movimentações</PageTitle>
      <div className="flex flex-col">
        <CreateMovimentationDialog />
        <MovimentationTable movimentations={movimentations} />
      </div>
    </section>
  );
}
