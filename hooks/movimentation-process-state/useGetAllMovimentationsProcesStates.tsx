"use client";

import { useMemo } from "react";
import useGetAllMovimentationExecutionsTemplates from "../movimentation-execution-template/useGetAllMovimentationExecutionsTemplates";
import { MovimentationPopulated, ProcessState } from "@/types/database.type";
import { calcProcessStates } from "@/utils/calcProcessStates";

type UseGetAllMovimentationsProcesStatesProps = {
  movimentations: MovimentationPopulated[];
};

export default function useGetAllMovimentationsProcesStates({
  movimentations,
}: UseGetAllMovimentationsProcesStatesProps) {
  const { data, isPending, isError, error } =
    useGetAllMovimentationExecutionsTemplates(movimentations);

  const processStatesByMovimentation = useMemo(() => {
    const processStatesByMovimentation = new Map<number, ProcessState[]>();

    if (!data || isPending || isError) return processStatesByMovimentation;

    for (const [movimentationId, movimentationExecutionTemplate] of data) {
      const { movimentation, executions, templates } = movimentationExecutionTemplate;

      const processStates = calcProcessStates({
        movimentation,
        flowTemplates: templates,
        processExecutions: executions,
      });

      processStatesByMovimentation.set(movimentationId, processStates);
    }

    return processStatesByMovimentation;
  }, [data]);

  return {
    processStatesByMovimentation,
    isPending,
    isError,
  };
}
