import { Field, FieldDescription } from "@/components/ui/field";
import { defaultDepartamentFormValues, withForm } from "../departamentFormContext";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const DepartamentSequenceField = withForm({
  defaultValues: defaultDepartamentFormValues,
  render({ form }) {
    return (
      <form.Field
        name="sequence"
        children={(field) => {
          const hasDefaultValue = defaultDepartamentFormValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Sequência</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                aria-invalid={isInvalid}
                placeholder="Número da sequência"
                autoComplete="off"
                type="number"
                onFocus={(e) => hasDefaultValue && field.handleChange("" as unknown as number)}
              />

              <FieldDescription>
                A sequência do departamento é usada para determinar sua ordem no fluxo de produção.
              </FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
