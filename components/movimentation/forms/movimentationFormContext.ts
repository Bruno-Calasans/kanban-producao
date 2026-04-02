import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod"


export const formSchema = z.object({
    productName: z
        .string()
        .nonempty("Produto é obrigatório."),
    departamentOriginName: z
        .string()
        .nonempty("Departamento de origem é obrigatório."),
    departamentDestinationName: z
        .string()
        .nonempty("Departamento destino é obrigatório."),
    processOriginName: z
        .string()
        .nonempty("Processo de origem é obrigatório."),
    processDestinationName: z
        .string()
        .nonempty("Processo de destino é obrigatório."),
    amount: z
        .coerce
        .number()
        .min(1, "Valor mínimo é 1")
        .or(z.literal('')),
    useMaxAmount: z
        .boolean()
        .default(false),
    useSameDepartament: z
        .boolean()
        .default(false),
    useMoveNextDepartament: z
        .boolean()
        .default(false),
})

export type MovimentationFormSchema = z.infer<typeof formSchema>;


export const defaultMovimentationFormValues: MovimentationFormSchema = {
    productName: "",
    departamentOriginName: "",
    departamentDestinationName: "",
    processOriginName: "",
    processDestinationName: "",
    amount: 1,
    useMaxAmount: true,
    useSameDepartament: true,
    useMoveNextDepartament: false
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

