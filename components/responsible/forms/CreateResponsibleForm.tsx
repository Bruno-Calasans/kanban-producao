"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../../custom/buttons/ClearButton"
import ConfirmButton from "../../custom/buttons/ConfirmButton"
import useCreateResponsible from "@/hooks/responsible/useCreateResponsible"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"
import { useState } from "react"
import { Departament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"


const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do responsável é obrigatório.")
        .min(3, "Nome do responsável deve ter pelo menos 3 caracteres.")
        .max(32, "Nome do responsável deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    departamentName: z.string().nonempty("Nome do departamento é obrigatório.")
})


export default function CreateResponsibleForm() {
    const { mutateAsync, isPending } = useCreateResponsible()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | null>(null)

    const form = useForm({
        defaultValues: {
            name: "",
            departamentName: ""
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    name: value.name,
                    departament_id: selectedDepartament.id
                })
                toast.success("Responsável criado com sucesso!")
                form.reset()

            } catch (error) {
                if (error instanceof PostgrestError) {
                    if (error.message.toLowerCase().includes("duplicate")) {
                        toast.error("Error: responsável já existe!")
                    }

                } else {
                    toast.error("Error desconhecido")
                }

            }

        },
    })

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
                    name="name"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Nome do Responsável</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                                    aria-invalid={isInvalid}
                                    placeholder="Nome do responsável"
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
