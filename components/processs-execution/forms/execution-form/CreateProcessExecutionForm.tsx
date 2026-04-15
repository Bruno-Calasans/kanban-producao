/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import {
  defaultExecutionFormValues,
  formSchema,
  useAppForm,
  ExecutionFormSchema,
} from "./processExecutionFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, Responsible } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { ExecutionAmountField } from "./fields/ExecutionAmountField";

type CreateProcessExecutionFormProps = {
  processState: ProcessState;
};

export default function CreateProcessExecutionForm({
  processState,
}: CreateProcessExecutionFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending } = useCreateProcessExecution();
  const [responsible, setResponsible] = useState<Responsible>();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      responsible: "teste",
      useMaxAmount: true,
    } as ExecutionFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      if (!responsible) return;

      try {
        const { amount, responsible } = value;
        // await createProcessExecution({});
        toast.success("Produto criado com sucesso!");
        closeDialog("create-product");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o produto",
          duplicate: "Erro: já existe produto com esse nome. Escolha outro",
        });
      }
    },
  });

  const getNextProcess = () => {
    const { flowTemplates } = processState;
    const flowTemplatesSize = flowTemplates.length;
    if (flowTemplatesSize == 0 || flowTemplatesSize == 1) return;

    const currentProcessIndex = flowTemplates.findIndex(
      (flow) => flow.process.id == processState.process.id,
    );

    // Procura o index do próximo processo
    const nextProcessIndex = currentProcessIndex + 1;
    const nextProcess = processState.flowTemplates[nextProcessIndex].process;

    return nextProcess;
  };

  const nextProcess = getNextProcess();

  return (
    <form
      id="create-execution-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex gap-4">
          <p className="flex flex-col">
            <strong>Processo Origem</strong>
            {processState.process.name}
          </p>
          <p className="flex flex-col">
            <strong>Processo Destino</strong> {nextProcess?.name}
          </p>
          <p className="flex flex-col">
            <strong>Qtd. disponível: </strong>
            {processState.avaliableAmount}
          </p>
        </div>
        <ExecutionAmountField form={form} maxAmount={processState.avaliableAmount} />
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
