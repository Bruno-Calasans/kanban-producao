"use client";

import { WeeklyDeadlineContextProvider } from "@/context/SelectedWeekDeadlineContext";
import WeeklyDeadlineTable from "../../../components/calendar/weekly/WeeklyDeadlineTable";

export default function MonthlyCalendarPage() {
  return (
    <section>
      <WeeklyDeadlineContextProvider>
        <WeeklyDeadlineTable />
      </WeeklyDeadlineContextProvider>
    </section>
  );
}
