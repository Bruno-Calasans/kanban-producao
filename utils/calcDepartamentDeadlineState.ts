import {
  Departament,
  DepartamentState,
  Production,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { calcDeadlineStatus, DeadlineStatus } from "./calcDeadlineStatus";

type CalcProductionDeadlineStatesProps = {
  production: Production;
  productionDeadlines: ProductionDeadlinePopulated[];
  productionDepartamentStates: DepartamentState[];
};

export type DepartamentDeadlineState = {
  production: Production;
  departament: Departament;
  departamentState: DepartamentState;
  status: DeadlineStatus;
  expireDays: number;
  expireDaysAfterEnd: number;
  deadline?: ProductionDeadlinePopulated;
};

export function calcProductionDeadlineStates({
  production,
  productionDeadlines,
  productionDepartamentStates,
}: CalcProductionDeadlineStatesProps) {
  const statesByDepartament = new Map<number, DepartamentState>();
  const deadlinesByDepartament = new Map<number, ProductionDeadlinePopulated>();
  const states: DepartamentDeadlineState[] = [];

  // Agrupa prazos por
  for (const deadline of productionDeadlines) {
    deadlinesByDepartament.set(deadline.departament.id, deadline);
  }

  // Agrupa os estados por departamento
  for (const state of productionDepartamentStates) {
    const departamentId = state.departament.id;
    statesByDepartament.set(departamentId, state);
  }

  // cria estados finais
  for (const [departamentId, departamentState] of statesByDepartament) {
    const departament = departamentState.departament;

    const deadline = deadlinesByDepartament.get(departamentId);
    const { status, expireDays, expireDaysAfterEnd } = calcDeadlineStatus({
      deadline,
      departamentState,
    });

    states.push({
      departament, // departamento atual
      production, // produção
      deadline, // prazo do departamento atual
      status, // status do departamento atual
      expireDays, // dias para expirar o prazo do departamento atual
      departamentState, // estado do departamento
      expireDaysAfterEnd,
    });
  }

  return states;
}
