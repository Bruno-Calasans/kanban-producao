import { Field, FieldDescription } from "@/components/ui/field";
import { defaultDepartamentFormValues, withForm } from "../departamentFormContext";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";



export const DepartamentOrderField = withForm({
    defaultValues: defaultDepartamentFormValues,
    render({ form }) {
        return <form.Field
            name="order"
            children={(field) => {
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Ordem</FieldLabel>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                            aria-invalid={isInvalid}
                            placeholder="Número da ordem"
                            autoComplete="off"
                            type="number"
                        />

                        <FieldDescription>
                            A ordem do departamento é usada para determinar o fluxo de produção.
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