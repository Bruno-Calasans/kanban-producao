import FilterItems, { FilterItem } from "@/components/custom/FilterItems";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { DeadlineStatusData, DeadlineStatusEnum } from "@/utils/calcDeadlineStatus";

export enum DeadlineDateType {
  END,
  FINISHED,
}

const deadlineDateType = [
  {
    id: DeadlineDateType.END,
    label: "FIM",
  },
  {
    id: DeadlineDateType.FINISHED,
    label: "FINALIZADO",
  },
];

const deadlineType = [
  {
    id: DeadlineStatusEnum.EXPIRED,
    label: "EXPIRADO",
  },
  {
    id: DeadlineStatusEnum.COMPLETED,
    label: "CONCLUÍDO",
  },
  {
    id: DeadlineStatusEnum.IN_PROGRESS,
    label: "EM ANDAMENTO",
  },
  {
    id: DeadlineStatusEnum.WAITING,
    label: "AGUARDANDO",
  },
  {
    id: DeadlineStatusEnum.NOT_DEFINED,
    label: "NÃO DEFINIDO",
  },
  {
    id: DeadlineStatusEnum.REOPEN,
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
        filterLabel="Filtro por status do prazo"
        selectedItems={selectedDeadlineTypes}
        onSelectItem={setSelectedDeadlineTypes}
      />

      {/* Filtro de departamentos */}
      <FilterItems
        data={deadlineDateType}
        labelAcessorKey={(data) => data.label}
        valueAcessorKey={(data) => data.id}
        filterLabel="Mostrar datas do prazo no calendário"
        selectedItems={selectedDeadlineDateTypes}
        onSelectItem={setSelectedDeadlineDateTypes}
      />
    </div>
  );
}
