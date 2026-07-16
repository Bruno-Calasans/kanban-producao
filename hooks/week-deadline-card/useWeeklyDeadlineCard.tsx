"use client";

import {
  DailyGoalPopulated,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { formatDate } from "@/utils/formatDate";
import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import daysDiffExceptSunday from "@/utils/daysDiffExceptSunday";
import normalizeDate from "@/utils/normalizeDate";

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
  const dailyGoal = weekDailyGoals.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  const plannedStartDate = normalizeDate(planned_start_at);
  const plannedEndDate = normalizeDate(planned_end_at);
  const endDate = normalizeDate(actual_end_at);
  const today = normalizeDate(new Date())!;
  const normalizedWeekDay = normalizeDate(weekDay)!;

  // Quantidade total que tem que fazer
  const totalAmount = production.amount;

  // Total de metas feitas nesta semana
  const weekTotalAmount = weekDailyGoals.reduce((prev, curr) => prev + curr.amount_done, 0);

  // Quantidade feita neste dia da semana
  const amountDoneInThisDay = dailyGoal ? dailyGoal.amount_done : 0;

  // Dias para fazer (SEM CONSIDERAR DOMINGO)
  const daysAmount =
    plannedStartDate && plannedEndDate ? daysDiffExceptSunday(plannedStartDate, plannedEndDate) : 1;

  // metas feitas no intervalo do prazo
  const intervalDoneGoals =
    (plannedStartDate &&
      plannedEndDate &&
      weekDailyGoals.filter((goal) => {
        const refDate = startOfDay(parseISO(goal.ref_date));

        return isWithinInterval(refDate, {
          start: startOfDay(plannedStartDate),
          end: startOfDay(plannedEndDate),
        });
      }).length) ||
    0;

  // Dias para fazer sem as metas já feitas
  const totalDays = Math.max(daysAmount - intervalDoneGoals, 1);

  // Quantidade restante no departamento para fazer
  const departmentStates = departamentStates.filter(
    (state) => state.departament.id === departament.id,
  );

  // Quantidade de peças disponíveis no departamento
  const avaliableAmount = departmentStates.reduce(
    (total, state) => total + state.avaliableAmount,
    0,
  );

  // Diz se o card está completo ou não
  const isFinished = !!endDate && avaliableAmount == 0;

  // Quantidade de peças que deve ser feita neste dia
  const goalAmount = dailyGoal
    ? dailyGoal.expected_amount
    : Math.ceil((isFinished ? totalAmount : avaliableAmount) / totalDays);

  // Tem peças disponíveis para fazer
  const hasWork = departmentStates.length > 0 && avaliableAmount > 0;

  // Se a meta está expirada
  const isExpired = plannedEndDate && plannedEndDate.getTime() < today.getTime();

  // Meta será completada se fizer igual ou maior a meta definida
  const isDailyGoalDone = goalAmount > 0 && amountDoneInThisDay >= goalAmount;

  // Meta será incompleta se fizer menos que a meta estabelecida
  const isDailyGoalIncomplete =
    hasWork && !!dailyGoal && dailyGoal.amount_done < dailyGoal.expected_amount;

  // Diz se o prazo cai neste dia da semana
  const isExpectedThisWeekDay =
    plannedEndDate && plannedEndDate.getTime() == normalizedWeekDay.getTime();

  const isStartedThisWeekDay =
    plannedStartDate && plannedStartDate.getTime() == normalizedWeekDay.getTime();

  let workState: DeadlineWorkState = "NO_WORK";

  if (isFinished || isDailyGoalDone) {
    workState = "COMPLETED";
  } else if (hasWork) {
    workState = "READY";
  } else if (!hasWork) {
    workState = "WAITING_INPUT";
  }

  return {
    hasWork,
    dailyGoal,
    isExpired,
    workState,
    daysAmount,
    goalAmount,
    isFinished,
    totalAmount,
    avaliableAmount,
    isDailyGoalDone,
    weekTotalAmount,
    amountDoneInThisDay,
    isStartedThisWeekDay,
    isExpectedThisWeekDay,
    isDailyGoalIncomplete,
  };
}
