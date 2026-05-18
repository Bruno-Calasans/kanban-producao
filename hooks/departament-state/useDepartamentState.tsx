"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

export type DepartamenStatus = "IN_PROGRESS" | "PENDING" | "COMPLETED" | "EXPIRED";

export type DepartamentState = {
  movimentation: MovimentationPopulated;
  departament: Departament;
  deadline?: MovimentationDeadlinePopulated;
  processStates: ProcessState[];
  status: DepartamenStatus;
  expiredDays: number;
  movimentationProcessStates: ProcessState[];
};

export type ProcessStateByDepartament = {
  [key in string]: ProcessState[];
};

type UseDepartamentStateProps = {
  movimentation: MovimentationPopulated;
  movimentationProcessStates: ProcessState[];
  movimentationDeadlines: MovimentationDeadlinePopulated[];
};

export default function useDepartamentState({
  movimentation,
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
        movimentation,
        departament: currentDepartament,
        processStates: processStateByDepartament[departamentKey],
        deadline,
        status,
        expiredDays,
        movimentationProcessStates,
      });
    }

    return departamentStates;
  };

  const getDepartamentStatus = (
    processStates: ProcessState[],
    deadline?: MovimentationDeadlinePopulated,
  ): { status: DepartamenStatus; expiredDays: number } => {
    let dptStatus: { status: DepartamenStatus; expiredDays: number } = {
      expiredDays: 0,
      status: "COMPLETED",
    };

    const pendingStates = processStates.filter((state) => state.status === "PENDING");
    const progressStates = processStates.filter((state) => state.status === "IN_PROGRESS");

    if (pendingStates.length > 0 && progressStates.length == 0) dptStatus.status = "PENDING";
    if (progressStates.length > 0) dptStatus.status = "IN_PROGRESS";

    // Tem prazo
    if (deadline && deadline.expected_at && !deadline.finished_at) {
      const expectedDate = new Date(deadline.expected_at);
      const currentDate = new Date();
      expectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      const diffInDays = differenceInDays(expectedDate, currentDate);
      const isExpired = diffInDays < 0;

      if (isExpired) dptStatus = { status: "EXPIRED", expiredDays: Math.abs(diffInDays) };
    }

    return dptStatus;
  };

  const departamentStates = useMemo(
    () => getDepartamentStates(),
    [movimentation, movimentationProcessStates, movimentationDeadlines],
  );

  return { departamentStates };
}
