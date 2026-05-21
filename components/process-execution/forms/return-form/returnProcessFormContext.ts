import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Quantidade mínima é 1" }),
  useMaxAmount: z.boolean(),
  externalProcessName: z.string().nonempty("Processo é obrigatório"),
  started_at: z.string().optional(),
  finished_at: z.string().optional(),
});

export type ReturnProcessFormContextSchema = z.infer<typeof formSchema>;

export const defaultReturnProcessFormValues: ReturnProcessFormContextSchema = {
  amount: 1,
  useMaxAmount: true,
  externalProcessName: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
