/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, MoveExternalFormSchema } from "./moveExternalFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import { Departament, Process, ProcessState, Responsible } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/process-executation/useCreateProcessExecution";
import { MoveAmountField } from "./fields/MoveAmountField";
import { MoveDepartamentField } from "./fields/MoveDepartamentField";
import { MoveProcessField } from "./fields/MoveProcessField";

type MoveExternalFormProps = {
  processState: ProcessState;
};

export default function MoveExternalForm({ processState }: MoveExternalFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const [departament, setDepartament] = useState<Departament>();
  const [process, setProcess] = useState<Process>();

  const form = useAppForm({
    defaultValues: {
      amount: processState.avaliableAmount,
      useMaxAmount: true,
      externalProcessName: "",
    } as MoveExternalFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!departament || !process) return;
      const { amount } = value;
      const { process: currProcess, movimentation } = processState;

      try {
        // Cria execução de processo
        await createProcessExecution({
          amount,
          from_process_id: currProcess.id,
          process_id: process.id,
          movimentation_id: movimentation.id,
          product_id: movimentation.product.id,
          responsible_id: null,
          status: "SUCCESS",
          type: "EXTERNAL",
          started_at: null,
          finished_at: null,
        });

        toast.success("Movido com sucesso!");
        closeDialog(`move-external-${currProcess.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível mover!",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  return (
    <form
      id="create-move-external-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* <ExecutionState from_process={processState.process} to_process={processState.nextProcess} /> */}

      <FieldGroup className="flex flex-row gap-3 mb-4">
        <MoveDepartamentField
          form={form}
          selectedDepartament={departament}
          onChangeDepartament={setDepartament}
        />
        {departament && (
          <MoveProcessField
            form={form}
            departament={departament}
            selectedProcess={process}
            onChangeProcess={setProcess}
          />
        )}
        {/* {departament && (
          <MoveResponsibleField
            form={form}
            departament={departament}
            selectedResponsible={responsible}
            onChangeResponsible={setResponsible}
          />
        )} */}
      </FieldGroup>

      <MoveAmountField form={form} maxAmount={processState.avaliableAmount} />

      <div
        id="create-move-external-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton hiddenIcon isLoading={isPending} label="Mover" loadingMsg="Movendo..." />
      </div>
    </form>
  );
}
