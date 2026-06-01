import { supabase } from "@/lib/supabase/client";
import { MovimentationDeadline } from "@/types/database.type";
import { Select } from "react-day-picker";

export type CreateMovimentationDeadlineData = Omit<
  MovimentationDeadline,
  "id" | "created_at" | "updated_at"
>;
export type UpdateMovimentationDeadlineData = Partial<CreateMovimentationDeadlineData>;

export async function getAllMovimentationDeadlines() {
  return await supabase
    .from("MovimentationDeadline")
    .select(
      `
        *, 
        movimentation:Movimentation!movimentation_id(*),
        departament:Departament!departament_id(*)
    `,
    )
    .throwOnError();
}

export async function getAllMovimentationDeadlinesWithProduct() {
  return await supabase
    .from("MovimentationDeadline")
    .select(
      `
        *, 
        movimentation:Movimentation!movimentation_id(
          *,
          product:Product!product_id(*),
          productionFlow:ProductionFlow!production_flow_id(*)
        ),
        departament:Departament!departament_id(*)
    `,
    )
    .order("departament_id", { ascending: true })
    .throwOnError();
}

export async function getAllMovimentationDeadlinesInRange(fromDate: Date, toDate: Date) {
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);
  const from = fromDate.toISOString();
  const to = toDate.toISOString();

  return await supabase
    .from("MovimentationDeadline")
    .select(
      `
        *, 
        movimentation:Movimentation!movimentation_id(  
        *,
          product:Product!product_id(*),
          productionFlow:ProductionFlow!production_flow_id(*)
        ),
        departament:Departament!departament_id(*)
    `,
    )
    // .or(
    //   `and(planned_start_at.is.null,planned_end_at.gte.${from},planned_end_at.lte.${to}),and(planned_end_at.is.null,planned_start_at.gte.${from},planned_start_at.lte.${to}),and(planned_start_at.gte.${from},planned_end_at.lte.${to})`,
    // )
    .throwOnError();
}

export async function getAllMovimentationDeadlinesByMovimentation(movimentationId: number) {
  return await supabase
    .from("MovimentationDeadline")
    .select(
      `
        *, 
        movimentation:Movimentation!movimentation_id(*, product:Product!product_id(*),   productionFlow:ProductionFlow!production_flow_id(*)),
        departament:Departament!departament_id(*)
    `,
    )
    .eq("movimentation_id", movimentationId)
    .throwOnError();
}

export async function getOneMovimentationDeadline(movimentationDeadlineId: number) {
  return await supabase
    .from("Product")
    .select(
      `
        *, 
        movimentation:Movimentation!movimentation_id(*),
        departament:Departament!departament_id(*),
    `,
    )
    .eq("id", movimentationDeadlineId)
    .single()
    .throwOnError();
}

export async function createMovimentationDeadline(createData: CreateMovimentationDeadlineData) {
  return await supabase.from("MovimentationDeadline").insert(createData).throwOnError();
}

export async function updateMovimentationDeadline(
  movimentationDeadlineId: number,
  updateData: UpdateMovimentationDeadlineData,
) {
  return await supabase
    .from("MovimentationDeadline")
    .update(updateData)
    .eq("id", movimentationDeadlineId)
    .select()
    .single()
    .throwOnError();
}

export async function deleteMovimentationDeadline(movimentationDeadlineId: number) {
  return await supabase
    .from("MovimentationDeadline")
    .delete()
    .eq("id", movimentationDeadlineId)
    .throwOnError();
}
