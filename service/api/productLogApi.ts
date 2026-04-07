import { supabase } from "@/lib/supabase/client";
import { ProductLog } from "@/types/database.type";


export type CreateProductLogData = Omit<ProductLog, "id" | "created_at" | "updated_at">
export type UpdateProductLogData = Partial<CreateProductLogData>
export type TotalAmountDoneData = {
    product_id: number
    process_id: number
    departament_id: number
}


export async function getAllProductLogs() {
    return await supabase
        .from("ProductLog")
        .select(`
        id,
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        process:Process!process_id(*),
        start_hour,
        end_hour,
        status,
        amount,
        remaining_amount,
        created_at,
        updated_at   
     `)
        .throwOnError()
}


export async function getOneProductLog(id: number) {
    return await supabase
        .from("ProductLog")
        .select(`
        id,
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        process:Process!process_id(*),
        start_hour,
        end_hour,
        status,
        amount,
        created_at,
        updated_at   
     `)
        .eq("id", id)
        .limit(1)
        .single()
        .throwOnError()
}


export async function getAllProductLogsByProduct(productId: number) {
    return await supabase
        .from("ProductLog")
        .select(`
        id,
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        process:Process!process_id(*),
        start_hour,
        end_hour,
        status,
        amount,
        remaining_amount,
        created_at,
        updated_at   
     `)
        .eq("product_id", productId)
        .throwOnError()
}


export async function getAllProductLogsByDepartament(departamentId: number) {
    return await supabase
        .from("ProductLog")
        .select(`
        id,
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        process:Process!process_id(*),
        start_hour,
        end_hour,
        status,
        amount,
        remaining_amount,
        created_at,
        updated_at   
     `)
        .eq("departament_id", departamentId)
        .throwOnError()
}


export async function getTotalAmountDone({ product_id, process_id, departament_id }: TotalAmountDoneData) {

    const { data } = await supabase
        .from("ProductLog")
        .select("*")
        .eq("product_id", product_id)
        .eq("process_id", process_id)
        .eq("departament_id", departament_id)
        .throwOnError()

    const amountDone = data.length > 0 ? data
        .map(productLog => productLog.amount)
        .reduce((previousAmount, currentAmount) => previousAmount + currentAmount, 0) :
        0

    return amountDone
}


export async function createProductLog(data: CreateProductLogData) {
    return await supabase
        .from("ProductLog")
        .insert(data)
        .throwOnError()
}


export async function updateProductLog(id: number, data: UpdateProductLogData) {
    return await supabase
        .from("ProductLog")
        .update(data)
        .eq("id", id)
        .throwOnError()
}


export async function deleteProductLog(id: number) {
    return await supabase
        .from("ProductLog")
        .delete()
        .eq("id", id)
        .throwOnError()
}