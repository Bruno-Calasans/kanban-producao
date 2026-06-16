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
  DepartamentState,
  ProductionDeadlinePopulated,
  Responsible,
} from "@/types/database.type";
import useMoveToNextDepartament from "@/hooks/movimentation/useMoveToNextDepartament";
import { MetaAmountField } from "./fields/MetaAmountField";
import { MetaDatesField } from "./fields/MetaDatesField";
import { MetaResponsibleField } from "./fields/MetaResponsibleField";
import usecreateMeta from "@/hooks/meta/useCreateMeta";
import CancelButton from "@/components/custom/buttons/CancelButton";
import { DialogID } from "@/hooks/dialog/DialogContext";
import { createMovimentationAction } from "@/app/actions/movimentation/create";

type MoveNextDepartamentFormProps = {
  goalAmount: number;
  metaWeekDate: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  departamentAvaliableAmount: number;
};

export default function FinishMetaForm({
  departamentStates,
  goalAmount,
  departament,
  metaWeekDate,
  deadline,
  departamentAvaliableAmount,
}: MoveNextDepartamentFormProps) {
  const { closeDialog } = useDialog();
  const dialogId: DialogID = `finish-meta-${metaWeekDate.toISOString()}`;
  const [responsible, setResponsible] = useState<Responsible>();
  const { mutateAsync: createMeta, isPending: isMetaPending } = usecreateMeta();
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

        // await moveNextDepartament({
        //   departamentStates,
        //   amount: amount,
        //   finished_at: finishedAtString,
        //   startedAt: startedAtString,
        //   responsibleId: responsible ? responsible.id : null,
        // });

        await createMeta({
          amount_done: amount,
          expected_amount: goalAmount,
          deadline_id: deadline.id,
          ref_date: metaWeekDate.toISOString(),
          started_at: startedAtString,
          finished_at: finishedAtString,
        });

        const currDepartamentState = departamentStates.find(
          (state) => state.departament.id === departament.id,
        );
        const nextDepartament = currDepartamentState?.nextDepartament;

        // Move para próximo departamento
        if (currDepartamentState && nextDepartament) {
          const production = currDepartamentState?.production;

          await createMovimentationAction({
            production,
            createMovimentationData: {
              amount,
              from_departament_id: departament.id,
              departament_id: nextDepartament?.id,
              started_at: startedAtString,
              finished_at: finishedAtString,
              production_id: currDepartamentState?.production.id,
              product_id: currDepartamentState?.production.product_id,
              responsible_id: responsible?.id || null,
              deadline_id: deadline.id,
              type: "TRANSFER",
              reason: "",
            },
          });
        }

        toast.success("Meta criada com sucesso!");
        closeDialog(dialogId);
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar a meta",
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
        <MetaAmountField
          form={form}
          metaAmount={goalAmount}
          maxAmount={departamentAvaliableAmount}
        />
        <MetaResponsibleField
          form={form}
          departament={departament}
          selectedResponsible={responsible}
          onChangeResponsible={setResponsible}
        />
        <MetaDatesField form={form} />
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
