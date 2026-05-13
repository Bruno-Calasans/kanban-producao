"use client";

import { startOfWeek, addDays, subDays, endOfWeek } from "date-fns";
import { useState } from "react";

type UseWeekProps = {
  startDate: Date;
  daysAmount?: number;
};

export default function useWeek({ startDate, daysAmount }: UseWeekProps) {
  const [fromDate, setFromDate] = useState<Date>(startDate);
  const startDayOfWeek = startOfWeek(fromDate, { weekStartsOn: 1 });
  const endDayOfWeek = endOfWeek(fromDate, { weekStartsOn: 1 });

  // Pega todos os dias da semana, execto domingo (configurável)
  const getWeekDays = () => {
    return Array.from({ length: daysAmount || 6 }).map((_, index) =>
      addDays(startDayOfWeek, index),
    );
  };

  const getFirstDayOfNextWeek = () => {
    return addDays(endDayOfWeek, 1);
  };

  const getFirstDayOfPreviousWeek = () => {
    return subDays(startDayOfWeek, 7);
  };

  const getCurrentWeek = () => {
    setFromDate(startDate);
  };

  const getNextWeek = () => {
    setFromDate(getFirstDayOfNextWeek());
  };

  const getPreviousWeek = () => {
    setFromDate(getFirstDayOfPreviousWeek());
  };

  const weekDays = getWeekDays();

  return {
    startDayOfWeek,
    endDayOfWeek,
    fromDate,
    weekDays,
    setFromDate,
    getWeekDays,
    getFirstDayOfNextWeek,
    getFirstDayOfPreviousWeek,
    getCurrentWeek,
    getNextWeek,
    getPreviousWeek,
  };
}
