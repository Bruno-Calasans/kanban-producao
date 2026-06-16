import { ProductionDeadlinePopulated } from "@/types/database.type";
import { differenceInDays, startOfDay } from "date-fns";
export type DeadlineStatus = "NOT_DEFINED" | "VALID" | "EXPIRED" | "COMPLETED";

type CalcDeadlineStatusProps = {
  deadline?: ProductionDeadlinePopulated;
};

type DeadlineStatusData = {
  status: DeadlineStatus;
  expiredDays: number;
};

export function calcDeadlineStatus({ deadline }: CalcDeadlineStatusProps): {
  status: DeadlineStatus;
  expiredDays: number;
} {
  let statusData: DeadlineStatusData = {
    status: "NOT_DEFINED",
    expiredDays: 0,
  };

  // Prazo concluído
  if (deadline && deadline.actual_end_at) {
    statusData.status = "COMPLETED";
  }

  // Prazo não concluído
  if (deadline && deadline.planned_end_at && !deadline.actual_end_at) {
    const today = startOfDay(new Date());
    const plannedEndDate = startOfDay(new Date(deadline.planned_end_at));

    const expireDays = differenceInDays(plannedEndDate, today);

    statusData = {
      status: expireDays < 0 ? "EXPIRED" : "VALID",
      expiredDays: Math.abs(expireDays),
    };
  }

  return statusData;
}
