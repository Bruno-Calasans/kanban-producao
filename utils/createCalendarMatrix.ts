import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { groupDeadlinesByDepartament } from "./groupDeadlinesByDepartament";
import { NormalizedWeekDay } from "./createNormalizedWeekDays";

type CreateCalendarMatrixInput = {
  deadlines: MovimentationDeadlinePopulated[];
  normalizedWeekDays: NormalizedWeekDay[];
};

export function createCalendarMatrix({ deadlines, normalizedWeekDays }: CreateCalendarMatrixInput) {
  const matrix = new Map<number, Map<string, MovimentationDeadlinePopulated[]>>();

  const deadlinesByDepartment = groupDeadlinesByDepartament(deadlines);

  for (const [departmentId, departmentDeadlines] of deadlinesByDepartment) {
    const weekMap = new Map<string, MovimentationDeadlinePopulated[]>();

    for (const day of normalizedWeekDays) {
      weekMap.set(day.key, []);
    }

    // Processa deadlines
    for (const deadline of departmentDeadlines) {
      const plannedStartDate = deadline.planned_start_at
        ? new Date(deadline.planned_start_at)
        : null;
      const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : null;

      plannedStartDate?.setHours(0, 0, 0, 0);
      plannedEndDate?.setHours(0, 0, 0, 0);

      const startTime = plannedStartDate?.getTime();
      const endTime = plannedEndDate?.getTime();

      for (const day of normalizedWeekDays) {
        const cards = weekMap.get(day.key) || [];

        const isInsideInterval =
          startTime && endTime && day.time >= startTime && day.time <= endTime;

        const isAtDay = (startTime || endTime) == day.time;

        // Dias normais
        if (isInsideInterval || isAtDay) {
          cards.push(deadline);
        }
      }
    }

    matrix.set(departmentId, weekMap);
  }

  return matrix;
}
