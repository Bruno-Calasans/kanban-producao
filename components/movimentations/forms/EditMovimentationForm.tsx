"use client";

import { toast } from "sonner";
import { useState } from "react";
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField";
import { useAppForm, formSchema, MovimentationFormSchema } from "./movimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationPopulated, ProductWithProductionFlow } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import SaveButton from "@/components/custom/buttons/SaveButton";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";
import useUpdateInicialExecution from "@/hooks/process-executation/useUpdateInicialExecution";

type EditMovimentationFormProps = {
  movimentation: MovimentationPopulated;
};

export default function EditMovimentationForm({ movimentation }: EditMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateMovimentation, isPending: isMovimentationPending } =
    useUpdateMovimentation();
  const { mutateAsync: updateInitialExecution, isPending: isExecutionPending } =
    useUpdateInicialExecution();
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
        await updateMovimentation({
          movimentationId: movimentation.id,
          updateData: {
            product_id: product.id,
            amount,
            status: "PENDING",
          },
        });

        //  atualiza execução inicial
        if (amount != movimentation.amount) {
          await updateInitialExecution({
            movimentationId: movimentation.id,
            amount,
          });
        }

        toast.success("Movimentação atualizado com sucesso!");
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
        selectedProduct={product}
        defaultProduct={movimentation.product}
        onChange={setProduct}
      />
      {product && <MovimentationAmountFieldGroup form={form} selectedProduct={product} />}

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <SaveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
