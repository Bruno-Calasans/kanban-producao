/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, FinishMetaFormContextFormSchema } from "./FinishGoalFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import {
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
  Responsible,
} from "@/types/database.type";
import { GoalAmountField } from "./fields/GoalAmountField";
import { GoalDatesField } from "./fields/GoalDatesField";
import { GoalResponsibleField } from "./fields/GoalResponsibleField";
import { DialogID } from "@/hooks/dialog/DialogContext";
import useMoveToNextDepartament from "@/hooks/movimentation/useMoveToNextDepartament";
import useCreateDailyGoal from "@/hooks/meta/useCreateDailyGoal";
import CancelButton from "@/components/custom/buttons/CancelButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";

type FinishGoalFormProps = {
  goalAmount: number;
  metaWeekDate: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  departamentAvaliableAmount: number;
};

export default function FinishGoalForm({
  departamentStates,
  goalAmount,
  departament,
  metaWeekDate,
  deadline,
  departamentAvaliableAmount,
}: FinishGoalFormProps) {
  const { closeDialog } = useDialog();
  const dialogId: DialogID = `finish-meta-${metaWeekDate.toISOString()}`;
  const [responsible, setResponsible] = useState<Responsible>();
  const { mutateAsync: createDailyGoal, isPending: isMetaPending } = useCreateDailyGoal();
  const { mutateAsync: moveNextDepartament, isPending: isNextDepartamentPending } =
    useMoveToNextDepartament();

  const form = useAppForm({
    defaultValues: {
      amount: goalAmount,
      started_at: new Date().toDateString(),
      finished_at: new Date().toDateString(),
      responsible: "",
      useMaxAmount: false,
    } as FinishMetaFormContextFormSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { amount, started_at, finished_at } = value;
      try {
        const startedAtString = started_at ? new Date(started_at).toISOString() : null;
        const finishedAtString = finished_at ? new Date(finished_at).toISOString() : null;

        await moveNextDepartament({
          production: deadline.production,
          departamentStates,
          amount: amount,
          finished_at: finishedAtString,
          startedAt: startedAtString,
          responsibleId: responsible ? responsible.id : null,
        });

        await createDailyGoal({
          amount_done: amount,
          expected_amount: goalAmount,
          deadline_id: deadline.id,
          ref_date: metaWeekDate.toISOString(),
          started_at: startedAtString,
          finished_at: finishedAtString,
        });

        toast.success("Meta concluída com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi concluir criar a meta",
        });
      }
    },
  });

  const isPending = isNextDepartamentPending || isMetaPending;

  return (
    <form
      id="meta-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <GoalAmountField
          form={form}
          goalAmount={goalAmount}
          maxAmount={departamentAvaliableAmount}
        />
        <GoalResponsibleField
          form={form}
          departament={departament}
          selectedResponsible={responsible}
          onChangeResponsible={setResponsible}
        />
        <GoalDatesField form={form} />
      </FieldGroup>

      <div id="amount-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
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
