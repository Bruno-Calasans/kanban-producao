"use client";

import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { useMemo, useState } from "react";
import {
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { defaultCreateDeadlineForm, useAppForm, formSchema } from "./createDeadlineFormContext";
import { calcDepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { ProductionSelectorFieldField } from "./fields/ProductionSelectorField";
import { calcDepartamentStates } from "@/utils/calcDepartamentStates";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import useCreateMovimentationDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import ProductionDeadlineTable from "@/components/movimentation/table/ProductionDeadlineStatusBadge";
import useGetAllProductionDepartamentStates from "@/hooks/movimentation-process-state/useGetAllProductionDepartamentStates";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import useGetAllDeadlinesByProduction from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";

export default function CreateDeadlineForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync: createDeadline, isPending } = useCreateMovimentationDeadline();
  const [selectedProduction, setSelectedProduction] = useState<ProductionPopulated>();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();

  const {
    data: productionsData,
    isLoading: isProductionsLoading,
    isError: isProductionsError,
  } = useGetAllProductions();
  const productions = productionsData?.data || [];

  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesLoading,
    isError: isDepartamentStatesError,
  } = useGetAllProductionDepartamentStates({
    productions,
  });

  const {
    data: productionDeadlinesData,
    isLoading: isDeadlinesLoading,
    isError: isDeadlinesError,
  } = useGetAllDeadlinesByProduction(selectedProduction?.id);
  const deadlines = productionDeadlinesData?.data || [];

  const deadlinesByProduction = groupDeadlinesByProduction(deadlines);

  const form = useAppForm({
    defaultValues: defaultCreateDeadlineForm,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (!selectedDepartament || !selectedProduction) return;
        const { plannedStartDate, plannedEndDate } = value;

        await createDeadline({
          production_id: selectedProduction.id,
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

  const productionDepartamentStates = selectedProduction
    ? departamentStatesByProduction.get(selectedProduction.id) || []
    : [];

  const departamentDeadlineStates = useMemo(() => {
    if (!selectedProduction) return;

    // Pega os prazos da produção selecionada
    const productionDeadlines = selectedProduction
      ? deadlinesByProduction.get(selectedProduction.id) || []
      : [];

    return calcDepartamentDeadlineState({
      production: selectedProduction,
      productionDeadlines,
      productionDepartamentStates,
    });
  }, [selectedProduction]);

  const isLoading = isProductionsLoading || isDepartamentStatesLoading || isDeadlinesLoading;
  const isError = isProductionsError || isDepartamentStatesError || isDeadlinesError;

  return (
    <form
      id="create-deadline-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="flex flex-col gap-2">
        <ProductionSelectorFieldField
          form={form}
          productions={productions}
          isLoading={isLoading}
          selectedProduction={selectedProduction}
          onChangeProduction={setSelectedProduction}
        />
        {departamentDeadlineStates && (
          <ProductionDeadlineTable
            departamentDeadlineStates={departamentDeadlineStates}
            hideSearch
          />
        )}
      </FieldGroup>
    </form>
  );
}
