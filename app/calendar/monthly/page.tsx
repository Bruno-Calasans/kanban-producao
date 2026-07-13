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
import MonthlyDeadlineFilters from "@/components/calendar/monthly/MonthlyDeadlineFilters";
import MonthlyDeadlineCalendarCard from "@/components/calendar/monthly/MonthlyDeadlineCalendarCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { DeadlineStatusEnum } from "@/utils/calcDeadlineStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MonthlyCalendarPage() {
  const [departamentsFilter, setSelectedDepartaments] = useState<FilterItem[]>([]);
  const [selectedDeadlineTypes, setSelectedDeadlineTypes] = useState<FilterItem[]>([]);
  const [selectedDeadlineDateTypes, setSelectedDeadlineDateTypes] = useState<FilterItem[]>([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState<ProductionDeadlinePopulated[] | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [search, setSearch] = useState<string>("");

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
      (filteredDeadlines || deadlines)
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
          const isWaiting = deadlineStatus?.status === "WAITING";
          const isReopen = deadlineStatus?.status === "REOPEN";

          const expireFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.EXPIRED && isExpired,
          );

          const hasFinishedFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.COMPLETED && isFinished,
          );

          const hasInProgressFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.IN_PROGRESS && isInProgress,
          );

          const hasUnsetFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.NOT_DEFINED && isUnset,
          );

          const hasWaitingFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.WAITING && isWaiting,
          );

          const hasReopenFilter = selectedDeadlineTypes.some(
            (type) => type.value === DeadlineStatusEnum.REOPEN && isReopen,
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
        // Filtra por nome, op ou ref
        .filter((deadline) => {
          if (search) {
            const { production } = deadline;
            const lowerCaseSearch = search.toLowerCase();
            const isProductName = production.product.name.toLowerCase().includes(lowerCaseSearch);
            const isOp = String(production.op).includes(lowerCaseSearch);
            const isRef = String(production.product.ref).includes(lowerCaseSearch);

            if (isProductName || isOp || isRef) return true;
            return false;
          }
          return true;
        })
        .sort(
          (a, b) =>
            DeadlineStatusEnum[deadlineStatusByDeadline.get(a.id)!.status] -
            DeadlineStatusEnum[deadlineStatusByDeadline.get(b.id)!.status],
        )
    );
  }, [deadlines, deadlineStatusByDeadline, search]);

  const isLoading = isDeadlinesLoading || isDepartamentStatesByProductionLoading;
  const error = deadlineError || departamentStatesByProductionError;

  const onSelectedDate = (deadlinesInThisDate: ProductionDeadlinePopulated[], date: Date) => {
    setFilteredDeadlines(deadlinesInThisDate);
    setSelectedDate(date);
  };

  const onRemoveSelectedDate = () => {
    setFilteredDeadlines(deadlines);
    setSelectedDate(undefined);
  };

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
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <p className="font-bold">Prazos ({selectedDeadlines.length})</p>
              {selectedDate && (
                <div className="flex justify-end items-end gap-2">
                  <p className="text-stone-500 italic">
                    Data selecionada: <span>{selectedDate.toLocaleDateString()}</span>
                  </p>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    size="xs"
                    onClick={onRemoveSelectedDate}
                  >
                    Remover
                  </Button>
                </div>
              )}
            </div>

            <Input
              type="text"
              placeholder="Pesquisa prazo por produto, OP ou REF"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <p className="text-stone-600 text-sm italic mt-1">Pesquisando por: {search}</p>
            )}
          </div>

          <ScrollArea className="h-[700px] rounded-md border p-4">
            {selectedDeadlines.map((deadline) => (
              <DeadlineCard
                key={`${deadline.id}-${deadline.departament.id}-${deadline.production.id}`}
                deadline={deadline}
                deadlineStatus={deadlineStatusByDeadline.get(deadline.id)!}
              />
            ))}
          </ScrollArea>
        </div>

        <MonthlyDeadlineCalendarCard
          deadlines={deadlines}
          selectedDeadlineDateTypes={selectedDeadlineDateTypes}
          onClickDate={onSelectedDate}
        />
      </div>
    </section>
  );
}
