import { supabase } from "@/lib/supabase/client";
import { Departament } from "@/types/database.type";

export type CreateDepartamentData = Omit<Departament, "id" | "created_at" | "updated_at">;
export type UpdateDepartamentData = Partial<CreateDepartamentData>;

export async function getAllDepartaments() {
  return await supabase
    .from("Departament")
    .select("*")
    .order("created_at", { ascending: true })
    .throwOnError();
}

export async function getAllActiveDepartaments() {
  return await supabase
    .from("Departament")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .throwOnError();
}

export async function getAllActiveExternalDepartaments() {
  return await supabase
    .from("Departament")
    .select("*")
    .eq("is_active", true)
    .eq("is_external", true)
    .order("created_at", { ascending: true })
    .throwOnError();
}

export async function getAllActiveInternalDepartaments() {
  return await supabase
    .from("Departament")
    .select("*")
    .eq("is_active", true)
    .eq("is_external", false)
    .order("created_at", { ascending: true })
    .throwOnError();
}

export async function getOneDepartament(departamentId: number) {
  return await supabase
    .from("Departament")
    .select("*")
    .eq("id", departamentId)
    .single()
    .throwOnError();
}

export async function getDepartamentByName(departamentName: string) {
  return await supabase.from("Departament").select("*").eq("name", departamentName).throwOnError();
}

export async function createDepartament(data: CreateDepartamentData) {
  return await supabase.from("Departament").insert(data).throwOnError();
}

export async function updateDepartament(id: number, data: UpdateDepartamentData) {
  return await supabase.from("Departament").update(data).eq("id", id).throwOnError();
}

export async function deleteDepartament(departamentId: number) {
  return await supabase.from("Departament").delete().eq("id", departamentId).throwOnError();
}
