import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import DepartamentProcessSelector from "@/components/custom/DepartamentProcessSelector";
import { ArrowRightIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Departament, Process } from "@/types/database.type";


type MovimentationProcessFieldGroupProps = {
    departamentOrigin?: Departament
    departamentDestination?: Departament
    processOrigin?: Process
    processDestination?: Process
    onChangeProcessOrigin: (process: Process) => void
    onChangeProcessDestination: (process: Process) => void
}


export const MovimentationProcessFieldGroup = withForm({
    defaultValues: defaultMovimentationFormValues,
    props: {} as MovimentationProcessFieldGroupProps,
    render({ form, departamentOrigin, departamentDestination, processOrigin, processDestination, onChangeProcessOrigin, onChangeProcessDestination }) {
        return <FieldSet>
            <FieldLegend>Processo</FieldLegend>
            <FieldGroup id="processes" className="flex-row justify-center items-center">

                {/* Campo: processo do departamento de origem*/}
                <form.Field
                    name="processOriginName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Processo de origem</FieldLabel>
                                <DepartamentProcessSelector
                                    name={field.name}
                                    selectedDepartament={departamentOrigin}
                                    selectedProcess={processOrigin}
                                    onValueChange={(process) => {
                                        field.handleChange(process.name)
                                        onChangeProcessOrigin(process)
                                    }}
                                />
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>)
                    }}
                />

                <ArrowRightIcon size={50} />

                {/* Campo: processo do departamento de destino*/}
                <form.Field
                    name="processDestinationName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Processo de destino</FieldLabel>
                                <DepartamentProcessSelector
                                    name={field.name}
                                    selectedDepartament={departamentDestination}
                                    selectedProcess={processDestination}
                                    onValueChange={(process) => {
                                        field.handleChange(process.name)
                                        onChangeProcessDestination(process)
                                    }}
                                />
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>)
                    }}
                />

            </FieldGroup>
            {/* <form.Field
                name="useMoveNextDepartament"
                children={(field) => {
                    return (
                        <Field orientation="horizontal">
                            <Checkbox
                                id="terms-checkbox-desc"
                                name="terms-checkbox-desc"
                                checked={field.state.value}
                                onCheckedChange={checked => field.handleChange(checked as boolean)}

                            />
                            <FieldContent>
                                <FieldLabel htmlFor="terms-checkbox-desc">
                                    Ir para próximo departamento
                                </FieldLabel>
                                <FieldDescription>
                                    Movimenta para o próximo departamento
                                </FieldDescription>
                            </FieldContent>
                        </Field>
                    )
                }}
            /> */}

        </FieldSet>
    }
})