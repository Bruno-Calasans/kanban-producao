/* eslint-disable react/no-children-prop */
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProductFormValues, withForm } from "../productFormContext";
import { ProductionFlow } from "@/types/database.type";
import ProductionFlowSelector from "@/components/custom/selectors/ProductionFlowSelector";

type ProductProductionFlowFieldProps = {
  defaultProductionFlow?: ProductionFlow;
  onChangeProductionFlow: (productionFlow?: ProductionFlow) => void;
};

export const ProductProductionFlowField = withForm({
  defaultValues: defaultProductFormValues,
  props: {} as ProductProductionFlowFieldProps,
  render({ form, defaultProductionFlow, onChangeProductionFlow }) {
    return (
      <form.Field
        name="productionFlow"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field className="mt-4">
              <FieldLabel htmlFor={field.name}>Fluxo de Produção</FieldLabel>
              <ProductionFlowSelector
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
