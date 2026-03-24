
export const departamentKeys = {
    all: ["departaments"] as const,
    lists: () => [...departamentKeys.all, "list"] as const,
    list: (filters: any) => [...departamentKeys.lists(), filters] as const,
    details: () => [...departamentKeys.all, "detail"] as const,
    detail: (id: string) => [...departamentKeys.details(), id] as const,
};