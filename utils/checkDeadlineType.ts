import { MovimentationDeadlinePopulated } from "@/types/database.type";
export type DeadlineType = "RANGE" | "ONLY_START" | "ONLY_EXPECTED";

export function checkDeadlineType(deadline: MovimentationDeadlinePopulated): DeadlineType {
  if (deadline.started_at && !deadline.expected_at) {
    return "ONLY_START";
  }

  if (deadline.expected_at && !deadline.started_at) {
    return "ONLY_EXPECTED";
  }

  return "RANGE";
}
