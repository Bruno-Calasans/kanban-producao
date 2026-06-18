"use client";

import { toast } from "sonner";
import { useState } from "react";
import { ProductionProductNameField } from "./fields/ProductionProductNameField";
import { useAppForm, formSchema, ProductionFormSchema } from "./productionFormContext";
import { ProductionAmountField } from "./fields/ProductionAmountField";
import { Product, ProductionFlow, ProductionPopulated } from "@/types/database.type";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";
import { ProductionFlowField } from "./fields/ProductionFlowField";
import { ProductionOpField } from "./fields/ProductionOpField";
import { DialogID } from "@/hooks/dialog/DialogContext";
import handleFormError from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import SaveButton from "@/components/custom/buttons/SaveButton";
import useUpdateProduction from "@/hooks/production/useUpdateProduction";
import useUpdateInicialExecution from "@/hooks/movimentation/useUpdateInicialMovimentation";
import CancelButton from "@/components/custom/buttons/CancelButton";

type EditProductionFormFormProps = {
  production: ProductionPopulated;
  hideProductionFlowField?: boolean;
};

export default function EditProductionFormForm({
  production,
  hideProductionFlowField,
}: EditProductionFormFormProps) {
  const dialogId: DialogID = `edit-production-${production.id}`;
  const [product, setProduct] = useState<Product>();
  const [productionFlow, setProductionFlow] = useState<ProductionFlow>();
  const { closeDialog } = useDialog();
  const { mutateAsync: updateProduction, isPending: isProductionPending } = useUpdateProduction();
  const { mutateAsync: updateInitialMovimentation, isPending: isMovimentationPending } =
    useUpdateInicialExecution();

  const form = useAppForm({
    defaultValues: {
      productName: production.product.name,
      op: production.op,
      amount: production.amount,
      productionFlow: production.productionFlow.name,
      useMaxAmount: false,
    } as ProductionFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product) return;
      const { op, amount } = value;
      const selectedProductionFlow = productionFlow ? productionFlow : production.productionFlow;

      try {
        await updateProduction({
          productionId: production.id,
          updateData: {
            op,
            amount,
            product_id: product.id,
            status: "PENDING",
            updated_at: new Date().toISOString(),
            production_flow_id: selectedProductionFlow.id,
          },
        });

        //  atualiza movimentação inicial
        const isProductionFlowDiff =
          productionFlow && production.productionFlow.id != productionFlow.id;

        if (amount != production.amount || isProductionFlowDiff) {
          const { data: templates } = await getAllProductionFlowTemplates(
            selectedProductionFlow.id,
          );
          const firstTemplate = templates[0];

          await updateInitialMovimentation({
            departamentId: firstTemplate.departament.id,
            amount,
          });
        }

        toast.success("Produção atualizada com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível atualizar a produção. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.reset({
      amount: production.amount,
      op: production.op,
      productName: production.product.name,
      productionFlow: production.productionFlow.name,
    });
    setProduct(production.product);
    setProductionFlow(production.productionFlow);
  };

  const isPending = isProductionPending || isMovimentationPending;

  return (
    <form
      id="edit-production-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ProductionProductNameField
        form={form}
        defaultProduct={production.product}
        selectedProduct={product}
        onChange={setProduct}
      />

      <ProductionAmountField form={form} />
      <ProductionOpField form={form} />

      <ProductionFlowField
        form={form}
        disabled={hideProductionFlowField}
        defaultProductionFlow={production.productionFlow}
        selectedProductionFlow={productionFlow}
        onChangeProductionFlow={setProductionFlow}
      />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <SaveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
