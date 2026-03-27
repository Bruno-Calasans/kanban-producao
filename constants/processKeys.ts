
export const processKeys = {
    all: ["processes"] as const,
    lists: () => [...processKeys.all, "list"] as const,
    list: (filters: any) => [...processKeys.lists(), filters] as const,
    details: () => [...processKeys.all, "detail"] as const,
    detail: (id: string | number) => [...processKeys.details(), id] as const,
};