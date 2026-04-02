import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"

export const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do departamento é obrigatório.")
        .min(5, "Nome do departamento deve ter pelo menos 5 caracteres.")
        .max(32, "Nome do departamento deve ter no máximo 32 caracteres.")
        .toUpperCase(),
    order: z
        .coerce
        .number()
        .min(0, "Ordem do departamento deve ser positiva.")
})

export type DepartamentFormSchema = z.infer<typeof formSchema>;

export const defaultDepartamentFormValues: DepartamentFormSchema = {
    name: "",
    order: 0
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

