import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { ProcessWithDepartament } from "@/types/database.type";
import { defaultReturnProcessFormValues, withForm } from "../returnProcessFormContext";
import { SingleSelectorWithGroup } from "@/components/custom/selectors/SingleSelectorWithGroup";
import { groupProcessesByDepartament } from "@/utils/groupProcessesByDepartament";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ReturnProcessFieldProps = {
  selectedProcess?: ProcessWithDepartament;
  avaliableProcesses: ProcessWithDepartament[];
  onChangeProcess: (process?: ProcessWithDepartament) => void;
};

export const ReturnProcessField = withForm({
  defaultValues: defaultReturnProcessFormValues,
  props: {} as ReturnProcessFieldProps,
  render({ form, avaliableProcesses, selectedProcess, onChangeProcess }) {
    const groups = groupProcessesByDepartament(avaliableProcesses);

    return (
      <form.Field
        name="externalProcessName"
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
              <FieldDescription>Escolhe para qual processo você quer retornar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
