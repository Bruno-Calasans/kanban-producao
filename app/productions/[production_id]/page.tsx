"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import useGetOneProduction from "@/hooks/production/useGetOneProduction";
import ProductionPageContent from "@/components/movimentation/ProductionPageContent";

export default function ProductionPage() {
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
        backBtnLabel="Voltar às produções"
        backBtnUrl="/productions"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar esta produção</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  if (!production)
    return (
      <PageMsg
        title="Produção não encontrada"
        backBtnLabel="Voltar às produções"
        backBtnUrl="/productions"
        content={
          <>
            <p>O produção que você está procurando não foi encontrada.</p>
            <p>Tente novamente ou verifique se a URL está correta ou se o produção existe.</p>
          </>
        }
      />
    );

  return <ProductionPageContent production={production} />;
}
