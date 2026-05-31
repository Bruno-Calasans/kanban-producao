/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, ExecutionFormSchema } from "./processExecutionFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, Responsible } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { ExecutionAmountField } from "./fields/ExecutionAmountField";
import { ExecutionResponsibleField } from "./fields/ExecutionResponsibleField";
import ExecutionState from "../../ExecutionStateMsg";
import { ExecutionDatesField } from "./fields/ExecutionDatesField";

type CreateProcessExecutionFormProps = {
  processState: ProcessState;
};

export default function CreateProcessExecutionForm({
  processState,
}: CreateProcessExecutionFormProps) {
  const { closeDialog } = useDialog();
  const [responsible, setResponsible] = useState<Responsible>();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
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
      const { process, movimentation, nextProcess } = processState;

      try {
        // Cria execução de processo
        await createProcessExecution({
          createData: {
            amount,
            from_process_id: process.id,
            process_id: nextProcess?.id || null,
            movimentation_id: movimentation.id,
            product_id: movimentation.product.id,
            responsible_id: responsible.id,
            started_at: started_at ? new Date(started_at).toISOString() : null,
            finished_at: finished_at ? new Date(finished_at).toISOString() : null,
            type: "TRANSFER",
            reason: null,
          },
          movimentation,
        });

        toast.success("Execução criada com sucesso!");
        closeDialog(`create-process-execution-${processState.process.id}`);
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
      <ExecutionState from_process={processState.process} to_process={processState.nextProcess} />
      <FieldGroup>
        <ExecutionAmountField form={form} maxAmount={processState.avaliableAmount} />
        <ExecutionResponsibleField
          form={form}
          departament={processState.process.departament}
          selectedResponsible={responsible}
          onChangeResponsible={setResponsible}
        />
        <ExecutionDatesField form={form} />
      </FieldGroup>

      <div
        id="create-execution-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Executar"
          loadingMsg="Executando..."
        />
      </div>
    </form>
  );
}
