import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ProcessWithDepartament } from "@/types/database.type";
import { defaultReturnProcessFormValues, withForm } from "../returnProcessFormContext";
import { SingleSelectorWithGroup } from "@/components/custom/selectors/SingleSelectorWithGroup";

type ReturnProcessFieldProps = {
  defaultProcess?: ProcessWithDepartament;
  selectedProcess?: ProcessWithDepartament;
  avaliableProcesses: ProcessWithDepartament[];
  onChangeProcess: (process?: ProcessWithDepartament) => void;
};

type ProcessByDepartament = {
  [key in string]: ProcessWithDepartament[];
};

export const ReturnProcessField = withForm({
  defaultValues: defaultReturnProcessFormValues,
  props: {} as ReturnProcessFieldProps,
  render({ form, defaultProcess, avaliableProcesses, selectedProcess, onChangeProcess }) {
    const groupProcessesByDepartament = () => {
      const groups: ProcessByDepartament = {};

      for (const process of avaliableProcesses) {
        const foundGroup = groups[process.departament.name];

        if (foundGroup) {
          foundGroup.push(process);
        } else {
          groups[process.departament.name] = [process];
        }
      }

      return groups;
    };

    const groups = groupProcessesByDepartament();

    return (
      <form.Field
        name="externalProcessName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field id="move-departament-process-field" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Processo</FieldLabel>

              <SingleSelectorWithGroup<ProcessWithDepartament>
                data={avaliableProcesses}
                placeholder="Selecione o processo de retorno"
                dataGroup={groups}
                labelSelector="name"
                selectedData={selectedProcess}
                onChange={(process) => {
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
