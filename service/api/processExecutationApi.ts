import { supabase } from "@/lib/supabase/client";
import { ProcessExecution } from "@/types/database.type";

export type CreateProcessExecutionData = Omit<ProcessExecution, "id" | "created_at" | "updated_at">;
export type UpdateProcessExecutionData = Partial<CreateProcessExecutionData>;

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
