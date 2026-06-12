"use client";

import { useMemo } from "react";
import {
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import calcDepartamentDeadlineState from "@/utils/calcDepartamentDeadlineState";

type UseDepartamenteDeadlineStateProps = {
  production: ProductionPopulated;
  productionDeadlines: ProductionDeadlinePopulated[];
  departamentStates: DepartamentState[];
};

export default function useDepartamentDeadlineState({
  production,
  productionDeadlines,
  departamentStates,
}: UseDepartamenteDeadlineStateProps) {
  const departamentDeadlineStates = useMemo(() => {
    return calcDepartamentDeadlineState({
      movimentation,
      productionDeadlines,
      movimentationProcessStates,
    });
  }, [production, productionDeadlines, departamentStates]);

  return {
    departamentDeadlineStates,
  };
}
