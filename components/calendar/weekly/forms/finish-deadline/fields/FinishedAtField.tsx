/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultFinishDeadlineFormValues,
} from "@/components/calendar/weekly/forms/finish-deadline/finishDeadlineFormContext";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "@/components/custom/DatePicker";

type FinishedAtFieldProps = {
  minDate: Date | undefined;
};

export const FinishedAtField = withForm({
  defaultValues: defaultFinishDeadlineFormValues,
  props: {} as FinishedAtFieldProps,
  render({ form, minDate }) {
    return (
      <FieldGroup>
        <form.Field
          name="finished_at"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Data de Conclusão</FieldLabel>
                <DatePickerInput
                  currentDate={field.state.value}
                  onChangeDate={(value) => field.handleChange(value?.toDateString())}
                  minDate={minDate}
                />
                {/* Time input */}
                <form.Subscribe selector={({ values }) => values.finished_at}>
                  {(started_at) => {
                    if (!started_at) return null;
                    return (
                      <Field className="w-32">
                        <Input
                          type="time"
                          step="1"
                          defaultValue="00:00:00"
                          onChange={(e) => {
                            const [hour, min, sec] = e.target.value.split(":").map(Number);
                            const fieldDate = new Date(started_at);
                            fieldDate.setHours(hour);
                            fieldDate.setMinutes(min);
                            fieldDate.setSeconds(sec);
                            field.setValue(fieldDate.toDateString());
                          }}
                        />
                      </Field>
                    );
                  }}
                </form.Subscribe>

                <FieldDescription>Quando o prazo foi finalizado.</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
    );
  },
});
