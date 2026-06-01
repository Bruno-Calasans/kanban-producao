import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  amount: ZodNumberField({ min: 1, minError: "Valor mínimo é 1" }),
  productionFlow: z.string().optional(),
});

export type ProductMovimentationFormContextchema = z.infer<typeof formSchema>;

export const defaultMovimentationFormValues: ProductMovimentationFormContextchema = {
  amount: 1,
  productionFlow: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
