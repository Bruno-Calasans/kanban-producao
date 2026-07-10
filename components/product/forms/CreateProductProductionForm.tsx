"use client";

import { toast } from "sonner";
import {
  defaultProductProductionFormValues,
  useAppForm,
  formSchema,
} from "./ProductProductionFormContext";
import { Product, ProductionFlow } from "@/types/database.type";
import { getAllFlowTemplatesByProductionFlow } from "@/service/api/productionFlowTemplate";
import { ProductProductProductionAmountField } from "./fields/ProductProductionAmountField";
import { useState } from "react";
import { ProductProductionFlowField } from "./fields/ProductProductionFlowField";
import { useCreateProduction } from "@/hooks/production/useCreateProduction";
import { useCreateMovimentation } from "@/hooks/movimentation/useCreateMovimentation";
import { DialogID } from "@/hooks/dialog/DialogContext";
import { ProductProductionOpField } from "./fields/ProductProductionOpField";
import MoveButton from "@/components/custom/buttons/MoveButton";
import useDialog from "@/hooks/dialog/useDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import handleFormError from "@/utils/errorHandler";

type CreateProductProductionFormProps = {
  product: Product;
};

export default function CreateProductProductionForm({ product }: CreateProductProductionFormProps) {
  const { closeDialog } = useDialog();
  const dialogId: DialogID = `create-movimentation-${product.id}`;
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<ProductionFlow>();
  const { mutateAsync: createProduction, isPending: isProductionPending } = useCreateProduction();
  const { mutateAsync: createMovimentation, isPending: isMovimentationPending } =
    useCreateMovimentation();

  const form = useAppForm({
    defaultValues: defaultProductProductionFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product || !selectedProductionFlow) return;
      const { amount } = value;
      try {
        const { data: production } = await createProduction({
          amount,
          op: amount,
          product_id: product.id,
          production_flow_id: selectedProductionFlow.id,
          status: "PENDING",
        });

        const { data: flowTemplates } = await getAllFlowTemplatesByProductionFlow(
          production.production_flow_id,
        );

        await createMovimentation({
          production: production,
          createData: {
            amount,
            from_departament_id: null,
            departament_id: flowTemplates[0].departament.id,
            production_id: production.id,
            responsible_id: null,
            product_id: product.id,
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
            deadline_id: null,
            type: "INIT",
            reason: "",
            goal_id: null,
            is_cancelled: false,
          },
        });

        toast.success("Produção criada com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível criar produção. Tente novamente",
        });
      }
    },
  });

  const isPending = isProductionPending || isMovimentationPending;

  return (
    <form
      id="create-product-movimentation-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <p className="font-bold">
        {product.name} - {product.ref}
      </p>
      <ProductProductProductionAmountField form={form} />
      <ProductProductionFlowField
        form={form}
        selectedProductionFlow={selectedProductionFlow}
        onChangeProductionFlow={setSelectedProductionFlow}
      />
      <ProductProductionOpField form={form} />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <MoveButton title="Criar produção" isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
