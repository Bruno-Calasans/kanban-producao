"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useCreateDepartament from "@/hooks/departament/useCreateDepartament";
import { FieldGroup } from "@/components/ui/field";
import { defaultDepartamentFormValues, useAppForm, formSchema } from "./departamentFormContext";
import { DepartamentNameField } from "./fields/DepartamentNameField";
import { DepartamentSequenceField } from "./fields/DepartamentSequenceField";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";

export default function CreateDepartamentForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useCreateDepartament();

  const form = useAppForm({
    defaultValues: defaultDepartamentFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ ...value, is_active: true });
        toast.success("Departamento criado com sucesso!");
        closeDialog("create-departament");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o departamento.",
          duplicate: "Erro: departamento com esse nome ou sequência já existe.",
        });
      }
    },
  });

  return (
    <form
      id="create-departament-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <DepartamentNameField form={form} />
        <DepartamentSequenceField form={form} />
      </FieldGroup>

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={() => form.reset()} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Criar departamento" />
      </div>
    </form>
  );
}
