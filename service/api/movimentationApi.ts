import { supabase } from "@/lib/supabase/client";
import { Movimentation, MovimentationPopulated } from "@/types/database.type";
import { updateProduct } from "./productApi";
import { getDefaultDepartamentAndProcess } from "./configurationApi";


export type CreateMovimentationtData = Omit<Movimentation, "id" | "created_at" | "updated_at">
export type UpdateMovimentationData = Partial<CreateMovimentationtData>
export type DeleteMovimentationData = { movimentationId: number, productId: number }

export async function getAllMovimentations() {
    return await supabase
        .from("Movimentation")
        .select(`
        *,
        product:Product!product_id(*),
        from_departament:Departament!from_departament_id(*),
        to_departament:Departament!to_departament_id(*),
        from_process:Process!from_process_id(*),
        to_process:Process!to_process_id(*)`)
        .throwOnError()
}


export async function getOneMovimentationById(id: number) {
    return await supabase
        .from("Movimentation")
        .select(`
        *,
        product:Product!product_id(*),
        from_departament:Departament!from_departament_id(*),
        to_departament:Departament!to_departament_id(*),
        from_process:Process!from_process_id(*),
        to_process:Process!to_process_id(*)`)
        .eq("id", id)
        .throwOnError()
}


export async function getLastProductMovimentation(productId: number) {
    return await supabase
        .from("Movimentation")
        .select(`
        *,
        product:Product!product_id(*),
        from_departament:Departament!from_departament_id(*),
        to_departament:Departament!to_departament_id(*),
        from_process:Process!from_process_id(*),
        to_process:Process!to_process_id(*)`)
        .order("created_at", { ascending: false })
        .eq("product_id", productId)
        .limit(1)
        .maybeSingle()
        .throwOnError()
}


export async function createMovimentation(data: CreateMovimentationtData) {
    return await supabase
        .from("Movimentation")
        .insert(data)
        .throwOnError()
}

export async function updateMovimentation(movimentationId: number, updateData: UpdateMovimentationData) {
    return await supabase
        .from("Movimentation")
        .update(updateData)
        .eq("id", movimentationId)
        .throwOnError()
}


export async function deleteMovimentation({ movimentationId, productId }: DeleteMovimentationData) {
    await supabase
        .from("Movimentation")
        .delete()
        .eq("id", movimentationId)
        .throwOnError()

}


