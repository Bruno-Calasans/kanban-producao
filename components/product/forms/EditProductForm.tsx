"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import { FieldGroup } from "@/components/ui/field";
import SaveButton from "@/components/custom/buttons/SaveButton";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import {
  defaultProductFormValues,
  formSchema,
  ProductSchema,
  useAppForm,
} from "./productFormContext";
import { ProductNameField } from "./fields/ProductNameField";
import { ProductOpField } from "./fields/ProductOpField";
import handleFormError from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { ProductProductionFlowField } from "./fields/ProductProductionFlowField";
import { useState } from "react";
import { ProductionFlow, ProductWithProductionFlow } from "@/types/database.type";

type EditProductForm = {
  product: ProductWithProductionFlow;
};

export default function EditProductForm({ product }: EditProductForm) {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useUpdateProduct();
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<
    ProductionFlow | undefined
  >();

  const form = useAppForm({
    defaultValues: {
      name: product.name,
      op: product.op || defaultProductFormValues.op,
    } as ProductSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value: inputData }) => {
      if (!selectedProductionFlow) return
      try {
        const { name, op } = inputData;

        await mutateAsync({
          id: product.id,
          updateData: {
            name,
            op,
            production_flow_id: selectedProductionFlow.id
          },
        });
        toast.success("Produto atualizado com sucesso!");
        closeDialog("edit-product");
        form.reset();
      } catch (error) {
        handleFormError(error, {
          duplicate: "Erro: já existe um produto com esse nome.",
          default: "Erro: Não foi possível atualizar o produto.",
        });
      }
    },
  });

  return (
    <form
      id="edit-product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ProductNameField form={form} />
        <ProductOpField form={form} />
      </FieldGroup>

      <ProductProductionFlowField
        form={form}
        defaultProductionFlow={product.production_flow}
        onChangeProductionFlow={setSelectedProductionFlow}
      />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={() => form.reset()} />
        <SaveButton
          label="Salvar alterações"
          isLoading={isPending}
          loadingMsg="Salvando..."
          hiddenIcon
        />
      </div>
    </form>
  );
}
