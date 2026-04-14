import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/database.type";

export type CreateProductData = Omit<Product, "id" | "created_at" | "updated_at">;
export type UpdateProductData = Partial<CreateProductData>;

export async function getAllProducts() {
  return await supabase
    .from("Product")
    .select("*, production_flow:ProductionFlow!production_flow_id(*)")
    .throwOnError();
}

export async function getOneProduct(productId: number) {
  return await supabase
    .from("Product")
    .select("*, production_flow:ProductionFlow!production_flow_id(*)")
    .eq("id", productId)
    .single()
    .throwOnError();
}

export async function createProduct(createData: CreateProductData) {
  return await supabase.from("Product").insert(createData).throwOnError();
}

export async function updateProduct(productId: number, updateData: UpdateProductData) {
  return await supabase.from("Product").update(updateData).eq("id", productId).throwOnError();
}

export async function deleteProduct(productId: number) {
  return await supabase.from("Product").delete().eq("id", productId).throwOnError();
}
