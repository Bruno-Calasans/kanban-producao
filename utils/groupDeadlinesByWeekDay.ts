import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { isWithinInterval } from "date-fns";
import { NormalizedWeekDay } from "./createNormalizedWeekDays";

export function groupDeadlinesByWeekDay(
  deadlines: MovimentationDeadlinePopulated[],
  normalizedWeekDays: NormalizedWeekDay[],
) {
  const deadlinesByDate = new Map<string, MovimentationDeadlinePopulated[]>();

  for (const deadline of deadlines) {
    const plannedStartDate = deadline.planned_start_at
      ? new Date(deadline.planned_start_at)
      : undefined;
    const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : undefined;

    // Se zerar o tempo, estou apenas comparando a data em número
    plannedStartDate?.setHours(0, 0, 0, 0);
    plannedEndDate?.setHours(0, 0, 0, 0);

    const startedTime = plannedStartDate?.getTime();
    const expectedTime = plannedEndDate?.getTime();

    for (const weekDay of normalizedWeekDays) {
      let includeDeadline = false;

      // Tem dia para começar, mas não tem diz pra terminar
      if (plannedStartDate && startedTime && !plannedEndDate) {
        includeDeadline = startedTime <= weekDay.time;
      }

      // Tem prazo para terminar, mas não tem dia para começar
      if (plannedEndDate && !plannedStartDate) {
        includeDeadline = expectedTime == weekDay.time;
      }

      // Deadline está dentro do intervalo
      if (plannedStartDate && plannedEndDate) {
        includeDeadline = isWithinInterval(weekDay.date, {
          start: plannedStartDate,
          end: plannedEndDate,
        });
      }

      if (includeDeadline) {
        const currDeadlines = deadlinesByDate.get(weekDay.key) || [];
        currDeadlines.push(deadline);
        deadlinesByDate.set(weekDay.key, currDeadlines);
      }
    }
  }

  return deadlinesByDate;
}
