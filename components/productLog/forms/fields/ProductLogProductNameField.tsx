import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProductLogFormValues, withForm } from "../productLogFormContext";
import ProductSelector from "@/components/custom/ProductSelector";
import { ProductPopulated } from "@/types/database.type";


type ProductLogProductNameFieldProps = {
    selectedProduct?: ProductPopulated
    onChangeProduct: (product?: ProductPopulated) => void
}

export const ProductLogProductNameField = withForm({
    defaultValues: defaultProductLogFormValues,
    props: {} as ProductLogProductNameFieldProps,
    render({ form, selectedProduct, onChangeProduct }) {
        return <form.Field
            name="productName"
            children={(field) => {
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Produto</FieldLabel>
                        <ProductSelector
                            name={field.name}
                            selectedProduct={selectedProduct}
                            onvalueChange={(product) => {
                                field.handleChange(product.name)
                                onChangeProduct(product)
                            }}
                        />
                        {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>)
            }}
        />

    }
})