/* eslint-disable react/no-children-prop */
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultMoveExternalFormValues, withForm } from "../moveExternalFormContext";
import { Departament } from "@/types/database.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import ExternalDepartamentSelector from "@/components/custom/selectors/ExternalDepartamentSelector";

type ExternalDepartamentFieldProps = {
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  onChangeDepartament: (departament?: Departament) => void;
};

export const ExternalDepartamentField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {} as ExternalDepartamentFieldProps,
  render({ form, defaultDepartament, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="externalDepartamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Departamento
                <RequiredFieldTooltip />
              </FieldLabel>
              <ExternalDepartamentSelector
                defaultDepartament={defaultDepartament}
                selectedDepartament={selectedDepartament}
                onValueChange={function (departament?: Departament): void {
                  field.handleChange(departament?.name || "");
                  onChangeDepartament(departament);
                }}
              />
              <FieldDescription>Seleciona para qual departamento deseja enviar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
