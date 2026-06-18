import { Field, FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { defaultConfigurationFormValues, withForm } from "../configurationFormContext";
import { ProductionFlow } from "@/types/database.type";
import ProductionFlowSelector from "@/components/custom/selectors/ProductionFlowSelector";

type DefaultProductionFlowFieldProps = {
  selectedProductionFlow?: ProductionFlow;
  onChangeProductionFlow: (productionFlow?: ProductionFlow) => void;
};

export const DefaultProductionFlowField = withForm({
  defaultValues: defaultConfigurationFormValues,
  props: {} as DefaultProductionFlowFieldProps,
  render({ form, selectedProductionFlow, onChangeProductionFlow }) {
    return (
      <form.Field
        name="productionFlowName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel htmlFor={field.name}>Fluxo de Produção</FieldLabel>
              <ProductionFlowSelector
                selectedProductionFlow={selectedProductionFlow}
                onValueChange={(productionFlow) => {
                  field.handleChange(productionFlow?.name || "");
                  onChangeProductionFlow(productionFlow);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Selecione o fluxo de produção padrão para as novas produções criadas.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
