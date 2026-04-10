import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultProcessFormValues, withForm } from "../ProcessFormContext";
import { Input } from "@/components/ui/input";


export const ProcessNameField = withForm({
    defaultValues: defaultProcessFormValues,
    render({ form }) {

        return <form.Field
            name="name"
            children={(field) => {
                const hasDefaultValue = defaultProcessFormValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Nome do Processo</FieldLabel>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                            aria-invalid={isInvalid}
                            placeholder="Nome"
                            autoComplete="off"
                            onFocus={e => hasDefaultValue && field.handleChange("")}
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