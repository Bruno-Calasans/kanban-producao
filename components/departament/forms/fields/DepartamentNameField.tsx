import { Field } from "@/components/ui/field";
import { defaultDepartamentFormValues, withForm } from "../departamentFormContext";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";



export const DepartamentNameField = withForm({
    defaultValues: defaultDepartamentFormValues,
    render({ form }) {
        return <form.Field
            name="name"
            children={(field) => {
                const hasDefaultValue = defaultDepartamentFormValues[field.name] == field.state.value
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Nome do Departamento</FieldLabel>
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