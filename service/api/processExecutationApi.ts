/* eslint-disable prefer-const */
import { supabase } from "@/lib/supabase/client";
import { ProcessExecution, ProcessState } from "@/types/database.type";
import { getAllMovimentations } from "./movimentationApi";

export type CreateProcessExecutionData = Omit<ProcessExecution, "id" | "created_at" | "updated_at">;
export type UpdateProcessExecutionData = Partial<CreateProcessExecutionData>;
export type MoveNextProcessDate = {
  processStates: ProcessState[];
  responsibleId: number | null;
  startedAt: string | null;
  finished_at: string | null;
  amount?: number;
};

export type UpdateInitialExecutionData = {
  movimentationId: number;
  processId: number;
  amount: number;
};

export async function getAllProcessExecutions() {
  return await supabase
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
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getOneProcessExecution(processExecutionId: number) {
  return await supabase
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
    .eq("id", processExecutionId)
    .single()
    .throwOnError();
}

export async function createProcessExecution(createData: CreateProcessExecutionData) {
  return await supabase
    .from("ProcessExecution")
    .insert(createData)
    .select()
    .single()
    .throwOnError();
}

export async function updateProcessExecution(
  processExecutionId: number,
  updateData: UpdateProcessExecutionData,
) {
  return await supabase
    .from("ProcessExecution")
    .update(updateData)
    .eq("id", processExecutionId)
    .throwOnError();
}

export async function deleteProcessExecution(processExecutionId: number) {
  return await supabase
    .from("ProcessExecution")
    .delete()
    .eq("id", processExecutionId)
    .throwOnError();
}

export async function getAllProcessExecutionsByProduct(productId: number) {
  return await supabase
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
    .eq("product_id", productId)
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getAllProcessExecutionsByMovimentation(movimentationId: number) {
  return await supabase
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
    .eq("movimentation_id", movimentationId)
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getAllExecutionsByDepartament(departamentId: number) {
  let { data, ...rest } = await supabase
    .from("ProcessExecution")
    .select(
      `
      process:Process!process_id(departament_id),
      from_process:Process!from_process_id(departament_id)
    `,
    )
    .or(`and(departament_id.eq.${departamentId}, departament_id.not.is.null)`, {
      foreignTable: "process",
    })
    .or(`and(departament_id.eq.${departamentId}, departament_id.not.is.null)`, {
      foreignTable: "from_process",
    })
    .throwOnError();

  data = data.filter(({ process, from_process }) => process != null && from_process != null);
  return { data, ...rest };
}

export async function getAllExecutionsByProcess(processId: number) {
  return await supabase
    .from("ProcessExecution")
    .select(
      `
      process_id,
      from_process_id,
      type
    `,
    )
    .or(`process_id.eq.${processId}, from_process_id.eq.${processId}`)
    .throwOnError();
}

export async function getAllExecutionsByResponsible(responsibleId: number) {
  return await supabase
    .from("ProcessExecution")
    .select("responsible_id")
    .eq("responsible_id", responsibleId)
    .throwOnError();
}

export async function updateInitialExecution({
  movimentationId,
  processId,
  amount,
}: UpdateInitialExecutionData) {
  return await supabase
    .from("ProcessExecution")
    .update({
      process_id: processId,
      amount,
    })
    .select()
    .eq("movimentation_id", movimentationId)
    .eq("type", "INIT")
    .maybeSingle()
    .throwOnError();
}

export async function moveToNextDepartament({
  processStates,
  startedAt,
  finished_at,
  responsibleId,
  amount,
}: MoveNextProcessDate) {
  let movedAmount = 0;

  for (const state of processStates) {
    if (!state.nextProcess) continue;

    const isFirstProcess = state.previousProcess == null;

    const isFirstNextDepartamentProcess =
      state.nextProcess!.departament.id != state.process.departament.id;

    const tempAmount = isFirstProcess ? state.avaliableAmount : state.avaliableAmount + movedAmount;
    const amountToMove = amount && amount > 0 && amount <= tempAmount ? amount : tempAmount;
    if (movedAmount == 0) movedAmount = amountToMove;

    const data = await createProcessExecution({
      amount: amountToMove,
      from_process_id: state.process.id,
      movimentation_id: state.movimentation.id,
      process_id: state.nextProcess!.id,
      product_id: state.movimentation.product.id,
      responsible_id: responsibleId,
      started_at: startedAt,
      finished_at: finished_at,
      type: "TRANSFER",
      reason: null,
    });

    if (isFirstNextDepartamentProcess) return data;
  }
}
