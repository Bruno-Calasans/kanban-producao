import { supabase } from "@/lib/supabase/client";
import { Movimentation } from "@/types/database.type";

export type CreateMovimentationtData = Omit<Movimentation, "id" | "created_at" | "updated_at">;
export type UpdateMovimentationData = Partial<CreateMovimentationtData>;
export type DeleteMovimentationData = { movimentationId: number; productId: number };

export async function getAllMovimentations() {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        product:Product!product_id(*)`,
    )
    .throwOnError();
}

export async function getOneMovimentationById(id: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        product:Product!product_id(*)`,
    )
    .eq("id", id)
    .single()
    .throwOnError();
}

export async function getLastProductMovimentation(productId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        product:Product!product_id(*)`,
    )
    .order("created_at", { ascending: false })
    .eq("product_id", productId)
    .limit(1)
    .maybeSingle()
    .throwOnError();
}

export async function createMovimentation(data: CreateMovimentationtData) {
  return await supabase.from("Movimentation").insert(data).select().single().throwOnError();
}

export async function updateMovimentation(
  movimentationId: number,
  updateData: UpdateMovimentationData,
) {
  return await supabase
    .from("Movimentation")
    .update(updateData)
    .eq("id", movimentationId)
    .throwOnError();
}

export async function deleteMovimentation({ movimentationId, productId }: DeleteMovimentationData) {
  await supabase.from("Movimentation").delete().eq("id", movimentationId).throwOnError();
}

export async function getAllMovimentationsByProduct(productId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        product:Product!product_id(*)`,
    )
    .eq("product_id", productId)
    .throwOnError();
}
