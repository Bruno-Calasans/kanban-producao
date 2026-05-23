import { create, useStore } from "zustand";

type WeeklyDeadlineStore = {
  selectedDeadlineId: number | null;
  setSelectedDeadlineId: (deadlineId: number | null) => void;
};

export const useWeeklyDeadlineStore = create<WeeklyDeadlineStore>((set) => ({
  selectedDeadlineId: null,
  setSelectedDeadlineId: (id) =>
    set({
      selectedDeadlineId: id,
    }),
}));
