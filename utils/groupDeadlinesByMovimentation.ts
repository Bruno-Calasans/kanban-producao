import { MovimentationDeadlinePopulated } from "@/types/database.type";

export function groupDeadlinesByMovimentation(deadlines: MovimentationDeadlinePopulated[]) {
  const deadlinesByMovimentation = new Map<number, MovimentationDeadlinePopulated[]>();

  for (const deadline of deadlines) {
    const { movimentation } = deadline;
    const movimentationId = movimentation.id;

    const currentGroup = deadlinesByMovimentation.get(movimentationId) || [];

    currentGroup.push(deadline);

    deadlinesByMovimentation.set(movimentationId, currentGroup);
  }

  return deadlinesByMovimentation;
}
