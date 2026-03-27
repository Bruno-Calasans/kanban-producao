"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import ClearButton from "@/components/custom/buttons/ClearButton"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { PostgrestError } from "@supabase/supabase-js"
import type { Product } from "@/types/database.type"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useUpdateProduct from "@/hooks/product/useUpdateProduct"

const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do product é obrigatório.")
        .min(5, "Nome do product deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do product deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    op: z.coerce.number().min(1, "Valor mínimo é 1").optional().or(z.literal('')),
    max_amount: z.coerce.number().min(1, "Valor mínimo é 1").optional().or(z.literal(''))
})

type ProductSchema = z.infer<typeof formSchema>;


type EditProductForm = {
    product: Product
}


export default function EditProductForm({ product }: EditProductForm) {
    const { mutateAsync, isPending } = useUpdateProduct()

    const form = useForm({
        defaultValues: {
            name: product.name,
            op: product.op || "",
            max_amount: product.max_amount || ""
        } as ProductSchema,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                if (value.max_amount == "") value.max_amount = undefined
                if (value.op == "") value.op = undefined

                await mutateAsync({ id: product.id, updateData: value })
                toast.success("Produto atualizado com sucesso!")
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
                                    onChange={(e) => field.handleChange(e.target.value)}
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
                                    onChange={(e) => {
                                        const value = e.target.value
                                        field.handleChange(value == "" ? undefined : value)
                                    }}
                                    aria-invalid={isInvalid}
                                    placeholder="OP do produto"
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
                <SaveButton isLoading={isPending} />
            </div>
        </form>

    )
}
