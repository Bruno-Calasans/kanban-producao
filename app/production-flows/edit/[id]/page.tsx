"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import EditProductionFlowForm from "@/components/production-flow/forms/EditProductionFlowForm";
import useGetlAllMovimentationsByProductionFlow from "@/hooks/movimentation/useGetlAllMovimentationsByProductionFlow";
import useGetOneProductionFlow from "@/hooks/production-flow/useGetOneProductionFlow";
import { useParams, useRouter, redirect } from "next/navigation";

export default function EditProductionFlowPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const {
    data,
    error: productionFlowError,
    isPending: productionFlowPending,
  } = useGetOneProductionFlow(Number(params.id));
  const productionFlow = data?.data;

  const {
    data: movimentationData,
    error: movimentationError,
    isPending: isMovimentationsPending,
  } = useGetlAllMovimentationsByProductionFlow(productionFlow?.id);
  const movimentations = movimentationData?.data || [];

  const isPending = productionFlowPending || isMovimentationsPending;
  const isError = productionFlowError || movimentationError;
  const canEdit = !isPending && movimentations.length == 0;

  if (isPending) return <Loader title="Carregando" />;

  if (isError)
    return (
      <PageMsg
        title="Erro ao carregar Fluxo de Produção"
        content="Não foi possível carregar o fluxo de produção"
        backBtnLabel="Voltar à página de fluxos de produção"
        backBtnUrl="/production-flows"
      />
    );

  if (!productionFlow) {
    return (
      <PageMsg
        title="Fluxo de Produção não encontrado"
        content="Não foi possível encontrar o fluxo de produção."
        backBtnLabel="Voltar à página de fluxos de produção"
        backBtnUrl="/production-flows"
      />
    );
  }

  if (!canEdit) {
    return redirect("/production-flows");
  }

  return (
    <section>
      <div className="flex justify-between">
        <PageTitle>Editar Fluxo de Produção</PageTitle>
        <BackButton label="Voltar à página de fluxos de produção" to="/production-flows" />
      </div>
      <EditProductionFlowForm productionFlow={productionFlow} />
    </section>
  );
}
