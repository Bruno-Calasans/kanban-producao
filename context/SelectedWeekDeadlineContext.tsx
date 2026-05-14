import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { createContext, useContext, useState, ReactNode } from "react";

type WeeklyDeadlineContextData = {
  selectedDeadline: MovimentationDeadlinePopulated | null;
  setSelectedDeadline: (deadline: MovimentationDeadlinePopulated | null) => void;
};

type DeadineContextProviderProps = {
  children: ReactNode;
};

export const WeeklyDeadlineContext = createContext<WeeklyDeadlineContextData | null>(null);

export function WeeklyDeadlineContextProvider({ children }: DeadineContextProviderProps) {
  const [deadline, setDeadline] = useState<MovimentationDeadlinePopulated | null>(null);

  return (
    <WeeklyDeadlineContext.Provider
      value={{
        selectedDeadline: deadline,
        setSelectedDeadline: setDeadline,
      }}
    >
      {children}
    </WeeklyDeadlineContext.Provider>
  );
}
