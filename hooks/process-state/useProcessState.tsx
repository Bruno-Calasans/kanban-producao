"use client";

import {
  MovimentationPopulated,
  Process,
  ProcessExecution,
  ProcessExecutionStatus,
  ProcessState,
  ProcessWithDepartament,
} from "@/types/database.type";
import useGetAllProductionFlowTemplates from "../production-flow-template/useGetAllProductionFlowTemplates";
import useGetAllProcessExecutionsByMovimentation from "../process-executation/useGetAllProcessExecutionsByMovimentation";

type UseProcessStateProps = {
  movimentation: MovimentationPopulated;
};

type ProcessStatusData = {
  executions: ProcessExecution[];
  avaliableAmount: number;
  currentProcess: Process;
  lastProcess: Process;
};

export default function useProcessState({ movimentation }: UseProcessStateProps) {
  const {
    data: flowTemplateData,
    error: flowTemplateError,
    isPending: isFlowTemplatePending,
  } = useGetAllProductionFlowTemplates(movimentation.product.production_flow_id);

  const {
    data: processExecutionsData,
    error: processExecutionError,
    isPending: isProcessExecutionsPending,
  } = useGetAllProcessExecutionsByMovimentation(movimentation.id);

  const processExecutions = processExecutionsData?.data || [];
  const flowTemplates = flowTemplateData?.data || [];
  const isPending = isFlowTemplatePending || isProcessExecutionsPending;
  const isError = flowTemplateError || processExecutionError;

  const getProcessStatus = ({
    avaliableAmount,
    executions,
    currentProcess,
    lastProcess,
  }: ProcessStatusData): ProcessExecutionStatus => {
    const hasExecutions = executions.length > 0;
    const isLastProcess = lastProcess.id == currentProcess.id;
    const isLastExecutionReprocess =
      executions.length > 0 ? executions[executions.length - 1]?.type == "REPROCESS" : false;

    if (!hasExecutions) return "PENDING";
    else if (isLastExecutionReprocess && avaliableAmount == 0) return "IN_PROGRESS";
    else if (isLastProcess && avaliableAmount == movimentation.amount) return "SUCCESS";
    else if (avaliableAmount > 0) return "IN_PROGRESS";
    return "SUCCESS";
  };

  const getProcessStates = () => {
    if (isPending) return [];
    const processStates: ProcessState[] = [];
    const lastProcess = flowTemplates[flowTemplates.length - 1].process;

    for (const template of flowTemplates) {
      const currentProcess = template.process;

      const inExecutions = processExecutions.filter(
        (exe) => exe.status === "SUCCESS" && exe.process.id === currentProcess.id,
      );
      const outExecutions = processExecutions.filter(
        (exe) => exe.status === "SUCCESS" && exe.from_process?.id === currentProcess.id,
      );

      const inExecutionsSum = inExecutions
        .map((exe) => exe.amount)
        .reduce((total, curr) => total + curr, 0);

      const outExecutionsSum = outExecutions
        .map((exe) => exe.amount)
        .reduce((total, curr) => total + curr, 0);

      // Define status do processo
      const avaliableAmount = inExecutionsSum - outExecutionsSum;

      const status = getProcessStatus({
        avaliableAmount,
        currentProcess,
        executions: processExecutions.filter(
          (exe) => exe.process.id == currentProcess.id || exe.from_process?.id == currentProcess.id,
        ),
        lastProcess,
      });

      const { previousProcess, nextProcess } = getNextAndPreviousProcesses(currentProcess);

      processStates.push({
        movimentation,
        flowTemplates: flowTemplates,
        process: currentProcess,
        avaliableAmount,
        status,
        previousProcess,
        nextProcess,
      });
    }

    return processStates;
  };

  const getNextAndPreviousProcesses = (process: ProcessWithDepartament) => {
    let previousProcess: ProcessWithDepartament | null = null;
    let nextProcess: ProcessWithDepartament | null = null;

    const flowTemplatesSize = flowTemplates.length;

    if (flowTemplatesSize == 0 || flowTemplatesSize == 1) {
      previousProcess = null;
      nextProcess = null;
    } else {
      const currentProcessIndex = flowTemplates.findIndex((flow) => flow.process.id == process.id);
      const nextProcessIndex = currentProcessIndex + 1;
      const previousProcessIndex = currentProcessIndex - 1;

      nextProcess =
        nextProcessIndex < flowTemplatesSize ? flowTemplates[nextProcessIndex].process : null;
      previousProcess =
        previousProcessIndex >= 0 ? flowTemplates[previousProcessIndex].process : null;
    }

    return {
      previousProcess,
      nextProcess,
    };
  };

  const processStates = getProcessStates();

  return {
    processStates,
    isPending,
    isError,
  };
}
