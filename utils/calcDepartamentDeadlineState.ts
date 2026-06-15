import {
  Departament,
  DepartamentState,
  Production,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { calcDepartamentDeadlineStatus, DepartamenStatus } from "./calcDepartamentDeadlineStatus";

type CalcDepartamentStateData = {
  production: Production;
  productionDeadlines: ProductionDeadlinePopulated[];
  productionDepartamentStates: DepartamentState[];
};

export type DepartamentDeadlineState = {
  production: Production;
  departament: Departament;
  departamentStates: DepartamentState[];
  status: DepartamenStatus;
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

  const states: DepartamentDeadlineState[] = [];

  // cria estados finais
  for (const [departamentId, departamentStates] of statesByDepartament) {
    const departament = departamentStates[0].departament;

    const deadline = deadlinesByDepartament.get(departamentId);

    const { status, expiredDays } = calcDepartamentDeadlineStatus({ departamentStates, deadline });

    states.push({
      departamentStates, // estados relacionados ao departamento atual
      departament, // departamento atual
      production, // produção
      deadline, // prazo do departamento atual
      status, // status do departamento atual
      expiredDays, // dias para expirar o prazo do departamento atual
    });
  }
  return states;
}
