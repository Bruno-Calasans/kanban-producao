import {
  ProductionFlowTemplate,
  ProductionFlowTemplatePopulated,
  ProductionPopulated,
} from "@/types/database.type";

type GroupProductionsByDepartamentProps = {
  productions: ProductionPopulated[];
  templatesByProductionFlow: Map<number, ProductionFlowTemplatePopulated[]>;
};

export function groupProductionsByDepartament({
  productions,
  templatesByProductionFlow,
}: GroupProductionsByDepartamentProps) {
  const productionsByDepartament = new Map<number, ProductionPopulated[]>();

  for (const production of productions) {
    const productionFlowId = production.production_flow_id;
    const templates = templatesByProductionFlow.get(productionFlowId) || [];

    for (const template of templates) {
      const departamentId = template.departament.id;

      const currentGroup = productionsByDepartament.get(departamentId) || [];
      currentGroup.push(production);
      productionsByDepartament.set(departamentId, currentGroup);
    }
  }

  return productionsByDepartament;
}
