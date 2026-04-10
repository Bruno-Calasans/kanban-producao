
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Departament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"
import { defaultResponsibleFormValues, withForm } from "../responsibleFormContext"

type DefaultDepartamentProcessFieldProps = {
    selectedDepartament?: Departament
    onDepartamentChange: (departament?: Departament) => void
}

export const ResponsibleDepartamentName = withForm({
    defaultValues: defaultResponsibleFormValues,
    props: {} as DefaultDepartamentProcessFieldProps,
    render({ form, selectedDepartament, onDepartamentChange }) {
        return (
            (
                <form.AppField
                    name="departamentName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid

                        return <Field
                            id="responsible-departament"
                            data-invalid={isInvalid}
                        >
                            <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
                            <DepartamentSelector
                                name={field.name}
                                selectedDepartament={selectedDepartament}
                                placeHolder="Departamento"
                                onValueChange={(departament) => {
                                    field.handleChange(departament?.name)
                                    onDepartamentChange(departament)
                                }}
                            />
                            {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                            )}
                        </Field>
                    }}
                >
                </ form.AppField >
            )

        )
    },
})
