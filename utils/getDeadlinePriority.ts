import { MovimentationDeadlinePopulated } from "@/types/database.type";

export function getDeadlinePriority(deadline: MovimentationDeadlinePopulated) {
  const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : null;

  const isFinished = !!deadline.actual_end_at;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (plannedEndDate && !isFinished) {
    plannedEndDate.setHours(0, 0, 0, 0);

    if (plannedEndDate < today) {
      return 0; // atrasado
    }
  }

  if (!isFinished) {
    return 1; // pendente
  }

  return 2; // feito
}
