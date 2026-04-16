import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Nome do departamento é obrigatório.").toUpperCase(),
  sequence: ZodNumberField({ min: 0, minError: "Sequência não pode ser negativa." }),
});

export type DepartamentFormSchema = z.infer<typeof formSchema>;

export const defaultDepartamentFormValues: DepartamentFormSchema = {
  name: "",
  sequence: 0,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
