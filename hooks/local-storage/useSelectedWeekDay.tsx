import { create } from "zustand";
import { persist } from "zustand/middleware";

type UseSelectedWeekDayState = {
  selectedWeekDay: Date | null;
  setSelectedWeekDay: (value: Date | null) => void;
};

export const useSelectedWeekDay = create<UseSelectedWeekDayState>()(
  persist(
    (set) => ({
      selectedWeekDay: new Date(),
      setSelectedWeekDay: (weekDay) => set({ selectedWeekDay: weekDay }),
    }),
    {
      name: "use-selected-week-day",
    },
  ),
);
