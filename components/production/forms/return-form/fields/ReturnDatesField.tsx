/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultReturnProcessFormValues,
} from "@/components/production/forms/return-form/returnDepartamentFormContext";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "@/components/custom/DatePicker";

export const ReturnDatesField = withForm({
  defaultValues: defaultReturnProcessFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup className="flex flex-col gap-0">
        <div className="flex flex-row gap-2">
          <form.Field
            name="started_at"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data de Início</FieldLabel>
                  <DatePickerInput
                    currentDate={field.state.value}
                    onChangeDate={(value) => field.handleChange(value?.toDateString())}
                  />
                  {/* Time input */}
                  <form.Subscribe selector={({ values }) => values.started_at}>
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
                        currentDate={field.state.value}
                        onChangeDate={(value) => field.handleChange(value?.toDateString())}
                        minDate={started_at}
                        disabled={!started_at}
                      />
                      {/* Time input */}
                      <form.Subscribe selector={({ values }) => values.finished_at}>
                        {(finished_at) => {
                          if (!finished_at) return null;
                          return (
                            <Field className="w-32">
                              <Input
                                type="time"
                                step="1"
                                defaultValue="00:00:00"
                                onChange={(e) => {
                                  const [hour, min, sec] = e.target.value.split(":").map(Number);
                                  const fieldDate = new Date(finished_at);
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

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            )}
          </form.Subscribe>
        </div>
        <FieldDescription className="mt-0">
          Defina quando começou e terminou o retorno.
        </FieldDescription>
      </FieldGroup>
    );
  },
});
