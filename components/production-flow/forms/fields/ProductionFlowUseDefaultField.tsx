/* eslint-disable react/no-children-prop */
import { withForm } from "@/components/product/forms/productFormContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { defaultProductionFlowValues } from "../ProductionFlowFormContext";

export const ProductionFlowUseDefaultField = withForm({
  defaultValues: defaultProductionFlowValues,
  render({ form }) {

    return (
      <form.Field
        name="useDefault"
        children={(field) => {
          return (
            <Field id="use-default-production-flow-field" orientation="horizontal">
              <Checkbox
                id="use-default-production-flow-checkbox"
                name="use-default-production-flow"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked as boolean)}
              />
              <FieldContent>
                <FieldLabel htmlFor="use-default-production-flow-checkbox">
                  Usar como fluxo padrão
                </FieldLabel>
                <FieldDescription>
                  Ao marcar esta opção, os produtos cadastrados que não tiverem um fluxo de produção
                  definido, seguirão este fluxo de produção.
                </FieldDescription>
              </FieldContent>
            </Field>
          );
        }}
      />
    );
  },
});
