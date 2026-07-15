import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  plannedEndAt: z.string(),
});

export type ProductionFormSchema = z.infer<typeof formSchema>;

export const defaultEditExternalDeadlineFormValues: ProductionFormSchema = {
  plannedEndAt: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
