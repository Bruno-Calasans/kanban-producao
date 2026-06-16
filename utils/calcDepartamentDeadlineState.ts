import {
  Departament,
  DepartamentState,
  Production,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { calcDeadlineStatus, DeadlineStatus } from "./calcDeadlineStatus";

type CalcDepartamentStateData = {
  production: Production;
  productionDeadlines: ProductionDeadlinePopulated[];
  productionDepartamentStates: DepartamentState[];
};

export type DepartamentDeadlineState = {
  production: Production;
  departament: Departament;
  departamentStates: DepartamentState[];
  status: DeadlineStatus;
  expiredDays: number;
  deadline?: ProductionDeadlinePopulated;
};

export function calcDepartamentDeadlineState({
  production,
  productionDeadlines,
  productionDepartamentStates,
}: CalcDepartamentStateData) {
  const statesByDepartament = new Map<number, DepartamentState[]>();
  const deadlinesByDepartament = new Map<number, ProductionDeadlinePopulated>();
  const states: DepartamentDeadlineState[] = [];

  for (const deadline of productionDeadlines) {
    deadlinesByDepartament.set(deadline.departament.id, deadline);
  }

  // Agrupa os estados por departamento
  for (const state of productionDepartamentStates) {
    const departamentId = state.departament.id;

    const current = statesByDepartament.get(departamentId) || [];
    current.push(state);
    statesByDepartament.set(departamentId, current);
  }

  // cria estados finais
  for (const [departamentId, departamentStates] of statesByDepartament) {
    const departament = departamentStates[0].departament;

    const deadline = deadlinesByDepartament.get(departamentId);

    const { status, expiredDays } = calcDeadlineStatus({ deadline });

    states.push({
      departament, // departamento atual
      production, // produção
      deadline, // prazo do departamento atual
      status, // status do departamento atual
      expiredDays, // dias para expirar o prazo do departamento atual
      departamentStates, // estados relacionados ao departamento atual
    });
  }
  return states;
}
