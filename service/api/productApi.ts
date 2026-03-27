import { supabase } from "@/lib/supabase/client";

export type CreateProductData = {
    name: string
    max_amount?: number | null
    op?: number | null
}

export type UpdateProductData = Partial<CreateProductData>

export async function getAllProducts() {
    return await supabase
        .from("Product")
        .select("*")
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
