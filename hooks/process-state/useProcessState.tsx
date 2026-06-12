/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { ProductionPopulated } from "@/types/database.type";
import useGetAllProductionFlowTemplates from "../production-flow-template/useGetAllProductionFlowTemplates";
import useGetAllMovimentationsByProduction from "../movimentation/useGetAllMovimentationsByProduction";
import { useMemo } from "react";
import { calcDepartamentState } from "@/utils/calcDepartamentState";

type UseProcessStateProps = {
  production?: ProductionPopulated;
};

export default function useProcessState({ production }: UseProcessStateProps) {
  const {
    data: flowTemplateData,
    error: flowTemplateError,
    isPending: isFlowTemplatePending,
  } = useGetAllProductionFlowTemplates(production?.production_flow_id);

  const {
    data: movimentationsData,
    error: processExecutionError,
    isPending: isProcessExecutionsPending,
  } = useGetAllMovimentationsByProduction(production?.id);

  const movimentations = movimentationsData?.data || [];
  const flowTemplates = flowTemplateData?.data || [];

  const isPending = isFlowTemplatePending || isProcessExecutionsPending;
  const isError = flowTemplateError || processExecutionError;

  const processStates = useMemo(() => {
    if (isPending || isError || !production || !flowTemplateData || !movimentationsData) return [];
    return calcDepartamentState({
      production,
      flowTemplates,
      movimentations,
    });
  }, [
    production?.id,
    production?.status,
    production?.amount,
    movimentationsData,
    flowTemplateData,
  ]);

  return {
    movimentations,
    processStates,
    isPending,
    isError,
    flowTemplates,
  };
}
