import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  Process,
  ProcessExecutionPopulated,
} from "@/types/database.type";

export type ExternalProcessState = {
  process: Process;
  movimentation: MovimentationPopulated;
  departament?: Departament;
  executions: ProcessExecutionPopulated[];
  externalExecutions: ProcessExecutionPopulated[];
  returnExecutions: ProcessExecutionPopulated[];
  avaliableAmount: number;
  externalAmount: number;
  returnAmount: number;
};

type CalcExternalProcessStatesProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  movimentationExecutions: ProcessExecutionPopulated[];
};

export function calcDepartamentExternalState({
  departament,
  movimentation,
  movimentationExecutions,
}: CalcExternalProcessStatesProps): ExternalProcessState {
  const externalExecutions = movimentationExecutions.filter(
    (exe) => exe.process?.departament_id == departament.id && exe.type === "EXTERNAL",
  );

  const returnExecutions = movimentationExecutions.filter(
    (exe) => exe.from_process?.departament_id == departament.id && exe.type === "RETURN",
  );

  const executions = [...externalExecutions, ...returnExecutions];

  const externalAmount = externalExecutions.reduce((prev, curr) => prev + curr.amount, 0);
  const returnAmount = returnExecutions.reduce((prev, curr) => prev + curr.amount, 0);
  const avaliableAmount = externalAmount - returnAmount;
  const process = externalExecutions.find(
    (exe) => exe.process?.departament_id === departament.id,
  )?.process!;

  return {
    process,
    movimentation,
    departament,
    avaliableAmount,
    returnAmount,
    externalAmount,
    externalExecutions,
    returnExecutions,
    executions,
  };
}
