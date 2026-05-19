"use client";

import { toast } from "sonner";
import MoveButton from "@/components/custom/buttons/MoveButton";
import {
  ProductMovimentationFormContextchema,
  useAppForm,
  formSchema,
} from "./ProductMovimentationFormContext";
import handleFormError from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationPopulated } from "@/types/database.type";
import ClearButton from "@/components/custom/buttons/ClearButton";
import { ProductProductMovimentationAmountField } from "./fields/ProductMovimentationAmountField";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";
import useUpdateInicialExecution from "@/hooks/process-executation/useUpdateInicialExecution";

type EditProductMovimentationFormProps = {
  movimentation: MovimentationPopulated;
};

export default function EditProductMovimentationForm({
  movimentation,
}: EditProductMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateMovimentation, isPending: isMovimentationPending } =
    useUpdateMovimentation();
  const { mutateAsync: updateInitialExecution, isPending: isExecutionPending } =
    useUpdateInicialExecution();

  const form = useAppForm({
    defaultValues: {
      amount: movimentation.amount,
    } as ProductMovimentationFormContextchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { amount } = value;

      try {
        await updateMovimentation({
          movimentationId: movimentation.id,
          updateData: {
            product_id: movimentation.product.id,
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
        closeDialog("edit-product-movimentation");
        form.reset();
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível atualizar a movimentação do produto. Tente novamente",
        });
      }
    },
  });

  const resetForm = () => {
    form.reset();
  };

  const isPending = isMovimentationPending || isExecutionPending;

  return (
    <form
      id="edit-product-movimentation-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ProductProductMovimentationAmountField form={form} />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={resetForm} />
        <MoveButton title="Salvar" isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
