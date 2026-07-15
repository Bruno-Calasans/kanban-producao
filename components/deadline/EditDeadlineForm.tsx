"use client";

import { toast } from "sonner";

import { ProductionDeadlinePopulated } from "@/types/database.type";
import useDialog from "@/hooks/dialog/useDialog";
import handleFormError from "@/utils/errorHandler";
import CancelButton from "@/components/custom/buttons/CancelButton";
import useUpdateProductionDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import { DateField } from "./fields/DateField";
import {
  defaultEditExternalDeadlineFormValues,
  formSchema,
  useAppForm,
} from "./deadlineFormContext";
import ConfirmButton from "../custom/buttons/ConfirmButton";
import { DialogID } from "@/hooks/dialog/DialogContext";
import SaveButton from "../custom/buttons/SaveButton";

type EditDeadlineFormProps = {
  deadline: ProductionDeadlinePopulated;
};

export default function EditDeadlineForm({ deadline }: EditDeadlineFormProps) {
  const dialogId: DialogID = `edit-deadline-${deadline.id}`;
  const { closeDialog } = useDialog();
  const { mutateAsync: updateDeadline, isPending: isUpdateDEadlinePending } =
    useUpdateProductionDeadline();

  const form = useAppForm({
    defaultValues: {
      plannedEndAt: deadline.planned_end_at || "",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { plannedEndAt } = value;
      if (!plannedEndAt) return;

      try {
        await updateDeadline({
          deadlineId: deadline.id,
          updateData: {
            planned_end_at: plannedEndAt ? new Date(plannedEndAt).toISOString() : null,
          },
        });

        toast.success("Prazo editado com com sucesso");
        closeDialog(dialogId);
      } catch (error) {
        handleFormError(error, {
          default: "Erro: não foi possível editar prazo. Tente novamente.",
        });
      }
    },
  });

  const isPending = isUpdateDEadlinePending;

  return (
    <form
      id="edit-deadline-form"
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <DateField form={form} />
      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
        <SaveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
