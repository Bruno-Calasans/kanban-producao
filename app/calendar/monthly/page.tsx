"use client";

import { useMemo, useState } from "react";
import { groupDeadlineStatusByDeadline } from "@/utils/groupDeadlineStatusByDeadline";
import { FilterItem } from "@/components/custom/FilterItems";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import PageMsg from "@/components/custom/msgs/PageMsg";
import DeadlineCard from "@/components/calendar/DeadlineCard";
import useGetAllProductionDeadlines from "@/hooks/production-deadline/useGetAllProductionDeadlines";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";
import MonthlyDeadlineFilters, {
  DeadlineType,
} from "@/components/calendar/monthly/MonthlyDeadlineFilters";
import MonthlyDeadlineCalendarCard from "@/components/calendar/monthly/MonthlyDeadlineCalendarCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductionDeadlinePopulated } from "@/types/database.type";

export default function MonthlyCalendarPage() {
  const [departamentsFilter, setSelectedDepartaments] = useState<FilterItem[]>([]);
  const [selectedDeadlineTypes, setSelectedDeadlineTypes] = useState<FilterItem[]>([]);
  const [selectedDeadlineDateTypes, setSelectedDeadlineDateTypes] = useState<FilterItem[]>([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState<ProductionDeadlinePopulated[]>([]);

  const {
    data: deadlinesData,
    isLoading: isDeadlinesLoading,
    error: deadlineError,
  } = useGetAllProductionDeadlines();
  const deadlines = deadlinesData?.data || [];

  const productions = deadlines.map((deadline) => deadline.production);
  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesByProductionLoading,
    error: departamentStatesByProductionError,
  } = useGetAllProductionDepartamentStates({ productions });

  const deadlineStatusByDeadline = groupDeadlineStatusByDeadline({
    deadlines,
    departamentStatesByProduction,
  });

  const selectedDeadlines = useMemo(() => {
    return (
      (filteredDeadlines.length > 0 ? filteredDeadlines : deadlines)
        // Filtra por departamento
        .filter((deadline) =>
          departamentsFilter.some((departament) => departament.value === deadline.departament.id),
        )
        // Filtra por tipo de prazo
        .filter((deadline) => {
          if (selectedDeadlineTypes.length === 0) return true;

          const deadlineStatus = deadlineStatusByDeadline.get(deadline.id);
          const isExpired = deadlineStatus?.status === "EXPIRED";
          const isFinished =
            deadlineStatus?.status === "COMPLETED" ||
            deadlineStatus?.status === "COMPLETED_EXPIRED";
          const isInProgress = deadlineStatus?.status === "IN_PROGRESS";
          const isUnset = deadlineStatus?.status === "NOT_DEFINED";
          const isWaiting = deadlineStatus?.status === "NOT_READY";
          const isReopen = deadlineStatus?.status === "REOPEN";

          const expireFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.EXPIRED && isExpired,
          );

          const hasFinishedFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.FINISHED && isFinished,
          );

          const hasInProgressFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.IN_PROGRESS && isInProgress,
          );

          const hasUnsetFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.NOT_DEFINED && isUnset,
          );

          const hasWaitingFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.WAITING && isWaiting,
          );

          const hasReopenFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineType.REOPEN && isReopen,
          );

          if (
            (expireFilter && isExpired) ||
            (hasFinishedFilter && isFinished) ||
            (hasInProgressFilter && isInProgress) ||
            (hasUnsetFilter && isUnset) ||
            (hasWaitingFilter && isWaiting) ||
            (hasReopenFilter && isReopen)
          ) {
            return true;
          }

          return false;
        })
    );
  }, [deadlines, deadlineStatusByDeadline]);

  const isLoading = isDeadlinesLoading || isDepartamentStatesByProductionLoading;
  const error = deadlineError || departamentStatesByProductionError;

  if (isLoading) return <Loader title="Carregando prazos..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar prazos"
        content="Ocorreu um erro ao carregar os prazos."
        backBtnLabel="Voltar à página inicial"
        backBtnUrl="/"
      />
    );

  return (
    <section>
      <PageTitle>Calendário Mensal</PageTitle>

      {/* Filtro de departamentos */}
      <MonthlyDeadlineFilters
        deadlines={deadlines}
        departamentsFilter={departamentsFilter}
        selectedDeadlineTypes={selectedDeadlineTypes}
        selectedDeadlineDateTypes={selectedDeadlineDateTypes}
        deadlineStatusByDeadline={deadlineStatusByDeadline}
        setSelectedDepartaments={setSelectedDepartaments}
        setSelectedDeadlineTypes={setSelectedDeadlineTypes}
        setSelectedDeadlineDateTypes={setSelectedDeadlineDateTypes}
      />

      {/* Prazos para entregar */}
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col flex-1">
          <p className="font-bold mb-2">Prazos ({selectedDeadlines.length})</p>

          <ScrollArea className="h-[700px] rounded-md border p-4">
            {selectedDeadlines.map((deadline) => (
              <DeadlineCard
                key={deadline.id}
                deadline={deadline}
                deadlineStatus={deadlineStatusByDeadline.get(deadline.id)!}
              />
            ))}
          </ScrollArea>
        </div>

        <MonthlyDeadlineCalendarCard
          deadlines={deadlines}
          selectedDeadlineDateTypes={selectedDeadlineDateTypes}
          onClickDate={setFilteredDeadlines}
        />
      </div>
    </section>
  );
}
