"use server";

import {
  createMovimentation,
  CreateMovimentationData,
  getAllMovimentationsByProduction,
} from "@/service/api/movimentationApi";
import { getAllFlowTemplatesByProductionFlow } from "@/service/api/productionFlowTemplate";
import { ProductionPopulated } from "@/types/database.type";
import { calcProductionStatus } from "@/utils/calcProductionStatus";
import { calcDepartamentStates } from "@/utils/calcDepartamentStates";
import { updateProduction } from "@/service/api/productionApi";

type CreateMovimentationAction = {
  production: ProductionPopulated;
  createMovimentationData: CreateMovimentationData;
};

export async function createMovimentationAction({
  production,
  createMovimentationData,
}: CreateMovimentationAction) {
  // Cria movimentação
  const movimentation = await createMovimentation(createMovimentationData);

  // Pega todas as movimentações da produção
  const { data: movimentations } = await getAllMovimentationsByProduction(production.id);

  // Pega todos os templates do fluxo de produção
  const { data: flowTemplates } = await getAllFlowTemplatesByProductionFlow(
    production.production_flow_id,
  );

  // Calcula o estado do departamento
  const departamentStates = calcDepartamentStates({
    production,
    flowTemplates,
    movimentations,
  });

  // Calcula status da produção
  const productionStatus = calcProductionStatus({
    production,
    departamentStates,
  });

  if (production.status != productionStatus) {
    await updateProduction(production.id, {
      status: productionStatus,
      updated_at: new Date().toISOString(),
    });
  }

  return movimentation;
}
