import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/database.type";

export type CreateProductData = Omit<Product, "id" | "created_at" | "updated_at">
export type UpdateProductData = Partial<CreateProductData>

export async function getAllProducts() {
    return await supabase
        .from("Product")
        .select(`
            id,
            name,
            op,
            max_amount,
            created_at,
            updated_at,
            departament:Departament!departament_id(*),
            process:Process!process_id(*),
            responsible:Responsible!responsible_id(*)
        `)
        .throwOnError()
}

export async function createProduct(data: CreateProductData) {
    return await supabase
        .from("Product")
        .insert(data)
        .throwOnError()
}

export async function updateProduct(id: number, data: UpdateProductData) {
    return await supabase
        .from("Product")
        .update(data)
        .eq("id", id)
        .throwOnError()
}

export async function deleteProduct(id: number) {
    return await supabase
        .from("Product")
        .delete()
        .eq("id", id)
        .throwOnError()
}
