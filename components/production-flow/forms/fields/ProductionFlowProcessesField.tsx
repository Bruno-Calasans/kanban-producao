/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FieldLegend, FieldSet, FieldDescription } from "@/components/ui/field";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import { Process, ProcessWithDepartament } from "@/types/database.type";
import ProcessSortable from "../../ProcessSortable";

type ProductionFlowProcessesFieldProps = {
  defaultProcesses?: ProcessWithDepartament[];
  selectedProcesses?: ProcessWithDepartament[];
  onSelect: (processes: ProcessWithDepartament[]) => void;
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
              Selecione os processos que fazem parte deste fluxo de produção. Apenas processos de
              departamentos INTERNOS aparecerão na lista.
            </FieldDescription>
            <ProcessSortable
              defaultProcesses={defaultProcesses}
              selectedProcesses={selectedProcesses}
              onSelect={(processes) => {
                const processNames = processes.map((process) => process.name);
                field.setValue(processNames);
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
