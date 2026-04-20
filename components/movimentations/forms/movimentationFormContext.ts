import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  productName: z.string().nonempty("Produto é obrigatório."),
  amount: ZodNumberField({ min: 1, minError: "Valor mínimo é 1" }),
  useMaxAmount: z.boolean(),
});

export type MovimentationFormSchema = z.infer<typeof formSchema>;

export const defaultMovimentationFormValues: MovimentationFormSchema = {
  productName: "",
  useMaxAmount: true,
  amount: 1,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
