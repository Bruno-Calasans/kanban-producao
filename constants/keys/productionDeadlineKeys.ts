/* eslint-disable @typescript-eslint/no-explicit-any */
export const productionDeadlineKeys = {
  all: ["ProductionDeadline"] as const,
  lists: () => [...productionDeadlineKeys.all, "list"] as const,
  list: (filters: any) => [...productionDeadlineKeys.lists(), filters] as const,
  details: () => [...productionDeadlineKeys.all, "detail"] as const,
  detail: (id: string | number) => [...productionDeadlineKeys.details(), id] as const,
};
