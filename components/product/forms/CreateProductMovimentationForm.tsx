"use client";

import { toast } from "sonner";
import MoveButton from "@/components/custom/buttons/MoveButton";
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation";
import {
  defaultMovimentationFormValues,
  useAppForm,
  formSchema,
} from "./ProductMovimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { Product, ProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import { ProductProductMovimentationAmountField } from "./fields/ProductMovimentationAmountField";
import { MovimentationProductionFlowField } from "@/components/movimentations/forms/fields/MovimentationProductionFlowField";
import { useState } from "react";
import { ProductProductionFlowField } from "./fields/ProductProductionFlowField";

type CreateProductMovimentationFormProps = {
  product: Product;
};

export default function CreateProductMovimentationForm({
  product,
}: CreateProductMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createMovimentation, isPending: isCreateMovimentationPending } =
    useCreateMovimentation();
  const { mutateAsync: createProcessExecution, isPending: isCreateProcessExecutionPending } =
    useCreateProcessExecution();
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<ProductionFlow>();

  const form = useAppForm({
    defaultValues: defaultMovimentationFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product || !selectedProductionFlow) return;
      const { amount } = value;
      try {
        const { data: createdMovimentation } = await createMovimentation({
          amount,
          product_id: product.id,
          status: "PENDING",
          production_flow_id: selectedProductionFlow.id,
        });

        const { data: processFlows } = await getAllProductionFlowTemplates(
          createdMovimentation.production_flow_id,
        );

        await createProcessExecution({
          createData: {
            from_process_id: null,
            process_id: processFlows[0].process.id,
            amount: createdMovimentation.amount,
            movimentation_id: createdMovimentation.id,
            responsible_id: null,
            product_id: product.id,
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
            type: "INIT",
            reason: "",
          },
          movimentation: createdMovimentation,
        });

        toast.success("Produto movimentado com sucesso!");
        closeDialog(`create-movimentation-${product.id}`);
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível movimentar. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.resetField("amount");
  };

  const isPending = isCreateMovimentationPending || isCreateProcessExecutionPending;

  return (
    <form
      id="create-product-movimentation-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ProductProductMovimentationAmountField form={form} />
      <ProductProductionFlowField
        form={form}
        selectedProductionFlow={selectedProductionFlow}
        onChangeProductionFlow={setSelectedProductionFlow}
      />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <MoveButton title="Criar" isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
