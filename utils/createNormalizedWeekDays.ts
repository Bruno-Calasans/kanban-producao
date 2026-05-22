import { formatDate } from "./formatDate";

export type NormalizedWeekDay = {
  date: Date;
  key: string;
  time: number;
};

export function normalizeWeekDays(weekDays: Date[]): NormalizedWeekDay[] {
  return weekDays.map((date) => {
    const normalized = new Date(date);

    normalized.setHours(0, 0, 0, 0);

    return {
      date: normalized,
      key: formatDate(normalized),
      time: normalized.getTime(),
    };
  });
}
