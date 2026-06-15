import { ProductionDeadlinePopulated } from "@/types/database.type";

export function groupDeadlinesByDepartament(deadlines: ProductionDeadlinePopulated[]) {
  const deadlinesByDepartament = new Map<number, ProductionDeadlinePopulated[]>();

  for (const deadline of deadlines) {
    const { departament } = deadline;
    const departamentId = departament.id;

    const currentGroup = deadlinesByDepartament.get(departamentId) || [];

    currentGroup.push(deadline);

    deadlinesByDepartament.set(departamentId, currentGroup);
  }

  return deadlinesByDepartament;
}
