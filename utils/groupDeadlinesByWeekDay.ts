import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { isWithinInterval } from "date-fns";
import { NormalizedWeekDay } from "./createNormalizedWeekDays";

export function groupDeadlinesByWeekDay(
  deadlines: MovimentationDeadlinePopulated[],
  normalizedWeekDays: NormalizedWeekDay[],
) {
  const deadlinesByDate = new Map<string, MovimentationDeadlinePopulated[]>();

  for (const deadline of deadlines) {
    const startedDate = deadline.started_at ? new Date(deadline.started_at) : undefined;
    const expectedDate = deadline.expected_at ? new Date(deadline.expected_at) : undefined;

    // Se zerar o tempo, estou apenas comparando a data em número
    startedDate?.setHours(0, 0, 0, 0);
    expectedDate?.setHours(0, 0, 0, 0);

    const startedTime = startedDate?.getTime();
    const expectedTime = expectedDate?.getTime();

    for (const weekDay of normalizedWeekDays) {
      let includeDeadline = false;

      // Tem dia para começar, mas não tem diz pra terminar
      if (startedDate && startedTime && !expectedDate) {
        includeDeadline = startedTime <= weekDay.time;
      }

      // Tem prazo para terminar, mas não tem dia para começar
      if (expectedDate && !startedDate) {
        includeDeadline = expectedTime == weekDay.time;
      }

      // Deadline está dentro do intervalo
      if (startedDate && expectedDate) {
        includeDeadline = isWithinInterval(weekDay.date, {
          start: startedDate,
          end: expectedDate,
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
