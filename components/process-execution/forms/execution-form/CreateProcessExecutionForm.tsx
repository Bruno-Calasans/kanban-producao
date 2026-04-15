/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, ExecutionFormSchema } from "./processExecutionFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, ProcessWithDepartament, Responsible } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { ExecutionAmountField } from "./fields/ExecutionAmountField";
import { ExecutionResponsibleField } from "./fields/ExecutionResponsibleField";
import ExecutionState from "../../ExecutionStateMsg";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";

type CreateProcessExecutionFormProps = {
  processState: ProcessState;
};

export default function CreateProcessExecutionForm({
  processState,
}: CreateProcessExecutionFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const { mutateAsync: updateMovimentation, isPending: isUpdateMovimentationPending } =
    useUpdateMovimentation();
  const [responsible, setResponsible] = useState<Responsible>();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      responsible: "",
      useMaxAmount: true,
    } as ExecutionFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!responsible) return;
      const { amount } = value;
      const {
        process,
        movimentation,
        flowTemplates,
        avaliableAmount,
        nextProcess,
        previousProcess,
      } = processState;

      if (!nextProcess) return;

      try {
        // Cria execução de processo
        await createProcessExecution({
          amount,
          from_process_id: process.id,
          process_id: nextProcess.id,
          movimentation_id: movimentation.id,
          product_id: movimentation.product.id,
          responsible_id: responsible.id,
          status: "SUCCESS",
          type: "TRANSFER",
        });

        // Atualiza movimentation
        const lastProcess = flowTemplates[flowTemplates.length - 1].process;
        const isLastProcess = nextProcess.id === lastProcess.id;
        const isAllAmount = avaliableAmount == amount;

        // Primeira execução
        if (movimentation.status === "PENDING") {
          await updateMovimentation({
            movimentationId: movimentation.id,
            updateData: {
              status: "IN_PROGRESS",
            },
          });
        }

        // Última execução
        if (movimentation.status === "IN_PROGRESS" && isLastProcess && isAllAmount) {
          await updateMovimentation({
            movimentationId: movimentation.id,
            updateData: {
              status: "COMPLETED",
            },
          });
        }

        toast.success("Execução criada com sucesso!");
        closeDialog("create-process-execution");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar a execução",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending || isUpdateMovimentationPending;
  console.log(processState)

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
      </FieldGroup>

      <div
        id="create-execution-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        {/* <ClearButton isLoading={isPending} onclick={() => form.reset()} /> */}
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
