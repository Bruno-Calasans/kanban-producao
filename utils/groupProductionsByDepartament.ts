import { ProductionFlowTemplate, ProductionPopulated } from "@/types/database.type";

type GroupProductionsByDepartamentProps = {
  productions: ProductionPopulated[];
  templatesByFlow: Map<number, ProductionFlowTemplate[]>;
};

export function groupProductionsByDepartament({
  productions,
  templatesByFlow,
}: GroupProductionsByDepartamentProps) {
  const productionsByDepartament = new Map<number, ProductionPopulated[]>();

  for (const production of productions) {
    const productionFlowId = production.production_flow_id;
    const templates = templatesByFlow.get(productionFlowId) || [];

    for (const template of templates) {
      const departamentId = template.departament_id;

      const currentGroup = productionsByDepartament.get(departamentId) || [];
      currentGroup.push(production);
      productionsByDepartament.set(departamentId, currentGroup);
    }
  }

  return productionsByDepartament;
}
