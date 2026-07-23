import { ProductionDeadlinePopulated } from "@/types/database.type";
import normalizeDate from "./normalizeDate";
export type DeadlineType = "RANGE" | "ONLY_START" | "ONLY_EXPECTED"

export function checkDeadlineType(deadline: ProductionDeadlinePopulated): DeadlineType {
  // Deadline apenas com dia planejado para começar
  if (deadline.planned_start_at && !deadline.planned_end_at) {
    return "ONLY_START";
  }

  // Deadline com apenas dia planejado para terminar
  if (deadline.planned_end_at && !deadline.planned_start_at) {
    return "ONLY_EXPECTED";
  }

  // const startDate = normalizeDate(deadline.planned_start_at);
  // const endDate = normalizeDate(deadline.planned_end_at);
  // const startEndSameDay = startDate?.getTime() == endDate?.getTime();

  // if (startEndSameDay) return "SAME_DAY";

  // Deadline que tem dia pra começar e terminar
  return "RANGE";
}
