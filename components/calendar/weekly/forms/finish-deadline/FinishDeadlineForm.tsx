/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, FinishDeadlineFormSchema } from "./finishDeadlineFormContext";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { FinishedDeadlineDatesField } from "./fields/FinishedDeadlineDatesField";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import { differenceInDays } from "date-fns";
import useMoveToNextDepartament from "@/hooks/movimentation/useMoveToNextDepartament";

type FinishDeadlineFormProps = {
  processStates: ProcessState[];
  deadline: MovimentationDeadlinePopulated;
};

export default function FinishDeadlineForm({ processStates, deadline }: FinishDeadlineFormProps) {
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

      const { movimentation } = deadline;
      const actualStartDate = new Date(startDate).toISOString();
      const actualEndDate = new Date(endDate).toISOString();

      try {
        await updateDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            actual_start_at: actualStartDate,
            actual_end_at: actualEndDate,
          },
        });

        await moveNextDepartament({
          processStates,
          amount: movimentation.amount,
          startedAt: startDate,
          finished_at: endDate,
          responsibleId: null,
        });

        toast.success("Prazo finalizado com sucesso!");
        closeDialog(`finish-deadline-${deadline.id}`);
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

  const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : undefined;
  const today = new Date();

  const isExpired =
    plannedEndDate && plannedStartDate && plannedEndDate.getTime() < today.getTime();

  const remainingDays =
    plannedEndDate && plannedStartDate ? differenceInDays(plannedEndDate, plannedStartDate) + 1 : 0;

  return (
    <form
      id="finish-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col  gap-1 mb-4">
        <p>
          <span className="font-bold">Data de início planejada:</span>{" "}
          {plannedStartDate ? plannedStartDate.toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span className="font-bold">Date de fim planejada:</span>{" "}
          {plannedEndDate ? plannedEndDate.toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span className="font-bold">Dias em atraso:</span>{" "}
          {isExpired ? differenceInDays(today, plannedEndDate) : "N/A"}
        </p>
        <p>
          <span className="font-bold">Dias restantes:</span> {remainingDays || "N/A"}
        </p>
      </div>
      <FinishedDeadlineDatesField form={form} />

      <div
        id="finish-deadline-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Finalizar"
          loadingMsg="Finalizando..."
        />
      </div>
    </form>
  );
}
