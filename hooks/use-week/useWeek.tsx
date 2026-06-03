"use client";

import { startOfWeek, addDays, subDays, endOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { useSelectedWeekDay } from "@/hooks/local-storage/useSelectedWeekDay";

type UseWeekProps = {
  startDate: Date;
  daysAmount?: number;
};

export default function useWeek({ startDate, daysAmount }: UseWeekProps) {
  const [fromDate, setFromDate] = useState<Date>(startDate);
  const startDayOfWeek = startOfWeek(fromDate, { weekStartsOn: 1 });
  const endDayOfWeek = endOfWeek(fromDate, { weekStartsOn: 1 });
  const { setSelectedWeekDay } = useSelectedWeekDay();

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
    const today = new Date();
    setSelectedWeekDay(today);
    setFromDate(today);
  };

  const getNextWeek = () => {
    const nextWeekFirstDay = getFirstDayOfNextWeek();
    setSelectedWeekDay(nextWeekFirstDay);
    setFromDate(nextWeekFirstDay);
  };

  const getPreviousWeek = () => {
    const previousWeekFirstDay = getFirstDayOfPreviousWeek();
    setSelectedWeekDay(previousWeekFirstDay);
    setFromDate(previousWeekFirstDay);
  };

  const weekDays = getWeekDays();

  useEffect(() => {
    if (fromDate.getTime() !== startDate.getTime()) {
      setFromDate(startDate);
    }
  }, [startDate]);

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
