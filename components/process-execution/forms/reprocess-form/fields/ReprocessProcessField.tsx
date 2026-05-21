import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { ProcessWithDepartament } from "@/types/database.type";
import { defaultReprocessFormValues, withForm } from "../reprocessExecutionFormContext";
import { SingleSelectorWithGroup } from "@/components/custom/selectors/SingleSelectorWithGroup";
import { groupProcessesByDepartament } from "@/utils/groupProcessesByDepartament";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ReprocessProcessFieldProps = {
  selectedProcess?: ProcessWithDepartament;
  avaliableProcesses: ProcessWithDepartament[];
  onChangeProcess: (process?: ProcessWithDepartament) => void;
};

export const ReprocessProcessField = withForm({
  defaultValues: defaultReprocessFormValues,
  props: {} as ReprocessProcessFieldProps,
  render({ form, avaliableProcesses, selectedProcess, onChangeProcess }) {
    const groups = groupProcessesByDepartament(avaliableProcesses);

    return (
      <form.Field
        name="processName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Processo <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelectorWithGroup<ProcessWithDepartament>
                data={avaliableProcesses}
                placeholder="Selecione o processo"
                dataGroup={groups}
                labelSelector="name"
                selectedData={selectedProcess}
                onChange={(process) => {
                  field.handleChange(process?.name || "");
                  onChangeProcess(process);
                }}
              />
              <FieldDescription>Escolhe para qual processo você quer reprocessar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
