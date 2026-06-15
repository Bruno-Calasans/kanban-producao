import { supabase } from "@/lib/supabase/client";
import {
  MovimentationPopulated,
  ProductionFlowTemplatePopulated,
  ProductionPopulated,
} from "@/types/database.type";

export type ProductionMovimentationTemplate = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
  templates: ProductionFlowTemplatePopulated[];
};

export async function getAllMovimentationsByProductions(productionIds: number[]) {
  return await supabase
    .from("Movimentation")
    .select(
      `
    *,
    production:Production!production_id(*),
    product:Product!product_id(*),
    departament:Departament!departament_id(*),
    from_departament:Departament!from_departament_id(*),
    responsible:Responsible!responsible_id(*)
  `,
    )
    .in("production_id", productionIds)
    .throwOnError();
}

export async function getAllFlowTemplates(flowIds: number[]) {
  return await supabase
    .from("ProductionFlowTemplate")
    .select(
      `
    *,
    departament:Departament!departament_id(*)
  `,
    )
    .in("production_flow_id", flowIds)
    .order("sequence", { ascending: true })
    .throwOnError();
}

export async function getAllProductionMovimentationsTemplates(productions: ProductionPopulated[]) {
  const dataByProduction = new Map<number, ProductionMovimentationTemplate>();
  const movimentationsByProduction = new Map<number, MovimentationPopulated[]>();
  const templatesByProductionFlow = new Map<number, ProductionFlowTemplatePopulated[]>();

  if (!productions || productions.length == 0) return dataByProduction;

  const productionIds = [...new Set(productions.map((production) => production.id))];
  const flowIds = [...new Set(productions.map((m) => m.production_flow_id))];

  // Pega todas as movimentações relacionadas com esses ids de produção
  const { data: movimentations } = await getAllMovimentationsByProductions(productionIds);

  // Pega todos os flow templates relacionados com esses ids de produção
  const { data: templates } = await getAllFlowTemplates(flowIds);

  // Agrupa movimentações por produção
  for (const movimentation of movimentations) {
    const key = movimentation.production_id;

    const curr = movimentationsByProduction.get(key) || [];
    curr.push(movimentation);
    movimentationsByProduction.set(key, curr);
  }

  // agrupa template por fluxo de produção
  for (const template of templates) {
    const key = template.production_flow_id;

    const curr = templatesByProductionFlow.get(key) || [];
    curr.push(template);
    templatesByProductionFlow.set(key, curr);
  }

  for (const production of productions) {
    const productionId = production.id;
    const productionFlowId = production.production_flow_id;

    const movimentations = movimentationsByProduction.get(productionId) || [];
    const templates = templatesByProductionFlow.get(productionFlowId) || [];

    dataByProduction.set(productionId, {
      production,
      movimentations,
      templates,
    });
  }

  return dataByProduction;
}
