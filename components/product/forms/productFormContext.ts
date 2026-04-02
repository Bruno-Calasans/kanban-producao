import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"

export const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do produto é obrigatório.")
        .min(5, "Nome do produto deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do produto deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    op: z
        .coerce
        .number()
        .min(0, "Valor mínimo é 0"),
    max_amount: z
        .coerce
        .number()
        .min(0, "Valor mínimo é 0"),
    defaultDepartamentName: z
        .string()
        .optional(),
    defaultProcessName: z
        .string()
        .optional(),
    useDefault: z
        .boolean()
        .optional(),
})

export type ProductSchema = z.infer<typeof formSchema>;

export const defaultProductFormValues: ProductSchema = {
    name: "",
    op: 0,
    max_amount: 0,
    defaultDepartamentName: "",
    defaultProcessName: "",
    useDefault: true,
}

export const {
    fieldContext,
    formContext,
    useFieldContext,
    useFormContext,
} = createFormHookContexts()


export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
})




