import { ProductionDeadlinePopulated } from "@/types/database.type";

export type DeadlinesByDates = {
  plannedEndDates: Date[]; // todas as datas
  startDeadlineDates: Date[]; // datas de início das deadlines
  finishedDeadlineDates: Date[]; // dates que as deadlines terminam

  plannedStartDeadlines: ProductionDeadlinePopulated[];
  plannedEndDeadlines: ProductionDeadlinePopulated[];
  finishedDeadlines: ProductionDeadlinePopulated[];
};

export function groupDeadlinesByDates(deadlines: ProductionDeadlinePopulated[]) {
  const deadlinesByDates: DeadlinesByDates = {
    plannedEndDates: [],
    startDeadlineDates: [],
    finishedDeadlineDates: [],
    plannedStartDeadlines: [],
    finishedDeadlines: [],
    plannedEndDeadlines: [],
  };

  for (const deadline of deadlines) {
    if (deadline.planned_start_at != null) {
      deadlinesByDates.startDeadlineDates.push(new Date(deadline.planned_start_at));
      deadlinesByDates.plannedStartDeadlines.push(deadline);
    }

    if (deadline.planned_end_at != null) {
      deadlinesByDates.plannedEndDates.push(new Date(deadline.planned_end_at));
      deadlinesByDates.plannedEndDeadlines.push(deadline);
    }

    if (deadline.actual_end_at != null) {
      deadlinesByDates.finishedDeadlineDates.push(new Date(deadline.actual_end_at));
      deadlinesByDates.finishedDeadlines.push(deadline);
    }
  }

  return deadlinesByDates;
}
