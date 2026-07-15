import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultReturnProcessFormValues, withForm } from "../returnDepartamentFormContext";
import { SingleSelector } from "@/components/custom/selectors/SingleSelector";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ReturnDepartamentFieldProps = {
  selectedDepartament?: Departament;
  avaliableDepartaments: Departament[];
  onChangeDepartament: (departament?: Departament) => void;
};

export const ReturnDepartamentField = withForm({
  defaultValues: defaultReturnProcessFormValues,
  props: {} as ReturnDepartamentFieldProps,
  render({ form, avaliableDepartaments, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="externalDepartamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Departamento <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelector<Departament>
                labelSelector="name"
                data={avaliableDepartaments}
                placeholder="Selecione o departamento"
                selectedData={selectedDepartament}
                onChange={(departament) => {
                  field.handleChange(departament?.name || "");
                  onChangeDepartament(departament);
                }}
              />
              <FieldDescription>Escolhe para qual departamento você quer retornar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
