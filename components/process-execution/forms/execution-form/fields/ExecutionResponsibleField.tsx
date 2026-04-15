import { Field } from "@/components/ui/field";
import { defaultExecutionFormValues, withForm } from "../processExecutionFormContext";
import { FieldError, FieldLabel } from "@/components/ui/field";
import ResponsibleSelector from "@/components/custom/selectors/ResponsibleSelector";
import { Departament, Responsible } from "@/types/database.type";

type ExecutionResponsibleFieldProps = {
  departament: Departament;
  selectedResponsible?: Responsible;
  onChangeResponsible: (responsible?: Responsible) => void;
};

export const ExecutionResponsibleField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {} as ExecutionResponsibleFieldProps,
  render({ form, departament, selectedResponsible, onChangeResponsible }) {
    return (
      <form.Field
        name="responsible"
        children={(field) => {
          const hasDefaultValue = defaultExecutionFormValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field >
              <FieldLabel htmlFor={field.name}>Responsável</FieldLabel>
              <ResponsibleSelector
                departament={departament}
                selectedResponsible={selectedResponsible}
                onValueChange={(responsible) => {
                  field.handleChange(responsible?.name || "");
                  onChangeResponsible(responsible);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
