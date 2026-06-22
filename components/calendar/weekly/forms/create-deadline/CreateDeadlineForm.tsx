"use client";

import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { useMemo, useState } from "react";
import { Departament, ProductionPopulated } from "@/types/database.type";
import { defaultCreateDeadlineForm, useAppForm, formSchema } from "./createDeadlineFormContext";
import { calcDepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { ProductionSelectorFieldField } from "./fields/ProductionSelectorField";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import errorHandler from "@/utils/errorHandler";
import useDialog from "@/hooks/dialog/useDialog";
import useCreateMovimentationDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import ProductionDeadlineTable from "@/components/movimentation/table/ProductionDeadlineTable";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";
import useGetAllDeadlinesByProduction from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";
import useGetAllActiveProductions from "@/hooks/production/useGetAllActiveProductions";

export default function CreateDeadlineForm() {
  const { closeDialog } = useDialog();
  const { mutateAsync: createDeadline, isPending } = useCreateMovimentationDeadline();
  const [selectedProduction, setSelectedProduction] = useState<ProductionPopulated>();
  const [selectedDepartament, setSelectedDepartament] = useState<Departament>();

  const {
    data: productionsData,
    isLoading: isProductionsLoading,
    error: productionsError,
  } = useGetAllActiveProductions();
  const productions = productionsData?.data || [];

  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesLoading,
    error: departamentStatesError,
  } = useGetAllProductionDepartamentStates({
    productions,
  });

  const {
    data: productionDeadlinesData,
    isLoading: isDeadlinesLoading,
    error: deadlinesError,
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
  const isError = productionsError || departamentStatesError || deadlinesError;

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
