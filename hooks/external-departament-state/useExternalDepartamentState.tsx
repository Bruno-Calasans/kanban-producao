"use client";

import { MovimentationPopulated, ProductionPopulated } from "@/types/database.type";
import { calcExternalDepartamentState } from "@/utils/calcExternalDepartamentState";
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
    () => calcExternalDepartamentState({ production, movimentations }),
    [production, movimentations],
  );

  return {
    externalDepartamentStates,
    movimentations,
  };
}
