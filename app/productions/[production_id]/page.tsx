"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import useGetOneProduction from "@/hooks/production/useGetOneProduction";
import MovimentationPageContent from "@/components/movimentation/ProductionPageContent";

export default function MovimentationIdPage() {
  const params = useParams<{ production_id: string }>();
  const {
    data: productionData,
    error,
    isPending,
  } = useGetOneProduction(Number(params.production_id));
  const production = productionData?.data;

  if (isPending) return <Loader title="Carregando produção..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produção"
        content="Desculpe, mas não foi possível carregar essa produção"
        backBtnLabel="Voltar às movimentações"
        backBtnUrl="/productions"
      />
    );

  if (!production)
    return (
      <PageMsg
        title="Produção não encontrada"
        content={
          <>
            <p>O produção que você está procurando não foi encontrado.</p>
            <p>Verifique se a URL está correta ou se o produção existe.</p>
          </>
        }
        backBtnLabel="Voltar às produções"
        backBtnUrl="/movimentations"
      />
    );

  return <MovimentationPageContent production={production} />;
}
