import { ProductionDeadlinePopulated } from "@/types/database.type";

type GroupDeadlinesByDateProps = {
  deadlines: ProductionDeadlinePopulated[];
  date: Date;
};

type DeadlinesByDate = {
  deadlines: ProductionDeadlinePopulated[];
  dates: Date[];
};

export type GroupDeadlinesByDate = {
  date: Date;
  deadlines: ProductionDeadlinePopulated[];
  plannedEndDeadlines: ProductionDeadlinePopulated[];
  finishedDeadlines: ProductionDeadlinePopulated[];
};

export function groupDeadlinesByDate({ deadlines, date }: GroupDeadlinesByDateProps) {
  const deadlineGroups: GroupDeadlinesByDate = {
    date,
    deadlines: [],
    plannedEndDeadlines: [],
    finishedDeadlines: [],
  };

  for (const deadline of deadlines) {
    const { planned_start_at, planned_end_at, actual_end_at } = deadline;

    const plannedEndDate = planned_end_at ? new Date(planned_end_at) : null;
    const actualEndDate = actual_end_at ? new Date(actual_end_at) : null;

    plannedEndDate?.setHours(0, 0, 0, 0);
    actualEndDate?.setHours(0, 0, 0, 0);
    date?.setHours(0, 0, 0, 0);

    const isPlannedToEndThisDate = plannedEndDate && plannedEndDate.getTime() == date.getTime();

    const isFinishedThisDate = actualEndDate && actualEndDate.getTime() == date.getTime();

    if (isFinishedThisDate) {
      deadlineGroups.finishedDeadlines.push(deadline);
      deadlineGroups.deadlines.push(deadline);
    }

    if (isPlannedToEndThisDate && !actualEndDate) {
      deadlineGroups.plannedEndDeadlines.push(deadline);
      deadlineGroups.deadlines.push(deadline);
    }
  }

  return deadlineGroups;
}
