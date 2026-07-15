/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, FinishDeadlineFormSchema } from "./finishDeadlineFormContext";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { FinishedDeadlineDatesField } from "./fields/FinishedDeadlineDatesField";
import { differenceInDays } from "date-fns";
import { DialogID } from "@/hooks/dialog/DialogContext";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import useMoveToNextDepartament from "@/hooks/movimentation/useMoveToNextDepartament";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeadlineStateMsg from "../../DeadlineStateMsg";

type FinishDeadlineFormProps = {
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  departamentAvaliableAmount: number;
};

export default function FinishDeadlineForm({
  deadline,
  departamentStates,
  departamentAvaliableAmount,
}: FinishDeadlineFormProps) {
  const dialogId: DialogID = `finish-deadline-${deadline.id}`;
  const { closeDialog } = useDialog();

  const {
    mutateAsync: updateDeadline,
    isPending: isUpdateDeadlinePending,
    isError: updateDeadlineError,
  } = useUpdateMovimentationDeadline();

  const {
    mutateAsync: moveNextDepartament,
    isPending: isNextDepartamentPending,
    isError: moveNextDepartamentError,
  } = useMoveToNextDepartament();

  const form = useAppForm({
    defaultValues: {
      finished_at: "",
    } as FinishDeadlineFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { startDate, endDate } = value;
      if (!startDate || !endDate) return;

      const { production } = deadline;
      const actualStartDate = new Date(startDate).toISOString();
      const actualEndDate = new Date(endDate).toISOString();

      try {
        await updateDeadline({
          deadlineId: deadline.id,
          updateData: {
            actual_start_at: actualStartDate,
            actual_end_at: actualEndDate,
          },
        });

        await moveNextDepartament({
          production: deadline.production,
          deadlineId: deadline.id,
          departamentStates,
          amount: production.amount,
          startedAt: startDate,
          finished_at: endDate,
          responsibleId: null,
          dailyGoalId: null,
        });

        toast.success("Prazo finalizado com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível finalizar o prazo",
        });
      }
    },
  });

  const isPending = isUpdateDeadlinePending || isNextDepartamentPending;
  const isError = updateDeadlineError || moveNextDepartamentError;

  const plannedStartDate = deadline.planned_start_at
    ? new Date(deadline.planned_start_at)
    : undefined;

  const today = new Date();
  const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : undefined;

  const isExpired =
    plannedEndDate && plannedStartDate && plannedEndDate.getTime() < today.getTime();

  const remainingDays =
    plannedEndDate && plannedStartDate ? differenceInDays(plannedEndDate, today) + 2 : 0;

  const departamentState = departamentStates.find(
    (state) => state.departament.id === deadline.departament.id,
  )!;

  return (
    <form
      id="finish-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <DeadlineStateMsg deadline={deadline} departamentState={departamentState} />
      <br />
      <FinishedDeadlineDatesField form={form} />

      <div
        id="finish-deadline-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Concluir"
          loadingMsg="Concluindo..."
        />
      </div>
    </form>
  );
}
