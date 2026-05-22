/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import {
  MovimentationPopulated,
  Process,
  ProcessExecutionPopulated,
  ProductionFlowTemplate,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import useGetAllProductionFlowTemplates from "../production-flow-template/useGetAllProductionFlowTemplates";
import useGetAllProcessExecutionsByMovimentation from "../process-executation/useGetAllProcessExecutionsByMovimentation";
import { useMemo } from "react";
import { calcProcessStates } from "@/utils/calcProcessStates";

type UseProcessStateProps = {
  movimentation?: MovimentationPopulated;
};

type ProcessStatusData = {
  executions: ProcessExecutionPopulated[];
  avaliableAmount: number;
  currentProcess: Process;
  lastProcess: Process;
  currentProcessTemplate: ProductionFlowTemplateWithProcess;
  flowTemplates: ProductionFlowTemplate[];
};

export default function useProcessState({ movimentation }: UseProcessStateProps) {
  const {
    data: flowTemplateData,
    error: flowTemplateError,
    isPending: isFlowTemplatePending,
  } = useGetAllProductionFlowTemplates(movimentation?.product.production_flow_id);

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
    if (isPending || isError || !movimentation || !flowTemplates.length || !processExecutions)
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
    processExecutions,
    flowTemplates,
    isPending,
  ]);

  return {
    processExecutions,
    processStates,
    isPending,
    isError,
    flowTemplates,
  };
}
