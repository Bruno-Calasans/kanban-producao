import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"

export const formSchema = z.object({
    productName: z
        .string()
        .nonempty("Nome do produto é obrigatório.")
        .min(5, "Nome do produto deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do produto deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    amount: z
        .coerce
        .number()
        .min(1, "Quantidade deve ser maior ou igual a 1."),
    startHour: z
        .iso
        .time("Hora inicial é obrigatório."),
    endHour: z
        .iso
        .time("Hora final é obrigatório."),
    useMaxAmount: z.
        boolean()
})

export type ProductLogSchema = z.infer<typeof formSchema>;

export const defaultProductLogFormValues: ProductLogSchema = {
    productName: "",
    amount: 0,
    startHour: "",
    endHour: "",
    useMaxAmount: true
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




