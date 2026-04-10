import { supabase } from "@/lib/supabase/client";
import { Responsible } from "@/types/database.type";

export type CreateResponsibleData = Omit<Responsible, "id" | "created_at" | "updated_at">

export type UpdateResponsibleData = Partial<CreateResponsibleData>

export async function getAllResponsibles() {
    return await supabase
        .from("Responsible")
        .select("*, departament:Departament!departament_id(*)")
        .throwOnError()
}

export async function getOneResponsible(responsibleId: number) {
    return await supabase
        .from("Responsible")
        .select("*, departament:Departament!departament_id(*)")
        .eq("id", responsibleId)
        .single()
        .throwOnError()
}


export async function getAllResponsiblesByDepartament(departamentId: number) {
    return await supabase
        .from("Responsible")
        .select("*, departament:Departament!departament_id(*)")
        .eq("departament_id", departamentId)
        .throwOnError()
}

export async function createResponsible(data: CreateResponsibleData) {
    return await supabase
        .from("Responsible")
        .insert(data)
        .throwOnError()
}

export async function updateResponsible(responsibleId: number, data: UpdateResponsibleData) {
    return await supabase
        .from("Responsible")
        .update(data)
        .eq("id", responsibleId)
        .throwOnError()
}

export async function deleteResponsible(responsibleId: number) {
    return await supabase
        .from("Responsible")
        .delete()
        .eq("id", responsibleId)
        .throwOnError()
}
