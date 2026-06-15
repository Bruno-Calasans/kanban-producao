import { MovimentationPopulated, ProductionPopulated } from "@/types/database.type";
import { ExternalDepartamentState } from "./calcDepartamentExternalState";

export type GroupExternalProcessState = Record<number, ExternalDepartamentState>;

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
          departamentMovimentations: [movimentation],
          returnMovimentations: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
        };
      }

      groups[departament.id].departamentMovimentations.push(movimentation);
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
          departamentMovimentations: [movimentation],
          externalMovimentations: [],
          avaliableAmount: 0,
          externalAmount: 0,
          returnAmount: 0,
        };
      }

      groups[departament.id].departamentMovimentations.push(movimentation);
      groups[departament.id].returnMovimentations.push(movimentation);
      groups[departament.id].avaliableAmount -= movimentation.amount;
      groups[departament.id].returnAmount += movimentation.amount;
    }
  }

  return Object.values(groups);
}
