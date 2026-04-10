import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { defaultProductFormValues, withForm } from "@/components/product/forms/productFormContext"


export const ProductNameField = withForm({
    defaultValues: defaultProductFormValues,
    render({ form }) {

        return <form.Field
            name="name"
            children={(field) => {
                const hasDefaultValue = defaultProductFormValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field
                        id="product-name-field"
                        data-invalid={isInvalid}
                    >
                        <FieldLabel htmlFor={field.name}>Nome do Produto</FieldLabel>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                            aria-invalid={isInvalid}
                            placeholder="Nome"
                            autoComplete="off"
                            onFocus={e => {
                                hasDefaultValue && field.handleChange("")
                            }}
                        />
                        {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                )
            }}
        />
    }
})