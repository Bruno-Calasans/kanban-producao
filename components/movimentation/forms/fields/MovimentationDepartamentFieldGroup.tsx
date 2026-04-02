import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import DepartamentSelector from "@/components/custom/DepartamentSelector";
import { Departament, ProductPopulated } from "@/types/database.type";
import { ArrowRightIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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

        return <form.Subscribe selector={state => state.values.useSameDepartament}>
            {(useSameDepartament) => (
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
                                            name={field.name}
                                            selectedDepartament={departament}
                                            placeHolder="Departamento origem"
                                            disabled
                                            onValueChange={(departament) => {
                                                field.handleChange(departament.name)
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
                        <form.Subscribe selector={state => state.values}>
                            {values => (
                                <form.Field
                                    name="departamentDestinationName"
                                    children={(field) => {
                                        const departament = useSameDepartament ? originDepartament : destinationDepartament
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Departamento de destino</FieldLabel>
                                                <DepartamentSelector
                                                    name={field.name}
                                                    selectedDepartament={departament}
                                                    placeHolder="Departamento destino"
                                                    disabled={values.useSameDepartament || values.useMoveNextDepartament}
                                                    onBeforeValueChange={
                                                        (departaments, dpt) => {
                                                            const useNextDepartament = values.useMoveNextDepartament
                                                            if (useNextDepartament) {
                                                                const sorted = departaments.sort((dptA, dptB) => {
                                                                    return dptA.order - dptB.order
                                                                })
                                                                console.log(sorted)
                                                                return sorted[0]
                                                            }

                                                            return dpt
                                                        }}
                                                    onValueChange={(departament) => {
                                                        field.handleChange(departament.name)
                                                        onChangeDepartamentDestination(departament)
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
                    </FieldGroup>

                    <FieldGroup>
                        <form.Subscribe selector={state => state.values.useMoveNextDepartament}>
                            {(useMoveNextDepartament) =>
                            (<form.Field
                                name="useSameDepartament"
                                children={(field) => {
                                    return (
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="use-same-departament-checkbox"
                                                name="use-same-departament-checkbox"
                                                disabled={useMoveNextDepartament}
                                                checked={field.state.value}
                                                onCheckedChange={checked => field.handleChange(checked as boolean)}

                                            />
                                            <FieldContent>
                                                <FieldLabel htmlFor="use-same-departament-checkbox">
                                                    Mesmo departamento
                                                </FieldLabel>
                                                <FieldDescription>
                                                    Move no mesmo departamento. Útil se for apenas trocar de processo.
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    )
                                }}
                            />)
                            }
                        </form.Subscribe>

                        <form.Subscribe selector={state => state.values.useSameDepartament}>
                            {useSameDepartament => (
                                <form.Field
                                    name="useMoveNextDepartament"
                                    children={(field) => {
                                        return (
                                            <Field orientation="horizontal">
                                                <Checkbox
                                                    id="use-next-departament-checkbox"
                                                    name="use-next-departament-checkbox"
                                                    disabled={useSameDepartament}
                                                    checked={field.state.value}
                                                    onCheckedChange={checked => field.handleChange(checked as boolean)}

                                                />
                                                <FieldContent>
                                                    <FieldLabel htmlFor="use-next-departament-checkbox">
                                                        Próximo departamento
                                                    </FieldLabel>
                                                    <FieldDescription>
                                                        Movimenta para o próximo departamento, definido pela ordem.
                                                    </FieldDescription>
                                                </FieldContent>
                                            </Field>
                                        )
                                    }}
                                />
                            )}
                        </form.Subscribe>
                    </FieldGroup>
                </FieldSet>
            )}

        </form.Subscribe>
    }
})