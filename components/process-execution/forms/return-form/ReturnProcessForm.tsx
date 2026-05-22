/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, ReturnProcessFormContextSchema } from "./returnProcessFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { Departament, ProcessWithDepartament } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { ReturnAmountField } from "./fields/ReturnAmountField";
import { ReturnProcessField } from "./fields/ReturnProcessField";
import { ExternalProcessState } from "@/hooks/external-process-state/useExternalProcess";
import { ReturnDatesField } from "./fields/ReturnDatesField";

type ReturnProcessFormProps = {
  externalProcessState: ExternalProcessState;
  avaliableProcesses: ProcessWithDepartament[];
};

export default function ReturnProcessForm({
  externalProcessState,
  avaliableProcesses,
}: ReturnProcessFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const [departament, setDepartament] = useState<Departament>();
  const [selectedProcess, setSelectedProcess] = useState<ProcessWithDepartament>();

  const form = useAppForm({
    defaultValues: {
      amount: externalProcessState.avaliableAmount,
      useMaxAmount: true,
      externalProcessName: "",
    } as ReturnProcessFormContextSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedProcess) return;
      const { amount, started_at, finished_at } = value;
      const { process: currProcess, movimentation } = externalProcessState;

      try {
        // Cria execução de processo
        await createProcessExecution({
          createData: {
            amount,
            from_process_id: currProcess.id,
            process_id: selectedProcess.id,
            movimentation_id: movimentation.id,
            product_id: movimentation.product.id,
            started_at: started_at ? new Date(started_at).toISOString() : null,
            finished_at: finished_at ? new Date(finished_at).toISOString() : null,
            type: "RETURN",
            responsible_id: null,
            reason: null,
          },
          movimentation,
        });

        toast.success("Retornado com sucesso!");
        closeDialog(`return-process-execution-${externalProcessState.process.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível retornar!",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  return (
    <form
      id="return-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-5">
        <ReturnProcessField
          form={form}
          selectedProcess={selectedProcess}
          onChangeProcess={setSelectedProcess}
          avaliableProcesses={avaliableProcesses}
        />
        <ReturnAmountField form={form} maxAmount={externalProcessState.avaliableAmount} />
        <ReturnDatesField form={form} />
      </FieldGroup>

      <div id="return-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Retornar"
          loadingMsg="Retornando..."
        />
      </div>
    </form>
  );
}
