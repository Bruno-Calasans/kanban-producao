/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  withForm,
  defaultExecutionFormValues,
} from "@/components/production/forms/create-movimentation-form/processExecutionFormContext";
import { Input } from "@/components/ui/input";

export const ExecutionDatesField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {},
  render({ form }) {
    return (
      <FieldGroup className="gap-0">
        <div className="flex flex-row justify-between gap-2 m-0">
          <form.Field
            name="started_at"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data de Início</FieldLabel>
                  <Input
                    name={field.name}
                    type="datetime-local"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription className="mt-0 p-0">Quando começou</FieldDescription>
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
                    <Field orientation="vertical">
                      <FieldLabel htmlFor={field.name}>Data de término</FieldLabel>
                      <Input
                        name={field.name}
                        type="datetime-local"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={!started_at}
                        min={started_at}
                      />
                      <FieldDescription className="mt-0 p-0">Quando terminou</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            )}
          </form.Subscribe>
        </div>
      </FieldGroup>
    );
  },
});
