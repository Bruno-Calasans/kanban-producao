
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Departament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"
import { defaultProcessFormValues, withForm } from "../ProcessFormContext"

type DefaultDepartamentProcessFieldProps = {
    selectedDepartament?: Departament
    onChange: (departament: Departament) => void
}

export const ProcessDepartamentField = withForm({
    defaultValues: defaultProcessFormValues,
    props: {} as DefaultDepartamentProcessFieldProps,
    render({ form, selectedDepartament, onChange }) {
        return (
            (
                <form.AppField
                    name="departamentName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid

                        return <Field
                            id="process-departament"
                            data-invalid={isInvalid}
                        >
                            <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
                            <DepartamentSelector
                                name={field.name}
                                selectedDepartament={selectedDepartament}
                                placeHolder="Departamento inicial"
                                onvalueChange={(departament) => {
                                    field.handleChange(departament.name)
                                    onChange(departament)
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
