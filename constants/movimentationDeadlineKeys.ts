/* eslint-disable @typescript-eslint/no-explicit-any */
export const movimentationDeadlineKeys = {
  all: ["MovimentationDeadline"] as const,
  lists: () => [...movimentationDeadlineKeys.all, "list"] as const,
  list: (filters: any) => [...movimentationDeadlineKeys.lists(), filters] as const,
  details: () => [...movimentationDeadlineKeys.all, "detail"] as const,
  detail: (id: string | number) => [...movimentationDeadlineKeys.details(), id] as const,
};
