import { eachDayOfInterval, isSunday } from "date-fns";

export default function daysDiffExceptSunday(startDate: Date, endDate: Date) {
  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).filter((date) => !isSunday(date)).length;
}
