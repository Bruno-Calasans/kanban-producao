import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

export const ProductionFlowNameField = withForm({
  defaultValues: defaultProductionFlowValues,
  render({ form }) {
    return (
      <form.Field
        name="name"
        children={(field) => {
          const hasDefaultValue = defaultProductionFlowValues[field.name] == field.state.value;
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field id="product-name-field" data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name} className="gap-0">
                Nome
                <RequiredFieldTooltip />
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                aria-invalid={isInvalid}
                placeholder="Nome do fluxo de produção"
                autoComplete="off"
                onFocus={(e) => {
                  hasDefaultValue && field.handleChange("");
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />
    );
  },
});
