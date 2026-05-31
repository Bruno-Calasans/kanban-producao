import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type FinishDeadlineFormSchema = z.infer<typeof formSchema>;

export const defaultFinishDeadlineFormValues: FinishDeadlineFormSchema = {
  startDate: "",
  endDate: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
