import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";
import { ProcessExecutionType } from "@/types/database.type";

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Quantidade mínima é 1" }),
  executionType: z.enum(["merda"]),
});

export type ProcessExecutionSchema = z.infer<typeof formSchema>;

export const defaultProcessExecutionForm: ProcessExecutionSchema = {
  name: "",
  sequence: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
