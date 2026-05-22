"use server";

import { updateMovimentation } from "@/service/api/movimentationApi";
import {
  createProcessExecution,
  CreateProcessExecutionData,
  getAllProcessExecutionsByMovimentation,
} from "@/service/api/processExecutationApi";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import { MovimentationPopulated } from "@/types/database.type";
import calcMovimentationStatus from "@/utils/calcMovimentationStatus";
import { calcProcessStates } from "@/utils/calcProcessStates";

export async function createExecution(
  data: CreateProcessExecutionData,
  movimentation: MovimentationPopulated,
) {
  // Cria execução
  const processExecution = await createProcessExecution(data);

  // Pega todas as execuções da movimentação
  const { data: processExecutions } = await getAllProcessExecutionsByMovimentation(
    movimentation.id,
  );

  const { data: flowTemplates } = await getAllProductionFlowTemplates(
    movimentation.product.production_flow_id,
  );

  // Calcula process states
  const processStates = calcProcessStates({
    movimentation: movimentation,
    processExecutions: processExecutions,
    flowTemplates,
  });

  const movimentationStatus = calcMovimentationStatus({
    movimentation,
    processStates,
  });

  console.log(movimentationStatus);

  if (movimentation.status != movimentationStatus) {
    await updateMovimentation(movimentation.id, {
      status: movimentationStatus,
    });
  }

  return processExecution;
}
