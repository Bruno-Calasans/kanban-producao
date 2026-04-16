"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useCreateProcess from "@/hooks/process/useCreateProcess";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Departament } from "@/types/database.type";
import { defaultProcessFormValues, useAppForm, formSchema } from "./ProcessFormContext";
import errorHandler from "@/utils/errorHandler";
import { ProcessNameField } from "./fields/ProcessNameField";
import { ProcessSequenceField } from "./fields/ProcessSequenceField";
import { ProcessDepartamentField } from "./fields/ProcessDepartamentField";
import useDialog from "@/hooks/dialog/useDialog";

export default function CreateProcessForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useCreateProcess();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>();

  const form = useAppForm({
    defaultValues: defaultProcessFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (!selectedDepartament) return;
        const { name, sequence } = value;
        await mutateAsync({
          name: name,
          sequence: sequence,
          departament_id: selectedDepartament.id,
        });
        toast.success("Processo criado com sucesso!");
        closeDialog("create-process");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o processo.",
          duplicate: "Erro: nome ou sequência do processo já existe.",
        });
      }
    },
  });

  return (
    <form
      id="create-process-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ProcessNameField form={form} />
        <ProcessSequenceField form={form} />
        <ProcessDepartamentField
          form={form}
          selectedDepartament={selectedDepartament}
          onChangeDepartament={setSelectedDepartament}
        />
      </FieldGroup>

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={() => form.reset()} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Criar processo" />
      </div>
    </form>
  );
}
