import { create } from "zustand";
import { persist } from "zustand/middleware";

type UseShortCardVersionState = {
  isShort: boolean;
  setShort: (value: boolean) => void;
  toggleShort: () => void;
};

export const useShortCardVersion = create<UseShortCardVersionState>()(
  persist(
    (set) => ({
      isShort: false,
      setShort: (isShort) => set({ isShort }),
      toggleShort: () => set((state) => ({ isShort: !state.isShort })),
    }),
    {
      name: "use-short-card-version",
    },
  ),
);
