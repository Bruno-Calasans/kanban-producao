import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultResponsibleFormValues, withForm } from "../responsibleFormContext";
import DepartamentSelector from "@/components/custom/selectors/DepartamentSelector";

type DefaultDepartamentProcessFieldProps = {
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  onDepartamentChange: (departament?: Departament) => void;
};

export const ResponsibleDepartamentName = withForm({
  defaultValues: defaultResponsibleFormValues,
  props: {} as DefaultDepartamentProcessFieldProps,
  render({ form, defaultDepartament, selectedDepartament, onDepartamentChange }) {
    return (
      <form.AppField
        name="departamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field id="responsible-departament" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
              <DepartamentSelector
                defaultDepartament={defaultDepartament}
                selectedDepartament={selectedDepartament}
                onValueChange={(departament) => {
                  field.handleChange(departament?.name || "");
                  onDepartamentChange(departament);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.AppField>
    );
  },
});
