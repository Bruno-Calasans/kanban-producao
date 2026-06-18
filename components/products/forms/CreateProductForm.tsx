"use client";

import { toast } from "sonner";
import { ProductNameField } from "./fields/ProductNameField";
import { defaultProductFormValues, formSchema, useAppForm } from "./productFormContext";
import { useState } from "react";
import { ProductRefField } from "./fields/ProductRefField";
import { FieldGroup } from "@/components/ui/field";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import useCreateProduct from "@/hooks/product/useCreateProduct";
import CreateManySwitch from "@/components/custom/CreateManySwitch";
import CancelButton from "@/components/custom/buttons/CancelButton";
import { DialogID } from "@/hooks/dialog/DialogContext";

export default function CreateProductForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useCreateProduct();
  const [many, setMany] = useState(false);
  const dialogId: DialogID = "create-product";

  const form = useAppForm({
    defaultValues: defaultProductFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, ref } = value;
        await mutateAsync({
          name,
          ref,
          is_active: true,
        });
        toast.success("Produto criado com sucesso!");
        if (!many) {
          closeDialog(dialogId);
        }
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o produto",
          duplicate: "Erro: já existe produto com esse nome. Escolha outro",
        });
      }
    },
  });

  return (
    <form
      id="create-product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ProductNameField form={form} />
        <ProductRefField form={form} />
      </FieldGroup>

      <div
        id="create-product-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CreateManySwitch value={many} onChangeValue={setMany} />
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Criar produto"
          loadingMsg="Criando..."
        />
      </div>
    </form>
  );
}
