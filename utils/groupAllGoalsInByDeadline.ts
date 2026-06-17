import { getAllGoalsByDeadlines } from "@/service/api/dailyGoal";
import { DailyGoalPopulated } from "@/types/database.type";

export async function groupAllGoalsByDeadline(deadlineIds: number[]) {
  const goalsByDeadline = new Map<number, DailyGoalPopulated[]>();

  const { data: metas } = await getAllGoalsByDeadlines(deadlineIds);

  for (const meta of metas) {
    const key = meta.deadline.id;
    const curr = goalsByDeadline.get(meta.deadline.id) || [];
    curr.push(meta);
    goalsByDeadline.set(key, curr);
  }

  return goalsByDeadline;
}
