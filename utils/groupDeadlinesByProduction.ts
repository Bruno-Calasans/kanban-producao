import { ProductionDeadlinePopulated } from "@/types/database.type";

export function groupDeadlinesByProduction(deadlines: ProductionDeadlinePopulated[]) {
  const deadlinesByMovimentation = new Map<number, ProductionDeadlinePopulated[]>();

  for (const deadline of deadlines) {
    const { production } = deadline;
    const movimentationId = production.id;

    const currentGroup = deadlinesByMovimentation.get(movimentationId) || [];
    currentGroup.push(deadline);
    deadlinesByMovimentation.set(movimentationId, currentGroup);
  }

  return deadlinesByMovimentation;
}
