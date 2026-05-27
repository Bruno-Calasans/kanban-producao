import {
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import { supabase } from "@/lib/supabase/client";

export type MovimentationExecutionTemplate = {
  movimentation: MovimentationPopulated;
  executions: ProcessExecutionPopulated[];
  templates: ProductionFlowTemplateWithProcess[];
};

export async function getAllMovimentationExecutionsTemplates(
  movimentations: MovimentationPopulated[],
) {
  const dataByMovimentation = new Map<number, MovimentationExecutionTemplate>();
  const executionsByMovimentation = new Map<number, ProcessExecutionPopulated[]>();
  const templatesByProductionFlow = new Map<number, ProductionFlowTemplateWithProcess[]>();

  if (!movimentations || movimentations.length == 0) return dataByMovimentation;

  const movimentationsIds = [...new Set(movimentations.map((movimentation) => movimentation.id))];
  const flowIds = [...new Set(movimentations.map((m) => m.production_flow_id))];

  // Mapear todos os ids das movimentações
  if (movimentationsIds.length == 0) return;

  // Pega todas as execuções das movimentações
  const { data: executions } = await supabase
    .from("ProcessExecution")
    .select(
      `
    *,
    movimentation:Movimentation!movimentation_id(*),
    product:Product!product_id(*),
    process:Process!process_id(*),
    from_process:Process!from_process_id(*),
    responsible:Responsible!responsible_id(*)
  `,
    )
    .in("movimentation_id", movimentationsIds)
    .throwOnError();

  // Pega todos os flow templates
  const { data: templates } = await supabase
    .from("ProductionFlowTemplate")
    .select(
      `
    *,
    process:Process!process_id(
      *,
      departament:Departament!departament_id(*)
    )
  `,
    )
    .in("production_flow_id", flowIds)
    .order("sequence", { ascending: true })
    .throwOnError();

  // Agrupa execuções por movimentação
  for (const execution of executions) {
    const key = execution.movimentation_id;

    const curr = executionsByMovimentation.get(key) || [];
    curr.push(execution);
    executionsByMovimentation.set(key, curr);
  }

  // agrupa template por fluxo de produção
  for (const template of templates) {
    const key = template.production_flow_id;

    const curr = templatesByProductionFlow.get(key) || [];
    curr.push(template);
    templatesByProductionFlow.set(key, curr);
  }

  for (const movimentation of movimentations) {
    const movimentationId = movimentation.id;
    const executions = executionsByMovimentation.get(movimentationId) || [];
    const templates = templatesByProductionFlow.get(movimentation.production_flow_id) || [];
    dataByMovimentation.set(movimentationId, {
      movimentation,
      executions,
      templates,
    });
  }

  return dataByMovimentation;
}
