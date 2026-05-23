import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { getDeadlinePriority } from "./getDeadlinePriority";

export function sortByDeadlinePriority(
  deadlineA: MovimentationDeadlinePopulated,
  deadlineB: MovimentationDeadlinePopulated,
) {
  return getDeadlinePriority(deadlineB) - getDeadlinePriority(deadlineA);
}
