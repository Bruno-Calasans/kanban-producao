import { defaultProductFormValues, withForm } from "@/components/product/forms/productFormContext"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Departament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"


type DefaultDepartamentProcessFieldProps = {
    selectedDepartament?: Departament
    onChange: (departament: Departament) => void
}

export const ProductDefaultDepartamentField = withForm({
    defaultValues: defaultProductFormValues,
    props: {} as DefaultDepartamentProcessFieldProps,
    render({ form, selectedDepartament, onChange }) {
        return (
            <form.Subscribe selector={state => state.values.useDefault}>
                {useDefault => !useDefault && (
                    <form.AppField
                        name="defaultDepartamentName"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid

                            return <Field
                                id="use-default-departament"
                                data-invalid={isInvalid}
                            >
                                <FieldLabel htmlFor={field.name}>Departamento inicial</FieldLabel>
                                <DepartamentSelector
                                    name={field.name}
                                    selectedDepartament={selectedDepartament}
                                    placeHolder="Departamento inicial"
                                    disabled={useDefault}
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
                )}

            </form.Subscribe>
        )
    },
})
