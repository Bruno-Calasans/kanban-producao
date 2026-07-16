"use client";

import { useMemo } from "react";
import { DepartamentState, ProductionPopulated } from "@/types/database.type";
import { calcDepartamentStates } from "@/utils/calcDepartamentStates";
import { useGetAllProductionMovimentationsTemplates } from "../production-movimentation-template/useGetAllProductionMovimentationsTemplates";

type UseGetAllProductionDepartamentStates = {
  productions: ProductionPopulated[];
};

export default function useGetAllProductionDepartamentStates({
  productions,
}: UseGetAllProductionDepartamentStates) {
  const { data, error, isPending, isLoading } =
    useGetAllProductionMovimentationsTemplates(productions);

  const dataByProduction = data?.dataByProduction;
  const movimentationsByProduction = data?.movimentationsByProduction;
  const templatesByProductionFlow = data?.templatesByProductionFlow;

  // Agrupa os estados dos departamentos por produção
  const departamentStatesByProduction = useMemo(() => {
    const groups = new Map<number, DepartamentState[]>();

    if (!dataByProduction || error || isLoading || productions.length === 0) return groups;

    for (const [movimentationId, movimentationExecutionTemplate] of dataByProduction) {
      const { production, movimentations, templates } = movimentationExecutionTemplate;

      const departamentStates = calcDepartamentStates({
        production,
        movimentations,
        flowTemplates: templates,
      });

      groups.set(movimentationId, departamentStates);
    }

    return groups;
  }, [productions, data, isLoading]);

  return {
    movimentationsByProduction,
    templatesByProductionFlow,
    departamentStatesByProduction,
    isPending,
    isLoading,
    error,
  };
}
