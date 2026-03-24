"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../custom/buttons/ClearButton"
import ConfirmButton from "../custom/buttons/ConfirmButton"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { UpdateDepartamentData } from "@/service/api/departamentApi"
import useUpdateDepartament from "@/hooks/departament/useUpdateDepartament"
import { Departament } from "@/types/database.type"


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

export default function DepartamentForm({ departament }: DepartamentFormProps) {
    const { mutate, error, isPending } = useUpdateDepartament()

    const form = useForm({
        defaultValues: {
            name: departament.name,
            order: departament.order,
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            toast.success("Departamento atualizado com sucesso!")
            mutate({ id: departament.id, ...value })
            form.reset()
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
                                    onChange={(e) => field.handleChange(e.target.value)}
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
                <ClearButton title="Limpar" onclick={() => form.reset()} />
                <ConfirmButton loading={isPending} title="Criar departamento" />
            </div>
        </form>

    )
}
