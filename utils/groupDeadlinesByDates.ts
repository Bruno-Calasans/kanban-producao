import { ProductionDeadlinePopulated } from "@/types/database.type";

export type DeadlinesByDates = {
  deadlineDates: Date[];
  startDeadlineDates: Date[];
  finishedDeadlineDates: Date[];
  plannedStartDeadlines: ProductionDeadlinePopulated[];
  plannedEndDeadlines: ProductionDeadlinePopulated[];
  finishedDeadlines: ProductionDeadlinePopulated[];
};

export function groupDeadlinesByDates(deadlines: ProductionDeadlinePopulated[]) {
  const deadlinesByDates: DeadlinesByDates = {
    deadlineDates: [],
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
      deadlinesByDates.deadlineDates.push(new Date(deadline.planned_end_at));
      deadlinesByDates.plannedEndDeadlines.push(deadline);
    }

    if (deadline.actual_end_at != null) {
      deadlinesByDates.finishedDeadlineDates.push(new Date(deadline.actual_end_at));
      deadlinesByDates.finishedDeadlines.push(deadline);
    }
  }

  return deadlinesByDates;
}
