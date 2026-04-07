"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import ClearButton from "@/components/custom/buttons/ClearButton"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { useState } from "react"
import { Departament, Process } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useSetDefaultDepartament from "@/hooks/departament/useSetDefaultDepartament"
import DepartamentProcessSelector from "../custom/DepartamentProcessSelector"
import useSetDefaultProcess from "@/hooks/process/useSetDefaultProcess"
import handleFormError from "@/utils/formErrorHandler"


const formSchema = z.object({
    defaultDepartamentName: z.string().nonempty("Nome do departamento é obrigatório."),
    defaultProcessName: z.string().nonempty("Nome do processo é obrigatório."),

})


export default function ConfigurationForm() {
    const { mutateAsync: mutateDepartament, isPending: isDepartamentPending } = useSetDefaultDepartament()
    const { mutateAsync: mutateProcess, isPending: isProcessPending } = useSetDefaultProcess()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>()
    const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()

    const form = useForm({
        defaultValues: {
            defaultDepartamentName: "",
            defaultProcessName: ""

        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                if (selectedDepartament) {
                    await mutateDepartament({
                        id: selectedDepartament.id,
                    })
                    toast.success("Departamento padrão atualizado com sucesso!")
                    form.reset()
                }

                if (selectedProcess) {
                    await mutateProcess({
                        id: selectedProcess.id,
                    })
                    toast.success("Processo padrão atualizado com sucesso!")
                    form.reset()
                }

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível salvar as configurações."
                })
            }
        },
    })

    const isLoading = isDepartamentPending || isProcessPending

    return (
        <form
            id="responsible-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <form.Field
                    name="defaultDepartamentName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Departamento Padrão</FieldLabel>
                                <DepartamentSelector
                                    name={field.name}
                                    selectedDepartament={selectedDepartament}
                                    onValueChange={(dpt) => {
                                        field.handleChange(dpt.name)
                                        setSelectedDepartament(dpt)
                                    }}
                                />
                                <FieldDescription>
                                    Selecione o departamento que será o padrão para novos produtos cadastrados.
                                </FieldDescription>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>)
                    }}
                />

                <form.Field
                    name="defaultProcessName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Processo Padrão</FieldLabel>
                                <DepartamentProcessSelector
                                    name={field.name}
                                    selectedDepartament={selectedDepartament}
                                    selectedProcess={selectedProcess}
                                    onValueChange={(process) => {
                                        field.handleChange(process?.name)
                                        setSelectedProcess(process)
                                    }}
                                />
                                <FieldDescription>
                                    Selecione o processo que será o padrão para novos produtos cadastrados.
                                </FieldDescription>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>)
                    }}
                />

            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isLoading} onclick={() => form.reset()} />
                <SaveButton isLoading={isLoading} />
            </div>
        </form>

    )
}
