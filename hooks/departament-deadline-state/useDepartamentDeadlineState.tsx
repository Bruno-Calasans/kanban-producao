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
  productionDepartamentStates: DepartamentState[];
};

export default function useDepartamentDeadlineState({
  production,
  productionDeadlines,
  productionDepartamentStates,
}: UseDepartamenteDeadlineStateProps) {
  const departamentDeadlineStates = useMemo(() => {
    return calcDepartamentDeadlineState({
      production,
      productionDeadlines,
      productionDepartamentStates,
    });
  }, [production, productionDeadlines, productionDepartamentStates]);

  return {
    departamentDeadlineStates,
  };
}
