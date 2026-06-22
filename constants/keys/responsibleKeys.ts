
export const responsibleKeys = {
    all: ["responsibles"] as const,
    lists: () => [...responsibleKeys.all, "list"] as const,
    list: (filters: any) => [...responsibleKeys.lists(), filters] as const,
    details: () => [...responsibleKeys.all, "detail"] as const,
    detail: (id: string | number) => [...responsibleKeys.details(), id] as const,
};