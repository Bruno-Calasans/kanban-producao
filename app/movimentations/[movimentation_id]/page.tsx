"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import MovimentationTabs from "@/components/movimentation/tabs/MovimentationTab";
import getOneMovimentation from "@/hooks/movimentation/useGetOneMovimentation";
import { useParams } from "next/navigation";
import MovimentationInfoMsg from "@/components/movimentation/MovimentationInfoMsg";

export default function MovimentationIdPage() {
  const params = useParams<{ movimentation_id: string }>();
  const { data, isPending } = getOneMovimentation(Number(params.movimentation_id));
  const movimentation = data?.data;

  if (isPending) return <Loader title="Carregando movimentação..." />;

  if (!movimentation)
    return (
      <section>
        <PageTitle>Informações do Movimentação</PageTitle>
        <p>Movimentação não encontrada</p>
      </section>
    );

  return (
    <section>
      <div className="flex justify-between">
        <PageTitle>Informações da Movimentação</PageTitle>
        <BackButton to="/movimentations" label="Voltar à página de Movimentações" />
      </div>
      <MovimentationInfoMsg movimentation={movimentation} />
      <MovimentationTabs movimentation={movimentation} />
    </section>
  );
}
