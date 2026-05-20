import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Quantidade mínima é 1" }),
  useMaxAmount: z.boolean(),
  externalDepartamentName: z.string().nonempty("Nome do departamento é obrigatório"),
  externalProcessName: z.string().nonempty("Nome do departamento é obrigatório"),
});

export type MoveExternalFormSchema = z.infer<typeof formSchema>;

export const defaultMoveExternalFormValues: MoveExternalFormSchema = {
  amount: 1,
  useMaxAmount: true,
  externalProcessName: "",
  externalDepartamentName: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
