/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { DatePickerInput } from "@/components/custom/DatePicker";
import { defaultEditExternalDeadlineFormValues, withForm } from "../deadlineFormContext";

export const DateField = withForm({
  defaultValues: defaultEditExternalDeadlineFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <form.Field
            name="plannedEndAt"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data de Fim</FieldLabel>
                  <DatePickerInput
                    currentDate={field.state.value}
                    onChangeDate={(value) => field.handleChange(value?.toDateString() || "")}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <FieldDescription className="mt-0">
          Defina a data que o prazo deve terminar
        </FieldDescription>
      </FieldGroup>
    );
  },
});
