"use client";

import { useMemo } from "react";
import { DepartamentState, ProductionPopulated } from "@/types/database.type";
import { calcDepartamentStates } from "@/utils/calcDepartamentStates";
import { useGetAllProductionMovimentationsTemplates } from "../movimentation-execution-template/useGetAllProductionMovimentationsTemplates";

type UseGetAllProductionDepartamentStates = {
  productions: ProductionPopulated[];
};

export default function useGetAllProductionDepartamentStates({
  productions,
}: UseGetAllProductionDepartamentStates) {
  const { data, isError, isLoading } = useGetAllProductionMovimentationsTemplates(productions);

  const departamentStatesByProduction = useMemo(() => {
    // Agrupa os estados dos departamentos por movimentação
    const groups = new Map<number, DepartamentState[]>();

    if (!data || isError || isLoading || productions.length === 0) return groups;

    for (const [movimentationId, movimentationExecutionTemplate] of data) {
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
    departamentStatesByProduction,
    isLoading,
    isError,
  };
}
