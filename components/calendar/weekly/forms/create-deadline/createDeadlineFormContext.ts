import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";
import * as z from "zod";

export const formSchema = z.object({
  productMovimentation: z.string().nonempty("Nome do departamento é obrigatório."),
  departamentName: z.string().nonempty("Nome do departamento é obrigatório."),
  plannedStartDate: z.string().nonempty("Data de início planejada é obrigatória."),
  plannedEndDate: z.string().nonempty("Data de término planejada é obrigatória."),
});

export type DeadlineFormSchema = z.infer<typeof formSchema>;

export const defaultCreateDeadlineForm: DeadlineFormSchema = {
  productMovimentation: "",
  departamentName: "",
  plannedStartDate: "",
  plannedEndDate: "",
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
