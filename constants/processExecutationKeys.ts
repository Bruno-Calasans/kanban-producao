
export const processExecutationKeys = {
    all: ["processExecutations"] as const,
    lists: () => [...processExecutationKeys.all, "list"] as const,
    list: (filters: any) => [...processExecutationKeys.lists(), filters] as const,
    details: () => [...processExecutationKeys.all, "detail"] as const,
    detail: (id: string | number) => [...processExecutationKeys.details(), id] as const,
};