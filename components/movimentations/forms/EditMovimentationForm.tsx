"use client";

import { toast } from "sonner";
import { useState } from "react";
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField";
import { useAppForm, formSchema, MovimentationFormSchema } from "./movimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationPopulated, Product, ProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import SaveButton from "@/components/custom/buttons/SaveButton";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";
import useUpdateInicialExecution from "@/hooks/process-executation/useUpdateInicialExecution";
import { MovimentationProductionFlowField } from "./fields/MovimentationProductionFlowField";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";

type EditMovimentationFormProps = {
  movimentation: MovimentationPopulated;
  hideProductionFlowField?: boolean;
};

export default function EditMovimentationForm({
  movimentation,
  hideProductionFlowField,
}: EditMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateMovimentation, isPending: isMovimentationPending } =
    useUpdateMovimentation();
  const { mutateAsync: updateInitialExecution, isPending: isExecutionPending } =
    useUpdateInicialExecution();
  const [product, setProduct] = useState<Product>();
  const [productionFlow, setProductionFlow] = useState<ProductionFlow>();

  const form = useAppForm({
    defaultValues: {
      productName: movimentation.product.name,
      amount: movimentation.amount,
      productionFlow: movimentation.productionFlow.name,
      useMaxAmount: false,
    } as MovimentationFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product) return;
      const { amount } = value;
      const selectedProductionFlow = productionFlow ? productionFlow : movimentation.productionFlow;

      try {
        await updateMovimentation({
          movimentationId: movimentation.id,
          updateData: {
            amount,
            product_id: product.id,
            status: "PENDING",
            updated_at: new Date().toISOString(),
            production_flow_id: selectedProductionFlow.id,
          },
        });

        //  atualiza execução inicial
        const isProductionFlowDiff =
          productionFlow && movimentation.productionFlow.id != productionFlow.id;

        if (amount != movimentation.amount || isProductionFlowDiff) {
          const { data: templates } = await getAllProductionFlowTemplates(
            selectedProductionFlow.id,
          );
          const firstProcess = templates[0];

          await updateInitialExecution({
            movimentationId: movimentation.id,
            processId: firstProcess.process.id,
            amount,
          });
        }

        toast.success("Movimentação atualizado com sucesso!");
        closeDialog(`edit-movimentation-${movimentation.id}`);
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível atualizar a movimentação. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.reset({
      amount: movimentation.amount,
      productName: movimentation.product.name,
      productionFlow: movimentation.productionFlow.name,
    });
    setProduct(movimentation.product);
    setProductionFlow(movimentation.productionFlow);
  };

  const isPending = isMovimentationPending || isExecutionPending;

  return (
    <form
      id="edit-movimentation-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <MovimentationProductNameField
        form={form}
        defaultProduct={movimentation.product}
        selectedProduct={product}
        onChange={setProduct}
        disabled
      />

      <MovimentationAmountFieldGroup form={form} />

      <MovimentationProductionFlowField
        form={form}
        disabled={hideProductionFlowField}
        defaultProductionFlow={movimentation.productionFlow}
        selectedProductionFlow={productionFlow}
        onChangeProductionFlow={setProductionFlow}
      />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton label="Resetar" isLoading={isPending} onclick={resetForm} />
        <SaveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
