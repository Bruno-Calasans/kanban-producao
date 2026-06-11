/* eslint-disable prefer-const */
import { supabase } from "@/lib/supabase/client";
import { Movimentation, DepartamentState } from "@/types/database.type";

export type CreateMovimentationData = Omit<Movimentation, "id" | "created_at" | "updated_at">;
export type UpdateMovimentationData = Partial<CreateMovimentationData>;
export type MoveNextDepartamentData = {
  departamentStates: DepartamentState[];
  responsibleId: number | null;
  startedAt: string | null;
  finished_at: string | null;
  amount?: number;
};

export type UpdateInitialMovimentation = {
  movimentationId: number;
  departamentId: number;
  amount: number;
};

export async function getAllMovimentations() {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        production:Production!production_id(*),
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        from_departament:Departament!from_departament_id(*),
        responsible:Responsible!responsible_id(*)
        `,
    )
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getOneMovimentation(movimentationId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        production:Production!production_id(*),
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        from_departament:Departament!from_departament_id(*),
        responsible:Responsible!responsible_id(*)
        `,
    )
    .eq("id", movimentationId)
    .single()
    .throwOnError();
}

export async function createMovimentation(createData: CreateMovimentationData) {
  return await supabase.from("Movimentation").insert(createData).select().single().throwOnError();
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

export async function deleteMovimentation(movimentationId: number) {
  return await supabase.from("Movimentation").delete().eq("id", movimentationId).throwOnError();
}

export async function getAllMovimentationsByProduct(productId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        production:Production!production_id(*),
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        from_departament:Departament!from_departament_id(*),
        responsible:Responsible!responsible_id(*)
        `,
    )
    .eq("product_id", productId)
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getAllMovimentationsByProduction(productionId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
        *,
        production:Production!production_id(*),
        product:Product!product_id(*),
        departament:Departament!departament_id(*),
        from_departament:Departament!from_departament_id(*),
        responsible:Responsible!responsible_id(*)
        `,
    )
    .eq("production_id", productionId)
    .order("created_at", { ascending: false })
    .throwOnError();
}

export async function getAllMovimentationsByDepartament(departamentId: number) {
  let { data, ...rest } = await supabase
    .from("Movimentation")
    .select(
      `
      departament:Departament!movimentation_departament_fkey(*),
      from_departament:Departament!movimentation_from_departament_fkey(*)
    `,
    )
    .or(`and(departament_id.eq.${departamentId}, departament_id.not.is.null)`, {
      foreignTable: "departament",
    })
    .or(`and(from_departament.eq.${departamentId}, from_departament.not.is.null)`, {
      foreignTable: "from_departament",
    })
    .throwOnError();

  data = data.filter(
    ({ departament, from_departament }) => process != null && from_departament != null,
  );
  return { data, ...rest };
}

export async function getAllMovimentationsByProcess(processId: number) {
  return await supabase
    .from("Movimentation")
    .select(
      `
      departament_id,
      from_departament_id,
      type
    `,
    )
    .or(`departament_id.eq.${processId}, from_departament_id.eq.${processId}`)
    .throwOnError();
}

export async function getAllMovimentationsByResponsible(responsibleId: number) {
  return await supabase
    .from("Movimentation")
    .select("responsible_id")
    .eq("responsible_id", responsibleId)
    .throwOnError();
}

export async function updateInitialMovimentation({
  movimentationId,
  departamentId,
  amount,
}: UpdateInitialMovimentation) {
  return await supabase
    .from("Movimentation")
    .update({
      departament_id: departamentId,
      amount,
    })
    .select()
    .eq("movimentation_id", movimentationId)
    .eq("type", "INIT")
    .single()
    .throwOnError();
}

export async function moveToNextDepartament({
  startedAt,
  finished_at,
  responsibleId,
  amount,
  departamentStates,
}: MoveNextDepartamentData) {
  let movedAmount = 0;

  for (const state of departamentStates) {
    if (!state.nextDepartament) continue;

    const isFirstProcess = state.previousDepartament == null;

    const isFirstNextDepartamentDepartament = state.nextDepartament!.id != state.departament.id;

    const tempAmount = isFirstProcess ? state.avaliableAmount : state.avaliableAmount + movedAmount;
    const amountToMove = amount && amount > 0 && amount <= tempAmount ? amount : tempAmount;
    if (movedAmount == 0) movedAmount = amountToMove;

    const data = await createMovimentation({
      amount: amountToMove,
      from_departament: state.departament.id,
      production_id: state.production.id,
      departament_id: state.nextDepartament!.id,
      product_id: state.production.product.id,
      responsible_id: responsibleId,
      started_at: startedAt,
      finished_at: finished_at,
      type: "TRANSFER",
      reason: null,
    });

    if (isFirstNextDepartamentDepartament) return data;
  }
}
