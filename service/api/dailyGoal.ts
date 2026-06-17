import { supabase } from "@/lib/supabase/client";
import { DailyGoal } from "@/types/database.type";
import { format } from "date-fns";

export type CreateDailyGoalData = Omit<DailyGoal, "id" | "created_at" | "updated_at">;
export type UpdateDailyGoalData = Partial<DailyGoal>;

export async function getAllDailyGoals() {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .throwOnError();
}

export async function getOneDailyGoal(goalId: number) {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("id", goalId)
    .single()
    .throwOnError();
}

export async function getAllDailyGoalsByDepartament(departamentId: number) {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("departament_id", departamentId)
    .throwOnError();
}

export async function createDailyGoal(data: CreateDailyGoalData) {
  return await supabase.from("DailyGoal").insert(data).select().single().throwOnError();
}

export async function updateDailyGoal(goalId: number, data: UpdateDailyGoalData) {
  return await supabase.from("DailyGoal").update(data).eq("id", goalId).throwOnError();
}

export async function deleteDailyGoal(goalId: number) {
  return await supabase.from("DailyGoal").delete().eq("id", goalId).throwOnError();
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
    // .gte("ref_date", fromDate)
    // .lte("ref_date", toDate)
    .throwOnError();
}

export async function getAllGoalsByDeadlines(deadlineIds: number[]) {
  return await supabase
    .from("DailyGoal")
    .select("*, deadline:ProductionDeadline!deadline_id(*)")
    .in("deadline_id", deadlineIds)
    .throwOnError();
}
