/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { withForm, defaultReprocessFormValues } from "../reprocessExecutionFormContext";

type ExecutionAmountFieldProps = {
  maxAmount: number;
};

export const ReprocessAmountField = withForm({
  defaultValues: defaultReprocessFormValues,
  props: {} as ExecutionAmountFieldProps,
  render({ form, maxAmount }) {
    const onUseMaxAmount = (value: boolean) => {
      if (value) form.setFieldValue("amount", maxAmount);
    };

    return (
      <FieldGroup>
        <form.Subscribe selector={(state) => state.values.useMaxAmount}>
          {(useMaxAmount) => (
            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field id="execution-amount-field" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Quantidade</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const value = Math.min(e.target.value as unknown as number, maxAmount);
                        field.handleChange(value);
                      }}
                      aria-invalid={isInvalid}
                      placeholder="Quantidade"
                      autoComplete="off"
                      type="number"
                      disabled={useMaxAmount}
                      onFocus={(e) =>
                        !form.state.isTouched && field.handleChange("" as unknown as number)
                      }
                    />
                    <FieldDescription>
                      Define a quantidade que será refeita para o processo anterior.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          )}
        </form.Subscribe>

        <form.Field
          name="useMaxAmount"
          children={(field) => (
            <Field orientation="horizontal">
              <Checkbox
                id="use-max-amount-process-executation"
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(value) => {
                  value = !!value;
                  field.handleChange(!!value);
                  onUseMaxAmount(value);
                }}
              />
              <FieldContent>
                <FieldLabel>Usar quantidade disponível</FieldLabel>
                <FieldDescription>Quantidade disponível: {maxAmount}</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
    );
  },
});
