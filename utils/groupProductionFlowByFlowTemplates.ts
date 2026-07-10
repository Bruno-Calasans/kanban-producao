import { ProductionFlowTemplate } from "@/types/database.type";

export function groupProductionFlowByFlowTemplates(flowTemplates: ProductionFlowTemplate[]) {
  const flowTemplateByProductionFlow = new Map<number, ProductionFlowTemplate[]>();

  for (const flowTemplate of flowTemplates) {
    const flowTemplateId = flowTemplate.id;

    const currentGroup = flowTemplateByProductionFlow.get(flowTemplateId) || [];
    currentGroup.push(flowTemplate);
    flowTemplateByProductionFlow.set(flowTemplateId, currentGroup);
  }

  return flowTemplateByProductionFlow;
}
