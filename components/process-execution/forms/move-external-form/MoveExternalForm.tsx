/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, defaultMoveExternalFormValues } from "./moveExternalFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Departament, DepartamentState } from "@/types/database.type";
import { MoveAmountField } from "./fields/MoveAmountField";
import { ExternalDepartamentField } from "./fields/ExternalDepartamentField";
import { ExternalDeadlineField } from "./fields/ExternalDeadlineField";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation";
import useCreateProductionDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import useGetAllActiveExternalDepartaments from "@/hooks/departament/useGetAllActiveExternalDepartaments";
import CancelButton from "@/components/custom/buttons/CancelButton";

type MoveExternalFormProps = {
  departamentState: DepartamentState;
};

export default function MoveExternalForm({ departamentState }: MoveExternalFormProps) {
  const { closeDialog } = useDialog();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();
  const {
    mutateAsync: createMovimentation,
    isPending: isMovimentationPending,
    error: executionError,
  } = useCreateMovimentation();

  const {
    mutateAsync: createDeadline,
    isPending: isDeadlinePending,
    error: deadlineError,
  } = useCreateProductionDeadline();

  const {
    data,
    isPending: isDepartamentsPending,
    error: processError,
  } = useGetAllActiveExternalDepartaments();
  const departaments = data?.data || [];

  const form = useAppForm({
    defaultValues: { ...defaultMoveExternalFormValues, amount: departamentState.avaliableAmount },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!selectedDepartament) return;
      const { amount, plannedEndAt } = value;
      const { departament: currDepartament, production } = departamentState;

      try {
        await createMovimentation({
          production,
          createData: {
            amount,
            from_departament_id: currDepartament.id,
            departament_id: selectedDepartament.id,
            production_id: production.id,
            product_id: production.product.id,
            type: "EXTERNAL",
            responsible_id: null,
            started_at: null,
            finished_at: null,
            reason: null,
          },
        });

        if (plannedEndAt) {
          await createDeadline({
            departament_id: currDepartament.id,
            production_id: production.id,
            planned_end_at: new Date(plannedEndAt).toISOString(),
            planned_start_at: null,
            actual_start_at: null,
            actual_end_at: null,
          });
        }

        toast.success("Movido com sucesso!");
        closeDialog(`external-movimentation-${departamentState.departament.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível mover!",
        });
      }
    },
  });

  const isPending = isMovimentationPending || isDepartamentsPending || isDeadlinePending;
  const isError = executionError || processError || deadlineError;

  return (
    <form
      id="move-external-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex gap-4 mb-4">
        <ExternalDepartamentField
          form={form}
          departaments={departaments}
          defaultDepartament={departaments[0]}
          selectedDepartament={selectedDepartament}
          onChangeDepartament={setSelectedDepartament}
          isLoading={isDepartamentsPending}
        />
        <MoveAmountField form={form} maxAmount={departamentState.avaliableAmount} />
        <ExternalDeadlineField form={form} />
      </FieldGroup>

      <div
        id="move-external-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton
          isLoading={isPending}
          hiddenIcon
          onClick={() => closeDialog(`external-movimentation-${departamentState.departament.id}`)}
        />
        <ConfirmButton
          label="Mover para fora"
          loadingMsg="Movendo..."
          isLoading={isPending}
          hiddenIcon
        />
      </div>
    </form>
  );
}
