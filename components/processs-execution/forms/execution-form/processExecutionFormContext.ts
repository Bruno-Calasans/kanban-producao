import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Quantidade mínima é 1" }),
  responsible: z.string().nonempty("Responsável é obrigatório"),
  useMaxAmount: z.boolean(),
});

export type ExecutionFormSchema = z.infer<typeof formSchema>;

export const defaultExecutionFormValues: ExecutionFormSchema = {
  amount: 1,
  responsible: "",
  useMaxAmount: true,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
