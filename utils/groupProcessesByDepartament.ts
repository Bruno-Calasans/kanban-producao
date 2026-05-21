import { ProcessWithDepartament } from "@/types/database.type";

export type ProcessByDepartament = {
  [key in string]: ProcessWithDepartament[];
};

export function groupProcessesByDepartament(processes: ProcessWithDepartament[]) {
  const groups: ProcessByDepartament = {};

  for (const process of processes) {
    const foundGroup = groups[process.departament.name];

    if (foundGroup) {
      foundGroup.push(process);
    } else {
      groups[process.departament.name] = [process];
    }
  }

  return groups;
}
