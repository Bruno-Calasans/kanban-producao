"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "../../custom/buttons/ClearButton"
import ConfirmButton from "../../custom/buttons/ConfirmButton"
import useCreateProduct from "@/hooks/product/useCreateProduct"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"


const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do produto é obrigatório.")
        .min(5, "Nome do produto deve ter pelo menos 5 caracteres.")
        .toUpperCase(),
    op: z.coerce.number().min(1, "Valor mínimo é 1").optional().or(z.literal('')),
    max_amount: z.coerce.number().min(1, "Valor mínimo é 1").optional().or(z.literal('')),
})

type ProductSchema = z.infer<typeof formSchema>;


export default function CreateProductForm() {
    const { mutateAsync, isPending } = useCreateProduct()

    const form = useForm({
        defaultValues: {
            name: "",
            op: "",
            max_amount: ""
        } as ProductSchema,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                await mutateAsync(value)
                toast.success("Produto criado com sucesso!")
                form.reset()

            } catch (error) {
                if (error instanceof PostgrestError) {
                    if (error.message.toLowerCase().includes("duplicate")) {
                        toast.error("Error: produto já existe!")
                    }

                } else {
                    toast.error("Error desconhecido")
                }

            }

        },
    })

    return (
        <form
            id="product-form"
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
                                <FieldLabel htmlFor={field.name}>Nome do Produto</FieldLabel>
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
                    name="op"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Ordem de Produção (OP)</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                                    aria-invalid={isInvalid}
                                    placeholder="Número de OP do produto"
                                    autoComplete="off"
                                    type="number"
                                />
                                <FieldDescription>
                                    Se não souber a OP do produto, pode cadastrar depois.
                                </FieldDescription>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )
                    }}
                />

                <form.Field
                    name="max_amount"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Quantidade Máxima</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                                    aria-invalid={isInvalid}
                                    placeholder="Quantidade máxima"
                                    autoComplete="off"
                                    type="number"
                                />
                                <FieldDescription>
                                    Diz quantas peças serão produzidas. Se não souber agora,
                                    cadastre depois.
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
                <ConfirmButton isLoading={isPending} title="Criar" />
            </div>
        </form>

    )
}
