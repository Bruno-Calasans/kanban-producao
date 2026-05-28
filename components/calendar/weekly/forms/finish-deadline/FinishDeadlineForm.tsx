/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, FinishDeadlineFormSchema } from "./finishDeadlineFormContext";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { FinishedAtField } from "./fields/FinishedAtField";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import { differenceInDays } from "date-fns";
import useMoveToNextDepartament from "@/hooks/process-executation/useMoveToNextDepartament";

type FinishDeadlineFormProps = {
  processStates: ProcessState[];
  deadline: MovimentationDeadlinePopulated;
};

export default function FinishDeadlineForm({ processStates, deadline }: FinishDeadlineFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateDeadline, isPending, isError } = useUpdateMovimentationDeadline();
  const { mutateAsync: moveNextDepartament, isPending: isNextDepartamentPending } =
    useMoveToNextDepartament();

  const form = useAppForm({
    defaultValues: {
      finished_at: "",
    } as FinishDeadlineFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { finished_at } = value;
      if (!finished_at) return;

      const { movimentation } = deadline;
      const endDate = new Date(finished_at).toISOString();

      try {
        await updateDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            actual_end_at: endDate,
          },
        });

        await moveNextDepartament({
          processStates,
          finished_at: endDate,
          amount: movimentation.amount,
          startedAt: deadline.planned_start_at,
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

  const startedDate = deadline.started_at ? new Date(deadline.started_at) : undefined;
  const expectedDate = deadline.expected_at ? new Date(deadline.expected_at) : undefined;
  const today = new Date();

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
          <span className="font-bold">Data de Início:</span>{" "}
          {startedDate ? startedDate.toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span className="font-bold">Prazo:</span>{" "}
          {expectedDate ? expectedDate.toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span className="font-bold">Dias em atraso:</span>{" "}
          {expectedDate && startedDate && expectedDate.getTime() < today.getTime()
            ? differenceInDays(today, expectedDate)
            : "N/A"}
        </p>
        <p>
          <span className="font-bold">Dias restantes:</span>{" "}
          {expectedDate && startedDate ? differenceInDays(expectedDate, startedDate) : "N/A"}
        </p>
      </div>
      <FinishedAtField form={form} minDate={startedDate} />

      <div
        id="create-execution-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton
          hiddenIcon
          isLoading={isPending}
          label="Finalizar prazo"
          loadingMsg="Finalizando..."
        />
      </div>
    </form>
  );
}
