import { ProductionDeadlinePopulated } from "@/types/database.type";
import { DeadlineStatusData, DeadlineStatusEnum } from "./calcDeadlineStatus";

export function sortByDeadlineStatus(
  deadlineA: ProductionDeadlinePopulated,
  deadlineB: ProductionDeadlinePopulated,
  deadlineStatusByDeadline: Map<number, DeadlineStatusData>,
) {
  return (
    DeadlineStatusEnum[deadlineStatusByDeadline.get(deadlineA.id)!.status] -
    DeadlineStatusEnum[deadlineStatusByDeadline.get(deadlineB.id)!.status]
  );
}
