import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultProcessFormValues, withForm } from "../ProcessFormContext";
import DepartamentSelector from "@/components/custom/selectors/DepartamentSelector";

type DefaultDepartamentProcessFieldProps = {
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  onChangeDepartament: (departament?: Departament) => void;
};

export const ProcessDepartamentField = withForm({
  defaultValues: defaultProcessFormValues,
  props: {} as DefaultDepartamentProcessFieldProps,
  render({ form, defaultDepartament, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="departamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field id="process-departament" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
              <DepartamentSelector
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
