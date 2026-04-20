import { supabase } from "@/lib/supabase/client";
import { ProductionFlow } from "@/types/database.type";

export type CreateProductionFlowData = Omit<ProductionFlow, "id" | "created_at" | "updated_at">;
export type UpdateproductionFlowData = Partial<CreateProductionFlowData>;

export async function getAllProductionFlows() {
  return await supabase
    .from("ProductionFlow")
    .select("*")
    .order("is_default", { ascending: false })
    .throwOnError();
}

export async function getAllActiveProductionFlows() {
  return await supabase
    .from("ProductionFlow")
    .select("*")
    .order("is_default", { ascending: false })
    .eq("is_active", true)
    .throwOnError();
}

export async function getOneProductionFlow(productionFlowId: number) {
  return await supabase
    .from("ProductionFlow")
    .select("*")
    .eq("id", productionFlowId)
    .maybeSingle()
    .throwOnError();
}

export async function createProductionFlow(data: CreateProductionFlowData) {
  return await supabase.from("ProductionFlow").insert(data).select().single().throwOnError();
}

export async function updateProductionFlow(
  productionFlowId: number,
  data: UpdateproductionFlowData,
) {
  return await supabase
    .from("ProductionFlow")
    .update(data)
    .eq("id", productionFlowId)
    .select()
    .single()
    .throwOnError();
}

export async function deleteProductionFlow(productionFlowId: number) {
  return await supabase.from("ProductionFlow").delete().eq("id", productionFlowId).throwOnError();
}

export async function setDefaultProductionFlow(productionFlowId: number) {
  return await supabase
    .from("ProductionFlow")
    .update({ is_default: true })
    .eq("id", productionFlowId)
    .throwOnError();
}

export async function getDefaultProductionFlow() {
  return await supabase.from("ProductionFlow").select("*").limit(1).eq("is_default", true).single();
}
