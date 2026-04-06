import { supabase } from "@/lib/supabase/client";


export async function getDefaultDepartament() {
    return await supabase
        .from("Departament")
        .select("*")
        .eq("is_default", true)
        .limit(1)
        .single()
}

export async function getDefaultProcess() {
    return await supabase
        .from("Process")
        .select("*")
        .eq("is_default", true)
        .limit(1)
        .single()
}


export async function getDefaultDepartamentAndProcess() {
    const { data: departament } = await getDefaultDepartament()
    const { data: process } = await getDefaultProcess()

    return {
        departament,
        process
    }
}
