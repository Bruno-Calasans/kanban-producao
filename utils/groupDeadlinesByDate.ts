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
  plannedStartDeadlines: ProductionDeadlinePopulated[];
  plannedEndDeadlines: ProductionDeadlinePopulated[];
  finishedDeadlines: ProductionDeadlinePopulated[];
};

export function groupDeadlinesByDate({ deadlines, date }: GroupDeadlinesByDateProps) {
  const deadlineGroups: GroupDeadlinesByDate = {
    date,
    deadlines: [],
    plannedStartDeadlines: [],
    plannedEndDeadlines: [],
    finishedDeadlines: [],
  };

  for (const deadline of deadlines) {
    const { planned_start_at, planned_end_at, actual_end_at } = deadline;

    const plannedStartDate = planned_start_at ? new Date(planned_start_at) : null;
    const plannedEndDate = planned_end_at ? new Date(planned_end_at) : null;
    const actualEndDate = actual_end_at ? new Date(actual_end_at) : null;

    plannedStartDate?.setHours(0, 0, 0, 0);
    plannedEndDate?.setHours(0, 0, 0, 0);
    actualEndDate?.setHours(0, 0, 0, 0);
    date?.setHours(0, 0, 0, 0);

    const isPlannedToStartThisDate =
      plannedStartDate && plannedStartDate.getTime() == date.getTime();
    const isPlannedToEndThisDate = plannedEndDate && plannedEndDate.getTime() == date.getTime();
    const isFinishedThisDate = actualEndDate && actualEndDate.getTime() == date.getTime();

    if (isPlannedToStartThisDate) {
      deadlineGroups.plannedStartDeadlines.push(deadline);
      deadlineGroups.deadlines.push(deadline);
    }

    if (isPlannedToEndThisDate) {
      deadlineGroups.plannedEndDeadlines.push(deadline);
      deadlineGroups.deadlines.push(deadline);
    }

    if (isFinishedThisDate) {
      deadlineGroups.finishedDeadlines.push(deadline);
      deadlineGroups.deadlines.push(deadline);
    }
  }

  return deadlineGroups;
}
