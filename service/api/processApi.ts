import { supabase } from "@/lib/supabase/client";
import { Process } from "@/types/database.type";

export type CreateProcesstData = Omit<Process, "id" | "created_at" | "updated_at">;
export type UpdateProcessData = Partial<CreateProcesstData>;

export async function getAllProcesses() {
  return await supabase
    .from("Process")
    .select("*, departament:Departament(*)")
    .order("sequence", { ascending: true })
    .throwOnError();
}

export async function getAllProcessesByDepartamentId(departamentId: number) {
  return await supabase
    .from("Process")
    .select("*")
    .eq("departament_id", departamentId)
    .order("sequence", { ascending: true })
    .throwOnError();
}

export async function createProcess(data: CreateProcesstData) {
  return await supabase.from("Process").insert(data).throwOnError();
}

export async function updateProcess(id: number, updateData: UpdateProcessData) {
  return await supabase.from("Process").update(updateData).eq("id", id).throwOnError();
}

export async function deleteProcess(id: number) {
  return await supabase.from("Process").delete().eq("id", id).throwOnError();
}
