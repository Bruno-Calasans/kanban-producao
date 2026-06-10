import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import { calcDepartamentStatus, DepartamenStatus } from "./calcDepartamentStatus";

type CalcDepartamentStateData = {
  movimentation: MovimentationPopulated;
  movimentationDeadlines: MovimentationDeadlinePopulated[];
  movimentationProcessStates: ProcessState[];
};

export type DepartamentState = {
  movimentation: MovimentationPopulated;
  departament: Departament;
  processStates: ProcessState[];
  movimentationProcessStates: ProcessState[];
  status: DepartamenStatus;
  expiredDays: number;
  deadline?: MovimentationDeadlinePopulated;
};

export default function calcDepartamentState({
  movimentation,
  movimentationDeadlines,
  movimentationProcessStates,
}: CalcDepartamentStateData) {
  const processStatesByDepartament = new Map<number, ProcessState[]>();
  const deadlinesByDepartament = new Map<number, MovimentationDeadlinePopulated>();

  // deadlines map
  for (const deadline of movimentationDeadlines) {
    deadlinesByDepartament.set(deadline.departament.id, deadline);
  }

  // agrupa process states
  for (const state of movimentationProcessStates) {
    const departamentId = state.process.departament.id;

    const current = processStatesByDepartament.get(departamentId) || [];

    current.push(state);

    processStatesByDepartament.set(departamentId, current);
  }

  const states: DepartamentState[] = [];

  // cria estados finais
  for (const [departamentId, processStates] of processStatesByDepartament) {
    const departament = processStates[0].process.departament;

    const deadline = deadlinesByDepartament.get(departamentId);

    const { status, expiredDays } = calcDepartamentStatus(processStates, deadline);

    states.push({
      movimentation,
      departament,
      processStates,
      movimentationProcessStates,
      deadline,
      status,
      expiredDays,
    });
  }
  return states;
}
