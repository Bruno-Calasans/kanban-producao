/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { formSchema, useAppForm, FinishMetaFormContextFormSchema } from "./FinishGoalFormContext";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import {
  DailyGoalPopulated,
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
import useCreateDailyGoal from "@/hooks/daily-goal/useCreateDailyGoal";
import CancelButton from "@/components/custom/buttons/CancelButton";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import useUpdateProductionDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";

type FinishGoalFormProps = {
  dailyGoalDate: Date;
  departament: Departament;
  expectedGoalAmount: number;
  departamentStates: DepartamentState[];
  deadlineState: DepartamentDeadlineState;
};

export default function FinishGoalForm({
  departamentStates,
  departament,
  dailyGoalDate,
  expectedGoalAmount,
  deadlineState,
}: FinishGoalFormProps) {
  const { closeDialog } = useDialog();
  const dialogId: DialogID = `finish-meta-${dailyGoalDate.toISOString()}`;
  const [responsible, setResponsible] = useState<Responsible>();

  const { mutateAsync: createDailyGoal, isPending: isMetaPending } = useCreateDailyGoal();
  const { mutateAsync: moveNextDepartament, isPending: isNextDepartamentPending } =
    useMoveToNextDepartament();
  const { mutateAsync: updateDeadline, isPending: isUpdateDeadlinePending } =
    useUpdateProductionDeadline();

  const { deadline, departamentState } = deadlineState;
  const { avaliableAmount } = departamentState;

  const form = useAppForm({
    defaultValues: {
      amount: expectedGoalAmount,
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

      if (!deadline) return;

      try {
        const isDepartamentEmptyAfterFinishGoal = avaliableAmount - amount == 0;

        const startedAtString = started_at
          ? new Date(started_at).toISOString()
          : new Date().toISOString();

        const finishedAtString = finished_at
          ? new Date(finished_at).toISOString()
          : new Date().toISOString();

        const { data: createdDailyGoal } = await createDailyGoal({
          amount_done: amount,
          expected_amount: expectedGoalAmount,
          deadline_id: deadline.id,
          ref_date: dailyGoalDate.toISOString(),
          started_at: startedAtString,
          finished_at: finishedAtString,
        });

        await moveNextDepartament({
          production: deadline.production,
          departamentStates,
          amount: amount,
          finished_at: finishedAtString,
          startedAt: startedAtString,
          responsibleId: responsible ? responsible.id : null,
          dailyGoalId: createdDailyGoal.id,
        });

        // Atualiza deadline caso a última meta concluída tenha zerado o departamento
        if (isDepartamentEmptyAfterFinishGoal) {
          await updateDeadline({
            deadlineId: deadline.id,
            updateData: {
              actual_start_at: startedAtString,
              actual_end_at: finishedAtString,
            },
          });
        }

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

  const isPending = isNextDepartamentPending || isMetaPending || isUpdateDeadlinePending;

  return (
    <form
      id="meta-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <GoalAmountField form={form} goalAmount={expectedGoalAmount} maxAmount={avaliableAmount} />
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
