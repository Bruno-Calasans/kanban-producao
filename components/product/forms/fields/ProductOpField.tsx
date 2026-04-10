import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { defaultProductFormValues, withForm } from "@/components/product/forms/productFormContext"


export const ProductOpField = withForm({
    defaultValues: defaultProductFormValues,
    render({ form }) {
        return <form.Field
            name="op"
            children={(field) => {
                const hasDefaultValue = defaultProductFormValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Ordem de Produção (OP)</FieldLabel>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={
                                (e) => {
                                    field.handleChange(e.target.value as unknown as number)
                                }}
                            aria-invalid={isInvalid}
                            placeholder="OP do produto"
                            autoComplete="off"
                            type="number"
                            onFocus={e => {
                                hasDefaultValue && field.handleChange("" as unknown as number)
                            }}
                        />
                        <FieldDescription >
                            Se não souber, deixe o valor "0". Quando souber, edite depois.
                        </FieldDescription>
                        {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                )
            }}
        />
    }
})