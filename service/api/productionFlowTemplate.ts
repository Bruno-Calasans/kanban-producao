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

export async function getAllFlowTemplates() {
  return await supabase
    .from("ProductionFlowTemplate")
    .select(
      `*,
        departament:Departament!departament_id(*)
        `,
    )
    .order("sequence", { ascending: true })
    .throwOnError();
}

export async function getAllFlowTemplatesByProductionFlow(productionFlowId: number) {
  return await supabase
    .from("ProductionFlowTemplate")
    .select(
      `*,
        departament:Departament!departament_id(*)
        `,
    )
    .eq("production_flow_id", productionFlowId)
    .order("sequence", { ascending: true })
    .throwOnError();
}

export async function deleteFlowTemplates(flowTemplateIds: number[]) {
  return await supabase
    .from("ProductionFlowTemplate")
    .delete()
    .in("id", flowTemplateIds)
    .throwOnError();
}

export async function getAllFlowTemplatesByProcess(processId: number) {
  return await supabase
    .from("ProductionFlowTemplate")
    .select("process_id")
    .eq("process_id", processId)
    .throwOnError();
}

export async function getAllFlowTemplatesByDepartament(departamentId: number) {
  return await supabase
    .from("ProductionFlowTemplate")
    .select(
      `
    departament:Departament!inner(*)
  `,
    )
    .eq("departament.id", departamentId)
    .throwOnError();
}
