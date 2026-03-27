"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../../custom/buttons/ClearButton"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"
import { useState } from "react"
import { Departament, ResponsibleWithDepartament } from "@/types/database.type"
import DepartamentSelector from "@/components/custom/DepartamentSelector"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useUpdateResponsible from "@/hooks/responsible/useUpdateResponsible"


const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do responsável é obrigatório.")
        .min(5, "Nome do responsável deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do responsável deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    departamentName: z.string().nonempty("Nome do departamento é obrigatório.")
})


type CreateResponsibleFormProps = {
    responsible: ResponsibleWithDepartament
}

export default function UpdateResponsibleForm({ responsible }: CreateResponsibleFormProps) {
    const { mutateAsync, isPending } = useUpdateResponsible()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | null>(responsible.departament)

    const form = useForm({
        defaultValues: {
            name: responsible.name,
            departamentName: responsible.departament.name
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    id: responsible.id,
                    updateData: { departament_id: selectedDepartament.id, name: value.name }
                })
                toast.success("Responsável atualizado com sucesso!")
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
                <SaveButton isLoading={isPending} />
            </div>
        </form>

    )
}
