import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import DepartamentSelector from "@/components/custom/DepartamentSelector";
import { Departament, ProductPopulated } from "@/types/database.type";
import { ArrowRightIcon } from "lucide-react";

type MovimentationDepartamentFieldGroupProps = {
    selectedProduct: ProductPopulated
    originDepartament?: Departament
    destinationDepartament?: Departament
    onChangeDepartamentOrigin: (departament: Departament | undefined) => void
    onChangeDepartamentDestination: (departament: Departament | undefined) => void
}

export const MovimentationDepartamentFieldGroup = withForm({
    defaultValues: defaultMovimentationFormValues,
    props: {} as MovimentationDepartamentFieldGroupProps,
    render({ form,
        selectedProduct,
        originDepartament,
        destinationDepartament,
        onChangeDepartamentOrigin,
        onChangeDepartamentDestination
    }) {

        return (
            <FieldSet >
                <FieldLegend>Departamento</FieldLegend>
                <FieldGroup
                    id="departaments"
                    className="flex-row justify-center items-center"
                >
                    {/* Campo: Departamento de origem*/}
                    <form.Field
                        name="departamentOriginName"
                        children={(field) => {
                            const departament = selectedProduct.departament || originDepartament
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Departamento de origem</FieldLabel>
                                    <DepartamentSelector
                                        disabled
                                        name={field.name}
                                        selectedDepartament={departament}
                                        placeHolder="Departamento origem"
                                        onValueChange={(departament) => {
                                            field.handleChange(departament?.name || "")
                                            onChangeDepartamentOrigin(departament)
                                        }}
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>)
                        }}
                    />

                    <ArrowRightIcon size={50} />

                    {/* Campo: Departamento de destino*/}
                    <form.Field
                        name="departamentDestinationName"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Departamento de destino</FieldLabel>
                                    <DepartamentSelector
                                        name={field.name}
                                        selectedDepartament={destinationDepartament}
                                        placeHolder="Departamento destino"
                                        onValueChange={(departament) => {
                                            field.handleChange(departament?.name || "")
                                            onChangeDepartamentDestination(departament)
                                        }}
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>)
                        }}
                    />
                </FieldGroup>
            </FieldSet>
        )
    }
})