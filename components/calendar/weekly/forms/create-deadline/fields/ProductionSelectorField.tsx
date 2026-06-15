/* eslint-disable react/no-children-prop */
import { Field } from "@/components/ui/field";
import { defaultCreateDeadlineForm, withForm } from "../createDeadlineFormContext";
import { FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { ProductionPopulated } from "@/types/database.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import ProductionSelector from "@/components/custom/selectors/ProductionSelector";

type ProductionSelectorFieldFieldProps = {
  productions: ProductionPopulated[];
  selectedProduction?: ProductionPopulated;
  isLoading?: boolean;
  onChangeProduction: (production?: ProductionPopulated) => void;
};

export const ProductionSelectorFieldField = withForm({
  defaultValues: defaultCreateDeadlineForm,
  props: {} as ProductionSelectorFieldFieldProps,
  render({ form, productions, isLoading, selectedProduction, onChangeProduction }) {
    return (
      <form.Field
        name="productProduction"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Produção <RequiredFieldTooltip />
              </FieldLabel>
              <ProductionSelector
                classname="w-[650px]"
                productions={productions}
                isLoading={isLoading}
                selectedProduction={selectedProduction}
                onValueChange={(production) => {
                  field.setValue(production ? production.product.name : "");
                  onChangeProduction(production);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Selecione a produção para poder definir o prazo do departamento.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
