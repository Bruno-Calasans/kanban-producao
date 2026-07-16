import {
  DepartamentState,
  MovimentationPopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { ExternalDepartamentState } from "./calcDepartamentExternalState";

export type GroupExternalProcessState = Record<number, DepartamentState>;

type CalcExternalDepartamentStateProps = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
};

export function calcExternalDepartamentState({
  production,
  movimentations,
}: CalcExternalDepartamentStateProps) {
  const groups: GroupExternalProcessState = {};

  for (const movimentation of movimentations) {
    // SAIU PARA EXTERNO
    if (movimentation.type === "EXTERNAL") {
      const departament = movimentation.departament;
      if (!departament) continue;

      if (!groups[departament.id]) {
        groups[departament.id] = {
          departament,
          production,
          externalMovimentations: [movimentation],
          movimentations: [movimentation],
          returnMovimentations: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
          flowTemplates: [],
          forwardAmount: 0,
          inputAmount: 0,
          inputMovimentations: [],
          nextDepartament: null,
          previousDepartament: null,
          outputAmount: 0,
          outputMovimentations: [],
          reprocessAmount: 0,
          skippedAmount: 0,
          template: null,
          status: "IN_PROGRESS",
        };
      }

      groups[departament.id].movimentations.push(movimentation);
      groups[departament.id].externalMovimentations.push(movimentation);
      groups[departament.id].avaliableAmount += movimentation.amount;
      groups[departament.id].externalAmount += movimentation.amount;
    }

    // RETORNOU DO EXTERNO
    if (movimentation.type === "RETURN") {
      const departament = movimentation.from_departament;
      if (!departament) continue;

      if (!groups[departament.id]) {
        groups[departament.id] = {
          departament,
          production,
          returnMovimentations: [movimentation],
          movimentations: [movimentation],
          externalMovimentations: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
          flowTemplates: [],
          forwardAmount: 0,
          inputAmount: 0,
          inputMovimentations: [],
          nextDepartament: null,
          previousDepartament: null,
          outputAmount: 0,
          outputMovimentations: [],
          reprocessAmount: 0,
          skippedAmount: 0,
          template: null,
          status: "IN_PROGRESS",
        };
      }

      groups[departament.id].movimentations.push(movimentation);
      groups[departament.id].returnMovimentations.push(movimentation);
      groups[departament.id].avaliableAmount -= movimentation.amount;
      groups[departament.id].returnAmount += movimentation.amount;
    }
  }

  const departamentStates = Object.values(groups);

  for (const departamentState of departamentStates) {
    if (departamentState.avaliableAmount > 0) {
      departamentState.status = "IN_PROGRESS";
    } else {
      departamentState.status = "COMPLETED";
    }
  }

  return departamentStates;
}
