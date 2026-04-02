import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFieldContext, withForm, defaultProductFormValues } from "@/components/product/forms/productFormContext"


export const ProductMaxAmountField = withForm({
    defaultValues: defaultProductFormValues,
    render({ form }) {
        return (
            <form.Field
                name="max_amount"
                children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field
                            id="product-max-amount-field"
                            data-invalid={isInvalid}
                        >
                            <FieldLabel htmlFor={field.name}>Quantidade Máxima</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                                aria-invalid={isInvalid}
                                placeholder="Quantidade máxima"
                                autoComplete="off"
                                type="number"
                                onFocus={e => field.setValue("")}
                            />
                            <FieldDescription>
                                Diz quantas peças serão produzidas. Se não souber agora,
                                cadastre depois.
                            </FieldDescription>
                            {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                            )}
                        </Field>
                    )
                }}
            />
        )
    }
})
