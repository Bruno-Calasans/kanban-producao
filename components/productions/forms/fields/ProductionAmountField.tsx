import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { defaultProductionFormValues, withForm } from "../productionFormContext";
import { Input } from "@/components/ui/input";

type ProductionAmountFieldProps = {
  disabled?: boolean;
};

export const ProductionAmountField = withForm({
  defaultValues: defaultProductionFormValues,
  props: {} as ProductionAmountFieldProps,
  render({ form, disabled }) {
    return (
      <form.Field
        name="amount"
        children={(field) => {
          let fieldValue = field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Quantidade</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={fieldValue}
                onBlur={field.handleBlur}
                onFocus={(e) =>
                  !field.state.meta.isDirty && field.handleChange("" as unknown as number)
                }
                onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                aria-invalid={isInvalid}
                placeholder="Quantidade"
                autoComplete="off"
                type="number"
                disabled={disabled}
              />
              <FieldDescription>Quantidade que você quer produzir.</FieldDescription>

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
