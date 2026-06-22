"use client";

import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { defaultDepartamentFormValues, useAppForm, formSchema } from "./departamentFormContext";
import { DepartamentIsExternalCheckboxField } from "./fields/DepartamentIsExternalCheckboxField";
import { DepartamentNameField } from "./fields/DepartamentNameField";
import { DialogID } from "@/hooks/dialog/DialogContext";
import { useState } from "react";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useCreateDepartament from "@/hooks/departament/useCreateDepartament";
import CreateManySwitch from "@/components/custom/CreateManySwitch";

export default function CreateDepartamentForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync: createDepartament, isPending } = useCreateDepartament();
  const [many, setMany] = useState(false);
  const dialogId: DialogID = "create-departament";

  const form = useAppForm({
    defaultValues: defaultDepartamentFormValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value: { name, isExternal } }) => {
      try {
        await createDepartament({
          name,
          is_external: isExternal,
          is_active: true,
          is_final: false,
        });
        toast.success("Departamento criado com sucesso!");
        if (!many) closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o departamento.",
          duplicate: "Erro: departamento com esse nome já existe.",
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
        <DepartamentIsExternalCheckboxField form={form} />
      </FieldGroup>

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CreateManySwitch value={many} onChangeValue={setMany} />
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Criar departamento"
          loadingMsg="Criando..."
        />
      </div>
    </form>
  );
}
