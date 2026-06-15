import { supabase } from "@/lib/supabase/client";
import { DailyGoal } from "@/types/database.type";
import { format } from "date-fns";

export type CreateMetaData = Omit<DailyGoal, "id" | "created_at" | "updated_at">;
export type UpdateMetaData = Partial<CreateMetaData>;

export async function getAllMetas() {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .throwOnError();
}

export async function getOneMeta(metaId: number) {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("id", metaId)
    .single()
    .throwOnError();
}

export async function getAllMetasByDepartament(departamentId: number) {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("departament_id", departamentId)
    .throwOnError();
}

export async function createMeta(data: CreateMetaData) {
  return await supabase.from("DailyGoal").insert(data).select().single().throwOnError();
}

export async function updateMeta(metaId: number, data: UpdateMetaData) {
  return await supabase.from("DailyGoal").update(data).eq("id", metaId).throwOnError();
}

export async function deleteMeta(metaId: number) {
  return await supabase.from("DailyGoal").delete().eq("id", metaId).throwOnError();
}

export async function getAllMetasInRange(from: Date, to: Date, deadlineId: number) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("deadline_id", deadlineId)
    .gte("ref_date", fromDate)
    .lte("ref_date", toDate)
    .throwOnError();
}

export async function getAllGoalsInRangeByDeadlines(from: Date, to: Date, deadlineIds: number[]) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return await supabase
    .from("DailyGoal")
    .select("*, deadline:ProductionDeadline!deadline_id(*)")
    .in("deadline_id", deadlineIds)
    .gte("ref_date", fromDate)
    .lte("ref_date", toDate)
    .throwOnError();
}
