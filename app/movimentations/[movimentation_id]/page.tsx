"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import MovimentationTabs from "@/components/movimentation/tabs/MovimentationTab";
import getOneMovimentation from "@/hooks/movimentation/useGetOneMovimentation";
import { useParams } from "next/navigation";
import MovimentationInfoHeader from "@/components/movimentation/MovimentationInfoHeader";

export default function MovimentationIdPage() {
  const params = useParams<{ movimentation_id: string }>();
  const { data, error, isPending } = getOneMovimentation(Number(params.movimentation_id));
  const movimentation = data?.data;

  if (isPending) return <Loader title="Carregando movimentação..." />;

  if (error)
    return (
      <section className="flex flex-col gap-2">
        <div>
          <PageTitle>Erro ao carregar movimentação</PageTitle>
          <p>Desculpe, mas não foi possível carregar esta movimentação.</p>
        </div>
        <div>
          <BackButton to="/movimentations" label="Voltar à página de movimentações" />
        </div>
      </section>
    );

  if (!movimentation)
    return (
      <section className="flex flex-col gap-2">
        <div>
          <PageTitle>Erro: movimentação não encontrada</PageTitle>
          <p>O movimentação que você está procurando não foi encontrado.</p>
          <p>Verifique se a URL está correta ou se o movimentação existe.</p>
        </div>
        <div>
          <BackButton to="/movimentations" label="Voltar à página de movimentaçõess" />
        </div>
      </section>
    );

  return (
    <section>
      <MovimentationInfoHeader movimentation={movimentation} />
      <MovimentationTabs movimentation={movimentation} />
    </section>
  );
}
