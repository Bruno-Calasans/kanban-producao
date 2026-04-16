"use client";

import { toast } from "sonner";
import MoveButton from "@/components/custom/buttons/MoveButton";
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation";
import { useState } from "react";
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField";
import { defaultMovimentationFormValues, useAppForm, formSchema } from "./movimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup";
import useDialog from "@/hooks/dialog/useDialog";
import { Product, ProductWithProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";

export default function CreateMovimentationForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync: createMovimentation, isPending: isCreateMovimentationPending } =
    useCreateMovimentation();
  const { mutateAsync: createProcessExecution, isPending: isCreateProcessExecutionPending } =
    useCreateProcessExecution();
  const [product, setProduct] = useState<ProductWithProductionFlow>();

  const form = useAppForm({
    defaultValues: defaultMovimentationFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product) return;
      const { amount } = value;
      try {
        const { data: createdMovimentation } = await createMovimentation({
          product_id: product.id,
          amount,
          status: "PENDING",
        });

        const { data: processFlows } = await getAllProductionFlowTemplates(
          product.production_flow.id,
        );

        await createProcessExecution({
          from_process_id: null,
          process_id: processFlows[0].process.id,
          amount: createdMovimentation.amount,
          movimentation_id: createdMovimentation.id,
          responsible_id: null,
          product_id: product.id,
          type: "INIT",
          status: "SUCCESS",
        });

        toast.success("Produto movimentado com sucesso!");
        closeDialog("create-movimentation");
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível movimentar. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.reset();
    setProduct(undefined);
  };

  const isPending = isCreateMovimentationPending || isCreateProcessExecutionPending;

  return (
    <form
      id="create-movimentation-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <MovimentationProductNameField form={form} selectedProduct={product} onChange={setProduct} />

      {/* Aviso se produto não tem quantidade para mover */}
      {/* {product && !canMoveProuct && <CantMoveProductWarn product={product} />} */}

      {/* Campo de quantidade, checkbox  de quantidade máxima */}
      {product && <MovimentationAmountFieldGroup form={form} selectedProduct={product} />}

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <MoveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
