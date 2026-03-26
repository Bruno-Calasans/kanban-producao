"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../../custom/buttons/ClearButton"
import useUpdateDepartament from "@/hooks/departament/useUpdateDepartament"
import SaveButton from "../../custom/buttons/SaveButton"
import type { Departament } from "@/types/database.type"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"
import useGetOneDepartament from "@/hooks/departament/useGetOneDepartament"
import { getDepartamentById, getDepartamentByName } from "@/service/api/departamentApi"


const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do departamento é obrigatório.")
        .min(5, "Nome do departamento deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do departamento deve ter no máximo 32 caracteres."),
    order: z
        .coerce
        .number()
        .min(1, "Ordem deve ser maior ou igual a 1.")
})


type DepartamentFormProps = {
    departament: Departament
}

export default function EditDepartamentForm({ departament }: DepartamentFormProps) {
    const { mutateAsync, isPending } = useUpdateDepartament()

    const form = useForm({
        defaultValues: {
            name: departament.name,
            order: departament.order,
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                await mutateAsync({ id: departament.id, updateData: value })
                toast.success("Departamento atualizado com sucesso!")
                form.reset()
            } catch (error) {
                if (error instanceof PostgrestError) {
                    if (error.message.toLowerCase().includes("duplicate")) {
                        toast.error("Error: departamento já existe!")
                    }

                } else {
                    toast.error("Error desconhecido")
                }

            }

        },
    })


    return (
        <form
            id="departament-form"
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
                                <FieldLabel htmlFor={field.name}>Nome do Departamento</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value.toLocaleUpperCase())}
                                    aria-invalid={isInvalid}
                                    placeholder="Nome do departamento"
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
                                    placeholder="Número da ordem do departamento"
                                    autoComplete="off"
                                    type="number"
                                />

                                <FieldDescription>
                                    A ordem do departamento é usada para determinar o fluxo de produção.
                                </FieldDescription>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )
                    }}
                />

            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <SaveButton isLoading={isPending || !form.state.isValid} />
            </div>
        </form>

    )
}
