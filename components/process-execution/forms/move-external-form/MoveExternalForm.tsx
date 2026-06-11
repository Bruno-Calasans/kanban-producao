/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, defaultMoveExternalFormValues } from "./moveExternalFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/movimentation/useCreateMovimentation";
import { MoveAmountField } from "./fields/MoveAmountField";
import { MoveProcessField } from "./fields/MoveProcessField";
import useGetAllActiveExternalProcesses from "@/hooks/process/useGetAllActiveExternalProcesses";
import { ExternalDeadlineField } from "./fields/ExternalDeadlineField";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";

type MoveExternalFormProps = {
  processState: ProcessState;
};

export default function MoveExternalForm({ processState }: MoveExternalFormProps) {
  const { closeDialog } = useDialog();
  const {
    mutateAsync: createProcessExecution,
    isPending: isExecutionPending,
    error: executionError,
  } = useCreateProcessExecution();

  const {
    mutateAsync: createDeadline,
    isPending: isDeadlinePending,
    error: deadlineError,
  } = useCreateMovimentationDeadline();

  const {
    data,
    isPending: isProcessesPending,
    error: processError,
  } = useGetAllActiveExternalProcesses();
  const processes = data?.data || [];

  const [process, setProcess] = useState<ProcessWithDepartament>();

  const form = useAppForm({
    defaultValues: { ...defaultMoveExternalFormValues, amount: processState.avaliableAmount },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!process) return;
      const { amount, plannedEndAt } = value;
      const { process: currProcess, movimentation } = processState;

      try {
        await createProcessExecution({
          movimentation,
          createData: {
            amount,
            from_process_id: currProcess.id,
            process_id: process.id,
            movimentation_id: movimentation.id,
            product_id: movimentation.product.id,
            responsible_id: null,
            started_at: null,
            finished_at: null,
            reason: null,
            type: "EXTERNAL",
          },
        });

        if (plannedEndAt) {
          await createDeadline({
            departament_id: process.departament.id,
            movimentation_id: movimentation.id,
            planned_end_at: new Date(plannedEndAt).toISOString(),
            planned_start_at: null,
            actual_start_at: null,
            actual_end_at: null,
          });
        }

        toast.success("Movido com sucesso!");
        closeDialog(`move-external-process-execution-${processState.process.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível mover!",
        });
      }
    },
  });

  const isPending = isExecutionPending || isProcessesPending || isDeadlinePending;
  const isError = executionError || processError || deadlineError;

  return (
    <form
      id="move-external-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-4 mb-4">
        <MoveProcessField
          form={form}
          processes={processes}
          defaultProcess={processes[0]}
          selectedProcess={process}
          onChangeProcess={setProcess}
          isLoading={isProcessesPending}
        />
        <MoveAmountField form={form} maxAmount={processState.avaliableAmount} />
        <ExternalDeadlineField form={form} />
      </FieldGroup>

      <div
        id="move-external-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton label="Mover" loadingMsg="Movendo..." hiddenIcon isLoading={isPending} />
      </div>
    </form>
  );
}
