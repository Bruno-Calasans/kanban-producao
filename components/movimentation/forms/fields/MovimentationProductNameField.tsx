import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import ProductSelector from "@/components/custom/ProductSelector";
import { ProductPopulated } from "@/types/database.type";


type MovimentationProductNameFieldProps = {
    selectedProduct?: ProductPopulated
    onChange: (product: ProductPopulated) => void
}

export const MovimentationProductNameField = withForm({
    defaultValues: defaultMovimentationFormValues,
    props: {
        selectedProduct: undefined,
        onChange(product) { }

    } as MovimentationProductNameFieldProps,
    render({ form, selectedProduct, onChange }) {
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
                                onChange(product)
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