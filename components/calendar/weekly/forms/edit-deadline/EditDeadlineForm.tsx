/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import {
  formSchema,
  useAppForm,
  EditDeadlineFormContextFormSchema,
} from "./editDeadlineFormContext";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { Departament, ProductionDeadlinePopulated } from "@/types/database.type";
import { EditDeadlineDatesField } from "./fields/EditDeadlineDatesField";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeadlineStateMsg from "@/components/calendar/weekly/DeadlineStateMsg";

type EditDeadlineFormProps = {
  deadline: ProductionDeadlinePopulated;
  departament: Departament;
  departamentAvaliableAmount: number;
};

export default function EditDeadlineForm({
  deadline,
  departamentAvaliableAmount,
}: EditDeadlineFormProps) {
  const { closeDialog } = useDialog();
  const {
    mutateAsync: updateDeadline,
    isPending: isUpdateDeadlinePending,
    isError: updateDeadlineError,
  } = useUpdateMovimentationDeadline();

  const form = useAppForm({
    defaultValues: {
      startDate: deadline.planned_start_at ? deadline.planned_start_at : "",
      endDate: deadline.planned_end_at ? deadline.planned_end_at : "",
    } as EditDeadlineFormContextFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { startDate, endDate } = value;
      if (!startDate || !endDate) return;

      const plannedStartDate = new Date(startDate).toISOString();
      const plannedEndDate = new Date(endDate).toISOString();

      try {
        await updateDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            planned_start_at: plannedStartDate,
            planned_end_at: plannedEndDate,
          },
        });

        toast.success("Prazo editado com sucesso!");
        closeDialog(`edit-deadline-${deadline.id}`);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível editar o prazo",
        });
      }
    },
  });

  const isPending = isUpdateDeadlinePending;
  const isError = updateDeadlineError;

  return (
    <form
      id="edit-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <DeadlineStateMsg
        deadline={deadline}
        departamentAvaliableAmount={departamentAvaliableAmount}
        hidePlannedDateSection
      />
      <br />
      <EditDeadlineDatesField form={form} />

      <div
        id="edit-deadline-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton onClick={() => closeDialog(`edit-deadline-${deadline.id}`)} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Salvar" loadingMsg="Salvando..." />
      </div>
    </form>
  );
}
