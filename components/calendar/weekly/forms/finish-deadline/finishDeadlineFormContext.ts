import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  finished_at: z.string(),
});

export type FinishDeadlineFormSchema = z.infer<typeof formSchema>;

export const defaultFinishDeadlineFormValues: FinishDeadlineFormSchema = {
  finished_at: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
