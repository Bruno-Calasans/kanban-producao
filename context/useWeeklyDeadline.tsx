import { useContext } from "react";
import { WeeklyDeadlineContext } from "./SelectedWeekDeadlineContext";

export function useWeeklyDeadline() {
  const context = useContext(WeeklyDeadlineContext);

  if (!context) {
    throw new Error("useWeeklyDeadline must be used within CounterProvider");
  }

  return context;
}
