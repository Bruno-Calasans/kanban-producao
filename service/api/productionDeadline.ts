import { supabase } from "@/lib/supabase/client";
import { ProductionDeadline } from "@/types/database.type";

export type CreateProductionDeadlineData = Omit<
  ProductionDeadline,
  "id" | "created_at" | "updated_at"
>;
export type UpdateProductionDeadlineData = Partial<CreateProductionDeadlineData>;

export async function getAllProductionDeadlines() {
  return await supabase
    .from("ProductionDeadline")
    .select(
      `
        *, 
        production:Production!production_id(*),
        departament:Departament!departament_id(*)
    `,
    )
    .throwOnError();
}

export async function getAllProductionDeadlinesWithProduct() {
  return await supabase
    .from("ProductionDeadline")
    .select(
      `
        *, 
         production:Production!production_id(
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

export async function getAllProductionDeadlinesInRange(fromDate: Date, toDate: Date) {
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);
  const from = fromDate.toISOString();
  const to = toDate.toISOString();

  return await supabase
    .from("ProductionDeadline")
    .select(
      `
        *, 
        production:Production!production_id(  
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

export async function getAllDeadlinesByProduction(productionId: number) {
  return await supabase
    .from("ProductionDeadline")
    .select(
      `
        *, 
        production:Production!production_id(*, product:Product!product_id(*),   productionFlow:ProductionFlow!production_flow_id(*)),
        departament:Departament!departament_id(*)
    `,
    )
    .eq("production_id", productionId)
    .throwOnError();
}

export async function getOneProductionDeadline(productionDeadlineId: number) {
  return await supabase
    .from("Product")
    .select(
      `
        *, 
         production:Production!production_id(*),
        departament:Departament!departament_id(*)
    `,
    )
    .eq("id", productionDeadlineId)
    .single()
    .throwOnError();
}

export async function createProductionnDeadline(createData: CreateProductionDeadlineData) {
  return await supabase.from("ProductionDeadline").insert(createData).throwOnError();
}

export async function updateProductionDeadline(
  productionDeadlineId: number,
  updateData: UpdateProductionDeadlineData,
) {
  return await supabase
    .from("ProductionDeadline")
    .update(updateData)
    .eq("id", productionDeadlineId)
    .select()
    .single()
    .throwOnError();
}

export async function deleteProductionDeadline(productionDeadlineId: number) {
  return await supabase
    .from("ProductionDeadline")
    .delete()
    .eq("id", productionDeadlineId)
    .throwOnError();
}
