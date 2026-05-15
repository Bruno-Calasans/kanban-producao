/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultExecutionFormValues,
} from "@/components/process-execution/forms/execution-form/processExecutionFormContext";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "@/components/custom/DatePicker";

export const ExecutionDatesField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup>
        <FieldGroup className="flex flex-row">
          <form.Field
            name="started_at"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data de Início</FieldLabel>
                  {/* <DatePickerInput
                    currentDate={field.state.value}
                    onChangeDate={field.handleChange}
                  /> */}
                  <Input
                    name={field.name}
                    type="datetime-local"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {/* <Field className="w-32">
                    <Input
                      type="time"
                      step="1"
                      defaultValue="00:00:00"
                     
                    />
                  </Field> */}
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
                      <Input
                        name={field.name}
                        type="datetime-local"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={!started_at}
                        min={started_at}
                      />
                      <Field className="w-32">
                        {/* <FieldLabel htmlFor="time-picker-optional">Hora de fim</FieldLabel> */}
                        {/* <Input
                          type="time"
                          id="time-picker-optional"
                          step="1"
                          defaultValue="00:00:00"
                        /> */}
                      </Field>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            )}
          </form.Subscribe>
        </FieldGroup>
        <FieldDescription>Quando começou e terminou esse processo.</FieldDescription>
      </FieldGroup>
    );
  },
});
