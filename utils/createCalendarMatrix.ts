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
      const startedDate = deadline.started_at ? new Date(deadline.started_at) : null;
      const expectedDate = deadline.expected_at ? new Date(deadline.expected_at) : null;

      startedDate?.setHours(0, 0, 0, 0);
      expectedDate?.setHours(0, 0, 0, 0);

      const startTime = startedDate?.getTime();
      const endTime = expectedDate?.getTime();

      for (const day of normalizedWeekDays) {
        const cards = weekMap.get(day.key) || [];

        const isExpectedDay = endTime === day.time;

        const isInsideInterval =
          startTime && endTime && day.time >= startTime && day.time <= endTime;

        // Dias normais
        if (isInsideInterval) {
          cards.push(deadline);
        }
      }
    }

    matrix.set(departmentId, weekMap);
  }

  return matrix;
}
