import { getAllGoalsInRangeByDeadlines } from "@/service/api/metaApi";
import { DailyGoalPopulated } from "@/types/database.type";

export async function groupAllGoalsInRangeByDeadline(from: Date, to: Date, deadlineIds: number[]) {
  const metasByDeadlineInRange = new Map<number, DailyGoalPopulated[]>();

  const { data: metas } = await getAllGoalsInRangeByDeadlines(from, to, deadlineIds);

  for (const meta of metas) {
    const key = meta.deadline.id;
    const curr = metasByDeadlineInRange.get(meta.deadline.id) || [];
    curr.push(meta);
    metasByDeadlineInRange.set(key, curr);
  }

  return metasByDeadlineInRange;
}
