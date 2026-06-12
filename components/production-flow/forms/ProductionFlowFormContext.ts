import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Nome do fluxo é obrigatório.").toUpperCase(),
  desc: z.string().optional(),
  useDefault: z.boolean().optional(),
  departamentNames: z.array(z.string()).min(1, "Você deve selecionar pelo menos 1 departamento"),
});

export type ProductionFlowSchema = z.infer<typeof formSchema>;

export const defaultProductionFlowValues: ProductionFlowSchema = {
  name: "",
  desc: "",
  useDefault: false,
  departamentNames: [],
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
