"use client";

import {
  MovimentationPopulated,
  Process,
  ProcessExecution,
  ProcessExecutionPopulated,
} from "@/types/database.type";
import { useMemo } from "react";

export type ExternalProcessState = {
  process: Process;
  externals: ProcessExecutionPopulated[];
  returns: ProcessExecutionPopulated[];
  movimentation: MovimentationPopulated;
  avaliableAmount: number;
};

export type GroupExternalProcessState = {
  [key in string]: ExternalProcessState;
};

type UseExternalProcessState = {
  movimentation: MovimentationPopulated;
  processExecutions: ProcessExecutionPopulated[];
};

export default function useExternalProcessState({
  movimentation,
  processExecutions,
}: UseExternalProcessState) {
  const groupExecutionsByProcess = () => {
    const groups: GroupExternalProcessState = {};

    const externalExecutions = processExecutions.filter((exe) => exe.type === "EXTERNAL");
    const returnExecutions = processExecutions.filter((exe) => exe.type === "RETURN");

    // Verificando execuções que entraram
    for (const execution of externalExecutions) {
      const currProcess = execution.process;
      if (!currProcess) continue;

      if (groups[currProcess.id]) {
        const { externals, ...curr } = groups[currProcess.id];

        groups[currProcess.id] = {
          ...curr,
          externals: [...externals, execution],
          avaliableAmount: curr.avaliableAmount + execution.amount,
        };
      } else {
        groups[currProcess.id] = {
          process: currProcess,
          returns: [],
          externals: [execution],
          avaliableAmount: execution.amount,
          movimentation,
        };
      }
    }

    // Verificando execução que retornaram
    for (const execution of returnExecutions) {
      const currProcess = execution.from_process;
      if (!currProcess) continue;

      if (groups[currProcess.id]) {
        const { returns, ...curr } = groups[currProcess.id];
        groups[currProcess.id] = {
          ...curr,
          returns: [...returns, execution],
          avaliableAmount: curr.avaliableAmount - execution.amount,
        };
      } else {
        groups[currProcess.id] = {
          process: currProcess,
          returns: [execution],
          externals: [],
          avaliableAmount: 0,
          movimentation,
        };
      }
    }

    return Object.keys(groups).map((key) => groups[key]);
  };

  const states = useMemo(() => groupExecutionsByProcess(), [movimentation, processExecutions]);

  return {
    externalProcessStates: states,
    processExecutions,
  };
}
