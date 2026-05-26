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
  const { movimentation, started_at, expected_at, finished_at, departament } = deadline;

  // Datas
  const startedDate = started_at ? new Date(started_at) : undefined;
  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const finishedDate = finished_at ? new Date(finished_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expectedDate?.setHours(0, 0, 0, 0);
  finishedDate?.setHours(0, 0, 0, 0);
  weekDay.setHours(0, 0, 0, 0);

  // Verificando os departamentos externos
  const movimentationExecutions = processStates.flatMap((state) => state.executions);
  const departamentExternalState = calcDepartamentExternalState({
    movimentation,
    departament,
    movimentationExecutions,
  });

  const avaliableAmount = departamentExternalState?.avaliableAmount || 0;
  const amountDone = departamentExternalState?.returnAmount || 0;
  const totalAmount = departamentExternalState?.externalAmount || 0;

  const hasWork = amountDone > 0;

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();

  const isFinished = !!finishedDate;

  const isDone = amountDone > 0 && amountDone >= totalAmount;

  const isExpectedThisWeekDay = expectedDate && expectedDate.getTime() == weekDay.getTime();

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
