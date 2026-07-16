"use client";

import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import normalizeDate from "@/utils/normalizeDate";

type UseExternalWeeklyDeadlineCardProps = {
  weekDay: Date;
  deadline: ProductionDeadlinePopulated;
  departamentState: DepartamentState;
};

export default function useExternalWeeklyDeadlineCard({
  deadline,
  weekDay,
  departamentState,
}: UseExternalWeeklyDeadlineCardProps) {
  const { planned_end_at, actual_end_at } = deadline;

  // Datas
  const plannedEndDate = normalizeDate(planned_end_at);
  const endDate = normalizeDate(actual_end_at);
  const today = normalizeDate(new Date())!;
  const normalizedWeekDay = normalizeDate(weekDay)!;

  // Quantidade disponível no departamento externo
  const avaliableAmount = departamentState?.avaliableAmount || 0;

  // Quantidade retornada do departamento externo
  const amountDone = departamentState?.returnAmount || 0;

  // Quantidade totaal e inicial no departamento externo
  const totalAmount = departamentState?.externalAmount || 0;

  const hasWork = amountDone > 0;

  // Se o prazo de retorno do departamento externo está expirado
  const isExpired = plannedEndDate && plannedEndDate.getTime() < today.getTime();

  // Se não tem mais nada no departamento externo
  const isFinished = !!endDate && avaliableAmount == 0;

  // Se tudo já retornou
  const isDone = amountDone > 0 && amountDone == totalAmount;

  // Prazo do departamento termina este dia da semana
  const isExpectedThisWeekDay =
    plannedEndDate && plannedEndDate.getTime() == normalizedWeekDay.getTime();

  return {
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
