import { MovimentationDeadlinePopulated } from "@/types/database.type";

export function getDeadlinePriority(deadline: MovimentationDeadlinePopulated) {
  const expectedDate = deadline.expected_at ? new Date(deadline.expected_at) : null;

  const isFinished = !!deadline.finished_at;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (expectedDate && !isFinished) {
    expectedDate.setHours(0, 0, 0, 0);

    if (expectedDate < today) {
      return 0; // atrasado
    }
  }

  if (!isFinished) {
    return 1; // pendente
  }

  return 2; // feito
}
