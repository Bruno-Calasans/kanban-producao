"use client";

import Loader from "@/components/custom/Loader";
import getOneMovimentation from "@/hooks/production/useGetOneProduction";
import PageMsg from "@/components/custom/msgs/PageMsg";
import MovimentationPageContent from "@/components/movimentation/MovimentationPageContent";
import { useParams } from "next/navigation";

export default function MovimentationIdPage() {
  const params = useParams<{ movimentation_id: string }>();
  const {
    data: movimentationData,
    error,
    isPending,
  } = getOneMovimentation(Number(params.movimentation_id));
  const movimentation = movimentationData?.data;

  if (isPending) return <Loader title="Carregando movimentação..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar movimentação"
        content="Desculpe, mas não foi possível carregar essa movimentação"
        backBtnLabel="Voltar às movimentações"
        backBtnUrl="/movimentations"
      />
    );

  if (!movimentation)
    return (
      <PageMsg
        title="Movimentação não encontrada"
        content={
          <>
            <p>O movimentação que você está procurando não foi encontrado.</p>
            <p>Verifique se a URL está correta ou se o movimentação existe.</p>
          </>
        }
        backBtnLabel="Voltar às movimentações"
        backBtnUrl="/movimentations"
      />
    );

  return <MovimentationPageContent movimentation={movimentation} />;
}
