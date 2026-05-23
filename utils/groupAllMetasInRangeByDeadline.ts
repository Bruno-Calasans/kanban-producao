import { getAllMetasInRangeByDeadlines } from "@/service/api/metaApi";
import { MetaPopulated } from "@/types/database.type";

export default async function groupAllMetasInRangeByDeadline(
  from: Date,
  to: Date,
  deadlineIds: number[],
) {
  const metasByDeadlineInRange = new Map<number, MetaPopulated[]>();

  const { data: metas } = await getAllMetasInRangeByDeadlines(from, to, deadlineIds);

  for (const meta of metas) {
    const key = meta.deadline.id;
    const curr = metasByDeadlineInRange.get(meta.deadline.id) || [];
    curr.push(meta);
    metasByDeadlineInRange.set(key, curr);
  }

  return metasByDeadlineInRange;
}
