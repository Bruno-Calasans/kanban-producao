import { Field } from "@/components/ui/field";
import {
  defaultExecutionFormValues,
  withForm,
} from "@/components/calendar/weekly/forms/finish-meta/FinishMetaFormContext";
import { FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import ResponsibleSelector from "@/components/custom/selectors/ResponsibleSelector";
import { Departament, Responsible } from "@/types/database.type";

type MetaResponsibleFieldProps = {
  departament: Departament;
  selectedResponsible?: Responsible;
  onChangeResponsible: (responsible?: Responsible) => void;
};

export const MetaResponsibleField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {} as MetaResponsibleFieldProps,
  render({ form, departament, selectedResponsible, onChangeResponsible }) {
    return (
      <form.Field
        name="responsible"
        children={(field) => {
          const hasDefaultValue = defaultExecutionFormValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Responsável*</FieldLabel>
              <ResponsibleSelector
                departament={departament}
                selectedResponsible={selectedResponsible}
                onValueChange={(responsible) => {
                  field.handleChange(responsible?.name || "");
                  onChangeResponsible(responsible);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Selecione o responsável do departamento que concluiu a meta.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
