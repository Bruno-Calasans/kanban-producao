import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/database.type";

export type CreateProductData = Omit<Product, "id" | "created_at" | "updated_at">
export type UpdateProductData = Partial<CreateProductData>

export async function getAllProducts() {
    return await supabase
        .from("Product")
        .select('*')
        .throwOnError()
}

export async function getOneProduct(productId: number) {
    return await supabase
        .from("Product")
        .select("*")
        .eq("id", productId)
        .single()
        .throwOnError()
}


export async function createProduct(data: CreateProductData) {
    return await supabase
        .from("Product")
        .insert(data)
        .throwOnError()
}

export async function updateProduct(productId: number, data: UpdateProductData) {
    return await supabase
        .from("Product")
        .update(data)
        .eq("id", productId)
        .throwOnError()
}

export async function deleteProduct(productId: number) {
    return await supabase
        .from("Product")
        .delete()
        .eq("id", productId)
        .throwOnError()
}
