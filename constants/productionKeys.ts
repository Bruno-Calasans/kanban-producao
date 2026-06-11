export const productionKeys = {
  all: ["Production"] as const,
  lists: () => [...productionKeys.all, "list"] as const,
  list: (filters: any) => [...productionKeys.lists(), filters] as const,
  details: () => [...productionKeys.all, "detail"] as const,
  detail: (id: any) => [...productionKeys.details(), id] as const,
};
