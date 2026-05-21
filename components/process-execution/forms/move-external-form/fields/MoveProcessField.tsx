import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { ProcessWithDepartament } from "@/types/database.type";
import { defaultMoveExternalFormValues, withForm } from "../moveExternalFormContext";
import { SingleSelectorWithGroup } from "@/components/custom/selectors/SingleSelectorWithGroup";
import { groupProcessesByDepartament } from "@/utils/groupProcessesByDepartament";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type MoveProcessFieldProps = {
  processes: ProcessWithDepartament[];
  selectedProcess?: ProcessWithDepartament;
  isLoading?: boolean;
  onChangeProcess: (process?: ProcessWithDepartament) => void;
};

export const MoveProcessField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {} as MoveProcessFieldProps,
  render({ form, selectedProcess, processes, isLoading, onChangeProcess }) {
    const groups = groupProcessesByDepartament(processes);
    return (
      <form.Field
        name="externalProcessName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Processo
                <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelectorWithGroup<ProcessWithDepartament>
                labelSelector="name"
                data={processes}
                dataGroup={groups}
                selectedData={selectedProcess}
                isLoading={isLoading}
                loadingMsg="Carregando processos externos..."
                placeholder="Selecione o processo"
                onChange={(process) => {
                  field.handleChange(process?.name || "");
                  onChangeProcess(process);
                }}
              />
              <FieldDescription>Seleciona para qual processo deseja enviar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
