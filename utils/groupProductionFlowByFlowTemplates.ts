import { ProductionFlowTemplate } from "@/types/database.type";

export function groupProductionFlowByFlowTemplates(flowTemplates: ProductionFlowTemplate[]) {
  const flowTemplateByProductionFlow = new Map<number, ProductionFlowTemplate[]>();

  for (const flowTemplate of flowTemplates) {
    const productionFlowId = flowTemplate.production_flow_id;

    const currentGroup = flowTemplateByProductionFlow.get(productionFlowId) || [];
    currentGroup.push(flowTemplate);
    flowTemplateByProductionFlow.set(productionFlowId, currentGroup);
  }

  return flowTemplateByProductionFlow;
}
