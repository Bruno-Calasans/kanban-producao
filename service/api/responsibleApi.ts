import { supabase } from "@/lib/supabase/client";

export type CreateResponsibleData = {
    name: string
    departament_id: number
}

export type UpdateResponsibleData = Partial<CreateResponsibleData>

export async function getAllResponsibles() {
    return await supabase
        .from("Responsible")
        .select(`
        id,
        name,
        created_at,
        updated_at,
        departament:Departament (
            id,
            name,
            order,
            created_at,
            updated_at,
            is_default
        )    
        `)
        .throwOnError()
}


export async function getAllResponsiblesByDepartamentId(departamentId: number) {
    return await supabase
        .from("Responsible")
        .select(`
        id,
        name,
        created_at,
        updated_at,
        departament:Departament (
            id,
            name,
            order,
            created_at,
            updated_at,
            is_default
        )    
        `)
        .eq("departament_id", departamentId)
        .throwOnError()
}

export async function createResponsible(data: CreateResponsibleData) {
    return await supabase
        .from("Responsible")
        .insert(data)
        .throwOnError()
}

export async function updateResponsible(id: number, data: UpdateResponsibleData) {
    return await supabase
        .from("Responsible")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteResponsible(id: number) {
    return await supabase
        .from("Responsible")
        .delete()
        .eq("id", id)
        .throwOnError()
}
