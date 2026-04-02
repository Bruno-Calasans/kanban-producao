
export const movimentationKeys = {
    all: ["Movimentations"] as const,
    lists: () => [...movimentationKeys.all, "list"] as const,
    list: (filters: any) => [...movimentationKeys.lists(), filters] as const,
    details: () => [...movimentationKeys.all, "detail"] as const,
    detail: (id: string | number) => [...movimentationKeys.details(), id] as const,
};