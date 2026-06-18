"use client";

import { Button } from "@/components/ui/button";
import { MONTHS } from "@/constants/date";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon, ShrinkIcon } from "lucide-react";
import {
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import PageTitle from "@/components/custom/PageTitle";
import CreateDeadlineDialog from "./dialogs/CreateDeadlineDialog";

type WeekSelectorProps = {
  deadlinesByProduction: Map<number, ProductionDeadlinePopulated[]>;
  departamentStatesByProduction: Map<number, DepartamentState[]>;
  startDayOfWeek: Date;
  getPreviousWeek: () => void;
  getCurrentWeek: () => void;
  getNextWeek: () => void;
};

export default function WeekSelector({
  startDayOfWeek,
  getPreviousWeek,
  getCurrentWeek,
  getNextWeek,
}: WeekSelectorProps) {
  const { isShort, toggleShort } = useShortCardVersion();

  return (
    <div className="flex justify-between mb-2">
      <PageTitle>
        Calendário Semanal ({MONTHS[startDayOfWeek.getMonth() as keyof typeof MONTHS]})
      </PageTitle>
      <div className="flex gap-1">
        <CreateDeadlineDialog />

        <Button
          size="xs"
          onClick={() => {
            toggleShort();
          }}
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          {isShort ? <ExpandIcon /> : <ShrinkIcon />}
          {isShort ? "Mostrar versão completa" : "Mostrar versão curta"}
        </Button>

        <Button
          size="xs"
          onClick={() => {
            getPreviousWeek();
          }}
        >
          <ChevronLeftIcon />
          Voltar semana
        </Button>
        <Button
          size="xs"
          onClick={() => {
            getCurrentWeek();
          }}
        >
          Semana atual
        </Button>
        <Button
          size="xs"
          onClick={() => {
            getNextWeek();
          }}
        >
          Próxima Semana
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
