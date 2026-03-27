import { supabase } from "@/lib/supabase/client";


export type CreateProcesstData = {
    name: string
    order: number
    departament_id: number
}

export type UpdateProcessData = Partial<CreateProcesstData>

export async function getAllProcesses() {
    return await supabase
        .from("Process")
        .select(`
        id,
        name,
        order,
        created_at,
        updated_at,
        departament:Departament (
            id,
            name,
            order,
            created_at,
            updated_at
        )    
        `)
        .throwOnError()
}

export async function createProcess(data: CreateProcesstData) {
    return await supabase
        .from("Process")
        .insert(data)
        .throwOnError()
}

export async function updateProcess(id: number, data: UpdateProcessData) {
    return await supabase
        .from("Process")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteProcess(id: number) {
    return await supabase
        .from("Process")
        .delete()
        .eq("id", id)
        .throwOnError()
}
