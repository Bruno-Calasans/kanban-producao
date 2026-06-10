"use client";

import { useMemo } from "react";
import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import calcDepartamentState from "@/utils/calcDepartamentState";

type UseDepartamentStateProps = {
  movimentation: MovimentationPopulated;
  movimentationDeadlines: MovimentationDeadlinePopulated[];
  movimentationProcessStates: ProcessState[];
};

export default function useDepartamentState({
  movimentation,
  movimentationDeadlines,
  movimentationProcessStates,
}: UseDepartamentStateProps) {
  const departamentStates = useMemo(() => {
    return calcDepartamentState({
      movimentation,
      movimentationDeadlines,
      movimentationProcessStates,
    });
  }, [movimentation, movimentationDeadlines, movimentationProcessStates]);

  return {
    departamentStates,
  };
}
