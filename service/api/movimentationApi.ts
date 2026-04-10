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


export async function getLastProductMovimentation(productId: number) {
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
        .order("created_at", { ascending: false })
        .eq("product_id", productId)
        .limit(1)
        .maybeSingle()
        .throwOnError()
}


export async function createMovimentation(data: CreateMovimentationtData) {
    const { product_id, departament_destination_id, process_destination_id } = data
    await updateProduct(product_id, {
        departament_id: departament_destination_id,
        process_id: process_destination_id
    })

    return await supabase
        .from("Movimentation")
        .insert(data)
        .throwOnError()
}

export async function updateMovimentation(movimentationId: number, data: UpdateMovimentationData) {
    return await supabase
        .from("Movimentation")
        .update(data)
        .eq("id", movimentationId)
        .throwOnError()
}


export async function deleteMovimentation({ movimentationId, productId }: DeleteMovimentationData) {
    await supabase
        .from("Movimentation")
        .delete()
        .eq("id", movimentationId)
        .throwOnError()

    // Atualiza produto com última movimentação
    const { data: lastMovimentation } = await getLastProductMovimentation(productId)

    if (lastMovimentation) {
        const { departamentDestination, processDestination } = lastMovimentation
        return await updateProduct(productId, {
            departament_id: departamentDestination.id,
            process_id: processDestination.id
        })
    }

    // Atualiza produto para departamento e processo padrões
    const { departament, process } = await getDefaultDepartamentAndProcess()

    if (departament && process) {
        return await updateProduct(productId, {
            departament_id: departament.id,
            process_id: process.id
        })
    }

}


