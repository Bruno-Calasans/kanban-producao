import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"

export const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do processo é obrigatório.")
        .min(5, "Nome do processo deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do processo deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    order: z
        .coerce
        .number()
        .min(0, "Ordem deve ser maior ou igual a 0."),

    departamentName: z
        .string()
        .nonempty("Nome do departamento é obrigatório.")
})

export type ProcessFormSchema = z.infer<typeof formSchema>;


export const defaultProcessFormValues: ProcessFormSchema = {
    name: "",
    departamentName: "",
    order: 0,
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