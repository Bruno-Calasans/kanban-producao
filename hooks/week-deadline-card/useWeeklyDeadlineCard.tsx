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

export default function useWeeklyDeadlineCard({
  deadline,
  weekDay,
  processStates,
  metasInThisWeek,
}: UseWeeklyDeadlineCardProps) {
  const { movimentation, started_at, expected_at, finished_at } = deadline;
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

  // Dias entre a data que começou e prazo
  const daysAmount =
    startedDate && expectedDate ? differenceInDays(expectedDate, startedDate) + 1 : 1;

  // Quantidade que deve ser feita
  const totalAmount = movimentation.amount;
  const amountDoneInThisDay = metaInThisDay ? metaInThisDay.amount_done : 0;

  // Quantidade restante no departamento para fazer
  const departmentStates = processStates.filter(
    (state) => state.process.departament.id === deadline.departament.id,
  );

  const internalRemainingAmount = departmentStates.reduce(
    (total, state) => total + state.avaliableAmount,
    0,
  );

  const externalRemainingAmount = departmentStates.reduce(
    (total, state) => total + state.externalAmount,
    0,
  );

  console.log("internalRemainingAmount", internalRemainingAmount);
  console.log("externalRemainingAmount", externalRemainingAmount);
  console.log("extternal executions", departmentStates.map((state) => state.outputExecutions.filter((exe) => exe.type === "EXTERNAL")).flat());

  const totalRemainingAmount = internalRemainingAmount + externalRemainingAmount;

  // Dias para fazer a meta
  const totalDays = Math.max(daysAmount - metasInThisWeek.length, 1);

  const metaAmount = metaInThisDay
    ? metaInThisDay.expected_amount
    : Math.ceil(internalRemainingAmount / totalDays);

  const hasInternalWork = internalRemainingAmount > 0;
  const hasExternalWork = externalRemainingAmount > 0;
  const hasWork = hasInternalWork && hasExternalWork;

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();

  const isFinished = !!finishedDate;

  const isMetaDone = hasInternalWork && metaAmount > 0 && amountDoneInThisDay >= metaAmount;

  const isMetaIncomplete =
    hasWork && !!metaInThisDay && metaInThisDay.amount_done < metaInThisDay.expected_amount;

  const isExpectedThisWeekDay = expectedDate && expectedDate.getTime() == weekDay.getTime();

  return {
    metaInThisDay,
    totalAmount,
    amountDoneInThisDay,
    daysAmount,
    internalRemainingAmount,
    externalRemainingAmount,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    isExpectedThisWeekDay,
    hasInternalWork,
    hasExternalWork,
    hasWork,
  };
}
