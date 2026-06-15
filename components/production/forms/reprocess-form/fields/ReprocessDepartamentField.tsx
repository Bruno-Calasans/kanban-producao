import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultReprocessFormValues, withForm } from "../reprocessExecutionFormContext";
import { SingleSelector } from "@/components/custom/selectors/SingleSelector";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ReprocessDepartamentFieldProps = {
  selectedDepartament?: Departament;
  avaliableDepartaments: Departament[];
  onChangeDepartament: (departament?: Departament) => void;
};

export const ReprocessDepartamentField = withForm({
  defaultValues: defaultReprocessFormValues,
  props: {} as ReprocessDepartamentFieldProps,
  render({ form, avaliableDepartaments, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="departamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Departamento <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelector<Departament>
                placeholder="Selecione o departamento"
                labelSelector="name"
                data={avaliableDepartaments}
                selectedData={selectedDepartament}
                onChange={(process) => {
                  field.handleChange(process?.name || "");
                  onChangeDepartament(process);
                }}
              />
              <FieldDescription>
                Escolhe para qual departamento você quer reprocessar
              </FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
