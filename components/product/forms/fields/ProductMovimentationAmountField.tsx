import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../ProductMovimentationFormContext";
import { Input } from "@/components/ui/input";

type ProductMovimentationAmountFieldGroupProps = {
  disabled?: boolean;
};

export const ProductProductMovimentationAmountField = withForm({
  defaultValues: defaultMovimentationFormValues,
  props: {} as ProductMovimentationAmountFieldGroupProps,
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
