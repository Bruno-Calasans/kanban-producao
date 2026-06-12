import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Nome do responsável é obrigatório.").toUpperCase(),
  departamentName: z.string().nonempty("Nome do departamento é obrigatório."),
});

export type ResponsibleFormSchema = z.infer<typeof formSchema>;

export const defaultResponsibleFormValues: ResponsibleFormSchema = {
  name: "",
  departamentName: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
