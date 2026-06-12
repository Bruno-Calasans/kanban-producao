/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, ExecutionFormSchema } from "./processExecutionFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { ExecutionAmountField } from "./fields/ExecutionAmountField";
import { ExecutionResponsibleField } from "./fields/ExecutionResponsibleField";
import { ExecutionDatesField } from "./fields/ExecutionDatesField";
import { DepartamentState, Responsible } from "@/types/database.type";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import MovimentationStateMsg from "../../MovimentationStateMsg";
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation";
import CancelButton from "@/components/custom/buttons/CancelButton";

type CreateMovimentationFormProps = {
  departamentState: DepartamentState;
};

export default function CreateMovimentationForm({
  departamentState,
}: CreateMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const [responsible, setResponsible] = useState<Responsible>();
  const { mutateAsync: createMovimentation, isPending: isCreateExecutionPending } =
    useCreateMovimentation();

  const form = useAppForm({
    defaultValues: {
      amount: departamentState.avaliableAmount,
      responsible: "",
      useMaxAmount: true,
      started_at: "",
      finished_at: "",
    } as ExecutionFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!responsible) return;
      const { amount, started_at, finished_at } = value;
      const { departament, production, nextDepartament } = departamentState;

      try {
        // Cria execução de processo
        await createMovimentation({
          production,
          createData: {
            amount,
            from_departament_id: departament.id,
            departament_id: nextDepartament?.id || null,
            production_id: production.id,
            product_id: production.product.id,
            responsible_id: responsible.id,
            started_at: started_at ? new Date(started_at).toISOString() : null,
            finished_at: finished_at ? new Date(finished_at).toISOString() : null,
            type: "TRANSFER",
            reason: null,
          },
        });

        toast.success("Movimentação criada com sucesso!");
        closeDialog(`create-movimentation-${departamentState.departament.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar a execução",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  return (
    <form
      id="create-execution-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <MovimentationStateMsg
        fromDepartament={departamentState.departament}
        toDepartament={departamentState.nextDepartament}
      />
      <FieldGroup>
        <ExecutionAmountField form={form} maxAmount={departamentState.avaliableAmount} />
        <ExecutionResponsibleField
          form={form}
          departament={departamentState.departament}
          selectedResponsible={responsible}
          onChangeResponsible={setResponsible}
        />
        <ExecutionDatesField form={form} />
      </FieldGroup>

      <div
        id="create-execution-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton
          onClick={() => closeDialog(`create-movimentation-${departamentState.departament.id}`)}
          isLoading={isPending}
          hiddenIcon
        />
        <ConfirmButton isLoading={isPending} label="Avançar" loadingMsg="Movendo..." hiddenIcon />
      </div>
    </form>
  );
}
