import { supabase } from "@/lib/supabase/client";
import { ProductionFlowTemplate } from "@/types/database.type";

export type CreateProductionFlowTemplateData = Omit<
  ProductionFlowTemplate,
  "id" | "created_at" | "updated_at"
>;
export type UpdateProductionFlowTemplateData = Partial<ProductionFlowTemplate>;

export async function createProductionFlowTemplate(data: CreateProductionFlowTemplateData[]) {
  return await supabase.from("ProductionFlowTemplate").insert(data).throwOnError();
}

export async function getAllProductionFlowTemplates(productionFlowId: number) {
  return await supabase
    .from("ProductionFlowTemplate")
    .select(
      `*,
        process:Process!process_id(*,
          departament:Departament!departament_id(*)
        )
        `,
    )
    .eq("production_flow_id", productionFlowId)
    .order("sequence", { ascending: true, referencedTable: "process" })
    .throwOnError();
}

export async function updateFlowTemplate(
  flowTemplateId: number,
  data: UpdateProductionFlowTemplateData,
) {
  return await supabase
    .from("ProductionFlowTemplate")
    .upsert([])
    .eq("id", flowTemplateId)
    .throwOnError();
}

export async function deleteFlowTemplates(flowTemplateIds: number[]) {
  return await supabase
    .from("ProductionFlowTemplate")
    .delete()
    .in("id", flowTemplateIds)
    .throwOnError();
}
