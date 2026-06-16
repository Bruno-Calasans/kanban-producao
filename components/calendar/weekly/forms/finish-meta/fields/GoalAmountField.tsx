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
import {
  withForm,
  defaultExecutionFormValues,
} from "@/components/calendar/weekly/forms/finish-meta/FinishMetaFormContext";
import { Checkbox } from "@/components/ui/checkbox";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type GoalAmountFieldProps = {
  maxAmount: number;
  goalAmount: number;
};

export const GoalAmountField = withForm({
  defaultValues: defaultExecutionFormValues,
  props: {} as GoalAmountFieldProps,
  render({ form, goalAmount, maxAmount }) {
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
                    <FieldLabel htmlFor={field.name} className="gap-0">
                      Quantidade feita <RequiredFieldTooltip />
                    </FieldLabel>
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
                      onFocus={(e) => field.handleChange("" as unknown as number)}
                    />
                    <FieldDescription className="flex gap-1">
                      Define a quantidade que foi concluída. Meta prevista é{" "}
                      <span className="font-bold">{goalAmount}</span>
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
                <FieldLabel>Usar quantidade disponível no departamento</FieldLabel>
                <FieldDescription>Quantidade disponível: {maxAmount}</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
    );
  },
});
