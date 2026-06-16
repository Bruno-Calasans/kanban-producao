/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, ReturnProcessFormContextSchema } from "./returnProcessFormContext";
import { FieldGroup } from "@/components/ui/field";
import { Departament, ProductionDeadlinePopulated } from "@/types/database.type";
import { ReturnAmountField } from "./fields/ReturnAmountField";
import { ReturnDepartamentField } from "./fields/ReturnDepartamentField";
import { ReturnDatesField } from "./fields/ReturnDatesField";
import { ExternalDepartamentState } from "@/utils/calcDepartamentExternalState";
import { useState } from "react";
import { DialogID } from "@/hooks/dialog/DialogContext";
import useDialog from "@/hooks/dialog/useDialog";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import { useCreateMovimentation } from "@/hooks/movimentation/useCreateMovimentation";
import CancelButton from "@/components/custom/buttons/CancelButton";

type ReturnDepartamentFormProps = {
  externalDepartamentState: ExternalDepartamentState;
  avaliableDepartaments: Departament[];
  deadline?: ProductionDeadlinePopulated;
};

export default function ReturnDepartamentForm({
  externalDepartamentState,
  avaliableDepartaments,
  deadline,
}: ReturnDepartamentFormProps) {
  const { closeDialog } = useDialog();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();
  const dialogId: DialogID = `return-movimentation-${externalDepartamentState.departament.id}`;

  const {
    mutateAsync: updateDeadline,
    isPending: isUpdateDeadlinePending,
    isError: isUpdateDeadlineError,
  } = useUpdateMovimentationDeadline();

  const {
    mutateAsync: createMovimentation,
    isPending: isMovimentationPending,
    isError: movimentationError,
  } = useCreateMovimentation();

  const form = useAppForm({
    defaultValues: {
      amount: externalDepartamentState.avaliableAmount,
      useMaxAmount: true,
      externalDepartamentName: "",
    } as ReturnProcessFormContextSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedDepartament) return;
      const { amount, started_at, finished_at } = value;
      const { departament: currDepartament, production } = externalDepartamentState;
      const startDate = started_at ? new Date(started_at).toISOString() : null;
      const endDate = finished_at ? new Date(finished_at).toISOString() : null;

      try {
        await createMovimentation({
          production,
          createData: {
            amount,
            from_departament_id: currDepartament.id,
            departament_id: selectedDepartament.id,
            production_id: production.id,
            product_id: production.product.id,
            started_at: startDate,
            finished_at: endDate,
            type: "RETURN",
            responsible_id: null,
            reason: null,
            deadline_id: deadline ? deadline.id : null,
          },
        });

        if (deadline) {
          updateDeadline({
            movimentationDeadlineId: deadline.id,
            updateData: {
              actual_start_at: startDate,
              actual_end_at: endDate,
            },
          });
        }

        toast.success("Retornado com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível retornar!",
        });
      }
    },
  });

  const isPending = isUpdateDeadlinePending || isMovimentationPending;
  const isError = isUpdateDeadlineError || movimentationError;

  return (
    <form
      id="return-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-5">
        <ReturnDepartamentField
          form={form}
          selectedDepartament={selectedDepartament}
          onChangeDepartament={setSelectedDepartament}
          avaliableDepartaments={avaliableDepartaments}
        />
        <ReturnAmountField form={form} maxAmount={externalDepartamentState.avaliableAmount} />
        <ReturnDatesField form={form} />
      </FieldGroup>

      <div id="return-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
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
