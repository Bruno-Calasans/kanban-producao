"use client";

import { MovimentationPopulated, ProductionPopulated } from "@/types/database.type";
import { calcExternalProcessStates } from "@/utils/calcExternalProcessState";
import { useMemo } from "react";

type UseExternalDepartamentState = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
};

export default function useExternalDepartamentState({
  production,
  movimentations,
}: UseExternalDepartamentState) {
  const externalDepartamentStates = useMemo(
    () => calcExternalProcessStates({ production, movimentations }),
    [production, movimentations],
  );

  return {
    externalDepartamentStates,
    movimentations,
  };
}
