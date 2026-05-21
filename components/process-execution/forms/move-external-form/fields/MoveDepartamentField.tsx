import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultMoveExternalFormValues, withForm } from "../moveExternalFormContext";
import ExternalDepartamentSelector from "@/components/custom/selectors/ExternalDepartamentSelector";

type MoveDepartamentFieldProps = {
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  onChangeDepartament: (departament?: Departament) => void;
};

export const MoveDepartamentField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {} as MoveDepartamentFieldProps,
  render({ form, defaultDepartament, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="externalDepartamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
              <ExternalDepartamentSelector
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
