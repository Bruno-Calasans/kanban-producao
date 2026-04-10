
export const productionFlowKeys = {
    all: ["FlowTemplates"] as const,
    lists: () => [...productionFlowKeys.all, "list"] as const,
    list: (filters: any) => [...productionFlowKeys.lists(), filters] as const,
    details: () => [...productionFlowKeys.all, "detail"] as const,
    detail: (id: string | number) => [...productionFlowKeys.details(), id] as const,
};