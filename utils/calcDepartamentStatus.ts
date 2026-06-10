import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { differenceInDays, startOfDay } from "date-fns";
export type DepartamenStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "EXPIRED";

export function calcDepartamentStatus(
  processStates: ProcessState[],
  deadline?: MovimentationDeadlinePopulated,
): {
  status: DepartamenStatus;
  expiredDays: number;
} {
  let hasPending = false;
  let hasInProgress = false;

  for (const state of processStates) {
    if (state.status === "IN_PROGRESS") {
      hasInProgress = true;
    }

    if (state.status === "PENDING") {
      hasPending = true;
    }
  }

  let status: DepartamenStatus = "COMPLETED";

  if (hasInProgress) {
    status = "IN_PROGRESS";
  } else if (hasPending) {
    status = "PENDING";
  }

  // verifica atraso
  if (deadline?.planned_end_at && !deadline.actual_end_at) {
    const today = startOfDay(new Date());
    const expectedDate = startOfDay(new Date(deadline.planned_end_at));

    const diff = differenceInDays(expectedDate, today);

    if (diff < 0) {
      return {
        status: "EXPIRED",
        expiredDays: Math.abs(diff),
      };
    }
  }

  return {
    status,
    expiredDays: 0,
  };
}
