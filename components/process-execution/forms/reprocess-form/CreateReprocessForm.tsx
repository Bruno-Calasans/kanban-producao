/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/movimentation/useCreateMovimentation";
import { ReprocessExecutionSchema, useAppForm, formSchema } from "./reprocessExecutionFormContext";
import { ReprocessAmountField } from "./fields/ReprocessAmountField";
import { ReprocessProcessField } from "./fields/ReprocessProcessField";
import { useMemo, useState } from "react";
import { ReprocessReasonField } from "./fields/ReprocessReasonField";

type CreateReprocessFormrops = {
  processState: ProcessState;
  processStates: ProcessState[];
};

export default function CreateReprocessForm({
  processState,
  processStates,
}: CreateReprocessFormrops) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const [selectedProcess, setSelectedProcess] = useState<ProcessWithDepartament | undefined>(
    processState.previousProcess || undefined,
  );

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      useMaxAmount: false,
      processName: selectedProcess?.name || "",
      reason: "",
    } as ReprocessExecutionSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { amount } = value;
        const { process, movimentation } = processState;

        if (!selectedProcess) return;

        // Cria execução de processo
        await createProcessExecution({
          createData: {
            amount,
            from_process_id: process.id,
            process_id: selectedProcess.id,
            movimentation_id: movimentation.id,
            product_id: movimentation.product.id,
            responsible_id: null,
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
            type: "REPROCESS",
            reason: null,
          },
          movimentation,
        });

        toast.success("Reprocesso criado com sucesso!");
        closeDialog(`create-reprocess-execution-${processState.process.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível reprocessar",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  const avaliableProcesses = useMemo(() => {
    return processStates
      .filter(
        ({ process, template }) =>
          process.id != processState.process.id &&
          template?.sequence &&
          processState.template.sequence &&
          template?.sequence < processState.template.sequence,
      )
      .map((state) => state.process);
  }, [processStates, processState]);

  return (
    <form
      id="reprocess-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ReprocessProcessField
          form={form}
          selectedProcess={selectedProcess}
          avaliableProcesses={avaliableProcesses}
          onChangeProcess={setSelectedProcess}
        />
        <ReprocessAmountField form={form} maxAmount={processState.avaliableAmount} />
        <ReprocessReasonField form={form} />
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
