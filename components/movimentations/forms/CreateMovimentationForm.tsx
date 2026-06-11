"use client";

import { toast } from "sonner";
import MoveButton from "@/components/custom/buttons/MoveButton";
import useCreateMovimentation from "@/hooks/production/useCreateProduction";
import { useState } from "react";
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField";
import { defaultMovimentationFormValues, useAppForm, formSchema } from "./movimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup";
import useDialog from "@/hooks/dialog/useDialog";
import { Product, ProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import useCreateProcessExecution from "@/hooks/movimentation/useCreateMovimentation";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import CreateManySwitch from "@/components/custom/CreateManySwitch";
import { MovimentationProductionFlowField } from "./fields/MovimentationProductionFlowField";

type CreateMovimentationFormProps = {
  defaultProduct?: Product;
};

export default function CreateMovimentationForm({ defaultProduct }: CreateMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createMovimentation, isPending: isCreateMovimentationPending } =
    useCreateMovimentation();
  const { mutateAsync: createProcessExecution, isPending: isCreateProcessExecutionPending } =
    useCreateProcessExecution();
  const [product, setProduct] = useState<Product>();
  const [many, setMany] = useState<boolean>(false);
  const [productionFlow, setProductionFlow] = useState<ProductionFlow>();

  const form = useAppForm({
    defaultValues: defaultMovimentationFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product || !productionFlow) return;
      const { amount } = value;
      try {
        const { data: createdMovimentation } = await createMovimentation({
          amount,
          product_id: product.id,
          status: "PENDING",
          production_flow_id: productionFlow.id,
        });

        const { data: processFlows } = await getAllProductionFlowTemplates(productionFlow.id);

        await createProcessExecution({
          createData: {
            from_process_id: null,
            process_id: processFlows[0].process.id,
            amount: createdMovimentation.amount,
            movimentation_id: createdMovimentation.id,
            responsible_id: null,
            product_id: product.id,
            reason: "",
            type: "INIT",
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
          },
          movimentation: createdMovimentation,
        });

        toast.success("Produto movimentado com sucesso!");
        if (!many) closeDialog("create-movimentation");
        resetForm();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível movimentar. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.resetField("productName");
    form.resetField("amount");
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
      <MovimentationProductNameField
        form={form}
        defaultProduct={defaultProduct}
        selectedProduct={product}
        onChange={setProduct}
        disabled={!!defaultProduct}
      />

      <MovimentationAmountFieldGroup form={form} />

      <MovimentationProductionFlowField form={form} onChangeProductionFlow={setProductionFlow} />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CreateManySwitch value={many} onChangeValue={setMany} />
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <MoveButton title="Criar" isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
