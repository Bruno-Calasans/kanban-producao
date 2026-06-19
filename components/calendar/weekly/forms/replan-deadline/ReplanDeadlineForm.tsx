/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import {
  formSchema,
  useAppForm,
  EditDeadlineFormContextFormSchema,
} from "./editDeadlineFormContext";
import { DialogID } from "@/hooks/dialog/DialogContext";
import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { ReplanDeadlineDatesField } from "./fields/ReplanDeadlineDatesField";
import { ReplanDeadlineReasonField } from "./fields/ReplanDeadlineReasonField";
import useDialog from "@/hooks/dialog/useDialog";
import errorHandler from "@/utils/errorHandler";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeadlineStateMsg from "@/components/calendar/weekly/DeadlineStateMsg";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import useCreateProductionDeadlineLog from "@/hooks/production-deadline-log/useCreateProductionDeadlineLog";

type ReplanDeadlineFormProps = {
  deadline: ProductionDeadlinePopulated;
  departament: Departament;
  departamentState: DepartamentState;
};

export default function ReplanDeadlineForm({
  deadline,
  departamentState,
}: ReplanDeadlineFormProps) {
  const dialogId: DialogID = `edit-deadline-${deadline.id}`;
  const { closeDialog } = useDialog();

  const {
    mutateAsync: updateDeadline,
    isPending: isUpdateDeadlinePending,
    isError: isUpdateDeadlineError,
  } = useUpdateMovimentationDeadline();

  const {
    mutateAsync: createDeadlineLog,
    isPending: isCreateDeadlineLogPending,
    isError: iscCreateDeadlineLogError,
  } = useCreateProductionDeadlineLog();

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
      const { startDate, endDate, reason } = value;
      if (!startDate || !endDate) return;

      const plannedStartDate = new Date(startDate).toISOString();
      const plannedEndDate = new Date(endDate).toISOString();

      try {
        await updateDeadline({
          deadlineId: deadline.id,
          updateData: {
            planned_start_at: plannedStartDate,
            planned_end_at: plannedEndDate,
          },
        });

        // Cria histórico de replanejamento
        await createDeadlineLog({
          deadline_id: deadline.id,
          old_planned_start_at: deadline.planned_start_at,
          old_planned_end_at: deadline.planned_end_at,
          new_planned_start_at: plannedStartDate,
          new_planned_end_at: plannedEndDate,
          reason: reason || null,
        });

        toast.success("Prazo editado com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível editar o prazo",
        });
      }
    },
  });

  const isPending = isUpdateDeadlinePending || isCreateDeadlineLogPending;
  const isError = isUpdateDeadlineError || iscCreateDeadlineLogError;

  return (
    <form
      id="replan-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <DeadlineStateMsg
          deadline={deadline}
          departamentState={departamentState}
          hidePlannedDateSection
        />
        <ReplanDeadlineReasonField form={form} />
        <ReplanDeadlineDatesField form={form} />
      </div>

      <div
        id="replan-deadline-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton onClick={() => closeDialog(dialogId)} />
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Replanejar"
          loadingMsg="Replanejando..."
        />
      </div>
    </form>
  );
}
