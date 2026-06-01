/* eslint-disable react/no-children-prop */
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../ProductMovimentationFormContext";
import { ProductionFlow } from "@/types/database.type";
import ProductionFlowSelectorWithCheckbox from "@/components/custom/selectors/ProductionFlowSelectorWithCheckbox";

type ProductProductionFlowFieldProps = {
  selectedProductionFlow?: ProductionFlow;
  defaultProductionFlow?: ProductionFlow;
  disabled?: boolean;
  onChangeProductionFlow: (productionFlow?: ProductionFlow) => void;
};

export const ProductProductionFlowField = withForm({
  defaultValues: defaultMovimentationFormValues,
  props: {} as ProductProductionFlowFieldProps,
  render({
    form,
    selectedProductionFlow,
    defaultProductionFlow,
    disabled,
    onChangeProductionFlow,
  }) {
    return (
      <form.Field
        name="productionFlow"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field className="mt-4" hidden={disabled}>
              <FieldLabel htmlFor={field.name}>Fluxo de Produção</FieldLabel>
              <ProductionFlowSelectorWithCheckbox
                disabled={disabled}
                selectedProductionFlow={selectedProductionFlow}
                defaultProductionFlow={defaultProductionFlow}
                onValueChange={(productionFlow) => {
                  field.handleChange(productionFlow?.name || "");
                  onChangeProductionFlow(productionFlow);
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
