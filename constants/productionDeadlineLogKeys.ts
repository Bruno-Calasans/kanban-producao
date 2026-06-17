export const productionDeadlineLogKeys = {
  all: ["ProductionDeadlineLog"] as const,
  lists: () => [...productionDeadlineLogKeys.all, "list"] as const,
  list: (filters: any) => [...productionDeadlineLogKeys.lists(), filters] as const,
  details: () => [...productionDeadlineLogKeys.all, "detail"] as const,
  detail: (id: string | number) => [...productionDeadlineLogKeys.details(), id] as const,
};
