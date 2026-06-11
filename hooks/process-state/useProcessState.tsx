/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { MovimentationPopulated } from "@/types/database.type";
import useGetAllProductionFlowTemplates from "../production-flow-template/useGetAllProductionFlowTemplates";
import useGetAllProcessExecutionsByMovimentation from "../movimentation/useGetAllProcessExecutionsByMovimentation";
import { useMemo } from "react";
import { calcProcessStates } from "@/utils/calcProcessStates";

type UseProcessStateProps = {
  movimentation?: MovimentationPopulated;
};

export default function useProcessState({ movimentation }: UseProcessStateProps) {
  const {
    data: flowTemplateData,
    error: flowTemplateError,
    isPending: isFlowTemplatePending,
  } = useGetAllProductionFlowTemplates(movimentation?.production_flow_id);

  const {
    data: processExecutionsData,
    error: processExecutionError,
    isPending: isProcessExecutionsPending,
  } = useGetAllProcessExecutionsByMovimentation(movimentation?.id);

  const processExecutions = processExecutionsData?.data || [];
  const flowTemplates = flowTemplateData?.data || [];

  const isPending = isFlowTemplatePending || isProcessExecutionsPending;
  const isError = flowTemplateError || processExecutionError;

  const processStates = useMemo(() => {
    if (isPending || isError || !movimentation || !flowTemplateData || !processExecutionsData)
      return [];
    return calcProcessStates({
      movimentation,
      flowTemplates,
      processExecutions,
    });
  }, [
    movimentation?.id,
    movimentation?.status,
    movimentation?.amount,
    processExecutionsData,
    flowTemplateData,
  ]);

  return {
    processExecutions,
    processStates,
    isPending,
    isError,
    flowTemplates,
  };
}
