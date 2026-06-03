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
import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { EditDeadlineDatesField } from "./fields/EditDeadlineDatesField";
import { differenceInDays } from "date-fns";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";

type EditDeadlineFormProps = {
  deadline: MovimentationDeadlinePopulated;
};

export default function EditDeadlineForm({ deadline }: EditDeadlineFormProps) {
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
      id="edit-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col  gap-1 mb-4">
        <p>
          <span className="font-bold">Produto:</span> {deadline.movimentation?.product?.name} |{" "}
          {deadline.movimentation?.product?.op}
        </p>
        <p>
          <span className="font-bold">Dias em atraso:</span>{" "}
          {isExpired ? differenceInDays(today, plannedEndDate) : "N/A"}
        </p>
        <p>
          <span className="font-bold">Dias restantes:</span> {remainingDays || "N/A"}
        </p>
      </div>
      <EditDeadlineDatesField form={form} />

      <div
        id="edit-deadline-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ConfirmButton hiddenIcon isLoading={isPending} label="Salvar" loadingMsg="Salvando..." />
      </div>
    </form>
  );
}
