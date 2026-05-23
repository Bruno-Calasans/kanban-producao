import {
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProcessExecutionStatus,
  ProcessState,
  ProductionFlowTemplate,
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

    const isLastProcess = currentProcess.id === lastProcess.id;

    let status: ProcessExecutionStatus = "PENDING";

    if (!hasExecutions) {
      status = "PENDING";
    } else if (isLastProcess && avaliableAmount === movimentation.amount) {
      status = "SUCCESS";
    } else if (avaliableAmount > 0) {
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
  checkExernal(states);

  return states;
}

export function checkSkippedProcess(processStates: ProcessState[]) {
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
}

export function checkReprocesses(processStates: ProcessState[]) {
  for (const current of processStates) {
    const hasExecutions = current.executions.length > 0;
    if (!hasExecutions) continue;

    const outExecutions = current.executions.filter(
      (exe) => exe.from_process?.id === current.process.id,
    );

    // Soma tudo que saiu normalmente
    const forwardSum = outExecutions
      .filter((exe) => exe.type === "TRANSFER" || exe.type === "EXTERNAL")
      .reduce((total, exe) => total + exe.amount, 0);

    // Soma tudo que saiu via reprocesso
    const reprocessSum = outExecutions
      .filter((exe) => exe.type === "REPROCESS")
      .reduce((total, exe) => total + exe.amount, 0);

    const hasReprocess = reprocessSum > 0;
    const hasPendingReprocess = reprocessSum > forwardSum;
    const fullyReprocessed = reprocessSum > 0 && forwardSum === 0 && current.avaliableAmount === 0;
    const partiallyReprocessed = reprocessSum > 0 && forwardSum > 0 && reprocessSum > forwardSum;

    current.flags = {
      hasReprocess,
      hasPendingReprocess,
      partiallyReprocessed,
    };

    if (fullyReprocessed) {
      current.status = "REPROCESSING";
    }
  }
}

export function checkExernal(processStates: ProcessState[]) {
  for (const current of processStates) {
    const hasExecutions = current.executions.length > 0;
    if (!hasExecutions) continue;

    const outExecutions = current.executions.filter(
      (exe) => exe.from_process?.id === current.process.id,
    );

    // Soma tudo que saiu normalmente
    const forwardSum = outExecutions
      .filter((exe) => exe.type === "TRANSFER" || exe.type === "REPROCESS")
      .reduce((total, exe) => total + exe.amount, 0);

    // Soma tudo que saiu via reprocesso
    const externalSum = outExecutions
      .filter((exe) => exe.type === "EXTERNAL")
      .reduce((total, exe) => total + exe.amount, 0);

    const hasExternal = externalSum > 0;
    const hasPendingExternal = externalSum > forwardSum;
    const fullYExternal = externalSum > 0 && forwardSum === 0 && current.avaliableAmount === 0;
    const partiallyexternal = externalSum > 0 && forwardSum > 0 && externalSum > forwardSum;

    current.flags = {
      hasExternal,
      hasPendingExternal,
      partiallyexternal,
    };

    if (fullYExternal) {
      current.status = "EXTERNAL";
    }
  }
}
