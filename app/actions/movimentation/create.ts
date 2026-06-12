"use server";

import {
  createMovimentation,
  CreateMovimentationData,
  getAllMovimentationsByProduction,
} from "@/service/api/movimentationApi";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import { ProductionPopulated } from "@/types/database.type";
import { calcProductionStatus } from "@/utils/calcProductionStatus";
import { calcDepartamentStates } from "@/utils/calcDepartamentState";
import { updateProduction } from "@/service/api/productionApi";

export async function createMovimentationAction(
  data: CreateMovimentationData,
  production: ProductionPopulated,
) {
  // Cria movimentação
  const movimentation = await createMovimentation(data);

  // Pega todas as movimentações da produção
  const { data: movimentations } = await getAllMovimentationsByProduction(production.id);

  // Pega todos os templates do fluxo de produção
  const { data: flowTemplates } = await getAllProductionFlowTemplates(
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
