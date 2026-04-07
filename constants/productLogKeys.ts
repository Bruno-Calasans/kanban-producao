
export const productlogKeys = {
    all: ["productLogs"] as const,
    lists: () => [...productlogKeys.all, "list"] as const,
    list: (filters: any) => [...productlogKeys.lists(), filters] as const,
    details: () => [...productlogKeys.all, "detail"] as const,
    detail: (id: string | number) => [...productlogKeys.details(), id] as const,
};