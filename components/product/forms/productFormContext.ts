import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"


export const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do produto é obrigatório.")
        .min(5, "Nome do produto deve ter pelo menos 5 caracteres.")
        .toUpperCase(),
    op: ZodNumberField({ min: 0, minError: "OP deve ser maior que 0." }),
    max_amount: ZodNumberField({ min: 0, minError: "Quantidade deve ser maior que 0." }),
})

export type ProductSchema = z.infer<typeof formSchema>;

export const defaultProductFormValues: ProductSchema = {
    name: "",
    op: 0,
    max_amount: 0,
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




