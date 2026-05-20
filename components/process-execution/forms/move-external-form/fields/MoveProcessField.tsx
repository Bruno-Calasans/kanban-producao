import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament, Process } from "@/types/database.type";
import { defaultMoveExternalFormValues, withForm } from "../moveExternalFormContext";
import SingleProcessSelector from "@/components/custom/selectors/SingleProcessSelector";

type MoveProcessFieldProps = {
  departament: Departament;
  defaultProcess?: Process;
  selectedProcess?: Process;
  onChangeProcess: (departament?: Process) => void;
};

export const MoveProcessField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {} as MoveProcessFieldProps,
  render({ form, departament, defaultProcess, selectedProcess, onChangeProcess }) {
    return (
      <form.Field
        name="externalProcessName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field id="move-departament-process-field" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Processo</FieldLabel>
              <SingleProcessSelector
                departament={departament}
                defaultProcess={defaultProcess}
                selectedProcess={selectedProcess}
                onValueChange={(process) => {
                  field.handleChange(process?.name || "");
                  onChangeProcess(process);
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
