/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FieldLegend, FieldSet, FieldDescription } from "@/components/ui/field";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import { Process } from "@/types/database.type";
import ProcessSelector from "@/components/custom/ProcessSelector";

type ProductionFlowProcessesFieldProps = {
  selectedProcesses?: Process[];
  onSelect: (processes: Process[]) => void;
};

export const ProductionFlowProcessesField = withForm({
  defaultValues: defaultProductionFlowValues,
  props: {} as ProductionFlowProcessesFieldProps,
  render({ form, selectedProcesses, onSelect }) {
    const handleSelectedProcesses = (processes: Process[]) => {
      onSelect(processes);
      const processNames = processes.map((process) => process.name);
      form.setFieldValue("processNames", processNames);
    };

    return (
      <form.Field
        name="processNames"
        children={(field) => (
          <FieldSet>
            <FieldLegend>Processos</FieldLegend>
            <FieldDescription>
              Selecione os processos que fazem parte deste fluxo de produção.
            </FieldDescription>
            <ProcessSelector
              selectedProcesses={selectedProcesses}
              onSelect={handleSelectedProcesses}
            />
            <FieldDescription />
          </FieldSet>
        )}
      ></form.Field>
    );
  },
});
