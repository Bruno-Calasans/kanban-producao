import { ProductionDeadlinePopulated } from "@/types/database.type";
import { endOfMonth } from "date-fns";
import { GroupDeadlinesByDate, groupDeadlinesByDate } from "./groupDeadlinesByDate";

type GroupDeadlinesByMonthProps = {
  deadlines: ProductionDeadlinePopulated[];
  month: Date;
};

export function groupDeadlinesByMonth({ deadlines, month }: GroupDeadlinesByMonthProps) {
  const startDay = 1;
  const endDay = endOfMonth(month).getDate();
  const deadlinesByMonth = new Map<number, GroupDeadlinesByDate>();

  for (let day = startDay; day < endDay; day++) {
    month.setDate(day);
    const deadlinesByDate = groupDeadlinesByDate({ date: month, deadlines });
    deadlinesByMonth.set(day, deadlinesByDate);
  }

  return deadlinesByMonth;
}
