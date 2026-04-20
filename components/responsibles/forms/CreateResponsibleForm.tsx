"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useCreateResponsible from "@/hooks/responsible/useCreateResponsible";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Departament } from "@/types/database.type";
import { ResponsibleNameField } from "./fields/ResponsibleNameField";
import { defaultResponsibleFormValues, useAppForm, formSchema } from "./responsibleFormContext";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { ResponsibleDepartamentName } from "./fields/ResponsibleDepartamentName";

export default function CreateResponsibleForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useCreateResponsible();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>();

  const form = useAppForm({
    defaultValues: defaultResponsibleFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (!selectedDepartament) return;
        await mutateAsync({
          name: value.name,
          departament_id: selectedDepartament.id,
        });
        toast.success("Responsável criado com sucesso!");
        closeDialog("create-responsible");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o responsável",
        });
      }
    },
  });

  return (
    <form
      id="create-responsible-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ResponsibleNameField form={form} />
        <ResponsibleDepartamentName
          form={form}
          selectedDepartament={selectedDepartament}
          onDepartamentChange={setSelectedDepartament}
        />
      </FieldGroup>

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={() => form.reset()} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Criar responsável" />
      </div>
    </form>
  );
}
