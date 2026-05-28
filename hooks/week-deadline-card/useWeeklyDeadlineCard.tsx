"use client";

import { MetaPopulated, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { formatDate } from "@/utils/formatDate";
import { differenceInDays } from "date-fns";

type UseWeeklyDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  weekDay: Date;
  processStates: ProcessState[];
  metasInThisWeek: MetaPopulated[];
};

type DeadlineWorkState = "WAITING_INPUT" | "COMPLETED" | "READY" | "NO_WORK";

export default function useWeeklyDeadlineCard({
  deadline,
  weekDay,
  processStates,
  metasInThisWeek,
}: UseWeeklyDeadlineCardProps) {
  const { movimentation, planned_start_at, planned_end_at, actual_end_at, departament } = deadline;

  // Pega a meta deste dia
  const metaInThisDay = metasInThisWeek.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  const plannedStartDate = planned_start_at ? new Date(planned_start_at) : undefined;
  const plannedEndDate = planned_end_at ? new Date(planned_end_at) : undefined;
  const endDate = actual_end_at ? new Date(actual_end_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  plannedEndDate?.setHours(0, 0, 0, 0);
  endDate?.setHours(0, 0, 0, 0);
  weekDay.setHours(0, 0, 0, 0);

  // Quantidade total que tem que fazer
  const totalAmount = movimentation.amount;

  // Total feito nesta semana
  const weekTotalAmount = metasInThisWeek.reduce((prev, curr) => prev + curr.amount_done, 0);

  // Quantidade feita neste dia da semana
  const amountDoneInThisDay = metaInThisDay ? metaInThisDay.amount_done : 0;

  // Dias para fazer
  const daysAmount =
    plannedStartDate && plannedEndDate ? differenceInDays(plannedEndDate, plannedStartDate) + 1 : 1;
  const totalDays = Math.max(daysAmount - metasInThisWeek.length, 1);

  // Quantidade restante no departamento para fazer
  const departmentStates = processStates.filter(
    (state) => state.process.departament.id === departament.id,
  );

  // Quantidade de peças disponíveis no departamento
  const avaliableAmount = departmentStates.reduce(
    (total, state) => total + state.avaliableAmount,
    0,
  );

  const isFinished = !!endDate && avaliableAmount == 0;

  // Quantidade de peças que deve ser feita neste dia
  const metaAmount = metaInThisDay
    ? metaInThisDay.expected_amount
    : Math.ceil((isFinished ? totalAmount : avaliableAmount) / totalDays);

  // Tem peças disponíveis para fazer
  const hasWork = departmentStates.length > 0 && avaliableAmount > 0;

  // Se a meta está expirada
  const isExpired = plannedEndDate && plannedEndDate.getTime() < today.getTime();

  // Meta será completada se fizer igual ou maior a meta definida
  const isMetaDone = metaAmount > 0 && amountDoneInThisDay >= metaAmount;

  // Meta será incompleta se fizer menos que a meta estabelecida
  const isMetaIncomplete =
    hasWork && !!metaInThisDay && metaInThisDay.amount_done < metaInThisDay.expected_amount;

  // Diz se o prazo cai neste dia da semana
  const isExpectedThisWeekDay = plannedEndDate && plannedEndDate.getTime() == weekDay.getTime();
  const isStartedThisWeekDay = plannedStartDate && plannedStartDate.getTime() == weekDay.getTime();

  let workState: DeadlineWorkState = "NO_WORK";

  if (isFinished || isMetaDone) {
    workState = "COMPLETED";
  } else if (hasWork) {
    workState = "READY";
  } else if (!hasWork) {
    workState = "WAITING_INPUT";
  }

  return {
    metaInThisDay,
    totalAmount,
    amountDoneInThisDay,
    daysAmount,
    avaliableAmount,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    hasWork,
    weekTotalAmount,
    workState,
    isExpectedThisWeekDay,
    isStartedThisWeekDay,
  };
}
