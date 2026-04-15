/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import ExecutionState from "../../ExecutionStateMsg";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";
import { ReprocessExecutionSchema, useAppForm, formSchema } from "./reprocessExecutionFormContext";
import { ReprocessAmountField } from "./fields/ReprocessAmountField";

type CreateReprocessFormrops = {
  processState: ProcessState;
};

export default function CreateReprocessForm({ processState }: CreateReprocessFormrops) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      useMaxAmount: false,
    } as ReprocessExecutionSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { amount } = value;
        const { process, movimentation, flowTemplates, avaliableAmount, previousProcess } =
          processState;

        if (!previousProcess) return;

        // Cria execução de processo
        await createProcessExecution({
          amount,
          from_process_id: process.id,
          process_id: previousProcess.id,
          movimentation_id: movimentation.id,
          product_id: movimentation.product.id,
          responsible_id: null,
          status: "SUCCESS",
          type: "REPROCESS",
        });

        toast.success("Reprocesso criado com sucesso!");
        closeDialog("create-process-execution");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível reprocessar",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  return (
    <form
      id="create-reprocess-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <ExecutionState
        from_process={processState.process}
        to_process={processState.previousProcess}
      />
      <FieldGroup>
        <ReprocessAmountField form={form} maxAmount={processState.avaliableAmount} />
      </FieldGroup>

      <div
        id="create-execution-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Reprocessar"
          loadingMsg="Reprocessando.."
        />
      </div>
    </form>
  );
}
