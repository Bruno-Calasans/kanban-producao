import { supabase } from "@/lib/supabase/client";
import { Meta } from "@/types/database.type";

export type CreateMetaData = Omit<Meta, "id" | "created_at" | "updated_at">;

export type UpdateMetaData = Partial<CreateMetaData>;

export async function getAllMetas() {
  return await supabase
    .from("Meta")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .throwOnError();
}

export async function getOneMeta(metaId: number) {
  return await supabase
    .from("Meta")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("id", metaId)
    .single()
    .throwOnError();
}

export async function getAllMetasByDepartament(departamentId: number) {
  return await supabase
    .from("Meta")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .eq("departament_id", departamentId)
    .throwOnError();
}

export async function createMeta(data: CreateMetaData) {
  return await supabase.from("Meta").insert(data).throwOnError();
}

export async function updateMeta(metaId: number, data: UpdateMetaData) {
  return await supabase.from("Meta").update(data).eq("id", metaId).throwOnError();
}

export async function deleteMeta(metaId: number) {
  return await supabase.from("Meta").delete().eq("id", metaId).throwOnError();
}

export async function getAllMetasInRange(from: Date, to: Date) {
  const fromDate = from.toISOString();
  const toDate = to.toISOString();

  return await supabase
    .from("Meta")
    .select("*, deadline:MovimentationDeadline!deadline_id(*)")
    .or(`ref_date.gte.${fromDate},ref_date.lte.${toDate}`)
    .throwOnError();
}
