/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultEditDeadlineFormContextFormValues,
} from "@/components/calendar/weekly/forms/edit-deadline/editDeadlineFormContext";
import { DatePickerInput } from "@/components/custom/DatePicker";

export const EditDeadlineDatesField = withForm({
  defaultValues: defaultEditDeadlineFormContextFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <form.Field
            name="startDate"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Começa em</FieldLabel>
                  <DatePickerInput
                    currentDate={field.state.value}
                    onChangeDate={(value) => field.handleChange(value?.toDateString())}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Subscribe selector={(state) => state.values.startDate}>
            {(started_at) => (
              <form.Field
                name="endDate"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Termina em</FieldLabel>
                      <DatePickerInput
                        currentDate={field.state.value}
                        onChangeDate={(value) => field.handleChange(value?.toDateString())}
                        minDate={started_at}
                        disabled={!started_at}
                      />

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            )}
          </form.Subscribe>
        </div>
        <FieldDescription className="mt-0">
          Defina quando vai começar e quando vai terminar o prazo.
        </FieldDescription>
      </FieldGroup>
    );
  },
});
