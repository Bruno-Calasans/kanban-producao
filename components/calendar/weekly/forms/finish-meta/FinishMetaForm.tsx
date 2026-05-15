/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, useAppForm, FinishMetaFormContextFormSchema } from "./FinishMetaFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import { useState } from "react";
import {
  Departament,
  MovimentationDeadlinePopulated,
  ProcessState,
  Responsible,
} from "@/types/database.type";
import useMoveToNextDepartament from "@/hooks/process-executation/useMoveToNextDepartament";
import { MetaAmountField } from "./fields/MetaAmountField";
import { MetaDatesField } from "./fields/MetaDatesField";
import { MetaResponsibleField } from "./fields/MetaResponsibleField";
import usecreateMeta from "@/hooks/meta/useCreateMeta";
import { addDays } from "date-fns";

type MoveNextDepartamentFormProps = {
  processStates: ProcessState[];
  metaAmount: number;
  departament: Departament;
  metaWeekDate: Date;
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
};

export default function FinishMetaForm({
  processStates,
  metaAmount,
  departament,
  metaWeekDate,
  deadline,
  departamentAvaliableAmount,
}: MoveNextDepartamentFormProps) {
  const { closeDialog } = useDialog();
  const [responsible, setResponsible] = useState<Responsible>();
  const { mutateAsync: moveNextDepartament, isPending: isNextDepartamentPending } =
    useMoveToNextDepartament();
  const { mutateAsync: createMeta, isPending: isMetaPending } = usecreateMeta();

  const form = useAppForm({
    defaultValues: {
      amount: metaAmount,
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
          amount: amount,
          processStates,
          finished_at: finishedAtString,
          startedAt: startedAtString,
          responsibleId: responsible ? responsible.id : null,
          refWeekDate: metaWeekDate.toISOString(),
        });

        await createMeta({
          amount_done: amount,
          expected_amount: metaAmount,
          deadline_id: deadline.id,
          ref_date: metaWeekDate.toISOString(),
          started_at: startedAtString,
          finished_at: finishedAtString,
        });
        toast.success("Meta criada com sucesso!");
        closeDialog("finish-meta");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar a meta",
        });
      }
    },
  });

  const isPending = isNextDepartamentPending || isMetaPending;
  const maxAmount = processStates[0].movimentation.amount;

  return (
    <form
      id="meta-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* <ExecutionState from_process={processState.process} to_process={processState.nextProcess} /> */}
      <FieldGroup>
        <MetaDatesField form={form} />
        <MetaAmountField
          form={form}
          metaAmount={metaAmount}
          maxAmount={departamentAvaliableAmount}
        />
        <MetaResponsibleField
          form={form}
          departament={departament}
          selectedResponsible={responsible}
          onChangeResponsible={setResponsible}
        />
      </FieldGroup>

      <div id="amount-form-buttons" className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
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
