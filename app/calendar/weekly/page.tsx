"use client";

import { WeeklyDeadlineContextProvider } from "@/context/SelectedWeekDeadlineContext";
import WeeklyDeadlineTable from "./WeeklyDeadlineTable";

export default function MonthlyCalendarPage() {
  return (
    <section>
      <WeeklyDeadlineContextProvider>
        <WeeklyDeadlineTable />
      </WeeklyDeadlineContextProvider>
    </section>
  );
}
