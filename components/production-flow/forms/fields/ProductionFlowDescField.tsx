import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext"
import { Textarea } from "@/components/ui/textarea"

export const ProductionFlowDescField = withForm({
    defaultValues: defaultProductionFlowValues,
    render({ form }) {

        return <form.Field
            name="desc"
            children={(field) => {
                const hasDefaultValue = defaultProductionFlowValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field
                        id="product-name-field"
                        data-invalid={isInvalid}
                    >
                        <FieldLabel htmlFor={field.name}>Descrição do Fluxo</FieldLabel>
                        <Textarea id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Descrição"
                            autoComplete="off"
                            onFocus={e => {
                                hasDefaultValue && field.handleChange("")
                            }} />

                        {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>
                )
            }}
        />
    }
})