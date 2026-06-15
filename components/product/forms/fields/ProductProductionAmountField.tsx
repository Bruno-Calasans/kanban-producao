import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProductProductionFormValues, withForm } from "../ProductProductionFormContext";
import { Input } from "@/components/ui/input";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ProductProductionAmountFieldGroupProps = {
  disabled?: boolean;
};

export const ProductProductProductionAmountField = withForm({
  defaultValues: defaultProductProductionFormValues,
  props: {} as ProductProductionAmountFieldGroupProps,
  render({ form, disabled }) {
    return (
      <form.Field
        name="amount"
        children={(field) => {
          let fieldValue = field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Quantidade <RequiredFieldTooltip />
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={fieldValue}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                aria-invalid={isInvalid}
                placeholder="Quantidade a ser movimentada"
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
