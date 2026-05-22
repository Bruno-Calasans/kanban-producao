/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import {
  MovimentationPopulated,
  Process,
  ProcessExecutionPopulated,
  ProcessExecutionStatus,
  ProcessState,
  ProductionFlowTemplate,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import useGetAllProductionFlowTemplates from "../production-flow-template/useGetAllProductionFlowTemplates";
import useGetAllProcessExecutionsByMovimentation from "../process-executation/useGetAllProcessExecutionsByMovimentation";
import { useMemo } from "react";

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

  const getProcessStates = () => {
    if (isPending || !movimentation || isError) return [];

    const states: ProcessState[] = [];
    const lastProcess = flowTemplates[flowTemplates.length - 1].process;

    const inputMap = new Map<number, number>();
    const outputMap = new Map<number, number>();
    const executionMap = new Map<number, ProcessExecutionPopulated[]>();

    // Agrupa execuções por processo e calcula somatório de entradas e saídas
    for (const execution of processExecutions) {
      // Tem entradas
      if (execution.process) {
        const processId = execution.process.id;

        // Soma entradas
        const currentInput = inputMap.get(processId) || 0;
        inputMap.set(processId, currentInput + execution.amount);

        const currentExecutions = executionMap.get(processId) || [];
        currentExecutions.push(execution);
        executionMap.set(processId, currentExecutions);
      }

      // Tem saídas
      if (execution.from_process) {
        const processId = execution.from_process.id;

        // Soma saídas
        const currentInput = outputMap.get(processId) || 0;
        outputMap.set(processId, currentInput + execution.amount);

        const currentExecutions = executionMap.get(processId) || [];
        currentExecutions.push(execution);
        executionMap.set(processId, currentExecutions);
      }
    }

    // Calcula status de cada processo
    for (let i = 0; i < flowTemplates.length; i++) {
      const template = flowTemplates[i];

      const currentProcess = template.process;

      const processId = currentProcess.id;

      const input = inputMap.get(processId) || 0;
      const output = outputMap.get(processId) || 0;
      const avaliableAmount = input - output;

      const executions = executionMap.get(processId) || [];
      const hasExecutions = executions.length > 0;

      const firstExecution = executions[0];

      const isReprocess = firstExecution?.type === "REPROCESS";

      const isLastProcess = currentProcess.id === lastProcess.id;

      let status: ProcessExecutionStatus = "PENDING";

      if (!hasExecutions) {
        status = "PENDING";
      }
      // Tudo saiu por causa de reprocesso
      // else if (isReprocess && avaliableAmount === 0) {
      //   status = "IN_PROGRESS";
      // }
      // else if (isLastProcess && avaliableAmount === movimentation.amount) {
      //   status = "SUCCESS";
      // }
      else if (avaliableAmount > 0) {
        status = "IN_PROGRESS";
      } else {
        status = "SUCCESS";
      }

      const previousProcess = i > 0 ? flowTemplates[i - 1].process : null;
      const nextProcess = i < flowTemplates.length - 1 ? flowTemplates[i + 1].process : null;

      states.push({
        process: currentProcess,
        movimentation,
        flowTemplates,
        avaliableAmount,
        status,
        previousProcess,
        nextProcess,
        template,
        executions,
      });
    }

    // Checa por processos pulados
    checkSkippedProcess(states);
    checkReprocesses(states);

    return states;
  };

  const checkSkippedProcess = (processStates: ProcessState[]) => {
    for (let i = 0; i < processStates.length; i++) {
      const current = processStates[i];

      const hasExecutions = current.executions.length > 0;
      if (hasExecutions) continue;

      const afterStates = processStates.slice(i + 1);
      const hasFlowAdvanced = afterStates.some((s) => s.executions.length > 0);

      if (hasFlowAdvanced) {
        current.status = "SKIPPED";
      }
    }
  };

  const checkReprocesses = (processStates: ProcessState[]) => {
    for (const current of processStates) {
      const hasExecutions = current.executions.length > 0;

      if (!hasExecutions) continue;

      const outExecutions = current.executions.filter(
        (exe) => exe.from_process?.id === current.process.id,
      );

      // Soma tudo que saiu normalmente
      const outSum = outExecutions
        .filter((exe) => exe.type === "TRANSFER" || exe.type === "RETURN")
        .reduce((total, exe) => total + exe.amount, 0);

      // Soma tudo que saiu via reprocesso
      const reprocessSum = outExecutions
        .filter((exe) => exe.type === "REPROCESS")
        .reduce((total, exe) => total + exe.amount, 0);

      if (reprocessSum > 0 && outSum === 0 && current.avaliableAmount === 0) {
        current.status = "REPROCESSING";
      }
    }
  };

  const processStates = useMemo(() => {
    if (isPending || isError || !movimentation || !flowTemplates.length || !processExecutions)
      return [];
    return getProcessStates();
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
