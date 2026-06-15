/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultMoveExternalFormValues,
} from "@/components/production/forms/move-external-form/moveExternalFormContext";
import { DatePickerInput } from "@/components/custom/DatePicker";

export const ExternalDeadlineField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup>
        <FieldGroup className="flex flex-row">
          <form.Field
            name="plannedEndAt"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="gap-0" htmlFor={field.name}>
                    Prazo de Retorno
                  </FieldLabel>
                  <DatePickerInput
                    currentDate={field.state.value}
                    onChangeDate={(value) => field.handleChange(value?.toDateString())}
                    placeholder="Selecione o prazo"
                  />
                  <FieldDescription>
                    Defina a data que você espera receber de volta. Ao definir, essa data aparecerá
                    no calendário.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </FieldGroup>
    );
  },
});
