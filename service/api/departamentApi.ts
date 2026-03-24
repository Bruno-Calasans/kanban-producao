import { supabase } from "@/lib/supabase/client";


export type CreateDepartamentData = {
    name: string;
    order: number;
}

export type UpdateDepartamentData = Partial<CreateDepartamentData> & Required<{ id: number }>

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

export async function createDepartament(name: string, order: number) {
    return await supabase
        .from("Departament")
        .insert({ name, order })
        .throwOnError()
}

export async function updateDepartament(data: UpdateDepartamentData) {
    const { id, ...updateData } = data
    return await supabase
        .from("Departament")
        .update(updateData)
        .eq("id", data.id)
        .throwOnError()
}