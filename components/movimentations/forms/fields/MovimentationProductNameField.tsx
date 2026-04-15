import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import ProductSelector from "@/components/custom/ProductSelector";
import { ProductWithProductionFlow } from "@/types/database.type";

type MovimentationProductNameFieldProps = {
  selectedProduct?: ProductWithProductionFlow;
  defaultProduct?: ProductWithProductionFlow;
  onChange(product?: ProductWithProductionFlow): void;
};

export const MovimentationProductNameField = withForm({
  defaultValues: defaultMovimentationFormValues,
  props: {} as MovimentationProductNameFieldProps,
  render({ form, selectedProduct, defaultProduct, onChange }) {
    return (
      <form.Field
        name="productName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Produto</FieldLabel>
              <ProductSelector
                selectedProduct={selectedProduct}
                defaultProduct={defaultProduct}
                onChangeProduct={(product) => {
                  field.handleChange(product?.name || "");
                  onChange(product);
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
