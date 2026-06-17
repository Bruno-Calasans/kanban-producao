import { supabase } from "@/lib/supabase/client";
import { ProductionDeadlineLog } from "@/types/database.type";

export type CreateProductionDeadlineLogData = Omit<
  ProductionDeadlineLog,
  "id" | "created_at" | "updated_at"
>;

export async function createProductionDeadlineLog(data: CreateProductionDeadlineLogData) {
  return await supabase.from("ProductionDeadlineLog").insert(data).throwOnError();
}

export async function getAllProductionDeadlineLogsByDeadlines(deadlinesId: number[]) {
  return await supabase
    .from("ProductionDeadlineLog")
    .select(
      `*, 
      deadline:ProductionDeadline!deadline_id(*, 
         departament:Departament!departament_id(*)
      )`,
    )
    .in("deadline_id", deadlinesId)
    .order("created_at", { ascending: false })
    .throwOnError();
}
