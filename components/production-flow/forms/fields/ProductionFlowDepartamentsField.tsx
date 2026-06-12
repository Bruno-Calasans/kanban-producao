/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FieldLegend, FieldSet, FieldDescription, FieldError } from "@/components/ui/field";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import { Departament } from "@/types/database.type";
import DepartamentSelectorSortable from "@/components/custom/selectors/DepartamentSelectorSortable";

type ProductionFlowDepartamentsFieldProps = {
  defaultDepartaments?: Departament[];
  selectedDepartaments?: Departament[];
  onSelect: (departaments: Departament[]) => void;
};

export const ProductionFlowDepartamentsField = withForm({
  defaultValues: defaultProductionFlowValues,
  props: {} as ProductionFlowDepartamentsFieldProps,
  render({ form, defaultDepartaments, selectedDepartaments, onSelect }) {
    return (
      <form.Field
        name="departamentNames"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <FieldSet>
              <FieldLegend>Departamentos</FieldLegend>
              <FieldDescription>
                Selecione os departamentos que fazem parte deste fluxo de produção. Apenas
                departamentos INTERNOS aparecerão na lista.
              </FieldDescription>
              <DepartamentSelectorSortable
                defaultDepartaments={defaultDepartaments}
                selectedDepartaments={selectedDepartaments}
                onSelect={(departaments) => {
                  const departamentNames = departaments.map((process) => process.name);
                  field.setValue(departamentNames);
                  onSelect(departaments);
                }}
              />
              <FieldDescription />
              {isInvalid && <FieldError className="m-0 p-0" errors={field.state.meta.errors} />}
            </FieldSet>
          );
        }}
      ></form.Field>
    );
  },
});
