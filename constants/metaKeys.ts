export const metaKeys = {
  all: ["Meta"] as const,
  lists: () => [...metaKeys.all, "list"] as const,
  list: (filters: any) => [...metaKeys.lists(), filters] as const,
  details: () => [...metaKeys.all, "detail"] as const,
  detail: (id: string | number) => [...metaKeys.details(), id] as const,
};
