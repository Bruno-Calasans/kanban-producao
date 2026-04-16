export const productionFlowTemplateKeys = {
  all: ["ProductionFlowTemplate"] as const,
  lists: () => [...productionFlowTemplateKeys.all, "list"] as const,
  list: (filters: any) => [...productionFlowTemplateKeys.lists(), filters] as const,
  details: () => [...productionFlowTemplateKeys.all, "detail"] as const,
  detail: (id: string | number) => [...productionFlowTemplateKeys.details(), id] as const,
};
