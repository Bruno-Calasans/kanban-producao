import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultReturnProcessFormValues, withForm } from "../returnProcessFormContext";
import InternalDepartamentSelector from "@/components/custom/selectors/InternalDepartamentSelector";

type ReturnDepartamentFieldProps = {
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  onChangeDepartament: (departament?: Departament) => void;
};

export const ReturnDepartamentField = withForm({
  defaultValues: defaultReturnProcessFormValues,
  props: {} as ReturnDepartamentFieldProps,
  render({ form, defaultDepartament, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="internalDepartamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field id="internal-departament-name-field" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
              <InternalDepartamentSelector
                defaultDepartament={defaultDepartament}
                selectedDepartament={selectedDepartament}
                onValueChange={(departament) => {
                  field.handleChange(departament?.name || "");
                  onChangeDepartament(departament);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
