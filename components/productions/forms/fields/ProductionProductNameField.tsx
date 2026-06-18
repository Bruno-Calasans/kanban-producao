import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProductionFormValues, withForm } from "../productionFormContext";
import { Product } from "@/types/database.type";
import ProductSelector from "@/components/custom/ProductSelector";

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
            <Field>
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
