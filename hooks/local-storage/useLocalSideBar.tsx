import { create } from "zustand";
import { persist } from "zustand/middleware";

type UseLocalSideBar = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const useLocalSideBar = create<UseLocalSideBar>()(
  persist(
    (set) => ({
      isOpen: false,
      setOpen: (value) => set({ isOpen: value }),
    }),
    {
      name: "open-side-bar",
    },
  ),
);
