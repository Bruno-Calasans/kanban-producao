"use client";

import { toast } from "sonner";

import { useState } from "react";
import { ProductionProductNameField } from "./fields/ProductionProductNameField";
import { defaultProductionFormValues, useAppForm, formSchema } from "./productionFormContext";
import { ProductionOpField } from "./fields/ProductionOpField";
import { ProductionFlowField } from "./fields/ProductionFlowField";
import { ProductionAmountField } from "./fields/ProductionAmountField";
import { Product, ProductionFlow } from "@/types/database.type";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import { useCreateMovimentation } from "@/hooks/movimentation/useCreateMovimentation";
import { useCreateProduction } from "@/hooks/production/useCreateProduction";
import useDialog from "@/hooks/dialog/useDialog";
import handleFormError from "@/utils/errorHandler";
import CreateManySwitch from "@/components/custom/CreateManySwitch";
import MoveButton from "@/components/custom/buttons/MoveButton";
import CancelButton from "@/components/custom/buttons/CancelButton";

type CreateProductionFormProps = {
  defaultProduct?: Product;
};

export default function CreateProductionForm({ defaultProduct }: CreateProductionFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProduction, isPending: isCreateProductionPending } =
    useCreateProduction();
  const { mutateAsync: createMovimentation, isPending: isCreateProcessExecutionPending } =
    useCreateMovimentation();
  const [product, setProduct] = useState<Product>();
  const [many, setMany] = useState<boolean>(false);
  const [productionFlow, setProductionFlow] = useState<ProductionFlow>();

  const form = useAppForm({
    defaultValues: defaultProductionFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product || !productionFlow) return;
      const { op, amount } = value;

      try {
        const { data: production } = await createProduction({
          op,
          amount,
          product_id: product.id,
          status: "PENDING",
          production_flow_id: productionFlow.id,
        });

        const { data: processFlows } = await getAllProductionFlowTemplates(productionFlow.id);

        await createMovimentation({
          production,
          createData: {
            from_departament_id: null,
            departament_id: processFlows[0].departament.id,
            amount: production.amount,
            production_id: production.id,
            responsible_id: null,
            product_id: product.id,
            type: "INIT",
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
            reason: "",
            deadline_id: null,
          },
        });

        toast.success("Produção criada com sucesso");
        if (!many) closeDialog("create-production");
        resetForm();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível criar produção. Tente novamente.",
        });
      }
    },
  });

  const resetForm = () => {
    form.resetField("productName");
    form.resetField("amount");
    setProduct(undefined);
  };

  const isPending = isCreateProductionPending || isCreateProcessExecutionPending;

  return (
    <form
      id="create-production-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ProductionProductNameField
        form={form}
        defaultProduct={defaultProduct}
        selectedProduct={product}
        onChange={setProduct}
        disabled={!!defaultProduct}
      />
      <ProductionAmountField form={form} />
      <ProductionOpField form={form} />
      <ProductionFlowField form={form} onChangeProductionFlow={setProductionFlow} />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CreateManySwitch value={many} onChangeValue={setMany} />
        <CancelButton isLoading={isPending} onClick={() => closeDialog("create-production")} />
        <MoveButton title="Criar" isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
