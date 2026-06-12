import { Departament, MovimentationPopulated, ProductionPopulated } from "@/types/database.type";

export type ExternalDepartamentState = {
  departament: Departament;
  production: ProductionPopulated;
  departamentMovimentations: MovimentationPopulated[];
  externalMovimentations: MovimentationPopulated[];
  returnMovimentations: MovimentationPopulated[];
  avaliableAmount: number;
  externalAmount: number;
  returnAmount: number;
};

type CalcExternalProcessStatesProps = {
  departament: Departament;
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
};

export function calcDepartamentExternalState({
  departament,
  production,
  movimentations,
}: CalcExternalProcessStatesProps): ExternalDepartamentState {
  // Movimentações que saíram do departamento
  const externalMovimentations = movimentations.filter(
    (exe) => exe.departament_id == departament.id && exe.type === "EXTERNAL",
  );

  // Movimentações que vieram de departamentos externos
  const returnMovimentations = movimentations.filter(
    (exe) => exe.from_departament_id == departament.id && exe.type === "RETURN",
  );

  // Todas as movimentações daquele departamento
  const departamentMovimentations = [...externalMovimentations, ...returnMovimentations];

  const externalAmount = externalMovimentations.reduce((prev, curr) => prev + curr.amount, 0);
  const returnAmount = returnMovimentations.reduce((prev, curr) => prev + curr.amount, 0);
  const avaliableAmount = externalAmount - returnAmount;

  // const departament = externalMovimentations.find(
  //   (exe) => exe.departament_id === departament.id,
  // )?.departament!;

  return {
    production,
    departament,
    avaliableAmount,
    returnAmount,
    externalAmount,
    externalMovimentations,
    returnMovimentations,
    departamentMovimentations,
  };
}
