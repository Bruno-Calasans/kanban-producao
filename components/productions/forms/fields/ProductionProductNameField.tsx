import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProductionFormValues, withForm } from "../productionFormContext";
import ProductSelector from "@/components/custom/ProductSelector";
import { Product } from "@/types/database.type";

type ProductionProductNameFieldProps = {
  selectedProduct?: Product;
  defaultProduct?: Product;
  disabled?: boolean;
  onChange(product?: Product): void;
};

export const ProductionProductNameField = withForm({
  defaultValues: defaultProductionFormValues,
  props: {} as ProductionProductNameFieldProps,
  render({ form, selectedProduct, defaultProduct, disabled, onChange }) {
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
                disabled={disabled}
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
