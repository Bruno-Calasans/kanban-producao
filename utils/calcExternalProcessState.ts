import { MovimentationPopulated, Process, ProcessExecutionPopulated } from "@/types/database.type";
import { ExternalProcessState } from "./calcDepartamentExternalState";

export type GroupExternalProcessState = Record<number, ExternalProcessState>;

type CalcExternalProcessStatesProps = {
  movimentation: MovimentationPopulated;
  processExecutions: ProcessExecutionPopulated[];
};

export function calcExternalProcessStates({
  movimentation,
  processExecutions,
}: CalcExternalProcessStatesProps) {
  const groups: GroupExternalProcessState = {};

  for (const execution of processExecutions) {
    // SAIU PARA EXTERNO
    if (execution.type === "EXTERNAL") {
      const process = execution.process;
      if (!process) continue;

      if (!groups[process.id]) {
        groups[process.id] = {
          process,
          movimentation,
          externalExecutions: [execution],
          executions: [execution],
          returnExecutions: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
        };
      }

      groups[process.id].executions.push(execution);
      groups[process.id].externalExecutions.push(execution);
      groups[process.id].avaliableAmount += execution.amount;
      groups[process.id].externalAmount += execution.amount;
    }

    // RETORNOU DO EXTERNO
    if (execution.type === "RETURN") {
      const process = execution.from_process;
      if (!process) continue;

      if (!groups[process.id]) {
        groups[process.id] = {
          process,
          movimentation,
          returnExecutions: [execution],
          executions: [execution],
          externalExecutions: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
        };
      }

      groups[process.id].executions.push(execution);
      groups[process.id].returnExecutions.push(execution);
      groups[process.id].avaliableAmount -= execution.amount;
      groups[process.id].returnAmount += execution.amount;
    }
  }

  return Object.values(groups);
}
