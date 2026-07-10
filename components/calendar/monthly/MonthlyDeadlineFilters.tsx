import FilterItems, { FilterItem } from "@/components/custom/FilterItems";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import { useEffect, useMemo } from "react";

export enum DeadlineDateType {
  START,
  END,
  FINISHED,
}

export enum DeadlineType {
  EXPIRED,
  FINISHED,
  NOT_DEFINED,
  IN_PROGRESS,
  WAITING,
  REOPEN,
}

const deadlineDateType = [
  {
    id: DeadlineDateType.START,
    label: "INÍCIO",
  },
  {
    id: DeadlineDateType.END,
    label: "FIM",
  },
  {
    id: DeadlineDateType.FINISHED,
    label: "CONCLUSÃO",
  },
];

const deadlineType = [
  {
    id: DeadlineType.EXPIRED,
    label: "EXPIRADO",
  },
  {
    id: DeadlineType.FINISHED,
    label: "CONCLUÍDO",
  },
  {
    id: DeadlineType.IN_PROGRESS,
    label: "EM ANDAMENTO",
  },
  {
    id: DeadlineType.WAITING,
    label: "AGUARDANDO",
  },
  {
    id: DeadlineType.NOT_DEFINED,
    label: "NÃO DEFINIDO",
  },
  {
    id: DeadlineType.REOPEN,
    label: "REABERTO",
  },
];

type MonthlyDeadlineFiltersProps = {
  deadlines: ProductionDeadlinePopulated[];
  departamentsFilter: FilterItem[];
  deadlineStatusByDeadline: Map<number, DeadlineStatusData>;
  selectedDeadlineDateTypes: FilterItem[];
  selectedDeadlineTypes: FilterItem[];
  setSelectedDepartaments: (items: FilterItem[]) => void;
  setSelectedDeadlineTypes: (items: FilterItem[]) => void;
  setSelectedDeadlineDateTypes: (items: FilterItem[]) => void;
};

export default function MonthlyDeadlineFilters({
  deadlines,
  departamentsFilter,
  setSelectedDepartaments,
  selectedDeadlineTypes,
  setSelectedDeadlineTypes,
  selectedDeadlineDateTypes,
  setSelectedDeadlineDateTypes,
}: MonthlyDeadlineFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <FilterItems
        data={deadlines}
        labelAcessorKey={(data) => data.departament.name}
        valueAcessorKey={(data) => data.departament.id}
        filterLabel="Filtro por departamento"
        selectedItems={departamentsFilter}
        onSelectItem={setSelectedDepartaments}
      />

      {/* Filtro de departamentos */}
      <FilterItems
        data={deadlineType}
        labelAcessorKey={(data) => data.label}
        valueAcessorKey={(data) => data.id}
        filterLabel="Filtro tipo de prazo"
        selectedItems={selectedDeadlineTypes}
        onSelectItem={setSelectedDeadlineTypes}
      />

      {/* Filtro de departamentos */}
      <FilterItems
        data={deadlineDateType}
        labelAcessorKey={(data) => data.label}
        valueAcessorKey={(data) => data.id}
        filterLabel="Filtro por data do prazo"
        selectedItems={selectedDeadlineDateTypes}
        onSelectItem={setSelectedDeadlineDateTypes}
      />
    </div>
  );
}
