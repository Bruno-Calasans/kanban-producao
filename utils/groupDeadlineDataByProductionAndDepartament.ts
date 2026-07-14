import {
  Departament,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { DeadlineStatusData, DEFAULT_DEADLINE_STATUS } from "./calcDeadlineStatus";

export type DeadlineData = {
  deadline: ProductionDeadlinePopulated | undefined;
  deadlineStatus: DeadlineStatusData;
};

export type GroupDeadlineDataByProductionProps = {
  departamentDeadlines: ProductionDeadlinePopulated[];
  departamentProductions: ProductionPopulated[];
  deadlineStatusByDeadline: Map<number, DeadlineStatusData>;
};

export default function groupDeadlineDataByProductionAndDepartament({
  departamentDeadlines,
  departamentProductions,
  deadlineStatusByDeadline,
}: GroupDeadlineDataByProductionProps) {
  const deadlineDataByproductionAndDepartament = new Map<number, DeadlineData>();

  for (const production of departamentProductions) {
    const productionId = production.id;

    const deadline = departamentDeadlines.find((d) => d.production_id == productionId);

    const deadlineStatus =
      (deadline ? deadlineStatusByDeadline.get(deadline.id) : undefined) || DEFAULT_DEADLINE_STATUS;

    deadlineDataByproductionAndDepartament.set(productionId, {
      deadline,
      deadlineStatus,
    });
  }

  return deadlineDataByproductionAndDepartament;
}
