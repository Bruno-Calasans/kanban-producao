import { supabase } from "@/lib/supabase/client";


export type CreateDepartamentData = {
    name: string;
    sequence: number;
}

export type UpdateDepartamentData = Partial<CreateDepartamentData>

export async function getAllDepartaments() {
    return await supabase
        .from("Departament")
        .select("*")
        .order("is_default", { ascending: false })
        .throwOnError()
}

export async function getOneDepartament(departamentId: number) {
    return await supabase
        .from("Departament")
        .select("*")
        .eq("id", departamentId)
        .single()
        .throwOnError()
}

export async function getDepartamentByName(departamentName: string) {
    return await supabase
        .from("Departament")
        .select("*")
        .eq("name", departamentName)
        .throwOnError()
}

export async function createDepartament(data: CreateDepartamentData) {
    return await supabase
        .from("Departament")
        .insert(data)
        .throwOnError()
}

export async function updateDepartament(id: number, data: UpdateDepartamentData) {
    return await supabase
        .from("Departament")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteDepartament(departamentId: number) {
    return await supabase
        .from("Departament")
        .delete()
        .eq("id", departamentId)
        .throwOnError()
}

export async function setDefaultDepartament(id: number) {
    return await supabase
        .from("Departament")
        .update({ is_default: true })
        .eq("id", id)
        .throwOnError()
}
