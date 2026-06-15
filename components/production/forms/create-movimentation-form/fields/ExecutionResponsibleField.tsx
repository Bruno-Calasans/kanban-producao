/* eslint-disable react/no-children-prop */
import { Field } from "@/components/ui/field";
import { defaultExecutionFormValues, withForm } from "../processExecutionFormContext";
import { FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import ResponsibleSelector from "@/components/custom/selectors/ResponsibleSelector";
import { Departament, Responsible } from "@/types/database.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

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
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Responsável <RequiredFieldTooltip />
              </FieldLabel>
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
                Selecione o responsável do departamento de origem.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
