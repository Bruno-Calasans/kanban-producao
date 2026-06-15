"use client";

import {
  DailyGoalPopulated,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { formatDate } from "@/utils/formatDate";
import { differenceInDays } from "date-fns";

type UseWeeklyDeadlineCardProps = {
  weekDay: Date;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  weekDailyGoals: DailyGoalPopulated[];
};

type DeadlineWorkState = "WAITING_INPUT" | "COMPLETED" | "READY" | "NO_WORK";

export default function useWeeklyDeadlineCard({
  deadline,
  weekDay,
  departamentStates,
  weekDailyGoals,
}: UseWeeklyDeadlineCardProps) {
  const { production, planned_start_at, planned_end_at, actual_end_at, departament } = deadline;

  // Pega a meta deste dia
  const dayGoal = weekDailyGoals.find(
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
  const totalAmount = production.amount;

  // Total feito nesta semana
  const weekTotalAmount = weekDailyGoals.reduce((prev, curr) => prev + curr.amount_done, 0);

  // Quantidade feita neste dia da semana
  const amountDoneInThisDay = dayGoal ? dayGoal.amount_done : 0;

  // Dias para fazer
  const daysAmount =
    plannedStartDate && plannedEndDate ? differenceInDays(plannedEndDate, plannedStartDate) + 1 : 1;
  const totalDays = Math.max(daysAmount - weekDailyGoals.length, 1);

  // Quantidade restante no departamento para fazer
  const departmentStates = departamentStates.filter(
    (state) => state.departament.id === departament.id,
  );

  // Quantidade de peças disponíveis no departamento
  const avaliableAmount = departmentStates.reduce(
    (total, state) => total + state.avaliableAmount,
    0,
  );

  const isFinished = !!endDate && avaliableAmount == 0;

  // Quantidade de peças que deve ser feita neste dia
  const goalAmount = dayGoal
    ? dayGoal.expected_amount
    : Math.ceil((isFinished ? totalAmount : avaliableAmount) / totalDays);

  // Tem peças disponíveis para fazer
  const hasWork = departmentStates.length > 0 && avaliableAmount > 0;

  // Se a meta está expirada
  const isExpired = plannedEndDate && plannedEndDate.getTime() < today.getTime();

  // Meta será completada se fizer igual ou maior a meta definida
  const isDailyGoalDone = goalAmount > 0 && amountDoneInThisDay >= goalAmount;

  // Meta será incompleta se fizer menos que a meta estabelecida
  const isDailyGoalIncomplete =
    hasWork && !!dayGoal && dayGoal.amount_done < dayGoal.expected_amount;

  // Diz se o prazo cai neste dia da semana
  const isExpectedThisWeekDay = plannedEndDate && plannedEndDate.getTime() == weekDay.getTime();
  const isStartedThisWeekDay = plannedStartDate && plannedStartDate.getTime() == weekDay.getTime();

  let workState: DeadlineWorkState = "NO_WORK";

  if (isFinished || isDailyGoalDone) {
    workState = "COMPLETED";
  } else if (hasWork) {
    workState = "READY";
  } else if (!hasWork) {
    workState = "WAITING_INPUT";
  }

  return {
    dayGoal,
    totalAmount,
    amountDoneInThisDay,
    daysAmount,
    avaliableAmount,
    goalAmount,
    isExpired,
    isFinished,
    isDailyGoalDone,
    isDailyGoalIncomplete,
    hasWork,
    weekTotalAmount,
    workState,
    isExpectedThisWeekDay,
    isStartedThisWeekDay,
  };
}
