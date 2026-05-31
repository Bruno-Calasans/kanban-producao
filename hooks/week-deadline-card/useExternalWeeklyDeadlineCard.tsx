"use client";

import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { calcDepartamentExternalState } from "@/utils/calcDepartamentExternalState";

type UseExternalWeeklyDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  weekDay: Date;
  processStates: ProcessState[];
};

export default function useExternalWeeklyDeadlineCard({
  deadline,
  weekDay,
  processStates,
}: UseExternalWeeklyDeadlineCardProps) {
  const { movimentation, planned_start_at, planned_end_at, actual_end_at, departament } = deadline;

  // Datas
  const startDate = planned_start_at ? new Date(planned_start_at) : undefined;
  const plannedEndDate = planned_end_at ? new Date(planned_end_at) : undefined;
  const endDate = actual_end_at ? new Date(actual_end_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  plannedEndDate?.setHours(0, 0, 0, 0);
  endDate?.setHours(0, 0, 0, 0);
  weekDay.setHours(0, 0, 0, 0);

  // Verificando os departamentos externos
  const movimentationExecutions = processStates.flatMap((state) => state.executions);
  const departamentExternalState = calcDepartamentExternalState({
    departament,
    movimentation,
    movimentationExecutions,
  });

  // Quantidade disponível no departamento externo
  const avaliableAmount = departamentExternalState?.avaliableAmount || 0;

  // Quantidade retornada do departamento externo
  const amountDone = departamentExternalState?.returnAmount || 0;

  // Quantidade totaal e inicial no departamento externo
  const totalAmount = departamentExternalState?.externalAmount || 0;

  const hasWork = amountDone > 0;

  // Se o prazo de retorno do departamento externo está expirado
  const isExpired = plannedEndDate && plannedEndDate.getTime() < today.getTime();

  // Se não tem mais nada no departamento externo
  const isFinished = !!endDate && avaliableAmount == 0;

  // Se tudo já retornou
  const isDone = amountDone > 0 && amountDone == totalAmount;

  // Prazo do departamento termina este dia da semana
  const isExpectedThisWeekDay = plannedEndDate && plannedEndDate.getTime() == weekDay.getTime();

  return {
    departamentExternalState,
    isExpectedThisWeekDay,
    avaliableAmount,
    totalAmount,
    amountDone,
    isExpired,
    isFinished,
    isDone,
    hasWork,
  };
}
