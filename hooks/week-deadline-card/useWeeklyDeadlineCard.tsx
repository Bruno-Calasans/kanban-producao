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
  const { movimentation, started_at, expected_at, finished_at, departament } = deadline;

  const metaInThisDay = metasInThisWeek.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  const startedDate = started_at ? new Date(started_at) : undefined;
  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const finishedDate = finished_at ? new Date(finished_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expectedDate?.setHours(0, 0, 0, 0);
  finishedDate?.setHours(0, 0, 0, 0);
  weekDay.setHours(0, 0, 0, 0);

  // Quantidade de dias para fazer a meta
  const totalAmount = movimentation.amount;
  const daysAmount = startedDate && expectedDate ? differenceInDays(expectedDate, today) + 1 : 1;
  const amountDoneInThisDay = metaInThisDay ? metaInThisDay.amount_done : 0;
  const totalDays = Math.max(daysAmount - metasInThisWeek.length, 1);

  // Quantidade restante no departamento para fazer
  const departmentStates = processStates.filter(
    (state) => state.process.departament.id === departament.id,
  );

  const avaliableAmount = departmentStates.reduce(
    (total, state) => total + state.avaliableAmount,
    0,
  );

  const hasReceivedWork = departmentStates.some((state) => state.inputAmount > 0);

  // Dias para fazer a meta do departamento interno
  const metaAmount = metaInThisDay
    ? metaInThisDay.expected_amount
    : Math.ceil(avaliableAmount / totalDays);

  const hasInternalWork = avaliableAmount > 0;
  const hasWork = hasInternalWork;

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();

  const isFinished = !!finishedDate;

  const isMetaDone = hasInternalWork && metaAmount > 0 && amountDoneInThisDay >= metaAmount;

  const isMetaIncomplete =
    hasWork && !!metaInThisDay && metaInThisDay.amount_done < metaInThisDay.expected_amount;

  const isExpectedThisWeekDay = expectedDate && expectedDate.getTime() == weekDay.getTime();

  let workState: DeadlineWorkState;
  if (isFinished) {
    workState = "COMPLETED";
  } else if (avaliableAmount > 0) {
    workState = "READY";
  } else if (!hasReceivedWork) {
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
    isExpectedThisWeekDay,
    hasInternalWork,
    hasWork,
  };
}
