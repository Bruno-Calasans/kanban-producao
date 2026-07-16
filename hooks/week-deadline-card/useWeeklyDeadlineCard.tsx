"use client";

import {
  DailyGoalPopulated,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { formatDate } from "@/utils/formatDate";
import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import daysDiffExceptSunday from "@/utils/daysDiffExceptSunday";
import normalizeDate from "@/utils/normalizeDate";

type UseWeeklyDeadlineCardProps = {
  weekDay: Date;
  deadline: ProductionDeadlinePopulated;
  deadlineState: DepartamentDeadlineState;
  weekDailyGoals: DailyGoalPopulated[];
};

export default function useWeeklyDeadlineCard({
  deadline,
  weekDay,
  deadlineState,
  weekDailyGoals,
}: UseWeeklyDeadlineCardProps) {
  const { production, planned_start_at, planned_end_at } = deadline;

  // Pega a meta deste dia
  const dailyGoal = weekDailyGoals.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  // Algumas datas
  const plannedStartDate = normalizeDate(planned_start_at);
  const plannedEndDate = normalizeDate(planned_end_at);
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
  const { status, departamentState } = deadlineState;
  const { avaliableAmount } = departamentState;

  // Quantidade de peças que deve ser feita neste dia
  const goalAmount = dailyGoal
    ? dailyGoal.expected_amount
    : Math.ceil((status.includes("COMPLETED") ? totalAmount : avaliableAmount) / totalDays);

  // Meta será completada se fizer igual ou maior a meta definida
  const isDailyGoalDone = goalAmount > 0 && amountDoneInThisDay >= goalAmount;

  // Meta será incompleta se fizer menos que a meta estabelecida
  const isDailyGoalIncomplete =
    status && !!dailyGoal && dailyGoal.amount_done < dailyGoal.expected_amount;

  // Diz se o prazo cai neste dia da semana
  const isExpectedThisWeekDay =
    plannedEndDate && plannedEndDate.getTime() == normalizedWeekDay.getTime();

  const isStartedThisWeekDay =
    plannedStartDate && plannedStartDate.getTime() == normalizedWeekDay.getTime();

  return {
    dailyGoal,
    daysAmount,
    goalAmount,
    isDailyGoalDone,
    weekTotalAmount,
    amountDoneInThisDay,
    isStartedThisWeekDay,
    isExpectedThisWeekDay,
    isDailyGoalIncomplete,
  };
}
