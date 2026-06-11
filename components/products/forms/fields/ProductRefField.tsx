import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { defaultProductFormValues, withForm } from "@/components/products/forms/productFormContext";

export const ProductRefField = withForm({
  defaultValues: defaultProductFormValues,
  render({ form }) {
    return (
      <form.Field
        name="ref"
        children={(field) => {
          const hasDefaultValue = defaultProductFormValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Ref do Produto</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value as unknown as number);
                }}
                aria-invalid={isInvalid}
                placeholder="Ref do produto"
                autoComplete="off"
                type="number"
                onFocus={(e) => {
                  hasDefaultValue && field.handleChange("" as unknown as number);
                }}
              />
              <FieldDescription>
                Se não souber, deixe o valor "0". Quando souber, edite depois.
              </FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
