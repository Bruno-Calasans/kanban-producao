/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { defaultDepartamentFormValues, withForm } from "../departamentFormContext";

type DepartamentIsExternalCheckboxFieldProps = {
  defaultIsExternal: boolean;
  onValueChange(isExternal?: boolean): void;
};

export const DepartamentIsExternalCheckboxField = withForm({
  defaultValues: defaultDepartamentFormValues,
  render({ form }) {
    return (
      <form.Field
        name="isExternal"
        children={(field) => (
          <Field orientation="horizontal">
            <Checkbox
              id="is-external-departament-field"
              checked={field.state.value}
              onCheckedChange={value => field.handleChange(!!value)}
              className="group-has-disabled/field:opacity-100"
            />
            <FieldContent>
              <FieldLabel>É departamento externo</FieldLabel>
              <FieldDescription>
                Departamento exerno pode ser usado para desviar o fluxo de produção. Por exemplo: as
                facções.{" "}
              </FieldDescription>
            </FieldContent>
          </Field>
        )}
      ></form.Field>
    );
  },
});
