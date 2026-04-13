import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
    productionFlowName: z.string().nonempty("Fluxo de produção é obrigatório"),
});

export type ConfigurationFormSchema = z.infer<typeof formSchema>;

export const defaultConfigurationFormValues: ConfigurationFormSchema = {
    productionFlowName: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
});
