"use client";

import { MovimentationDeadlinePopulated } from "@/types/database.type";
import useGetAllMetasInRange from "../meta/useGetAllMetasInRange";
import useProcessState from "../process-state/useProcessState";
import { formatDate } from "@/utils/formatDate";
import { differenceInDays } from "date-fns";

type UseWeeklyDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  weekDays: Date[];
  weekDay: Date;
};

export default function useWeeklyDeadlineCard({
  deadline,
  weekDays,
  weekDay,
}: UseWeeklyDeadlineCardProps) {
  const { movimentation, started_at, expected_at, finished_at } = deadline;
  const {
    processStates,
    isPending: isProcessStatesPending,
    isError: processStateError,
  } = useProcessState({ movimentation });

  const firstDayOfWeek = weekDays[0];
  const lastDayOfWeek = weekDays[weekDays.length - 1];
  const {
    data,
    isPending: isMetasPending,
    error: metaError,
  } = useGetAllMetasInRange(firstDayOfWeek, lastDayOfWeek, deadline.id);
  const metasInThisWeek = data?.data || [];

  const metaInThisDay = metasInThisWeek.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  // Dias entre a data que começou e terminou
  const daysAmount = started_at && expected_at ? differenceInDays(expected_at, started_at) + 1 : 0;

  // Quantidade que deve ser feita
  const totalAmount = movimentation.amount;
  const amountDoneInThisDay = metaInThisDay ? metaInThisDay.amount_done : 0;

  // Quantidade restante no departamento para fazer
  const departamentAvaliableAmount = processStates
    .filter((state) => state.process.departament.id == deadline.departament.id)
    .map((state) => state.avaliableAmount)
    .reduce((prev, curr) => prev + curr, 0);

  // Meta diária
  const metaAmount =
    metaInThisDay && metaInThisDay.expected_amount
      ? metaInThisDay.expected_amount
      : Number.parseInt(String(departamentAvaliableAmount / (daysAmount - metasInThisWeek.length)));

  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const finishedDate = finished_at ? new Date(finished_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expectedDate?.setHours(0, 0, 0, 0);
  finishedDate?.setHours(0, 0, 0, 0);

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();
  const isFinished = !!finishedDate;
  const isMetaDone = amountDoneInThisDay >= metaAmount;
  const isMetaIncomplete =
    !isFinished &&
    !isExpired &&
    metaInThisDay &&
    metaInThisDay.amount_done < metaInThisDay.expected_amount;

  const isPending = isProcessStatesPending || isMetasPending;
  const isError = processStateError || metaError;

  return {
    processStates,
    metasInThisWeek,
    metaInThisDay,
    totalAmount,
    amountDoneInThisDay,
    daysAmount,
    departamentAvaliableAmount,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    isPending,
    isError,
  };
}
