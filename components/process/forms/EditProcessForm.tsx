"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../../custom/buttons/ClearButton"
import ConfirmButton from "../../custom/buttons/ConfirmButton"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"
import { useState } from "react"
import { Departament, ProcessWithDepartament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"
import useUpdateProcess from "@/hooks/process/useUpdateProcess"


const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do processo é obrigatório.")
        .min(5, "Nome do processo deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do processo deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    order: z
        .coerce
        .number()
        .min(1, "Ordem deve ser maior ou igual a 1."),

    departamentName: z.string().nonempty("Nome do departamento é obrigatório.")
})


type EditProcessFormProps = {
    process: ProcessWithDepartament
}

export default function EditProcessForm({ process }: EditProcessFormProps) {
    const { mutateAsync, isPending } = useUpdateProcess()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | null>(process.departament)

    const form = useForm({
        defaultValues: {
            name: process.name,
            order: process.order,
            departamentName: process.departament.name
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    id: process.id,
                    updateData: {
                        name: value.name,
                        order: value.order,
                        departament_id: selectedDepartament.id,
                    }
                })
                toast.success("Processo atualizado com sucesso!")
                form.reset()

            } catch (error) {
                if (error instanceof PostgrestError) {
                    if (error.message.toLowerCase().includes("duplicate")) {
                        toast.error("Error: processo já existe!")
                    }

                } else {
                    toast.error("Error desconhecido")
                }

            }

        },
    })

    return (
        <form
            id="process-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>

                <form.Field
                    name="name"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Nome do Processo</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                                    aria-invalid={isInvalid}
                                    placeholder="Nome"
                                    autoComplete="off"
                                />
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )
                    }}
                />

                <form.Field
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
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    aria-invalid={isInvalid}
                                    placeholder="Número da ordem"
                                    autoComplete="off"
                                    type="number"
                                />

                                <FieldDescription>
                                    A ordem do processo é usada para determinar o fluxo de produção.
                                </FieldDescription>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )
                    }}
                />

                <form.Field
                    name="departamentName"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
                                <DepartamentSelector
                                    name={field.name}
                                    value={selectedDepartament}
                                    onvalueChange={(dpt) => {
                                        field.handleChange(dpt.name)
                                        setSelectedDepartament(dpt)
                                    }}
                                />
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>)
                    }}
                />

            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <ConfirmButton isLoading={isPending} title="Criar" />
            </div>
        </form>

    )
}
