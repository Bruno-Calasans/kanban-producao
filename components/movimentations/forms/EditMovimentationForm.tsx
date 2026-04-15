"use client";

import { toast } from "sonner";
import MoveButton from "@/components/custom/buttons/MoveButton";
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation";
import { useState } from "react";
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField";
import { useAppForm, formSchema, MovimentationFormSchema } from "./movimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationPopulated, ProductWithProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";

type EditMovimentationFormProps = {
  movimentation: MovimentationPopulated;
};

export default function EditMovimentationForm({ movimentation }: EditMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useCreateMovimentation();
  const [product, setProduct] = useState<ProductWithProductionFlow>();

  const form = useAppForm({
    defaultValues: {
      productName: movimentation.product.name,
      amount: movimentation.amount,
    } as MovimentationFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!product) return;
      const { amount } = value;
      try {
        await mutateAsync({
          product_id: product.id,
          amount,
          status: "PENDING",
        });
        toast.success("Movimentação editada com sucesso!");
        closeDialog("edit-movimentation");
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível atualizar a movimentação. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.reset();
    setProduct(undefined);
  };

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
        selectedProduct={product}
        defaultProduct={movimentation.product}
        onChange={setProduct}
      />
      {product && <MovimentationAmountFieldGroup form={form} selectedProduct={product} />}

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <MoveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
