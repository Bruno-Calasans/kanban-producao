import { ProductionDeadlinePopulated } from "@/types/database.type";
import { getDeadlinePriority } from "./getDeadlinePriority";

export function sortByDeadlinePriority(
  deadlineA: ProductionDeadlinePopulated,
  deadlineB: ProductionDeadlinePopulated,
) {
  return getDeadlinePriority(deadlineB) - getDeadlinePriority(deadlineA);
}
