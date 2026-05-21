import { Field, FieldDescription } from "@/components/ui/field";
import { defaultSkipProcessFormValues, withForm, REASON_MAX_LENGTH } from "../skipFormContext";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const SkipReasonField = withForm({
  defaultValues: defaultSkipProcessFormValues,
  render({ form }) {
    return (
      <form.Field
        name="reason"
        children={(field) => {
          const hasDefaultValue = defaultSkipProcessFormValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Motivo</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length > REASON_MAX_LENGTH) {
                    value = value.slice(0, REASON_MAX_LENGTH);
                  }
                  field.handleChange(value);
                }}
                aria-invalid={isInvalid}
                placeholder="Escreva o motivo para pular (opcional)"
                autoComplete="off"
                onFocus={(e) => hasDefaultValue && field.handleChange("")}
              />
              <FieldDescription>
                {field.state.value?.length || 0} / {REASON_MAX_LENGTH} caracteres restantes
              </FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
