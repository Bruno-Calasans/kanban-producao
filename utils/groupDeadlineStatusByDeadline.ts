import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import {
  calcDeadlineStatus,
  DeadlineStatusData,
  DEFAULT_DEADLINE_STATUS,
} from "./calcDeadlineStatus";

type GroupDeadlineStatusByDeadlineProps = {
  deadlines: ProductionDeadlinePopulated[];
  departamentStatesByProduction: Map<number, DepartamentState[]>;
};

export function groupDeadlineStatusByDeadline({
  deadlines,
  departamentStatesByProduction,
}: GroupDeadlineStatusByDeadlineProps) {
  const deadlineStatusByDeadline = new Map<number, DeadlineStatusData>();

  for (const deadline of deadlines) {
    const departamentStates = departamentStatesByProduction.get(deadline.production.id) || [];

    const departamentState = departamentStates.find(
      (s) => s.departament.id === deadline.departament.id,
    );

    if (!departamentState) {
      deadlineStatusByDeadline.set(deadline.id, DEFAULT_DEADLINE_STATUS);
    } else {
      const deadlineStatus = calcDeadlineStatus({ deadline, departamentState });

      deadlineStatusByDeadline.set(deadline.id, deadlineStatus);
    }
  }

  return deadlineStatusByDeadline;
}
