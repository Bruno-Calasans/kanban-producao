/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FieldLegend, FieldSet, FieldDescription } from "@/components/ui/field";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import { Process } from "@/types/database.type";
import ProcessSelector from "@/components/custom/ProcessSelector";

type ProductionFlowProcessesFieldProps = {
  defaultProcesses?: Process[];
  selectedProcesses?: Process[];
  onSelect: (processes: Process[]) => void;
};

export const ProductionFlowProcessesField = withForm({
  defaultValues: defaultProductionFlowValues,
  props: {} as ProductionFlowProcessesFieldProps,
  render({ form, defaultProcesses, selectedProcesses, onSelect }) {
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
              defaultProcesses={defaultProcesses}
              selectedProcesses={selectedProcesses}
              onSelect={(processes) => {
                const processNames = processes.map((process) => process.name);
                form.setFieldValue("processNames", processNames);
                onSelect(processes);
              }}
            />
            <FieldDescription />
          </FieldSet>
        )}
      ></form.Field>
    );
  },
});
