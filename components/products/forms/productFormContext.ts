import ZodNumberField from "@/utils/ZodNumberField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Nome do produto é obrigatório.").toUpperCase(),
  op: ZodNumberField({ min: 0, minError: "OP deve ser maior que 0." }),
});

export type ProductSchema = z.infer<typeof formSchema>;

export const defaultProductFormValues: ProductSchema = {
  name: "",
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
