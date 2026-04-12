import { supabase } from "@/lib/supabase/client";
import { ProductionFlow } from "@/types/database.type";

export type CreateProductionFlowData = Omit<ProductionFlow, "id" | "created_at" | "updated_at">;
export type UpdateproductionFlowData = Partial<CreateProductionFlowData>;

export async function getAllProductionFlows() {
  return await supabase
    .from("ProductionFlow")
    .select("*")
    .order("is_default", { ascending: false });
}

export async function getOneProductionFlow(templateId: number) {
  return await supabase
    .from("ProductionFlow")
    .select("*")
    .eq("id", templateId)
    .maybeSingle()
    .throwOnError();
}

export async function createProductionFlow(data: CreateProductionFlowData) {
  return await supabase.from("ProductionFlow").insert(data).select().single().throwOnError();
}

export async function updateProductionFlow(templateId: number, data: UpdateproductionFlowData) {
  return await supabase
    .from("ProductionFlow")
    .update(data)
    .eq("id", templateId)
    .select()
    .single()
    .throwOnError();
}

export async function deleteProductionFlow(templateId: number) {
  return await supabase.from("ProductionFlow").delete().eq("id", templateId).throwOnError();
}

export async function setDefaultProductionFlow(templateId: number) {
  return await supabase
    .from("ProductionFlow")
    .update({ is_default: true })
    .eq("id", templateId)
    .throwOnError();
}
