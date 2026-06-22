import { supabase } from "@/lib/supabase/client";
import { Production } from "@/types/database.type";

export type CreateProductionData = Omit<Production, "id" | "created_at" | "updated_at">;
export type UpdateProductionData = Partial<Production>;
export type DeleteProductionData = { productionId: number };

export async function getAllProductions() {
  return await supabase
    .from("Production")
    .select(
      `
        *,
        product:Product!product_id(*),
        productionFlow:ProductionFlow!production_flow_id(*)
        `,
    )
    .throwOnError();
}

export async function getOneProductionById(id: number) {
  return await supabase
    .from("Production")
    .select(
      `
        *,
        product:Product!product_id(*),
        productionFlow:ProductionFlow!production_flow_id(*)
        `,
    )
    .eq("id", id)
    .maybeSingle()
    .throwOnError();
}

export async function createProduction(data: CreateProductionData) {
  return await supabase
    .from("Production")
    .insert(data)
    .select(
      `
      *,
      product:Product(*),
      productionFlow:ProductionFlow!production_flow_id(*)
    `,
    )
    .single()
    .throwOnError();
}

export async function updateProduction(productionId: number, updateData: UpdateProductionData) {
  return await supabase
    .from("Production")
    .update(updateData)
    .eq("id", productionId)
    .select()
    .maybeSingle()
    .throwOnError();
}

export async function deleteProduction({ productionId }: DeleteProductionData) {
  await supabase.from("Production").delete().eq("id", productionId).throwOnError();
}

export async function getAllProductionsByProduct(productId: number) {
  return await supabase
    .from("Production")
    .select(
      `
        *,
        product:Product!product_id(*),
        productionFlow:ProductionFlow!production_flow_id(*)
        `,
    )
    .eq("product_id", productId)
    .throwOnError();
}

export async function getAllProductionsByProductionFlow(productionFlowId: number) {
  return await supabase
    .from("Production")
    .select(
      `
        *,
      product:Product!product_id(*),
      productionFlow:ProductionFlow!production_flow_id(*)
        `,
    )
    .eq("production_flow_id", productionFlowId)
    .throwOnError();
}

export async function getAllActiveProductions() {
  return await supabase
    .from("Production")
    .select(
      `
        *,
        product:Product!product_id(*),
        productionFlow:ProductionFlow!production_flow_id(*)
        `,
    )
    .notIn("status", ["COMPLETED", "CANCELLED"])
    .throwOnError();
}
