import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultResponsibleFormValues, withForm } from "../responsibleFormContext";
import { Input } from "@/components/ui/input";


export const ResponsibleNameField = withForm({
    defaultValues: defaultResponsibleFormValues,
    render({ form }) {
        return <form.Field
            name="name"
            children={(field) => {
                const hasDefaultValue = defaultResponsibleFormValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Nome do Responsável</FieldLabel>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                            onFocus={e => hasDefaultValue && field.handleChange("")}
                            aria-invalid={isInvalid}
                            placeholder="Nome do responsável"
                            autoComplete="off"
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