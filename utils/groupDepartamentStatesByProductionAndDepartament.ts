import {
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";

type GroupDepartamentStatesByProductionAndDepartamentProps = {
  departament: Departament;
  departamentProductions: ProductionPopulated[];
  departamentStatesByProduction: Map<number, DepartamentState[]>;
};

export default function groupDepartamentStatesByProductionAndDepartament({
  departament,
  departamentProductions,
  departamentStatesByProduction,
}: GroupDepartamentStatesByProductionAndDepartamentProps) {
  const departamentStateByProductionAndDepartament = new Map<number, DepartamentState>();

  for (const production of departamentProductions) {
    const productionId = production.id;

    const departamentStates = departamentStatesByProduction.get(productionId) || [];
    const departamentState = departamentStates.find(
      (state) => state.departament.id == departament.id,
    )!;
    departamentStateByProductionAndDepartament.set(productionId, departamentState);
  }

  return departamentStateByProductionAndDepartament;
}
