import {
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import {
  calcProductionDeadlineStates,
  DepartamentDeadlineState,
} from "./calcDepartamentDeadlineState";

type GroupDeadlineStateByProductionProps = {
  productions: ProductionPopulated[];
  departamentStatesByProduction: Map<number, DepartamentState[]>;
  deadlinesByProduction: Map<number, ProductionDeadlinePopulated[]>;
};

export function groupDeadlineStateByProduction({
  productions,
  departamentStatesByProduction,
  deadlinesByProduction,
}: GroupDeadlineStateByProductionProps) {
  const deadlineStateByProduction: Map<number, DepartamentDeadlineState[]> = new Map();

  for (const production of productions) {
    const productionDepartamentStates = departamentStatesByProduction.get(production.id) || [];
    const productionDeadlines = deadlinesByProduction.get(production.id) || [];

    const deadlineStates = calcProductionDeadlineStates({
      production,
      productionDeadlines,
      productionDepartamentStates,
    });

    deadlineStateByProduction.set(production.id, deadlineStates);
  }

  return deadlineStateByProduction;
}
