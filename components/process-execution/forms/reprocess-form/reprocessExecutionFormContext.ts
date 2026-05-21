import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const REASON_MAX_LENGTH = 30;

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Quantidade mínima é 1" }),
  useMaxAmount: z.boolean(),
  processName: z.string().nonempty("Processo é obrigatório"),
  reason: z
    .string()
    .max(REASON_MAX_LENGTH, `Motivo deve ter no máximo ${REASON_MAX_LENGTH} caracteres`)
    .optional(),
});

export type ReprocessExecutionSchema = z.infer<typeof formSchema>;

export const defaultReprocessFormValues: ReprocessExecutionSchema = {
  amount: 1,
  useMaxAmount: true,
  processName: "",
  reason: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
