import { Field, FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { defaultConfigurationFormValues, withForm } from "../configurationFormContext";
import ProductionFlowSelector from "@/components/custom/selectors/ProductionFlowSelector";
import { ProductionFlow } from "@/types/database.type";

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
            <Field data-invalid={isInvalid}>
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
                Selecione o fluxo de produção padrão para os novos produtos criados.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
