/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, SkipFormContextSchema } from "./skipMovimentationFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { SkipAmountField } from "./fields/SkipAmountField";
import { SkipDepartamentField } from "./fields/SkipDepartamentField";
import { SkipReasonField } from "./fields/SkipReasonField";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useCreateMovimentation } from "@/hooks/movimentation/useCreateMovimentation";
import CancelButton from "@/components/custom/buttons/CancelButton";
import { DialogID } from "@/hooks/dialog/DialogContext";

type SkipMovimentationFormProps = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
  departamentDeadline: ProductionDeadlinePopulated | null;
};

export default function SkipMovimentationForm({
  departamentState,
  departamentStates,
  departamentDeadline,
}: SkipMovimentationFormProps) {
  const { closeDialog } = useDialog();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();
  const { mutateAsync: createMovimentation, isPending: isCreateExecutionPending } =
    useCreateMovimentation();
  const dialogId: DialogID = `skip-movimentation-${departamentState.departament.id}`;

  const form = useAppForm({
    defaultValues: {
      amount: departamentState.avaliableAmount,
      useMaxAmount: true,
      departamentName: "",
      reason: "",
    } as SkipFormContextSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedDepartament) return;
      const { amount, reason } = value;
      const { departament: currDepartament, production } = departamentState;

      try {
        // Cria execução de processo
        await createMovimentation({
          production,
          createData: {
            amount,
            from_departament_id: currDepartament.id,
            departament_id: selectedDepartament.id,
            production_id: production.id,
            product_id: production.product.id,
            type: "SKIP",
            reason: reason || null,
            started_at: null,
            finished_at: null,
            responsible_id: null,
            deadline_id: departamentDeadline ? departamentDeadline.id : null,
          },
        });

        toast.success("Departamento pulado com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível pular o departamento!",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;
  const avaliableDepartaments = departamentStates
    .filter(({ departament }) => departament.id != departamentState.departament.id)
    .map((state) => state.departament);

  return (
    <form
      id="skip-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-5">
        <SkipDepartamentField
          form={form}
          selectedDepartament={selectedDepartament}
          onChangeDepartament={setSelectedDepartament}
          avaliableDepartaments={avaliableDepartaments}
        />
        <SkipAmountField form={form} maxAmount={departamentState.avaliableAmount} />
        <SkipReasonField form={form} />
      </FieldGroup>

      <div id="skip-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
        <CancelButton label="Cancelar" onClick={() => closeDialog(dialogId)} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Pular" loadingMsg="Pulando.." />
      </div>
    </form>
  );
}
