import { defaultProductFormValues, withForm } from "@/components/product/forms/productFormContext"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Departament, Process } from "@/types/database.type"
import DepartamentProcessSelector from "@/components/custom/DepartamentProcessSelector"


type DefaultProcessFieldProps = {
    selectedDepartament?: Departament
    selectedProcess?: Process
    onChange: (process: Process) => void
}

export const ProductDefaultProcessField = withForm({
    defaultValues: defaultProductFormValues,
    props: {} as DefaultProcessFieldProps,
    render({ form, selectedDepartament, selectedProcess, onChange }) {
        return (
            <form.Subscribe selector={state => state.values.useDefault}>
                {useDefault => (!useDefault &&
                    <form.Field
                        name="defaultProcessName"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field
                                    id="use-default-process"
                                    data-invalid={isInvalid}
                                >
                                    <FieldLabel htmlFor={field.name}>Processo inicial</FieldLabel>
                                    <DepartamentProcessSelector
                                        name={field.name}
                                        selectedDepartament={selectedDepartament}
                                        selectedProcess={selectedProcess}
                                        disabled={useDefault}
                                        onValueChange={(process) => {
                                            field.handleChange(process.name)
                                            onChange(process)
                                        }}
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>)
                        }}
                    />
                )}

            </form.Subscribe>
        )
    },
})
