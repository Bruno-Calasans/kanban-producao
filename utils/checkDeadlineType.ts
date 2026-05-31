import { MovimentationDeadlinePopulated } from "@/types/database.type";
export type DeadlineType = "RANGE" | "ONLY_START" | "ONLY_EXPECTED";

export function checkDeadlineType(deadline: MovimentationDeadlinePopulated): DeadlineType {
  if (deadline.planned_start_at && !deadline.planned_end_at) {
    return "ONLY_START";
  }

  if (deadline.planned_end_at && !deadline.planned_start_at) {
    return "ONLY_EXPECTED";
  }

  return "RANGE";
}
