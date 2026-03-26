import { supabase } from "@/lib/supabase/client";


export type CreateDepartamentData = {
    name: string;
    order: number;
}

export type UpdateDepartamentData = Partial<CreateDepartamentData>

export async function getAllDepartaments() {
    return await supabase
        .from("Departament")
        .select("*")
        .throwOnError()
}

export async function getDepartamentById(id: number) {
    return await supabase
        .from("Departament")
        .select("*")
        .eq("id", id)
        .throwOnError()
}

export async function getDepartamentByName(departamentName: string) {
    return await supabase
        .from("Departament")
        .select("*")
        .eq("name", departamentName)
        .throwOnError()
}

export async function createDepartament(name: string, order: number) {
    return await supabase
        .from("Departament")
        .insert({ name, order })
        .throwOnError()
}

export async function updateDepartament(id: number, data: UpdateDepartamentData) {
    return await supabase
        .from("Departament")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteDepartament(id: number) {
    return await supabase
        .from("Departament")
        .delete()
        .eq("id", id)
        .throwOnError()
}