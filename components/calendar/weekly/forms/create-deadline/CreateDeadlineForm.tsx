"use client";

import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
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
import { MovimentationSelectorField } from "./fields/MovimentationSelectorField";
import MovimentationDeadlinesTable from "@/components/movimentation/table/MovimentationDeadlinesTable";
import calcDepartamentState from "@/utils/calcDepartamentDeadlineState";

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
    </form>
  );
}
