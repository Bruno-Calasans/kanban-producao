import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs"
import * as z from "zod"

export const formSchema = z.object({
    name: z
        .string()
        .nonempty("Nome do processo é obrigatório.")
        .min(5, "Nome do processo deve ter pelo menos 5 caracteres.")
        .toUpperCase(),
    sequence: ZodNumberField({
        min: 0,
        minError: "Valor da sequência não pode ser negativa"
    }),
    departamentName: z
        .string()
        .nonempty("Nome do departamento é obrigatório.")
})

export type ProcessFormSchema = z.infer<typeof formSchema>;


export const defaultProcessFormValues: ProcessFormSchema = {
    name: "",
    departamentName: "",
    sequence: 0,
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