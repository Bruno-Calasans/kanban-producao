"use client";

import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import SaveButton from "@/components/custom/buttons/SaveButton";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import { formSchema, ProductSchema, useAppForm } from "./productFormContext";
import { ProductNameField } from "./fields/ProductNameField";
import { ProductRefField } from "./fields/ProductRefField";
import handleFormError from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { Product } from "@/types/database.type";
import CancelButton from "@/components/custom/buttons/CancelButton";

type EditProductForm = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductForm) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

  const form = useAppForm({
    defaultValues: {
      name: product.name,
      ref: product.ref,
    } as ProductSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value: inputData }) => {
      try {
        const { name, ref } = inputData;

        await updateProduct({
          id: product.id,
          updateData: {
            name,
            ref,
          },
        });
        toast.success("Produto atualizado com sucesso!");
        closeDialog("edit-product");
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: Não foi possível atualizar o produto.",
          duplicate: "Erro: já existe um produto com esse nome.",
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
        <ProductRefField form={form} />
      </FieldGroup>

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onClick={() => closeDialog("edit-product")} />
        <SaveButton label="Salvar" isLoading={isPending} loadingMsg="Salvando..." hiddenIcon />
      </div>
    </form>
  );
}
