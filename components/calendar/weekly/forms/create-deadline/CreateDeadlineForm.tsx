"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { FieldGroup } from "@/components/ui/field";
import { useMemo, useState } from "react";
import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import { defaultCreateDeadlineForm, useAppForm, formSchema } from "./createDeadlineFormContext";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import { DepartamentSelectorField } from "./fields/DepartamentSelectorField";
import { MovimentationSelectorField } from "./fields/MovimentationSelectorField";
import MovimentationDeadlinesTable from "@/components/movimentation/table/MovimentationDeadlinesTable";
import useDepartamentState from "@/hooks/departament-state/useDepartamentState";
import CancelButton from "@/components/custom/buttons/CancelButton";
import calcDepartamentState from "@/utils/calcDepartamentState";

type CreateDeadlineFormProps = {
  movimentations: MovimentationPopulated[];
  deadlinesByMovimentation: Map<number, MovimentationDeadlinePopulated[]>;
  processStatesByMovimentation: Map<number, ProcessState[]>;
};

export default function CreateDeadlineForm({
  movimentations,
  deadlinesByMovimentation,
  processStatesByMovimentation,
}: CreateDeadlineFormProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: createDeadline, isPending } = useCreateMovimentationDeadline();
  const [selectedMovimentation, setSelectedMovimentation] = useState<MovimentationPopulated>();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();

  const form = useAppForm({
    defaultValues: defaultCreateDeadlineForm,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (!selectedDepartament || !selectedMovimentation) return;
        const { plannedStartDate, plannedEndDate } = value;
        await createDeadline({
          movimentation_id: selectedMovimentation.id,
          departament_id: selectedDepartament.id,
          planned_start_at: plannedStartDate,
          planned_end_at: plannedEndDate,
          actual_start_at: null,
          actual_end_at: null,
        });
        toast.success("Prazo criado com sucesso!");
        closeDialog("create-deadline");
        form.reset();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o prazo.",
          duplicate: "Erro: prazo com esse nome ou sequência já existe.",
        });
      }
    },
  });

  const movimentationDeadlines = selectedMovimentation
    ? deadlinesByMovimentation.get(selectedMovimentation.id) || []
    : [];

  const movimentationProcessStates = selectedMovimentation
    ? processStatesByMovimentation.get(selectedMovimentation.id) || []
    : [];

  const departamentStates = selectedMovimentation
    ? calcDepartamentState({
        movimentation: selectedMovimentation,
        movimentationDeadlines,
        movimentationProcessStates,
      })
    : undefined;

  return (
    <form
      id="create-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex flex-col gap-2">
        <MovimentationSelectorField
          form={form}
          avaliableMovimentations={movimentations}
          selectedMovimentation={selectedMovimentation}
          onChangeMovimentation={setSelectedMovimentation}
        />
        {departamentStates && (
          <MovimentationDeadlinesTable departamentStates={departamentStates} hideSearch />
        )}
      </FieldGroup>

      {/* <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <CancelButton isLoading={isPending} onclick={() => closeDialog("create-deadline")} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Criar prazo" />
      </div> */}
    </form>
  );
}
