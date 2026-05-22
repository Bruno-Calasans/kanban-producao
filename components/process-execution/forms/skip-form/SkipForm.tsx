/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, SkipFormContextSchema } from "./skipFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { SkipAmountField } from "./fields/SkipAmountField";
import { SkipProcessField } from "./fields/SkipProcessField";
import { SkipReasonField } from "./fields/SkipReasonField";

type SkipFormProps = {
  processStates: ProcessState[];
  processState: ProcessState;
};

export default function SkipForm({ processStates, processState }: SkipFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const [selectedProcess, setSelectedProcess] = useState<ProcessWithDepartament>();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      useMaxAmount: true,
      processName: "",
      reason: "",
    } as SkipFormContextSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedProcess) return;
      const { amount, reason } = value;
      const { process: currProcess, movimentation } = processState;

      try {
        // Cria execução de processo
        await createProcessExecution({
          createData: {
            amount,
            from_process_id: currProcess.id,
            process_id: selectedProcess.id,
            movimentation_id: movimentation.id,
            product_id: movimentation.product.id,
            type: "SKIP",
            reason: reason || null,
            started_at: null,
            finished_at: null,
            responsible_id: null,
          },
          movimentation,
        });

        toast.success("Pulado com sucesso!");
        closeDialog(`skip-process-execution-${currProcess.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível pular o processo!",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;
  const avaliableProcesses = processStates
    .filter(
      ({ process, template }) =>
        process.id != processState.process.id &&
        template?.sequence &&
        processState.template.sequence &&
        template?.sequence > processState.template.sequence,
    )
    .map((state) => state.process);

  return (
    <form
      id="skip-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-5">
        <SkipProcessField
          form={form}
          selectedProcess={selectedProcess}
          onChangeProcess={setSelectedProcess}
          avaliableProcesses={avaliableProcesses}
        />
        <SkipAmountField form={form} maxAmount={processState.avaliableAmount} />
        <SkipReasonField form={form} />
      </FieldGroup>

      <div id="skip-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
        <ConfirmButton hiddenIcon isLoading={isPending} label="Pular" loadingMsg="Pulando.." />
      </div>
    </form>
  );
}
