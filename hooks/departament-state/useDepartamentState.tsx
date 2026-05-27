"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";

import { useMemo } from "react";
import { differenceInDays, startOfDay } from "date-fns";

export type DepartamenStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "EXPIRED";

export type DepartamentState = {
  movimentation: MovimentationPopulated;
  departament: Departament;
  deadline?: MovimentationDeadlinePopulated;
  processStates: ProcessState[];
  movimentationProcessStates: ProcessState[];
  status: DepartamenStatus;
  expiredDays: number;
};

type UseDepartamentStateProps = {
  movimentation: MovimentationPopulated;
  movimentationDeadlines: MovimentationDeadlinePopulated[];
  movimentationProcessStates: ProcessState[];
};

export function calculateDepartamentStatus(
  processStates: ProcessState[],
  deadline?: MovimentationDeadlinePopulated,
): {
  status: DepartamenStatus;
  expiredDays: number;
} {
  let hasPending = false;
  let hasInProgress = false;

  for (const state of processStates) {
    if (state.status === "IN_PROGRESS") {
      hasInProgress = true;
    }

    if (state.status === "PENDING") {
      hasPending = true;
    }
  }

  let status: DepartamenStatus = "COMPLETED";

  if (hasInProgress) {
    status = "IN_PROGRESS";
  } else if (hasPending) {
    status = "PENDING";
  }

  // verifica atraso
  if (deadline?.expected_at && !deadline.finished_at) {
    const today = startOfDay(new Date());
    const expectedDate = startOfDay(new Date(deadline.expected_at));

    const diff = differenceInDays(expectedDate, today);

    if (diff < 0) {
      return {
        status: "EXPIRED",
        expiredDays: Math.abs(diff),
      };
    }
  }

  return {
    status,
    expiredDays: 0,
  };
}

export default function useDepartamentState({
  movimentation,
  movimentationDeadlines,
  movimentationProcessStates,
}: UseDepartamentStateProps) {
  const departamentStates = useMemo(() => {
    const processStatesByDepartament = new Map<number, ProcessState[]>();

    const deadlinesByDepartament = new Map<number, MovimentationDeadlinePopulated>();

    // deadlines map
    for (const deadline of movimentationDeadlines) {
      deadlinesByDepartament.set(deadline.departament.id, deadline);
    }

    // agrupa process states
    for (const state of movimentationProcessStates) {
      const departamentId = state.process.departament.id;

      const current = processStatesByDepartament.get(departamentId) || [];

      current.push(state);

      processStatesByDepartament.set(departamentId, current);
    }

    const states: DepartamentState[] = [];

    // cria estados finais
    for (const [departamentId, processStates] of processStatesByDepartament) {
      const departament = processStates[0].process.departament;

      const deadline = deadlinesByDepartament.get(departamentId);

      const { status, expiredDays } = calculateDepartamentStatus(processStates, deadline);

      states.push({
        movimentation,
        departament,
        processStates,
        movimentationProcessStates,
        deadline,
        status,
        expiredDays,
      });
    }

    return states;
  }, [movimentation, movimentationDeadlines, movimentationProcessStates]);

  return {
    departamentStates,
  };
}
