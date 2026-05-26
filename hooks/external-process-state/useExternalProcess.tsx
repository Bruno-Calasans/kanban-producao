"use client";

import { MovimentationPopulated, Process, ProcessExecutionPopulated } from "@/types/database.type";
import { calcExternalProcessStates } from "@/utils/calcExternalProcessState";
import { useMemo } from "react";

type UseExternalProcessState = {
  movimentation: MovimentationPopulated;
  processExecutions: ProcessExecutionPopulated[];
};

export default function useExternalProcessState({
  movimentation,
  processExecutions,
}: UseExternalProcessState) {
  const externalProcessStates = useMemo(
    () => calcExternalProcessStates({ movimentation, processExecutions }),
    [movimentation, processExecutions],
  );

  return {
    externalProcessStates,
    processExecutions,
  };
}
