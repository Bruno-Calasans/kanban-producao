"use client";

import { Departament, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";

export type DepartamentStateStatus = "IN_PROGRESS" | "PENDING" | "COMPLETED" | "EXPIRED";

export type DepartamentState = {
  departament: Departament;
  deadline?: MovimentationDeadlinePopulated;
  processStates: ProcessState[];
  status: DepartamentStateStatus;
  expiredDays: number;
};

export type ProcessStateByDepartament = {
  [key in string]: ProcessState[];
};

type UseDepartamentStateProps = {
  movimentationProcessStates: ProcessState[];
  movimentationDeadlines: MovimentationDeadlinePopulated[];
};

export default function useDepartamentState({
  movimentationProcessStates,
  movimentationDeadlines,
}: UseDepartamentStateProps) {
  const getDepartamentStates = () => {
    const processStateByDepartament: ProcessStateByDepartament = {};
    const departamentStates: DepartamentState[] = [];

    // agrupa departamento com seus estados dos processos
    movimentationProcessStates.forEach((state) => {
      const departament = state.process.departament;

      if (processStateByDepartament[departament.id]) {
        processStateByDepartament[departament.id].push(state);
      } else {
        processStateByDepartament[departament.id] = [state];
      }
    });

    for (const departamentKey of Object.keys(processStateByDepartament)) {
      const departamentProcessStates = processStateByDepartament[departamentKey];
      const currentDepartament = processStateByDepartament[departamentKey][0].process.departament;
      const deadline = movimentationDeadlines.find(
        (deadline) => deadline.departament.id === currentDepartament.id,
      );

      const { status, expiredDays } = getDepartamentStatus(departamentProcessStates, deadline);

      departamentStates.push({
        departament: currentDepartament,
        processStates: processStateByDepartament[departamentKey],
        deadline,
        status,
        expiredDays,
      });
    }

    return departamentStates;
  };

  const getDepartamentStatus = (
    processStates: ProcessState[],
    deadline?: MovimentationDeadlinePopulated,
  ): { status: DepartamentStateStatus; expiredDays: number } => {
    const pendingStates = processStates.map((state) => state.status == "PENDING");
    const inProgressStates = processStates.map((state) => state.status == "IN_PROGRESS");

    const isPending = pendingStates.length > 0 && inProgressStates.length == 0;
    const InProgress = inProgressStates.length > 0;
    let isExpired = false;

    if (deadline && deadline.expected_at) {
      const expectedDate = new Date(deadline.expected_at);
      const currentDate = new Date();
      expectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      const diffInMs = expectedDate.getTime() - currentDate.getTime();
      isExpired = diffInMs < 0;
      const expiredDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (isExpired) return { status: "EXPIRED", expiredDays: Math.abs(expiredDays) };
    }

    if (isPending) return { status: "PENDING", expiredDays: 0 };
    if (InProgress) return { status: "IN_PROGRESS", expiredDays: 0 };
    return { status: "COMPLETED", expiredDays: 0 };
  };

  const departamentStates = getDepartamentStates();

  return { departamentStates };
}
