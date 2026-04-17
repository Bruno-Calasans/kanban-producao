"use client";

import Loader from "@/components/custom/Loader";
import MovimentationTabs from "@/components/movimentation/tabs/MovimentationTab";
import getOneMovimentation from "@/hooks/movimentation/useGetOneMovimentation";
import { useParams } from "next/navigation";
import MovimentationInfoHeader from "@/components/movimentation/MovimentationInfoHeader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import useProcessState from "@/hooks/process-state/useProcessState";
import useGetAllProcessExecutionsByMovimentation from "@/hooks/process-executation/useGetAllProcessExecutionsByMovimentation";

export default function MovimentationIdPage() {
  const params = useParams<{ movimentation_id: string }>();

  const {
    data: movimentationData,
    error: movimentationError,
    isPending: movimentationPending,
  } = getOneMovimentation(Number(params.movimentation_id));
  const movimentation = movimentationData?.data;

  const {
    processStates,
    isPending: isProcessStatesPending,
    isError: processStatesError,
  } = useProcessState({ movimentation });

  const {
    data: executionsData,
    error: executionsError,
    isPending: isExecutionPending,
  } = useGetAllProcessExecutionsByMovimentation(movimentation?.id);
  const processExecutions = executionsData?.data || [];

  const isPending = movimentationPending || isProcessStatesPending || isExecutionPending;
  const isError = movimentationError || processStatesError || executionsError;

  if (isPending) return <Loader title="Carregando movimentação..." />;

  if (isError)
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

  return (
    <section>
      <MovimentationInfoHeader movimentation={movimentation} />
      <MovimentationTabs
        movimentation={movimentation}
        processStates={processStates}
        processExecutions={processExecutions}
      />
    </section>
  );
}
