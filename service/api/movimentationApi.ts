import { supabase } from "@/lib/supabase/client";
import { Movimentation, MovimentationPopulated } from "@/types/database.type";


export type CreateMovimentationtData = Omit<Movimentation, "id" | "created_at" | "updated_at">

export type UpdateMovimentationData = Partial<CreateMovimentationtData>

export async function getAllMovimentations() {
    return await supabase
        .from("Movimentation")
        .select(`
        id,
        product:Product!product_id (
            id,
            name,
            max_amount,
            op,
            departament_id,
            process_id,
            responsible_id,
            created_at,
            updated_at
        ),
        departamentOrigin:Departament!departament_origin_id (
            id,
            name,
            order,
            created_at,
            updated_at
        )   ,
        departamentDestination:Departament!departament_destination_id (
            id,
            name,
            order,
            created_at,
            updated_at
        ),
        processOrigin:Process!process_origin_id (
            id,
            name,
            order,
            departament_id,
            created_at,
            updated_at
        ),
        processDestination:Process!process_destination_id (
            id,
            name,
            order,
            departament_id,
            created_at,
            updated_at
        ),
        created_at
        `)
        .throwOnError()
}


export async function getOneMovimentationById(id: number) {
    return await supabase
        .from("Movimentation")
        .select(`
        id,
        product_id:Product (
            id,
            name,
            max_amount
        ),
        departamentOrigin:Departament!departament_origin_id (
            id,
            name,
            order,
            created_at,
            updated_at
        )   ,
        departamentDestination:Departament!departament_destination_id (
            id,
            name,
            order,
            created_at,
            updated_at
        ),
        processOrigin:Process!process_origin_id (
            id,
            name,
            order,
            created_at,
            updated_at
        ),
        processDestination:Process!process_destination_id (
            id,
            name,
            order,
            created_at,
            updated_at
        )  
        `)
        .eq("id", id)
        .throwOnError()
}


export async function createMovimentation(data: CreateMovimentationtData) {
    return await supabase
        .from("Movimentation")
        .insert(data)
        .throwOnError()
}

export async function updateMovimentation(id: number, data: UpdateMovimentationData) {
    return await supabase
        .from("Movimentation")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteMovimentation(id: number) {
    return await supabase
        .from("Movimentation")
        .delete()
        .eq("id", id)
        .throwOnError()
}
