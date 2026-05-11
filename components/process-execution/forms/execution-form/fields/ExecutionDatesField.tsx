/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  withForm,
  defaultExecutionFormValues,
} from "@/components/process-execution/forms/execution-form/processExecutionFormContext";
import { DatePickerInput } from "@/components/custom/DatePicker";
import { TimePicker } from "@/components/custom/date-time-picker/time-picker";

export const ExecutionDatesField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup className="flex flex-row">
        <form.Field
          name="started_at"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Data de Início</FieldLabel>
                <DatePickerInput
                  currentDate={(field.state.value as Date) || undefined}
                  onChangeDate={(value) => field.handleChange((value as Date) || undefined)}
                />
                <TimePicker
                  date={(field.state.value as Date) || undefined}
                  setDate={(value) => field.handleChange((value as Date) || undefined)}
                  hideIcons
                  hideSecond
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Subscribe selector={(state) => state.values.started_at}>
          {(started_at) => (
            <form.Field
              name="finished_at"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Data de término</FieldLabel>
                    <DatePickerInput
                      currentDate={(field.state.value as Date) || undefined}
                      onChangeDate={(value) => field.handleChange((value as Date) || undefined)}
                      minDate={started_at || undefined}
                    />
                    <TimePicker
                      date={(field.state.value as Date) || undefined}
                      setDate={(value) => field.handleChange((value as Date) || undefined)}
                      hideIcons
                      hideSecond
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          )}
        </form.Subscribe>
      </FieldGroup>
    );
  },
});
