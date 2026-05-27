import {
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProcessExecutionStatus,
  ProcessState,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";

type ProcessStatusData = {
  movimentation: MovimentationPopulated;
  processExecutions: ProcessExecutionPopulated[];
  flowTemplates: ProductionFlowTemplateWithProcess[];
};

export function calcProcessStates({
  movimentation,
  processExecutions,
  flowTemplates,
}: ProcessStatusData) {
  const states: ProcessState[] = [];

  const lastProcess = flowTemplates[flowTemplates.length - 1].process;

  // Agrupamento por processo
  const inputExecutionsMap = new Map<number, ProcessExecutionPopulated[]>();
  const outputExecutionsMap = new Map<number, ProcessExecutionPopulated[]>();

  // =========================
  // ORGANIZA EXECUÇÕES
  // =========================

  for (const execution of processExecutions) {
    // ENTRADA
    if (execution.process) {
      const processId = execution.process.id;

      const current = inputExecutionsMap.get(processId) || [];

      current.push(execution);

      inputExecutionsMap.set(processId, current);
    }

    // SAÍDA
    if (execution.from_process) {
      const processId = execution.from_process.id;

      const current = outputExecutionsMap.get(processId) || [];

      current.push(execution);

      outputExecutionsMap.set(processId, current);
    }
  }

  // =========================
  // CALCULA ESTADOS
  // =========================

  for (let i = 0; i < flowTemplates.length; i++) {
    const template = flowTemplates[i];

    const currentProcess = template.process;

    const processId = currentProcess.id;

    const inputExecutions = inputExecutionsMap.get(processId) || [];

    const outputExecutions = outputExecutionsMap.get(processId) || [];

    const executions = [...inputExecutions, ...outputExecutions];

    // =========================
    // QUANTIDADES
    // =========================

    const inputAmount = inputExecutions.reduce((total, exe) => total + exe.amount, 0);

    const forwardAmount = outputExecutions
      .filter((exe) => exe.type === "TRANSFER")
      .reduce((total, exe) => total + exe.amount, 0);

    const externalAmount = outputExecutions
      .filter((exe) => exe.type === "EXTERNAL")
      .reduce((total, exe) => total + exe.amount, 0);

    const reprocessAmount = outputExecutions
      .filter((exe) => exe.type === "REPROCESS")
      .reduce((total, exe) => total + exe.amount, 0);

    const outputAmount = forwardAmount + externalAmount + reprocessAmount;

    const avaliableAmount = inputAmount - forwardAmount - externalAmount - reprocessAmount;

    // =========================
    // STATUS BASE
    // =========================

    const hasExecutions = inputExecutions.length > 0 || outputExecutions.length > 0;

    const isInitialExecution =
      executions && executions.length === 1 && executions[0].type === "INIT";

    const isLastProcess = currentProcess.id === lastProcess.id;

    let status: ProcessExecutionStatus = "PENDING";

    if (!hasExecutions || isInitialExecution) {
      status = "PENDING";
    } else if (isLastProcess && avaliableAmount === movimentation.amount) {
      status = "SUCCESS";
    } else if (avaliableAmount > 0) {
      status = "IN_PROGRESS";
    } else {
      status = "SUCCESS";
    }

    // =========================
    // FLAGS
    // =========================

    const hasExternal = externalAmount > 0;

    const hasReprocess = reprocessAmount > 0;

    const hasPendingExternal = externalAmount > forwardAmount;

    const hasPendingReprocess = reprocessAmount > forwardAmount;

    const fullyExternal = externalAmount > 0 && forwardAmount === 0 && avaliableAmount === 0;

    const fullyReprocessed = reprocessAmount > 0 && forwardAmount === 0 && avaliableAmount === 0;

    const partiallyExternal = externalAmount > 0 && forwardAmount > 0;

    const partiallyReprocessed = reprocessAmount > 0 && forwardAmount > 0;

    // =========================
    // STATUS AVANÇADO
    // =========================

    if (fullyExternal) {
      status = "EXTERNAL";
    }

    if (fullyReprocessed) {
      status = "REPROCESSING";
    }

    // =========================
    // PROCESSOS RELACIONADOS
    // =========================

    const previousProcess = i > 0 ? flowTemplates[i - 1].process : null;

    const nextProcess = i < flowTemplates.length - 1 ? flowTemplates[i + 1].process : null;

    // =========================
    // PUSH
    // =========================

    states.push({
      process: currentProcess,

      movimentation,

      flowTemplates,

      template,

      previousProcess,

      nextProcess,

      status,

      // QUANTIDADES
      inputAmount,

      outputAmount,

      forwardAmount,

      externalAmount,

      reprocessAmount,

      avaliableAmount,

      // EXECUÇÕES
      inputExecutions,

      outputExecutions,

      executions: [...inputExecutions, ...outputExecutions],

      // FLAGS
      flags: {
        hasExternal,

        hasPendingExternal,

        partiallyExternal,

        hasReprocess,

        hasPendingReprocess,

        partiallyReprocessed,
      },
    });
  }

  // =========================
  // PROCESSOS PULADOS
  // =========================

  checkSkippedProcess(states);

  return states;
}

export function checkSkippedProcess(processStates: ProcessState[]) {
  for (let i = 0; i < processStates.length; i++) {
    const current = processStates[i];

    const hasExecutions = current.executions.length > 0;

    if (hasExecutions) continue;

    const afterStates = processStates.slice(i + 1);

    const hasFlowAdvanced = afterStates.some((state) => state.executions.length > 0);

    if (hasFlowAdvanced) {
      current.status = "SKIPPED";
    }
  }
}
