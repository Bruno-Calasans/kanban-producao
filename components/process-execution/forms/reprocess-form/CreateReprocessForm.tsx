/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { Departament, DepartamentState } from "@/types/database.type";
import useCreateProcessExecution from "@/hooks/movimentation/useCreateMovimentation";
import { ReprocessExecutionSchema, useAppForm, formSchema } from "./reprocessExecutionFormContext";
import { ReprocessAmountField } from "./fields/ReprocessAmountField";
import { ReprocessDepartamentField } from "./fields/ReprocessDepartamentField";
import { useMemo, useState } from "react";
import { ReprocessReasonField } from "./fields/ReprocessReasonField";

type CreateReprocessFormrops = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
};

export default function CreateReprocessForm({
  departamentState,
  departamentStates,
}: CreateReprocessFormrops) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createProcessExecution, isPending: isCreateExecutionPending } =
    useCreateProcessExecution();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>(
    departamentState.previousDepartament || undefined,
  );

  const form = useAppForm({
    defaultValues: {
      amount: departamentState.avaliableAmount,
      departamentName: selectedDepartament?.name || "",
      useMaxAmount: false,
      reason: "",
    } as ReprocessExecutionSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { amount } = value;
        const { departament, production } = departamentState;

        if (!selectedDepartament) return;

        // Cria execução de processo
        await createProcessExecution({
          production,
          createData: {
            amount,
            from_departament_id: departament.id,
            departament_id: selectedDepartament.id,
            production_id: production.id,
            product_id: production.product.id,
            responsible_id: null,
            started_at: new Date().toISOString(),
            finished_at: new Date().toISOString(),
            type: "REPROCESS",
            reason: null,
          },
        });

        toast.success("Reprocesso criado com sucesso!");
        closeDialog(`reprocess-movimentation-${departamentState.departament.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível reprocessar",
        });
      }
    },
  });

  const isPending = isCreateExecutionPending;

  const avaliableDepartaments = useMemo(() => {
    return departamentStates
      .filter(
        ({ departament, template }) =>
          // Departamento diferente do atual
          departament.id != departamentState.departament.id &&
          // Tem valor de sequência
          template?.sequence != null &&
          departamentState.template.sequence != null &&
          template?.sequence != departamentState.template.sequence,
      )
      .map((state) => state.departament);
  }, [departamentState, departamentStates]);

  return (
    <form
      id="reprocess-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ReprocessDepartamentField
          form={form}
          selectedDepartament={selectedDepartament}
          avaliableDepartaments={avaliableDepartaments}
          onChangeDepartament={setSelectedDepartament}
        />
        <ReprocessAmountField form={form} maxAmount={departamentState.avaliableAmount} />
        <ReprocessReasonField form={form} />
      </FieldGroup>

      <div
        id="create-reprocess-form-buttons"
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
