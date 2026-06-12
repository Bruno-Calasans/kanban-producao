import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  productName: z.string().nonempty("Produto é obrigatório."),
  amount: ZodNumberField({ min: 1, minError: "Valor mínimo é 1" }),
  op: ZodNumberField({ min: 0, minError: "Valor mínimo é 0" }),
  productionFlow: z.string().nonempty("Fluxo de produção é obrigatório."),
});

export type ProductionFormSchema = z.infer<typeof formSchema>;

export const defaultProductionFormValues: ProductionFormSchema = {
  productionFlow: "",
  productName: "",
  amount: 1,
  op: 0,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
