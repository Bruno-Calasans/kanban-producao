/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, ExecutionFormSchema } from "./processExecutionFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { ExecutionAmountField } from "./fields/ExecutionAmountField";
import { ExecutionResponsibleField } from "./fields/ExecutionResponsibleField";
import { ExecutionDatesField } from "./fields/ExecutionDatesField";
import { DepartamentState, ProductionDeadlinePopulated, Responsible } from "@/types/database.type";
import { useCreateMovimentation } from "@/hooks/movimentation/useCreateMovimentation";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import MovimentationStateMsg from "../../MovimentationStateMsg";
import CancelButton from "@/components/custom/buttons/CancelButton";
import useUpdateProductionDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import formatDateTimeForInput from "@/utils/formatDateTimeForInput";
import { DialogID } from "@/hooks/dialog/DialogContext";

type CreateMovimentationFormProps = {
  departamentState: DepartamentState;
  departamentDeadline: ProductionDeadlinePopulated;
};

export default function CreateMovimentationForm({
  departamentState,
  departamentDeadline,
}: CreateMovimentationFormProps) {
  const dialogId: DialogID = `create-movimentation-${departamentState.departament.id}`;
  const { closeDialog } = useDialog();
  const [responsible, setResponsible] = useState<Responsible>();
  const {
    mutateAsync: createMovimentation,
    isPending: isCreateMovimenttionPending,
    error: movimentationError,
  } = useCreateMovimentation();
  const {
    mutateAsync: updateDeadline,
    isPending: isUpdateDeadlinePending,
    error: updateDeadlineError,
  } = useUpdateProductionDeadline();

  const form = useAppForm({
    defaultValues: {
      amount: departamentState.avaliableAmount,
      responsible: "",
      useMaxAmount: true,
      started_at: formatDateTimeForInput(new Date()),
      finished_at: formatDateTimeForInput(new Date()),
    } as ExecutionFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!responsible) return;
      const { amount, started_at, finished_at } = value;
      const { departament, production, nextDepartament } = departamentState;
      const startDate = started_at ? new Date(started_at).toISOString() : null;
      const endDate = finished_at ? new Date(finished_at).toISOString() : null;

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
            started_at: startDate,
            finished_at: endDate,
            deadline_id: departamentDeadline.id,
            type: "TRANSFER",
            reason: null,
          },
        });

        // Atualiza prazo se conluiu produção do departamento
        const avaliableAmount = departamentState.avaliableAmount - amount;

        if (avaliableAmount == 0) {
          await updateDeadline({
            deadlineId: departamentDeadline.id,
            updateData: {
              actual_start_at: startDate,
              actual_end_at: endDate,
            },
          });
        }

        toast.success("Movimentação criada com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar a execução",
        });
      }
    },
  });

  const isPending = isCreateMovimenttionPending || isUpdateDeadlinePending;
  const error = movimentationError || updateDeadlineError;

  return (
    <form
      id="create-movimentation-form"
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
        <CancelButton onClick={() => closeDialog(dialogId)} isLoading={isPending} hiddenIcon />
        <ConfirmButton isLoading={isPending} label="Avançar" loadingMsg="Movendo..." hiddenIcon />
      </div>
    </form>
  );
}
