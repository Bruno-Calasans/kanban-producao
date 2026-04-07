import { Departament, ResponsibleWithDepartament } from "@/types/database.type";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import ResponsibleSelector from "@/components/custom/ResponsibleSelector";



type MovimentationResponsibleFieldProps = {
    selectedDepartament?: Departament
    selectedResponsible?: ResponsibleWithDepartament
    onChangeResponsible: (responsible?: ResponsibleWithDepartament) => void
}


export const MovimentationResponsibleField = withForm({
    defaultValues: defaultMovimentationFormValues,
    props: {} as MovimentationResponsibleFieldProps,
    render({ form, selectedDepartament, selectedResponsible, onChangeResponsible }) {
        return <form.Field
            name="responsibleName"
            children={(field) => {
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return (
                    <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Responsável</FieldLabel>
                        <ResponsibleSelector
                            name={field.name}
                            selectedDepartament={selectedDepartament}
                            selectedResponsible={selectedResponsible}
                            onValueChange={(responsible) => {
                                field.handleChange(responsible?.name || "")
                                onChangeResponsible(responsible)
                            }}
                        />
                        {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </Field>)
            }}
        />
    }
})